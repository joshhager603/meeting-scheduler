from django.contrib import admin
from django.urls import path
from apigateway.views import CalendarServiceView, MeetingServiceView, ParticipantServiceView, AttachmentServiceView

urlpatterns = [
    path('api/calendars/', CalendarServiceView.as_view(), name='calendars-list'),
    path('api/calendars/<uuid:pk>/', CalendarServiceView.as_view(), name='calendars-list'),
    path('api/meetings/', MeetingServiceView.as_view(), name='meetings-list'),
    path('api/meetings/<uuid:pk>/', MeetingServiceView.as_view(), name='meeting-detail'),
    path('api/participants/', ParticipantServiceView.as_view(), name='participants-list'),
    path('api/participants/<uuid:pk>/', ParticipantServiceView.as_view(), name='participant-detail'),
    path('api/attachments/', AttachmentServiceView.as_view(), name='attachments-list'),
    path('api/attachments/<uuid:pk>/', AttachmentServiceView.as_view(), name='attachment-detail'),
]
