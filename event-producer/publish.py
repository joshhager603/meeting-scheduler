# docker run --rm -it --hostname my-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management

import pika
import uuid
import random
import json
from datetime import datetime

# Configuration for RabbitMQ
RABBITMQ_HOST = 'localhost'  # Update with your RabbitMQ server address
QUEUE_NAME = 'meeting_events'


# Connect to RabbitMQ
def connect_to_broker():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME, durable=True)
    return connection, channel

calendar = {
    "id": "6b0d7e96-6bcb-4f79-aab5-5398b68f3c48",
    "title": "Software Architecture Fall 2024",
    "description": "this is a calendar for software architecture",
    "meetings": []
}

# Generate meeting event data
def generate_meeting_data():
    return {
        "id": str(uuid.uuid4()),
        "title": "Team Meeting " + str(random.randint(1, 100)),
        "date": datetime.now().strftime("%Y-%m-%d %I:%M %p"),
        "location": "Meeting Room " + str(random.randint(1, 10)),
        "details": "Discussing project updates and tasks.",
        "calendar_id": "6b0d7e96-6bcb-4f79-aab5-5398b68f3c48"
    }

# Generate participant data
def generate_participant_data(meeting_id):
    return {
        "id": str(uuid.uuid4()),
        "meeting_id": meeting_id,
        "name": f"Participant {random.randint(1, 100)}",
        "email": f"participant{random.randint(1, 100)}@example.com"
    }

# Generate attachment data
def generate_attachment_data(meeting_id):
    return {
        "id": str(uuid.uuid4()),
        "meeting_id": meeting_id,
        "url": f"http://example.com/attachment{random.randint(1, 100)}"
    }

# Inject errors into the data for testing purposes
def inject_errors(event):
    if random.random() < 0.2:  # 20% chance to inject an error
        error_type = random.choice(['title', 'location', 'email', 'name', 'url'])
        if error_type == 'title':
            event['title'] = 'T' * 2001  # Longer than 2000 chars
        elif error_type == 'location':
            event['location'] = 'L' * 2001  # Longer than 2000 chars
        elif error_type == 'email':
            event['email'] = 'invalid_email_format'  # Missing '@'
        elif error_type == 'name':
            event['name'] = 'N' * 601  # Longer than 600 chars
        elif error_type == 'url':
            event['url'] = 'invalid_url'  # Doesn't start with http/https

# Create batch of events
def create_event_batch(batch_size=500):
    events = []
    for _ in range(batch_size):
        meeting = generate_meeting_data()
        participants = [generate_participant_data(meeting['id']) for _ in range(random.randint(50, 100))]
        attachments = [generate_attachment_data(meeting['id']) for _ in range(random.randint(5, 10))]

        # Inject errors into some records
        inject_errors(meeting)
        for participant in participants:
            inject_errors(participant)
        for attachment in attachments:
            inject_errors(attachment)

        events.append({
            "meeting": meeting,
            "participants": participants,
            "attachments": attachments
        })
    return events

# Publish a batch to the message broker
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

def main():
    connection, channel = connect_to_broker()

    try:
        batch = create_event_batch(batch_size=500)
        publish_batch(channel, batch);

    finally:
        connection.close()

if __name__ == "__main__":
    main()
