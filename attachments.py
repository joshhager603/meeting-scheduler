from tinydb import TinyDB, Query
from common import generate_uuid, truncate_string

db = TinyDB('db.json')
attachments_table = db.table('attachments')
query = Query()

def create_attachment(meeting_id: int, attachment_url: str, attachment_id = None):
    if not attachment_id:
        attachment_id = generate_uuid()
    if attachments_table.search(query.attachment_id == attachment_id):
        print('Attachment with id already exists')
        return False
    if(not meeting_id or not attachment_url):
        return False
    attachments_table.insert({'attachment_id': attachment_id, 'meeting_id': meeting_id, 'attachment_url': attachment_url})
    return attachment_id

def read_attachment(attachment_id=None):
    return attachments_table.search(query.attachment_id == attachment_id) if attachment_id else attachments_table.all()

def update_attachment(attachment_id: int, **kwargs):
    if attachments_table.search(query.attachment_id == attachment_id):
        attachments_table.update(kwargs, query.attachment_id == attachment_id)
        return True
    print('Attachment not found.')
    return False

def delete_attachment(attachment_id: int):
    if attachments_table.remove(query.attachment_id == attachment_id):
        return True
    print('Attachment not found.')
    return False

