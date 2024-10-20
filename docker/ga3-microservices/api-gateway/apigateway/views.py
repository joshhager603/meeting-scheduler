from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import logging

# Constants for microservice URLs
MICROSERVICE_URLS = {
    'calendar': 'http://calendar-service:8001/api/calendars/',
    'meeting': 'http://meeting-service:8002/api/meetings/',
    'participant': 'http://participant-service:8003/api/participants/',
    'attachment': 'http://attachment-service:8004/api/attachments/',
}

# Set up logging
logging.basicConfig(level=logging.DEBUG)
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
            calendar_meetings = [meeting for meeting in all_meetings if meeting['calendar_id'] == pk]

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
        # Delete a specific calendar by pk
        response = requests.delete(f"{MICROSERVICE_URLS['calendar']}{pk}/")
        return Response(status=response.status_code)


# View for Meetings
class MeetingServiceView(APIView):
    def get(self, request, pk=None):
        if pk:
            # Log the pk value for debugging
            logger.debug(f"Fetching meeting with pk: {pk}")

            # Fetch the specific meeting by ID (pk)
            meeting_response = requests.get(f"{MICROSERVICE_URLS['meeting']}{pk}/")
            if meeting_response.status_code != 200:
                logger.error(f"Meeting with pk: {pk} not found.")
                return Response({"error": "Meeting not found"}, status=404)

            meeting = meeting_response.json()

            participants_response = requests.get(MICROSERVICE_URLS['participant'])
            all_participants = participants_response.json()
            meeting_participants = [participant for participant in all_participants if str(participant['meeting_id']) == str(pk)]

            attachments_response = requests.get(MICROSERVICE_URLS['attachment'])
            all_attachments = attachments_response.json()
            meeting_attachments = [attachment for attachment in all_attachments if str(attachment['meeting_id']) == str(pk)]

            meeting['participants'] = meeting_participants
            meeting['attachments'] = meeting_attachments

            # Log the successful response for debugging
            logger.debug(f"Meeting data for pk {pk}: {all_attachments}")
            logger.debug(f"Meeting data for pk {pk}: {meeting_attachments}")

            return Response(meeting)
        else:
            # Fetch all meetings if pk is not provided
            logger.debug("Fetching all meetings.")
            response = requests.get(MICROSERVICE_URLS['meeting'])
            return Response(response.json())

    def post(self, request):
        response = requests.post(MICROSERVICE_URLS['meeting'], json=request.data)
        return Response(response.json(), status=response.status_code)

    def put(self, request, pk):
        response = requests.put(f"{MICROSERVICE_URLS['meeting']}{pk}/", json=request.data)
        return Response(response.json(), status=response.status_code)

    def patch(self, request, pk):
        response = requests.patch(f"{MICROSERVICE_URLS['meeting']}{pk}/", json=request.data)
        return Response(response.json(), status=response.status_code)

    def delete(self, request, pk):
        response = requests.delete(f"{MICROSERVICE_URLS['meeting']}{pk}/")
        return Response(status=response.status_code)

# View for Participants
class ParticipantServiceView(APIView):
    def get(self, request, pk=None):
        if pk:
            # Fetch a specific participant by pk
            participant_response = requests.get(f"{MICROSERVICE_URLS['participant']}{pk}/")
            if participant_response.status_code != 200:
                return Response({"error": "Participant not found"}, status=404)
            return Response(participant_response.json())
        else:
            # Fetch all participants if pk is not provided
            response = requests.get(MICROSERVICE_URLS['participant'])
            return Response(response.json())

    def post(self, request):
        response = requests.post(MICROSERVICE_URLS['participant'], json=request.data)
        return Response(response.json(), status=response.status_code)

    def put(self, request, pk):
        # Update a specific participant by pk
        response = requests.put(f"{MICROSERVICE_URLS['participant']}{pk}/", json=request.data)
        return Response(response.json(), status=response.status_code)

    def patch(self, request, pk):
        # Partial update of a specific participant by pk
        response = requests.patch(f"{MICROSERVICE_URLS['participant']}{pk}/", json=request.data)
        return Response(response.json(), status=response.status_code)

    def delete(self, request, pk):
        # Delete a specific participant by pk
        response = requests.delete(f"{MICROSERVICE_URLS['participant']}{pk}/")
        return Response(status=response.status_code)


# View for Attachments
class AttachmentServiceView(APIView):
    def get(self, request, pk=None):
        if pk:
            # Fetch a specific attachment by pk
            attachment_response = requests.get(f"{MICROSERVICE_URLS['attachment']}{pk}/")
            if attachment_response.status_code != 200:
                return Response({"error": "Attachment not found"}, status=404)
            return Response(attachment_response.json())
        else:
            # Fetch all attachments if pk is not provided
            response = requests.get(MICROSERVICE_URLS['attachment'])
            return Response(response.json())

    def post(self, request):
        response = requests.post(MICROSERVICE_URLS['attachment'], json=request.data)
        return Response(response.json(), status=response.status_code)

    def put(self, request, pk):
        # Update a specific attachment by pk
        response = requests.put(f"{MICROSERVICE_URLS['attachment']}{pk}/", json=request.data)
        return Response(response.json(), status=response.status_code)

    def patch(self, request, pk):
        # Partial update of a specific attachment by pk
        response = requests.patch(f"{MICROSERVICE_URLS['attachment']}{pk}/", json=request.data)
        return Response(response.json(), status=response.status_code)

    def delete(self, request, pk):
        # Delete a specific attachment by pk
        response = requests.delete(f"{MICROSERVICE_URLS['attachment']}{pk}/")
        return Response(status=response.status_code)
