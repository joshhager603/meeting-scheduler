from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttachmentsViewSet

router = DefaultRouter()
router.register(r'attachments', AttachmentsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
