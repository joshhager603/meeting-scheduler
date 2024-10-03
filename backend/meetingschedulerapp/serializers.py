from rest_framework import serializers
from .models import Meetings, Calendars, Participants, Attachments

class ParticipantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participants
        fields = '__all__'

class MeetingsSerializer(serializers.ModelSerializer):
    participants = ParticipantsSerializer(many=True, read_only=True)
    class Meta:
        model = Meetings
        fields = '__all__'

class CalendarsSerializer(serializers.ModelSerializer):
    meetings = MeetingsSerializer(many=True, read_only=True)

    class Meta:
        model = Calendars
        fields = '__all__'



class AttachmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachments
        fields = '__all__'