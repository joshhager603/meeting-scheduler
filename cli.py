from meetings import *
from calendars import *
from participants import *
from attachments import *
from tinydb import TinyDB, Query
import click


# CLI Group
@click.group()
def cli():
    pass

# START OF CALENDAR CLI COMMANDS

# Create a Calendar
@cli.command()
@click.option('--title', prompt='Calendar Title', help='Title of the calendar')
@click.option('--details', prompt='Details', help='Details of the calendar')
@click.option('--meetings', prompt='Meeting Ids (comma separated)', default='', help='List of Meeting Ids')
def create_calendar_cli(title, details, meetings):
    calendar_id = create_calendar(title, details, meetings)
    click.echo(f'Calendar created with ID: {calendar_id}')

# Read a Calendar
@cli.command()
@click.argument('calendar_id')
def read_calendar_cli(calendar_id):
    calendar = read_calendar(calendar_id)
    if calendar:
        click.echo(f'Calendar: {calendar}')
    else:
        click.echo('Calendar not found')

# Update a Calendar
@cli.command()
@click.argument('calendar_id')
@click.option('--title', help='New Title of the calendar')
@click.option('--details', help='New Details of the calendar')
@click.option('--meetings', help='New Meeting Ids (comma separated, no spaces)')
def update_calendar_cli(calendar_id, title, details, meetings):
    updated_calendar = update_calendar(calendar_id, title, details, meetings)
    if updated_calendar:
        click.echo(f'Calendar updated: {updated_calendar}')
    else:
        click.echo('Calendar not found or update failed')

# Delete a Calendar
@cli.command()
@click.argument('calendar_id')
def delete_calendar_cli(calendar_id):
    success = delete_calendar(calendar_id)
    if success:
        click.echo(f'Calendar {calendar_id} deleted.')
    else:
        click.echo('Calendar not found or delete failed')

# List All Calendars
@cli.command()
def list_calendars_cli():
    calendars = list_calendars()
    if calendars:
        click.echo(f'All Calendars: {calendars}')
    else:
        click.echo('No calendars found')

# END OF CALENDAR CLI COMMANDS


# START OF ATTACHMENT CLI COMMANDS

# Create an Attachment
@cli.command()
@click.option('--id', prompt='Attachment ID', help='Optional: ID of the attachment', default='')
@click.option('--meeting_id', prompt='Meeting ID', help='ID of meeting associated with attachment', type = int)
@click.option('--url', prompt='Attachment URL', help='URL of the attachment')
def create_attachment_cli(id, meeting_id, url):
    attachment_id = create_attachment(meeting_id, url, id)
    if attachment_id is not None:
        click.echo(f'Attachment created with ID: {attachment_id}')
    else:
        click.echo('Attachment creation failed')

# Read an Attachment
@cli.command()
@click.argument('attachment_id', type = int)
def read_attachment_cli(attachment_id):
    attachment = read_attachment(attachment_id)
    if attachment:
        click.echo(f'Attachment: {attachment}')
    else:
        click.echo('Attachment not found')

@cli.command()
def read_all_attachments_cli():
    attachments = read_attachment()
    if attachments:
        click.echo(f'{attachments}')
    else:
        click.echo('No attachments found')

# Update an Attachment
@cli.command()
@click.argument('attachment_id', type = int)
@click.option('--meeting_id', help='New Meeting ID', type = int)
@click.option('--url', help='New URL')
def update_attachment_cli(attachment_id, meeting_id, url):
    updated_attachment = update_attachment(attachment_id, meeting_id=meeting_id, attachment_url=url)
    if updated_attachment:
        click.echo(f'Attachment updated: {updated_attachment}')

# Delete an Attachment
@cli.command()
@click.argument('attachment_id', type = int)
def delete_attachment_cli(attachment_id):
    success = delete_attachment(attachment_id)
    if success:
        click.echo(f'Attachment {attachment_id} deleted.')
    else:
        click.echo('Attachment deletion failed')

# END OF ATTACHMENT CLI COMMANDS

# START OF MEETING CLI COMMANDS

# Create a meeting
@cli.command()
@click.option('--title', prompt='Meeting Title (<2k characters)', help='Title of the meeting')
@click.option('--date_and_time', prompt='Date and Time (YYYY-MM-DD HH:MM (A/P)M)', help='Date and time of the meeting')
@click.option('--location', prompt='Location (<2k  characters)', help='Location of the meeting')
@click.option('--details', prompt='Details (<10k  characters)', help='Details of the meeting')
@click.option('--calendars', prompt='Calendar IDs (comma separated, no spaces)', default='', help='List of Calendar IDs')
@click.option('--participants', prompt='Participant IDs (comma separated, no spaces)', default='', help='List of Participant IDs')
@click.option('--attachments', prompt='Attachment IDs (comma separated, no spaces)', default='', help='List of Attachment IDs')
def create_meeting_cli(title, date_and_time, location, details, calendars, participants, attachments):
    meeting_id = create_meeting(title, date_and_time, location, details, calendars, participants, attachments)
    click.echo(f'Meeting created with ID: {meeting_id}')

# Read a meeting
@cli.command()
@click.argument('meeting_id')
def read_meeting_cli(meeting_id):
    meeting = read_meeting(meeting_id)
    if meeting:
        click.echo(f'Meeting: {meeting}')
    else:
        click.echo('Meeting not found')

# Update a meeting
@cli.command()
@click.argument('meeting_id')
@click.option('--title', help='New Title of the meeting')
@click.option('--date_and_time', help='New Date and time of the meeting')
@click.option('--location', help='New Location of the meeting')
@click.option('--details', help='New Details of the meeting')
@click.option('--calendars',  help='New List of Calendar IDs (comma separated)')
@click.option('--participants', help='New List of Participant IDs (comma separated)')
@click.option('--attachments', help='New List of Attachment IDs (comma separated)')
def update_meeting_cli(meeting_id, title, date_and_time, location, details, calendars, participants, attachments):
    updated_meeting = update_meeting(meeting_id, title, date_and_time, location, details, calendars, participants, attachments)
    if updated_meeting:
        click.echo(f'Meeting updated: {updated_meeting}')
    else:
        click.echo('Meeting not found or update failed')

# Delete a Meeting
@cli.command()
@click.argument('meeting_id')
def delete_meeting_cli(meeting_id):
    success = delete_meeting(meeting_id)
    if success:
        click.echo(f'Meeting {meeting_id} deleted.')
    else:
        click.echo('Meeting not found or delete failed')

# List all meetings
@cli.command()
def list_meetings_cli():
    meetings = list_meetings()
    if meetings:
        click.echo(f'All Meetings: {meetings}')
    else:
        click.echo('No meetings found')

# END OF MEETING CLI COMMANDS

# Main entry point
if __name__ == '__main__':
    cli()




