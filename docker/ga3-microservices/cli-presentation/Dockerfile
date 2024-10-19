# Dockerfile for cli-presentation
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /cli-presentation

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Add wait-for-it script to the container
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copy the requirements file and install Python dependencies
COPY requirements.txt /cli-presentation/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code
COPY . /cli-presentation/

# Expose the port python will run on
EXPOSE 3001

# Use wait-for-it to ensure MySQL is ready before starting Django
CMD ["/wait-for-it.sh", "api-gateway:8000", "--", "bash", "startup.sh"]

