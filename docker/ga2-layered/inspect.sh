NETWORK_NAME="meeting-scheduler-docker_meeting_scheduler"

echo "Containers and IP Addresses:"
docker network inspect "$NETWORK_NAME" -f '{{range .Containers}}{{.Name}} - {{.IPv4Address}}{{println}}{{end}}'
