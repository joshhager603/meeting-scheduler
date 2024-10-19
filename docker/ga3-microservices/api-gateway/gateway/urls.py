from django.contrib import admin
from django.urls import path
from apigateway.views import CalendarServiceView, MeetingServiceView, ParticipantServiceView, AttachmentServiceView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/calendar/', CalendarServiceView.as_view(), name='calendar-service'),
    path('api/meetings/', MeetingServiceView.as_view(), name='meeting-service'),
    path('api/participants/', ParticipantServiceView.as_view(), name='participant-service'),
    path('api/attachments/', AttachmentServiceView.as_view(), name='attachment-service'),
]
