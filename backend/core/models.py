import uuid
from django.db import models

class Ward(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    district = models.CharField(max_length=100)
    local_body = models.CharField(max_length=150)
    ward_number = models.PositiveIntegerField()
    ward_name = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['district', 'local_body', 'ward_number']

    def __str__(self):
        return f"Ward {self.ward_number}: {self.ward_name} ({self.local_body}, {self.district})"

class Profile(models.Model):
    ROLE_CHOICES = [
        ('public', 'Public Resident'),
        ('volunteer', 'Ward Volunteer'),
        ('ward_member', 'Ward Member / Councillor'),
        ('ward_admin', 'Ward Admin'),
        ('super_admin', 'Super Admin'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.SET_NULL, null=True, blank=True, related_name='residents')
    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=128, blank=True, default='') # Password for login
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='public')
    pin = models.CharField(max_length=128, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.phone}) - {self.role}"

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, null=True, blank=True, related_name='categories')
    name = models.CharField(max_length=100)
    department_assigned = models.CharField(max_length=150, default='Panchayath Office')
    icon_name = models.CharField(max_length=50, default='AlertCircle')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.department_assigned})"

class Grievance(models.Model):
    STATUS_CHOICES = [
        ('submitted', 'Submitted'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('invalid', 'Invalid / Needs Info'),
        ('reopened', 'Reopened'),
    ]
    DEPARTMENT_CHOICES = [
        ('Panchayath Office', 'Panchayath Office'),
        ('Excise / Anti-Narcotics', 'Excise / Anti-Narcotics'),
        ('KWA Water Department', 'KWA Water Department'),
        ('KSEB Electrical', 'KSEB Electrical'),
        ('PWD Road Department', 'PWD Road Department'),
        ('Health & Haritha Karma', 'Health & Haritha Karma'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='grievances')
    user = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True)
    is_anonymous = models.BooleanField(default=False)
    is_secret_hunger_report = models.BooleanField(default=False) # Pattini Sahayi confidential distress report
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='grievances/images/', blank=True, null=True)
    video = models.FileField(upload_to='grievances/videos/', blank=True, null=True)
    voice_note = models.FileField(upload_to='grievances/audio/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='submitted')
    assigned_department = models.CharField(max_length=150, choices=DEPARTMENT_CHOICES, default='Panchayath Office')
    admin_note = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        anon_str = " [CONFIDENTIAL]" if (self.is_anonymous or self.is_secret_hunger_report) else ""
        return f"[{self.status.upper()}]{anon_str} {self.title} - Dept: {self.assigned_department}"

class IssueMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    grievance = models.ForeignKey(Grievance, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Message by {self.sender.full_name} on {self.grievance.title}"

class WardAchievement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=200)
    honoree_name = models.CharField(max_length=150)
    description = models.TextField()
    image = models.ImageField(upload_to='achievements/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.honoree_name} - {self.title}"

class LocalProduct(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='products')
    product_name = models.CharField(max_length=150)
    maker_team = models.CharField(max_length=150) # Kudumbashree unit / Ward Startup
    category = models.CharField(max_length=100) # Food, Handicraft, Organic Produce, Tech Startup
    contact_phone = models.CharField(max_length=20)
    description = models.TextField()
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.product_name} by {self.maker_team}"

class Opportunity(models.Model):
    OPPORTUNITY_TYPES = [
        ('job', 'Job Opening'),
        ('scholarship', 'Scholarship Alert'),
        ('welfare_scheme', 'Welfare Scheme'),
        ('free_class', 'Free Skill Class'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='opportunities')
    title = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=OPPORTUNITY_TYPES, default='job')
    details = models.TextField()
    link_url = models.URLField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Opportunities'
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.type.upper()}] {self.title}"

class VolunteerTeam(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='volunteer_teams')
    team_name = models.CharField(max_length=150) # Whiteguard, KMCC, Red Cross, Youth Wing
    incharge_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    services_offered = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.team_name} - Contact: {self.incharge_name} ({self.phone})"

class MedicalEquipment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='equipment')
    item_name = models.CharField(max_length=150)
    total_qty = models.PositiveIntegerField(default=1)
    available_qty = models.PositiveIntegerField(default=1)
    incharge_contact = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item_name} ({self.available_qty}/{self.total_qty} Available)"

class LocalService(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=150)
    profession = models.CharField(max_length=100) # Plumber, Electrician, Auto
    phone = models.CharField(max_length=20)
    is_verified = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.profession} ({self.phone})"

class EmergencyBroadcast(models.Model):
    SEVERITY_CHOICES = [
        ('info', 'Info'),
        ('alert', 'Alert'),
        ('critical', 'Critical'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='broadcasts')
    title = models.CharField(max_length=200)
    content = models.TextField()
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default='info')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.severity.upper()}] {self.title}"

class BloodDonor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='blood_donors')
    name = models.CharField(max_length=150)
    blood_group = models.CharField(max_length=10)
    phone = models.CharField(max_length=20)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.blood_group}) - {self.phone}"

class SeniorCareRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    SERVICE_CHOICES = [
        ('medicine', 'Medicine Purchase'),
        ('transport', 'Hospital Transport'),
        ('pension', 'Digital Pension Mustering'),
        ('bills', 'Utility Bill Payment'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='senior_requests')
    beneficiary_name = models.CharField(max_length=150)
    service_type = models.CharField(max_length=30, choices=SERVICE_CHOICES, default='medicine')
    contact = models.CharField(max_length=20)
    details = models.TextField(blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.beneficiary_name} - {self.service_type} ({self.status})"

class BookExchange(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='books')
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    contact_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.category})"
