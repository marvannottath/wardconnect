import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wardconnect_backend.settings')
django.setup()

from django.contrib.auth.models import User
from core.models import (
    Ward, Profile, Category, Grievance, WardAchievement, LocalProduct,
    Opportunity, VolunteerTeam, MedicalEquipment, LocalService,
    EmergencyBroadcast, BloodDonor, SeniorCareRequest, BookExchange
)

def run():
    print("Resetting database to ONLY Ward 22 South Trippanachi (Pulpatta Grama Panchayath)...")

    # Clear all existing tables for clean single ward app
    Grievance.objects.all().delete()
    Profile.objects.all().delete()
    WardAchievement.objects.all().delete()
    LocalProduct.objects.all().delete()
    Opportunity.objects.all().delete()
    VolunteerTeam.objects.all().delete()
    MedicalEquipment.objects.all().delete()
    LocalService.objects.all().delete()
    EmergencyBroadcast.objects.all().delete()
    BloodDonor.objects.all().delete()
    SeniorCareRequest.objects.all().delete()
    BookExchange.objects.all().delete()
    Category.objects.all().delete()
    Ward.objects.all().delete()
    User.objects.all().delete()

    # Create Superuser
    User.objects.create_superuser('admin', 'admin@wardconnect.org', 'admin123')
    print("Superuser created: username=admin, password=admin123")

    # ONLY ONE WARD: Ward 22 South Trippanachi, Pulpatta Grama Panchayath, Malappuram
    w1 = Ward.objects.create(
        district='Malappuram',
        local_body='Pulpatta Grama Panchayath',
        ward_number=22,
        ward_name='South Trippanachi'
    )

    print(f"Created SINGLE WARD: {w1}")

    # Profiles
    p_member = Profile.objects.create(
        phone='9847000000',
        full_name='Ward Member (Trippanachi)',
        ward=w1,
        role='ward_member',
        pin='2222',
        password='member'
    )
    p_admin = Profile.objects.create(
        phone='9847012345',
        full_name='Pulpatta Ward Admin',
        ward=w1,
        role='ward_admin',
        pin='1234',
        password='admin'
    )
    p_user = Profile.objects.create(
        phone='9447123456',
        full_name='Muhammed Shafi',
        ward=w1,
        role='public',
        password='user123'
    )

    # Categories
    Category.objects.create(name='Streetlight', department_assigned='KSEB Electrical', icon_name='Zap')
    Category.objects.create(name='Water Pipeline', department_assigned='KWA Water Department', icon_name='Droplets')
    Category.objects.create(name='Waste Dump / Garbage', department_assigned='Health & Haritha Karma', icon_name='Trash2')
    Category.objects.create(name='Road / Drainage', department_assigned='PWD Road Department', icon_name='AlertTriangle')
    Category.objects.create(name='Lahari / Anti-Drug Tip-off', department_assigned='Excise / Anti-Narcotics', icon_name='ShieldAlert')

    # Volunteer Teams (Whiteguard, KMCC, Red Cross)
    VolunteerTeam.objects.create(
        ward=w1, team_name='Whiteguard Trippanachi Team',
        incharge_name='Rashid V.P.', phone='9847111222', services_offered='24/7 Emergency Ambulance, Medical Oxygen Delivery, Flood/Disaster Relief Rescue.'
    )
    VolunteerTeam.objects.create(
        ward=w1, team_name='KMCC Relief Task Force',
        incharge_name='Faisal Trippanachi', phone='9447222333', services_offered='Pattini Sahayi Food Kit Distribution, Dialysis Patient Financial Support, Emergency Blood Response.'
    )
    VolunteerTeam.objects.create(
        ward=w1, team_name='Red Cross Ward Unit',
        incharge_name='Dr. K.P. Varma', phone='9895333444', services_offered='First Aid Support, Free Health Checkup Camps, Homebound Patient Nursing.'
    )

    # Local Products & Startups (Swadeshi)
    LocalProduct.objects.create(
        ward=w1, product_name='Pure Virgin Coconut Oil & Honey',
        maker_team='Trippanachi Kudumbashree Unit #4', category='Food & Organic', contact_phone='9847556677', description='100% Organic cold-pressed virgin coconut oil & natural forest honey prepared locally.'
    )
    LocalProduct.objects.create(
        ward=w1, product_name='Eco-Friendly Handwoven Coir Mats & Baskets',
        maker_team='Pulpatta Self-Help Handicraft Guild', category='Handicraft', contact_phone='9447889900', description='Handcrafted coir mats, decorative baskets, and eco-bags made by ward women artisans.'
    )

    # Opportunities (Jobs, Scholarships, Welfare Schemes)
    Opportunity.objects.create(
        ward=w1, title='Kerala State Higher Education Scholarship 2026',
        type='scholarship', details='Financial assistance for Degree & PG students from BPL households. Apply before Sept 15.', link_url='https://highereducation.kerala.gov.in'
    )
    Opportunity.objects.create(
        ward=w1, title='Field Executive & Data Collector Openings (Pulpatta/Malappuram)',
        type='job', details='Local ward survey & inventory data entry role. Plus Two / Degree qualification required.', link_url='https://kerala.gov.in'
    )
    Opportunity.objects.create(
        ward=w1, title='Panchayath Solar Rooftop Subsidy Welfare Scheme',
        type='welfare_scheme', details='40% subsidy for installing 3KW domestic solar rooftop panels for Panchayath residents.', link_url='https://kseb.in'
    )

    # Ward Achievements
    WardAchievement.objects.create(
        ward=w1, title='Rank 1 in Kerala State Civil Services Exam 2025',
        honoree_name='Ameena Trippanachi', description='Brought great honor to South Trippanachi Ward 22 by securing AIR 12 in IAS exam!'
    )

    # Emergency Broadcasts (Critical Red Alert for sound test)
    EmergencyBroadcast.objects.create(
        ward=w1, title='CRITICAL: Malappuram Heavy Thunderstorm & Canal Waterlogging Warning',
        content='Red alert issued for Pulpatta Panchayath region. Residents near Trippanachi canal stay on high alert. Emergency Task Force: 9847111222.',
        severity='critical'
    )

    # Grievances for Ward 22
    Grievance.objects.create(
        ward=w1, title='Suspicious substance sale near Trippanachi Junction',
        user=p_user,
        is_anonymous=True,
        category='Lahari / Anti-Drug Tip-off',
        description='Unidentified group gathering near abandoned shop after 8 PM. Please inspect confidentially.',
        status='submitted',
        assigned_department='Excise / Anti-Narcotics'
    )
    Grievance.objects.create(
        ward=w1, title='Streetlight non-functional near South School Road',
        user=p_user,
        is_anonymous=False,
        category='Streetlight',
        description='Pole #7 light completely off since Tuesday night.',
        status='in_progress',
        assigned_department='KSEB Electrical'
    )

    # Medical Equipment
    MedicalEquipment.objects.create(
        ward=w1, item_name='Folding Wheelchair (Heavy Duty)',
        total_qty=4, available_qty=2, incharge_contact='9847012345'
    )
    MedicalEquipment.objects.create(
        ward=w1, item_name='Oxygen Concentrator (5L)',
        total_qty=2, available_qty=1, incharge_contact='9847012345'
    )

    # Local Skilled Workers
    LocalService.objects.create(
        ward=w1, name='Kabeer Electrician', profession='Electrician', phone='9846112233', is_verified=True
    )
    LocalService.objects.create(
        ward=w1, name='Usman Plumbing Works', profession='Plumber', phone='9447334455', is_verified=True
    )

    # Blood Donors
    BloodDonor.objects.create(
        ward=w1, name='Anas Trippanachi', blood_group='O+', phone='9847889900', is_available=True
    )

    print("Database reset to ONLY Ward 22 South Trippanachi completed successfully!")

if __name__ == '__main__':
    run()
