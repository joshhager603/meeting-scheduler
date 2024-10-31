import pika
import requests
import json

connection = pika.BlockingConnection(pika.ConnectionParameters('event-broker'))
channel = connection.channel()
#channel.exchange_declare(exchange='events_exchange', exchange_type='direct')
channel.queue_declare(queue='meeting_events', durable=True)
#channel.queue_bind(exchange='events_exchange', queue='task_queue', routing_key='meeting_events')

API_GATEWAY_URL = 'http://api-gateway:8000/api/'

# Configuration for DLQ
DLQ_HOST = 'dead-letter'  # Update with your RabbitMQ server address
QUEUE_NAME = 'dead_letters'

# Connect to DLQ
def connect_to_dlq():
    dlq_connection = pika.BlockingConnection(pika.ConnectionParameters(host=DLQ_HOST))
    dlq_channel = connection.channel()
    dlq_channel.queue_declare(queue=QUEUE_NAME, durable=True)
    return dlq_connection, dlq_channel

def publish_batch(channel, batch):
    for event in batch:
        message = json.dumps(event)
        channel.basic_publish(
            exchange='',
            routing_key=QUEUE_NAME,
            body=message,
            properties=pika.BasicProperties(delivery_mode=2)  # Make message persistent
        )
    print(f"Published batch of {len(batch)} events.")

def send_requests(ch, method, request, endpoint):

    endpoint += '/'

    # precondition: item is a JSON
    for item in request:

        try:
            url = "{}{}".format(API_GATEWAY_URL, endpoint)  # Use str.format() instead of f-string
            headers = {'Content-Type': 'application/json'}
            response = requests.request('POST', url, json=item, headers=headers)
            
            # Check if the API request was successful
            if response.status_code in [200, 201]:
                print(" [x] Successfully forwarded message to API.")
            else:
                print(f" [!] Failed to forward message to API. Status Code: {response.status_code}")

                dlq_connection, dlq_channel = connect_to_dlq()

                item['error'] = response.status_code

                dlq_channel.basic_publish(
                    exchange='',
                    routing_key=QUEUE_NAME,
                    body=json.dumps(item),
                    properties=pika.BasicProperties(delivery_mode=2)  # Make message persistent
                )

        except requests.RequestException as e:
            # Handle any exceptions from the requests library
            print(f" [!] Error forwarding message to API: {e}")

def callback(ch, method, properties, body):
 
    # Acknowledge the message
    ch.basic_ack(delivery_tag=method.delivery_tag)
 
    body: dict
    body = json.loads(body)

    for endpoint in body.keys():
        payload = body[endpoint]

        send_requests(ch, method, payload, endpoint)


channel.basic_consume(queue='meeting_events', on_message_callback=callback)

channel.start_consuming()
