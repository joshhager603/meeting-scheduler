# calendar_view.py
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .microservice_urls import MICROSERVICE_URLS
from .meeting_view import MeetingServiceView
from .participant_view import ParticipantServiceView
from .attachment_view import AttachmentServiceView
import logging

logger = logging.getLogger(__name__)

# View for Calendars
class CalendarServiceView(APIView):
    def get(self, request, pk=None):
        if pk:
            # Fetch a specific calendar by ID (pk)
            calendar_response = requests.get(f"{MICROSERVICE_URLS['calendar']}{pk}/")
            if calendar_response.status_code != 200:
                return Response({"error": "Calendar not found"}, status=404)

            calendar = calendar_response.json()

            # Fetch related meetings, participants, and attachments
            meetings_response = requests.get(MICROSERVICE_URLS['meeting'])
            all_meetings = meetings_response.json()
            calendar_meetings = [meeting for meeting in all_meetings if str(meeting['calendar_id']) == str(pk)]

            participants_response = requests.get(MICROSERVICE_URLS['participant'])
            all_participants = participants_response.json()

            attachments_response = requests.get(MICROSERVICE_URLS['attachment'])
            all_attachments = attachments_response.json()

            for meeting in calendar_meetings:
                meeting_id = meeting['id']
                meeting_participants = [participant for participant in all_participants if participant['meeting_id'] == meeting_id]
                meeting_attachments = [attachment for attachment in all_attachments if attachment['meeting_id'] == meeting_id]
                meeting['participants'] = meeting_participants
                meeting['attachments'] = meeting_attachments

            calendar['meetings'] = calendar_meetings
            return Response(calendar)
        else:
            # Fetch all calendars
            calendars_response = requests.get(MICROSERVICE_URLS['calendar'])
            calendars = calendars_response.json()

            # Fetch all meetings
            meetings_response = requests.get(MICROSERVICE_URLS['meeting'])
            all_meetings = meetings_response.json()

            # Fetch all participants
            participants_response = requests.get(MICROSERVICE_URLS['participant'])
            all_participants = participants_response.json()

            # Fetch all attachments
            attachments_response = requests.get(MICROSERVICE_URLS['attachment'])
            all_attachments = attachments_response.json()

            # For each calendar, filter meetings, participants, and attachments
            for calendar in calendars:
                calendar_id = calendar['id']

                # Filter meetings related to this calendar
                calendar_meetings = [meeting for meeting in all_meetings if meeting['calendar_id'] == calendar_id]

                # For each meeting, filter its participants and attachments
                for meeting in calendar_meetings:
                    meeting_id = meeting['id']

                    # Filter participants related to this meeting
                    meeting_participants = [participant for participant in all_participants if participant['meeting_id'] == meeting_id]

                    # Filter attachments related to this meeting
                    meeting_attachments = [attachment for attachment in all_attachments if attachment['meeting_id'] == meeting_id]

                    # Add participants and attachments to the meeting
                    meeting['participants'] = meeting_participants
                    meeting['attachments'] = meeting_attachments

                # Add the filtered meetings to the calendar
                calendar['meetings'] = calendar_meetings

            # Return the aggregated data in the desired nested format
            return Response(calendars)

    def post(self, request):
        response = requests.post(MICROSERVICE_URLS['calendar'], json=request.data)
        return Response(response.json(), status=response.status_code)

    def put(self, request, pk):
        # Update a specific calendar by pk
        response = requests.put(f"{MICROSERVICE_URLS['calendar']}{pk}/", json=request.data)
        return Response(response.json(), status=response.status_code)

    def patch(self, request, pk):
        # Partial update of a specific calendar by pk
        response = requests.patch(f"{MICROSERVICE_URLS['calendar']}{pk}/", json=request.data)
        return Response(response.json(), status=response.status_code)

    def delete(self, request, pk):
        # Delete the calendar and cascade delete its meetings, participants, and attachments
        # Fetch the meetings associated with the calendar
        meetings_response = requests.get(MICROSERVICE_URLS['meeting'])
        all_meetings = meetings_response.json()
        calendar_meetings = [meeting for meeting in all_meetings if str(meeting['calendar_id']) == str(pk)]

        # Instantiate MeetingServiceView to handle meeting deletions
        meeting_service_view = MeetingServiceView()

        # Cascade delete for each meeting
        for meeting in calendar_meetings:
            logger.debug(f"Deleting meeting {meeting['id']} for calendar {pk}")
            # Call the MeetingServiceView delete method for each meeting
            meeting_service_view.delete(request, meeting['id'])

        # Finally, delete the calendar
        response = requests.delete(f"{MICROSERVICE_URLS['calendar']}{pk}/")
        return Response(status=response.status_code)
