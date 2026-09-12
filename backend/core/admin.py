from django.contrib import admin
from .models import (
    Ward, Profile, Category, Grievance, MedicalEquipment,
    LocalService, EmergencyBroadcast, BloodDonor,
    SeniorCareRequest, BookExchange
)

@admin.register(Ward)
class WardAdmin(admin.ModelAdmin):
    list_display = ('ward_number', 'ward_name', 'local_body', 'district', 'created_at')
    search_fields = ('ward_name', 'local_body', 'district')
    list_filter = ('district', 'local_body')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'role', 'ward', 'created_at')
    search_fields = ('full_name', 'phone')
    list_filter = ('role', 'ward')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'department_assigned', 'ward', 'created_at')
    search_fields = ('name', 'department_assigned')

@admin.register(Grievance)
class GrievanceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'assigned_department', 'is_anonymous', 'ward', 'status', 'created_at')
    list_filter = ('status', 'category', 'assigned_department', 'is_anonymous', 'ward')
    search_fields = ('title', 'description', 'assigned_department')
    list_editable = ('status', 'assigned_department')

@admin.register(MedicalEquipment)
class MedicalEquipmentAdmin(admin.ModelAdmin):
    list_display = ('item_name', 'ward', 'available_qty', 'total_qty', 'incharge_contact')
    list_filter = ('ward',)
    search_fields = ('item_name',)

@admin.register(LocalService)
class LocalServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'profession', 'phone', 'ward', 'is_verified')
    list_filter = ('profession', 'is_verified', 'ward')
    search_fields = ('name', 'profession', 'phone')
    list_editable = ('is_verified',)

@admin.register(EmergencyBroadcast)
class EmergencyBroadcastAdmin(admin.ModelAdmin):
    list_display = ('title', 'severity', 'ward', 'created_at')
    list_filter = ('severity', 'ward')
    search_fields = ('title', 'content')

@admin.register(BloodDonor)
class BloodDonorAdmin(admin.ModelAdmin):
    list_display = ('name', 'blood_group', 'phone', 'ward', 'is_available')
    list_filter = ('blood_group', 'is_available', 'ward')
    search_fields = ('name', 'phone')
    list_editable = ('is_available',)

@admin.register(SeniorCareRequest)
class SeniorCareRequestAdmin(admin.ModelAdmin):
    list_display = ('beneficiary_name', 'service_type', 'ward', 'contact', 'status', 'created_at')
    list_filter = ('service_type', 'status', 'ward')
    search_fields = ('beneficiary_name', 'contact')
    list_editable = ('status',)

@admin.register(BookExchange)
class BookExchangeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'contact_name', 'phone', 'ward', 'is_available')
    list_filter = ('category', 'is_available', 'ward')
    search_fields = ('title', 'contact_name')
    list_editable = ('is_available',)
