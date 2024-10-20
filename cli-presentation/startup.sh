#!/bin/bash

# Wait for the API gateway to be ready
/wait-for-it.sh api-gateway:8000 -- echo "API gateway is up"

# Start the CLI presentation
echo "Starting CLI presentation..."

# Loop to read commands
while true; do
    echo "Enter a command (or 'exit' to quit):"
    read command
    if [ "$command" == "exit" ]; then
        echo "Exiting..."
        break
    fi
    python cli.py $command
done
