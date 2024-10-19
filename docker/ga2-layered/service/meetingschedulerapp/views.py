from rest_framework import viewsets
from .models import Meetings, Calendars, Participants, Attachments
from .serializers import MeetingsSerializer, CalendarsSerializer, ParticipantsSerializer, AttachmentsSerializer

class MeetingsViewSet(viewsets.ModelViewSet):
    queryset = Meetings.objects.all()
    serializer_class = MeetingsSerializer

class CalendarsViewSet(viewsets.ModelViewSet):
    queryset = Calendars.objects.all()
    serializer_class = CalendarsSerializer

class ParticipantsViewSet(viewsets.ModelViewSet):
    queryset = Participants.objects.all()
    serializer_class = ParticipantsSerializer

class AttachmentsViewSet(viewsets.ModelViewSet):
    queryset = Attachments.objects.all()
    serializer_class = AttachmentsSerializer
