from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from core.models import Ward, Profile, Grievance, MedicalEquipment, LocalService

class WardConnectBackendTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.ward = Ward.objects.create(
            district='Ernakulam',
            local_body='Kalamassery Municipality',
            ward_number=12,
            ward_name='Glass Factory Colony'
        )

    def test_ward_creation_and_api_list(self):
        response = self.client.get('/api/wards/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['ward_name'], 'Glass Factory Colony')

    def test_quick_session_generator(self):
        payload = {
            'phone': '9847099999',
            'full_name': 'Test Resident',
            'ward_id': str(self.ward.id)
        }
        response = self.client.post('/api/auth/quick-session/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['profile']['full_name'], 'Test Resident')

    def test_grievance_creation_and_filtering(self):
        profile = Profile.objects.create(
            ward=self.ward,
            full_name='Test Grievant',
            phone='9847088888'
        )
        grievance = Grievance.objects.create(
            ward=self.ward,
            user=profile,
            title='Pipeline Leakage Test',
            category='Pipeline',
            description='Test description'
        )
        response = self.client.get(f'/api/grievances/?ward_id={self.ward.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Pipeline Leakage Test')

    def test_ward_stats_api(self):
        response = self.client.get(f'/api/stats/?ward_id={self.ward.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_grievances', response.data)
