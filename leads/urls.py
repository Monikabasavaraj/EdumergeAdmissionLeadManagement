from rest_framework.routers import DefaultRouter
from .views import (
    CounsellorViewSet,
    LeadViewSet,
    FollowUpViewSet
)

router = DefaultRouter()

router.register(
    'counsellors',
    CounsellorViewSet
)

router.register(
    'leads',
    LeadViewSet
)

router.register(
    'followups',
    FollowUpViewSet
)

urlpatterns = router.urls