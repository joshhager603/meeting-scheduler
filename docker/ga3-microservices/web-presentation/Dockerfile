# Dockerfile for Node.js and React frontend
FROM node:14

# Set working directory
WORKDIR /web-presentation

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Add wait-for-it script to the container
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the port for the frontend
EXPOSE 3000

# Command to run the web presentation layer
CMD ["/wait-for-it.sh", "api-gateway:8000", "--", "npm", "run", "start"]