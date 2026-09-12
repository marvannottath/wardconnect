from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    WardViewSet, CategoryViewSet, GrievanceViewSet, IssueMessageViewSet,
    WardAchievementViewSet, LocalProductViewSet, OpportunityViewSet, VolunteerTeamViewSet,
    MedicalEquipmentViewSet, LocalServiceViewSet, EmergencyBroadcastViewSet, BloodDonorViewSet,
    SeniorCareRequestViewSet, BookExchangeViewSet,
    register_resident, login_resident, ward_stats
)

router = DefaultRouter()
router.register(r'wards', WardViewSet, basename='ward')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'grievances', GrievanceViewSet, basename='grievance')
router.register(r'messages', IssueMessageViewSet, basename='message')
router.register(r'achievements', WardAchievementViewSet, basename='achievement')
router.register(r'products', LocalProductViewSet, basename='product')
router.register(r'opportunities', OpportunityViewSet, basename='opportunity')
router.register(r'volunteer-teams', VolunteerTeamViewSet, basename='volunteerteam')
router.register(r'equipment', MedicalEquipmentViewSet, basename='equipment')
router.register(r'services', LocalServiceViewSet, basename='service')
router.register(r'broadcasts', EmergencyBroadcastViewSet, basename='broadcast')
router.register(r'blood-donors', BloodDonorViewSet, basename='blooddonor')
router.register(r'senior-care', SeniorCareRequestViewSet, basename='seniorcare')
router.register(r'books', BookExchangeViewSet, basename='bookexchange')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register_resident, name='register_resident'),
    path('auth/login/', login_resident, name='login_resident'),
    path('stats/', ward_stats, name='ward_stats'),
]
