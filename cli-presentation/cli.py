import click
import requests

#API_URI = 'http://localhost:8000/api/'
API_URI = 'http://api-gateway:8000/api/'

# --- Utility function to send API requests ---
def send_request(endpoint, method='GET', data=None):
    url = "{}{}".format(API_URI, endpoint)  # Use str.format() instead of f-string
    headers = {'Content-Type': 'application/json'}
    response = requests.request(method, url, json=data, headers=headers)

    if response.status_code in [200, 201]:
        return response.json()
    else:
        click.echo("Error: {} - {}".format(response.status_code, response.text))  # Updated line
        print(url)
        return None


# --- CLI Commands ---
@click.group()
def cli():
    """CLI for managing Calendars, Meetings, Participants, and Attachments."""
    pass


# --- Calendar Commands ---
@cli.command()
@click.option('--title', prompt='Calendar Title', help='Title of the calendar')
@click.option('--details', prompt='Calendar Details', help='Details of the calendar')
def add_calendar(title, details):
    """Add a new calendar."""
    data = {'title': title, 'details': details}
    result = send_request('calendars/', 'POST', data)
    if result:
        click.echo("Calendar added: {}".format(result))  # Updated line


@cli.command()
@click.argument('calendar_id')
def get_calendar(calendar_id):
    """Get a calendar by ID."""
    result = send_request('calendars/{}/'.format(calendar_id))  # Updated line
    if result:
        click.echo(result)


@cli.command()
def list_calendars():
    """List all calendars."""
    result = send_request('calendars/')
    if result:
        for calendar in result:
            click.echo("{}: {}".format(calendar['id'], calendar['title']))  # Updated line


@cli.command()
@click.argument('calendar_id')
def delete_calendar(calendar_id):
    """Delete a calendar by ID."""
    result = send_request('calendars/{}/'.format(calendar_id), 'DELETE')  # Updated line
    if result is not None:
        click.echo("Calendar {} deleted.".format(calendar_id))  # Updated line


# --- Meeting Commands ---
@cli.command()
@click.option('--title', prompt='Meeting Title', help='Title of the meeting')
@click.option('--date', prompt='Meeting Date (YYYY-MM-DD)', help='Date of the meeting')
@click.option('--time', prompt='Meeting Time (HH:MM)', help='Time of the meeting')
@click.option('--location', prompt='Location', help='Location of the meeting')
@click.option('--details', prompt='Details', help='Details of the meeting')
@click.option('--calendar_id', prompt='Calendar ID', help='ID of the calendar')
def add_meeting(title, date, time, location, details, calendar_id):
    """Add a new meeting."""
    data = {
        'title': title,
        'date': date,
        'time': time,
        'location': location,
        'details': details,
        'calendar_id': calendar_id
    }
    result = send_request('meetings/', 'POST', data)
    if result:
        click.echo("Meeting added: {}".format(result))  # Updated line


@cli.command()
@click.argument('meeting_id')
def get_meeting(meeting_id):
    """Get a meeting by ID."""
    result = send_request('meetings/{}/'.format(meeting_id))  # Updated line
    if result:
        click.echo(result)


@cli.command()
def list_meetings():
    """List all meetings."""
    result = send_request('meetings/')
    if result:
        for meeting in result:
            click.echo("{}: {} - {}".format(meeting['id'], meeting['title'], meeting['date']))  # Updated line


@cli.command()
@click.argument('meeting_id')
def delete_meeting(meeting_id):
    """Delete a meeting by ID."""
    result = send_request('meetings/{}/'.format(meeting_id), 'DELETE')  # Updated line
    if result is not None:
        click.echo("Meeting {} deleted.".format(meeting_id))  # Updated line


# --- Participant Commands ---
@cli.command()
@click.option('--name', prompt='Participant Name', help='Name of the participant')
@click.option('--email', prompt='Email', help='Email of the participant')
@click.option('--meeting_id', prompt='Meeting ID', help='ID of the meeting')
def add_participant(name, email, meeting_id):
    """Add a new participant."""
    data = {'name': name, 'email': email, 'meeting_id': meeting_id}
    result = send_request('participants/', 'POST', data)
    if result:
        click.echo("Participant added: {}".format(result))  # Updated line


@cli.command()
@click.argument('participant_id')
def delete_participant(participant_id):
    """Delete a participant by ID."""
    result = send_request('participants/{}/'.format(participant_id), 'DELETE')  # Updated line
    if result is not None:
        click.echo("Participant {} deleted.".format(participant_id))  # Updated line


# --- Attachment Commands ---
@cli.command()
@click.option('--url', prompt='Attachment URL', help='URL of the attachment')
@click.option('--meeting_id', prompt='Meeting ID', help='ID of the meeting')
def add_attachment(url, meeting_id):
    """Add a new attachment."""
    data = {'url': url, 'meeting_id': meeting_id}
    result = send_request('attachments/', 'POST', data)
    if result:
        click.echo("Attachment added: {}".format(result))  # Updated line


@cli.command()
@click.argument('attachment_id')
def delete_attachment(attachment_id):
    """Delete an attachment by ID."""
    result = send_request('attachments/{}/'.format(attachment_id), 'DELETE')  # Updated line
    if result is not None:
        click.echo("Attachment {} deleted.".format(attachment_id))  # Updated line


# --- Main Entry Point ---
if __name__ == '__main__':
    cli()
