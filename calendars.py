from tinydb import Query
from database import calendars_table
from common import generate_uuid, truncate_string
from meetings import delete_meeting

# Create a calendar with title, details, and a list of meetings (initially can be empty)
def create_calendar(title, details, meetings):
    calendar_id = generate_uuid()
    calendars_table.insert({
        'id': calendar_id,
        'title': truncate_string(title, 2000),
        'details': truncate_string(details, 10000),
        'meetings': meetings.split(',') if meetings else []
    })
    return calendar_id

# Read a specific calendar by its ID
def read_calendar(calendar_id):
    Calendar = Query()
    result = calendars_table.search(Calendar.id == calendar_id)
    return result[0] if result else None

# Update a calendar's title, details, or meetings
def update_calendar(calendar_id, title=None, details=None, meetings=None):
    Calendar = Query()
    calendar = read_calendar(calendar_id)
    
    if not calendar:
        return None  # Calendar not found
    
    update_data = {}
    
    # Only update the fields if they are provided
    if title:
        update_data['title'] = title
    if details:
        update_data['details'] = details
    if meetings:
        update_data['meetings'] = meetings.split(',')
    
    calendars_table.update(update_data, Calendar.id == calendar_id)
    return update_data

# Delete a specific calendar by its ID
def delete_calendar(calendar_id):
    Calendar = Query()
    calendar = read_calendar(calendar_id)
    
    if not calendar:
        return False  # Calendar not found

    #Delete meetings attached to this calendar
    #loops through the meeting id and deletes them
    for meeting_id in calendar['meetings']:
        delete_meeting(meeting_id)
    
    # Remove the calendar
    calendars_table.remove(Calendar.id == calendar_id)
    return True

# Retrieve all calendars (additional function to list all calendars)
def list_calendars():
    return calendars_table.all()
