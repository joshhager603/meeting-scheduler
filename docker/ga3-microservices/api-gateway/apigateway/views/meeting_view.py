# meeting_view.py
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .microservice_urls import MICROSERVICE_URLS
from .participant_view import ParticipantServiceView
from .attachment_view import AttachmentServiceView
import logging

logger = logging.getLogger(__name__)

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
        # Delete the meeting and cascade delete its participants and attachments

        # Fetch participants associated with the meeting
        participants_response = requests.get(MICROSERVICE_URLS['participant'])
        all_participants = participants_response.json()
        meeting_participants = [participant for participant in all_participants if str(participant['meeting_id']) == str(pk)]

        # Delete participants using the ParticipantServiceView
        participant_service_view = ParticipantServiceView()
        for participant in meeting_participants:
            logger.debug(f"Deleting participant {participant['id']} for meeting {pk}")
            participant_service_view.delete(request, participant['id'])

        # Fetch attachments associated with the meeting
        attachments_response = requests.get(MICROSERVICE_URLS['attachment'])
        all_attachments = attachments_response.json()
        meeting_attachments = [attachment for attachment in all_attachments if str(attachment['meeting_id']) == str(pk)]

        # Delete attachments using the AttachmentServiceView
        attachment_service_view = AttachmentServiceView()
        for attachment in meeting_attachments:
            logger.debug(f"Deleting attachment {attachment['id']} for meeting {pk}")
            attachment_service_view.delete(request, attachment['id'])

        # Delete the meeting itself
        response = requests.delete(f"{MICROSERVICE_URLS['meeting']}{pk}/")
        return Response(status=response.status_code)
