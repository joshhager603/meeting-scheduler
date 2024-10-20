from django.shortcuts import render
from rest_framework import viewsets
from .models import Calendars
from .serializers import CalendarsSerializer

class CalendarsViewSet(viewsets.ModelViewSet):
    queryset = Calendars.objects.all()
    serializer_class = CalendarsSerializer