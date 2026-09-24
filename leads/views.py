from rest_framework import viewsets
from .models import Counsellor, Lead, FollowUp
from .serializers import (
    CounsellorSerializer,
    LeadSerializer,
    FollowUpSerializer
)


class CounsellorViewSet(viewsets.ModelViewSet):
    queryset = Counsellor.objects.all()
    serializer_class = CounsellorSerializer


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all().order_by('-created_at')
    serializer_class = LeadSerializer


class FollowUpViewSet(viewsets.ModelViewSet):
    queryset = FollowUp.objects.all().order_by('-scheduled_date')
    serializer_class = FollowUpSerializer