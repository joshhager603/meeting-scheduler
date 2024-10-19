from django.db import models
import uuid

class Attachments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.URLField()

    def __str__(self):
        return self.url