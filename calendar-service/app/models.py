from django.db import models
import uuid

class Calendars(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=2000)
    details = models.CharField(max_length=10000)

    def __str__(self):
        return self.title
