import uuid

# Generate a new UUID
def generate_uuid():
    return str(uuid.uuid4())

def truncate_string(input_string, max_length):
    # Check if the string needs to be trimmed
    if len(input_string) > max_length:
        return input_string[:max_length]
    return input_string  # No trimming needed if string is already short enough
