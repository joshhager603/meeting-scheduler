# Dockerfile for Django
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /service

# Install system dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libmariadb-dev \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Add wait-for-it script to the container
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copy the requirements file and install Python dependencies
COPY requirements.txt /service/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code
COPY . /service/

# Expose the port Django will run on
EXPOSE 8000

# Use wait-for-it to ensure MySQL is ready before starting Django
CMD ["/wait-for-it.sh", "mysql:3306", "--", "bash", "startup.sh"]

