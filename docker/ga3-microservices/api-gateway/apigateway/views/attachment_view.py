# attachment_view.py
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .microservice_urls import MICROSERVICE_URLS
import logging

logger = logging.getLogger(__name__)

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
