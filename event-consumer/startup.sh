#!/bin/bash

/wait-for-it.sh event-broker:5672 -- python3 consumer.py