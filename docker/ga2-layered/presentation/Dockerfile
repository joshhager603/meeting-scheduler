# Dockerfile for Node.js and React frontend
FROM node:14

# Set working directory
WORKDIR /presentation

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

# Expose the port for the frontend (e.g., React default is 3000)
EXPOSE 3000

# Command to run the frontend server
CMD ["/wait-for-it.sh", "service:8000", "--", "npm", "run", "start"]