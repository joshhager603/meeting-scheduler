#!/bin/bash

# startup commands for event-producer go here

# Print a message indicating the service is starting
echo "Starting event producer service..."

# Run the publisher script
python3 publish.py
