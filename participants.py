from tinydb import TinyDB, Query
from common import generate_uuid, truncate_string
import re

db = TinyDB('db.json')
participants_table = db.table('participants')
query = Query()

#check if email is in the correct format
def is_email_valid(participant_email):
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if re.match(email_regex, participant_email):
        return True
    else:
        return False

#Create a participant with its participant id, meeting id, name and email
def create_participant(participant_id, meeting_id, participant_name, participant_email):
    if participants_table.search(query.participant_id == participant_id):
        print("Participant with id already exists")
        return False
    if(not meeting_id or not participant_name or not participant_email):
        return False
    if not participant_id:
        participant_id = generate_uuid()
    if is_email_valid(participant_email) == False:
        return False
    participants_table.insert({
        'participant_id' : participant_id,
        'meeting_id' : meeting_id,
        'participant_name' : truncate_string(participant_name, 600),
        'participant_email' : participant_email
    })
    return participant_id

#Read a participant by its ID
def read_participant(participant_id=None):
    return participants_table.search(query.participant_id == participant_id) if participant_id else participants_table.all()

#Update a participants info
def update_participant(participant_id, **kwargs):
    if participants_table.search(query.participant_id == participant_id):
        participants_table.update(kwargs, query.participant_id == participant_id)
        return True
    print('Participant not found.')
    return False    

#Delete a participant by its participant id
def delete_participant(participant_id):
    if participants_table.remove(query.participant_id == participant_id):
        return True
    print('Participant not found.')
    return False
