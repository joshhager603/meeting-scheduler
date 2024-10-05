from django.db import models
import uuid

class Calendars(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=2000)
    details = models.CharField(max_length=10000)

    def __str__(self):
        return self.title


class Meetings(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    calendar = models.ForeignKey(Calendars, on_delete=models.CASCADE, related_name='meetings')
    title = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=2000)
    details = models.CharField(max_length=10000)

    def __str__(self):
        return self.title


class Participants(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE, related_name='participants')
    name = models.CharField(max_length=600)
    email = models.EmailField()

    def __str__(self):
        return self.name


class Attachments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE, related_name='attachments')
    url = models.URLField()

    def __str__(self):
        return self.url
