from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MeetingsViewSet, CalendarsViewSet, ParticipantsViewSet, AttachmentsViewSet

router = DefaultRouter()
router.register(r'meetings', MeetingsViewSet)
router.register(r'calendars', CalendarsViewSet)
router.register(r'participants', ParticipantsViewSet)
router.register(r'attachments', AttachmentsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
