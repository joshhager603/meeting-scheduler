from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ParticipantsViewSet

router = DefaultRouter()
router.register(r'participants', ParticipantsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
