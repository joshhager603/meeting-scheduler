from tinydb import Query
from database import meetings_table
from common import generate_uuid, truncate_string
import re
from attachments import delete_attachment
from participants import delete_participant

def validate_date_time(date_and_time):
    if re.fullmatch('[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9] (A|P)M', date_and_time) is None:
        raise Exception('Could not add meeting to database. Please ensure date and time are in format YYYY-MM-DD HH:MM AM/PM')
    else:
        return date_and_time
    
def create_meeting(title, date_and_time, location, details, calendar_ids, participant_ids, attachment_ids):
    meeting_id = generate_uuid()

    meetings_table.insert({
        'id': meeting_id,
        'title': truncate_string(title, 2000),
        'date_and_time': validate_date_time(date_and_time),
        'location': truncate_string(location, 2000),
        'details': truncate_string(details, 10000),
        'calendars': calendar_ids.split(',') if calendar_ids else [],
        'participants': participant_ids.split(',') if participant_ids else [],
        'attachments': attachment_ids.split(',') if attachment_ids else []
    })

    return meeting_id

def read_meeting(meeting_id):
    Meeting = Query()
    result = meetings_table.search(Meeting.id == meeting_id)
    return result[0] if result else None

def update_meeting(meeting_id,
                   title=None, 
                   date_and_time=None, 
                   location=None, 
                   details=None, 
                   calendar_ids=None, 
                   participant_ids=None, 
                   attachment_ids=None):

    Meeting = Query()
    meeting = read_meeting(meeting_id)
    
    if not meeting:
        print('Meeting not found.')
        return None
    
    update_data = {}
    
    # Only update the fields if they are provided
    if title:
        update_data['title'] = truncate_string(title, 2000)
    if date_and_time:
        update_data['date_and_time'] = validate_date_time(date_and_time)
    if location:
        update_data['location'] = truncate_string(location, 2000)
    if details:
        update_data['details'] = truncate_string(location, 10000)
    if calendar_ids:
        update_data['calendars'] = calendar_ids.split(',') if calendar_ids else []
    if participant_ids:
        update_data['participants'] = participant_ids.split(',') if participant_ids else []
    if attachment_ids:
        update_data['attachments'] = attachment_ids.split(',') if attachment_ids else []
    
    meetings_table.update(update_data, Meeting.id == meeting_id)
    return update_data

def delete_meeting(meeting_id):

    Meeting = Query()
    meeting = read_meeting(meeting_id)
    
    if not meeting:
        print('Meeting not found.')
        return False  # meeting not found
    
    # delete all attachments for this meeting
    for attachment_id in meeting['attachments']:
        delete_attachment(attachment_id)

    # delete all participants for this meeting
    for participant_id in meeting['participants']:
        delete_participant(participant_id)
    
    # remove the meeting
    meetings_table.remove(Meeting.id == meeting_id)
    return True

def list_meetings():
    return meetings_table.all()
