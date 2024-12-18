from django.db import models
import uuid

class Meetings(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    calendar_id = models.UUIDField()  # UUID of the related calendar
    title = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=2000)
    details = models.CharField(max_length=10000)

    def __str__(self):
        return self.title
