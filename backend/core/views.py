from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from django.db.models import Q
from .models import (
    Ward, Profile, Category, Grievance, IssueMessage, WardAchievement,
    LocalProduct, Opportunity, VolunteerTeam, MedicalEquipment,
    LocalService, EmergencyBroadcast, BloodDonor,
    SeniorCareRequest, BookExchange
)
from .serializers import (
    WardSerializer, ProfileSerializer, CategorySerializer, GrievanceSerializer,
    IssueMessageSerializer, WardAchievementSerializer, LocalProductSerializer,
    OpportunitySerializer, VolunteerTeamSerializer, MedicalEquipmentSerializer,
    LocalServiceSerializer, EmergencyBroadcastSerializer, BloodDonorSerializer,
    SeniorCareRequestSerializer, BookExchangeSerializer
)

class WardViewSet(viewsets.ModelViewSet):
    queryset = Ward.objects.all()
    serializer_class = WardSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = Category.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(Q(ward_id=ward_id) | Q(ward__isnull=True))
        return queryset

class GrievanceViewSet(viewsets.ModelViewSet):
    queryset = Grievance.objects.all()
    serializer_class = GrievanceSerializer

    def get_queryset(self):
        queryset = Grievance.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)

        # Check if user filter requested for secret hunger / my submissions
        include_secret = self.request.query_params.get('include_secret', 'false').lower() == 'true'
        user_id = self.request.query_params.get('user_id')

        if user_id:
            queryset = queryset.filter(user_id=user_id)
        elif not include_secret:
            # Hide secret hunger distress reports from public board
            queryset = queryset.filter(is_secret_hunger_report=False)

        status_param = self.request.query_params.get('status')
        if status_param and status_param != 'All':
            queryset = queryset.filter(status=status_param)

        category_param = self.request.query_params.get('category')
        if category_param and category_param != 'All':
            queryset = queryset.filter(category__iexact=category_param)

        department_param = self.request.query_params.get('department')
        if department_param and department_param != 'All':
            queryset = queryset.filter(assigned_department__icontains=department_param)

        return queryset

class IssueMessageViewSet(viewsets.ModelViewSet):
    queryset = IssueMessage.objects.all()
    serializer_class = IssueMessageSerializer

    def get_queryset(self):
        queryset = IssueMessage.objects.all()
        grievance_id = self.request.query_params.get('grievance_id')
        if grievance_id:
            queryset = queryset.filter(grievance_id=grievance_id)
        return queryset

class WardAchievementViewSet(viewsets.ModelViewSet):
    queryset = WardAchievement.objects.all()
    serializer_class = WardAchievementSerializer

    def get_queryset(self):
        queryset = WardAchievement.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        return queryset

class LocalProductViewSet(viewsets.ModelViewSet):
    queryset = LocalProduct.objects.all()
    serializer_class = LocalProductSerializer

    def get_queryset(self):
        queryset = LocalProduct.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        return queryset

class OpportunityViewSet(viewsets.ModelViewSet):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

    def get_queryset(self):
        queryset = Opportunity.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        type_param = self.request.query_params.get('type')
        if type_param:
            queryset = queryset.filter(type=type_param)
        return queryset

class VolunteerTeamViewSet(viewsets.ModelViewSet):
    queryset = VolunteerTeam.objects.all()
    serializer_class = VolunteerTeamSerializer

    def get_queryset(self):
        queryset = VolunteerTeam.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        return queryset

class MedicalEquipmentViewSet(viewsets.ModelViewSet):
    queryset = MedicalEquipment.objects.all()
    serializer_class = MedicalEquipmentSerializer

    def get_queryset(self):
        queryset = MedicalEquipment.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        return queryset

class LocalServiceViewSet(viewsets.ModelViewSet):
    queryset = LocalService.objects.all()
    serializer_class = LocalServiceSerializer

    def get_queryset(self):
        queryset = LocalService.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        profession = self.request.query_params.get('profession')
        if profession:
            queryset = queryset.filter(profession__icontains=profession)
        return queryset

