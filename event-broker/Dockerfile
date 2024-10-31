# Dockerfile for event-producer
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /event-broker

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Add wait-for-it script to the container
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copy the requirements file and install Python dependencies
COPY requirements.txt /event-broker/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code
COPY . /event-broker/

# Expose the port python will run on
EXPOSE 6000

# Use wait-for-it to ensure api gateway is ready
CMD ["/wait-for-it.sh", "api-gateway:8000", "--", "bash", "startup.sh"]

