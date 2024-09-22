from tinydb import TinyDB, Query

db = TinyDB('db.json')
attachments_table = db.table('attachments')
query = Query()

def get_next_auto_id() -> int:
    """Retrieve the next available attachment ID."""
    existing_ids = [doc['attachment_id'] for doc in attachments_table.all()]
    return max(existing_ids, default=-1) + 1

def create_attachment(meeting_id: int, attachment_url: str, attachment_id = None):
    if attachments_table.search(query.attachment_id == attachment_id):
        print('Attachment with id already exists')
        return False
    if(not meeting_id or not attachment_url):
        return False
    if not attachment_id:
        attachment_id = get_next_auto_id()
    attachments_table.insert({'attachment_id': attachment_id, 'meeting_id': meeting_id, 'attachment_url': attachment_url})

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

