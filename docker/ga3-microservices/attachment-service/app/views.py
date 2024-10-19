from rest_framework import viewsets
from .models import Attachments
from .serializers import AttachmentsSerializer

class AttachmentsViewSet(viewsets.ModelViewSet):
    queryset = Attachments.objects.all()
    serializer_class = AttachmentsSerializer