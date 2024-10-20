#!/bin/bash

# Wait for the services to start up before starting the gateway
/wait-for-it.sh calendar-service:8001 -- echo "Calendar service is up"
/wait-for-it.sh meeting-service:8002 -- echo "Meeting service is up"
/wait-for-it.sh participant-service:8003 -- echo "Participant service is up"
/wait-for-it.sh attachment-service:8004 -- echo "Attachment service is up"

# Run migrations
echo "Running migrations..."
python manage.py makemigrations
python manage.py migrate

# Start the Django server
echo "Starting API gateway!"
python manage.py runserver 0.0.0.0:8000 --noreload
