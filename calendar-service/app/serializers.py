from rest_framework import serializers
from .models import Calendars

class CalendarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendars
        fields = '__all__'