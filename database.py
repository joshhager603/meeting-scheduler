from tinydb import TinyDB

# Initialize TinyDB database
db = TinyDB('db.json')

# Tables for different entities
meetings_table = db.table('meetings')
calendars_table = db.table('calendars')
participants_table = db.table('participants')
attachments_table = db.table('attachments')
