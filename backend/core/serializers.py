from rest_framework import serializers
from .models import (
    Ward, Profile, Category, Grievance, IssueMessage, WardAchievement,
    LocalProduct, Opportunity, VolunteerTeam, MedicalEquipment,
    LocalService, EmergencyBroadcast, BloodDonor,
    SeniorCareRequest, BookExchange
)

class WardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ward
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    ward_details = WardSerializer(source='ward', read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'ward', 'ward_details', 'full_name', 'phone', 'role', 'created_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class IssueMessageSerializer(serializers.ModelSerializer):
    sender_details = ProfileSerializer(source='sender', read_only=True)

    class Meta:
        model = IssueMessage
        fields = '__all__'

class GrievanceSerializer(serializers.ModelSerializer):
    ward_details = WardSerializer(source='ward', read_only=True)
    user_details = ProfileSerializer(source='user', read_only=True)
    messages = IssueMessageSerializer(many=True, read_only=True)

    class Meta:
        model = Grievance
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.is_anonymous or instance.is_secret_hunger_report:
            ret['user_details'] = {
                'full_name': 'Confidential Resident',
                'phone': 'Confidential',
                'role': 'public'
            }
        return ret

class WardAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = WardAchievement
        fields = '__all__'

class LocalProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalProduct
        fields = '__all__'

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = '__all__'

class VolunteerTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerTeam
        fields = '__all__'

class MedicalEquipmentSerializer(serializers.ModelSerializer):
    ward_details = WardSerializer(source='ward', read_only=True)

    class Meta:
        model = MedicalEquipment
        fields = '__all__'

class LocalServiceSerializer(serializers.ModelSerializer):
    ward_details = WardSerializer(source='ward', read_only=True)

    class Meta:
        model = LocalService
        fields = '__all__'

class EmergencyBroadcastSerializer(serializers.ModelSerializer):
    ward_details = WardSerializer(source='ward', read_only=True)

    class Meta:
        model = EmergencyBroadcast
        fields = '__all__'

class BloodDonorSerializer(serializers.ModelSerializer):
    ward_details = WardSerializer(source='ward', read_only=True)

    class Meta:
        model = BloodDonor
        fields = '__all__'

class SeniorCareRequestSerializer(serializers.ModelSerializer):
    ward_details = WardSerializer(source='ward', read_only=True)

    class Meta:
        model = SeniorCareRequest
        fields = '__all__'

class BookExchangeSerializer(serializers.ModelSerializer):
    ward_details = WardSerializer(source='ward', read_only=True)

    class Meta:
        model = BookExchange
        fields = '__all__'
