import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wardconnect_backend.settings')
django.setup()

from core.models import Profile, Ward
from django.contrib.auth.hashers import make_password

ward = Ward.objects.first()

demo_accounts = [
    {
        'phone': '9000000001',
        'full_name': 'State Super Admin',
        'role': 'super_admin',
        'password': make_password('admin123'),
        'ward': ward,
    },
    {
        'phone': '9000000002',
        'full_name': 'Panchayath Ward Admin',
        'role': 'ward_admin',
        'password': make_password('admin123'),
        'ward': ward,
    },
    {
        'phone': '9000000003',
        'full_name': 'South Trippanachi Ward Member',
        'role': 'ward_member',
        'password': make_password('member123'),
        'ward': ward,
    },
    {
        'phone': '9000000004',
        'full_name': 'Whiteguard Relief Volunteer',
        'role': 'volunteer',
        'password': make_password('volunteer123'),
        'ward': ward,
    },
    {
        'phone': '9207802002',
        'full_name': 'Marvan (Resident)',
        'role': 'public',
        'password': make_password('user123'),
        'ward': ward,
    },
]

for acc in demo_accounts:
    profile, created = Profile.objects.update_or_create(
        phone=acc['phone'],
        defaults=acc
    )
    status = 'Created' if created else 'Updated'
    print(f"{status} profile: {profile.full_name} ({profile.role}) - Phone: {profile.phone}")

print("Demo accounts seeding complete.")
