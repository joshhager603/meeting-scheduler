import pika
import random
import json

# Configuration for RabbitMQ
RABBITMQ_HOST = 'localhost'
QUEUE_NAME = 'meeting_events'

# Connect to RabbitMQ
def connect_to_broker():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME, durable=True)
    return connection, channel

# Callback function to handle incoming messages
messages = []

def on_message(ch, method, properties, body):
    message = json.loads(body)
    messages.append(message)
    print(f"Received message: {message}")

    # Acknowledge the message
    ch.basic_ack(delivery_tag=method.delivery_tag)

    # Stop consuming after receiving 10 random messages
    if len(messages) >= 10:
        ch.stop_consuming()

def main():
    # Connect to RabbitMQ
    connection, channel = connect_to_broker()

    # Set up consumer
    channel.basic_consume(queue=QUEUE_NAME, on_message_callback=on_message, auto_ack=False)
    print("Waiting for messages...")

    # Start consuming messages
    channel.start_consuming()

    # Print 10 random messages from the list after consuming
    if messages:
        print("\n--- Random 10 Messages ---")
        for message in random.sample(messages, min(10, len(messages))):
            print(json.dumps(message, indent=4))

    # Close the connection after consuming
    connection.close()

if __name__ == "__main__":
    main()
