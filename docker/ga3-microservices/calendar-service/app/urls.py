from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CalendarsViewSet

router = DefaultRouter()
router.register(r'calendars', CalendarsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
