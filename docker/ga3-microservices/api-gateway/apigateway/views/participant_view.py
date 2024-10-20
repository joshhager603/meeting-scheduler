# participant_view.py
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .microservice_urls import MICROSERVICE_URLS
import logging

logger = logging.getLogger(__name__)

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