class EmergencyBroadcastViewSet(viewsets.ModelViewSet):
    queryset = EmergencyBroadcast.objects.all()
    serializer_class = EmergencyBroadcastSerializer

    def get_queryset(self):
        queryset = EmergencyBroadcast.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        return queryset

class BloodDonorViewSet(viewsets.ModelViewSet):
    queryset = BloodDonor.objects.all()
    serializer_class = BloodDonorSerializer

    def get_queryset(self):
        queryset = BloodDonor.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        blood_group = self.request.query_params.get('blood_group')
        if blood_group:
            queryset = queryset.filter(blood_group__iexact=blood_group)
        return queryset

class SeniorCareRequestViewSet(viewsets.ModelViewSet):
    queryset = SeniorCareRequest.objects.all()
    serializer_class = SeniorCareRequestSerializer

    def get_queryset(self):
        queryset = SeniorCareRequest.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        return queryset

class BookExchangeViewSet(viewsets.ModelViewSet):
    queryset = BookExchange.objects.all()
    serializer_class = BookExchangeSerializer

    def get_queryset(self):
        queryset = BookExchange.objects.all()
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            queryset = queryset.filter(ward_id=ward_id)
        return queryset

@api_view(['POST'])
def register_resident(request):
    phone = request.data.get('phone')
    full_name = request.data.get('full_name')
    ward_id = request.data.get('ward_id')
    password = request.data.get('password', '')
    role = request.data.get('role', 'public')

    if not phone or not full_name:
        return Response({'error': 'Phone number and full name are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if Profile.objects.filter(phone=phone).exists():
        return Response({'error': 'A resident with this phone number is already registered. Please sign in.'}, status=status.HTTP_400_BAD_REQUEST)

    ward = None
    if ward_id:
        ward = Ward.objects.filter(id=ward_id).first()

    hashed_pw = make_password(password) if password else ''

    profile = Profile.objects.create(
        phone=phone,
        full_name=full_name,
        ward=ward,
        password=hashed_pw,
        role=role
    )

    serializer = ProfileSerializer(profile)
    return Response({
        'message': 'Registration successful',
        'profile': serializer.data
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_resident(request):
    phone = request.data.get('phone')
    password = request.data.get('password', '')

    if not phone:
        return Response({'error': 'Phone number is required.'}, status=status.HTTP_400_BAD_REQUEST)

    profile = Profile.objects.filter(phone=phone).first()
    if not profile:
        return Response({'error': 'No account found with this phone number.'}, status=status.HTTP_404_NOT_FOUND)

    if profile.password:
        if not check_password(password, profile.password) and profile.password != password:
            return Response({'error': 'Invalid password. Please check and try again.'}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = ProfileSerializer(profile)
    return Response({
        'message': 'Login successful',
        'profile': serializer.data
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def ward_stats(request):
    ward_id = request.query_params.get('ward_id')
    if not ward_id:
        return Response({'error': 'ward_id parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)

    grievances_count = Grievance.objects.filter(ward_id=ward_id, is_secret_hunger_report=False).count()
    resolved_count = Grievance.objects.filter(ward_id=ward_id, status='resolved', is_secret_hunger_report=False).count()
    equipment_count = MedicalEquipment.objects.filter(ward_id=ward_id).count()
    services_count = LocalService.objects.filter(ward_id=ward_id).count()
    donors_count = BloodDonor.objects.filter(ward_id=ward_id, is_available=True).count()
    broadcasts_count = EmergencyBroadcast.objects.filter(ward_id=ward_id).count()

    return Response({
        'ward_id': ward_id,
        'total_grievances': grievances_count,
        'resolved_grievances': resolved_count,
        'medical_equipment_types': equipment_count,
        'verified_services': services_count,
        'active_blood_donors': donors_count,
        'active_broadcasts': broadcasts_count
    })
