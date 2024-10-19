# Put commands to start gateway here

# wait for the services to start up before starting the gateway
/wait-for-it.sh calendar-service:8001 -- echo "Calendar service is up"
/wait-for-it.sh meeting-service:8002 -- echo "Meeting service is up"
/wait-for-it.sh participant-service:8003 -- echo "Participant service is up"
/wait-for-it.sh attachment-service:8004 -- echo "Attachment service is up"

# put startup commands here
echo "Starting API gateway!"