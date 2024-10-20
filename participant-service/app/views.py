from rest_framework import viewsets
from .models import Participants
from .serializers import ParticipantsSerializer

class ParticipantsViewSet(viewsets.ModelViewSet):
    queryset = Participants.objects.all()
    serializer_class = ParticipantsSerializer