from django.db import models
import uuid

class Participants(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    meeting_id = models.UUIDField()  # UUID of the related meeting
    name = models.CharField(max_length=600)
    email = models.EmailField()

    def __str__(self):
        return self.name
