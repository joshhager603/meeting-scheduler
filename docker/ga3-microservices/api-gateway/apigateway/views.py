from rest_framework.views import APIView
from rest_framework.response import Response
import requests

# Constants for microservice URLs
CALENDAR_SERVICE_URL = 'http://calendar-service:8001/api/calendar/'
MEETING_SERVICE_URL = 'http://meeting-service:8002/api/meetings/'
PARTICIPANT_SERVICE_URL = 'http://participant-service:8003/api/participants/'
ATTACHMENT_SERVICE_URL = 'http://attachment-service:8004/api/attachments/'

class CalendarServiceView(APIView):
    def get(self, request):
        response = requests.get(CALENDAR_SERVICE_URL)
        return Response(response.json())

class MeetingServiceView(APIView):
    def get(self, request):
        response = requests.get(MEETING_SERVICE_URL)
        return Response(response.json())

class ParticipantServiceView(APIView):
    def get(self, request):
        response = requests.get(PARTICIPANT_SERVICE_URL)
        return Response(response.json())

class AttachmentServiceView(APIView):
    def get(self, request):
        response = requests.get(ATTACHMENT_SERVICE_URL)
        return Response(response.json())