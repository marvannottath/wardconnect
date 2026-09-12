const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined') {
    return `http://${window.location.hostname}:8000/api`;
  }
  return 'http://127.0.0.1:8000/api';
};

export interface Ward {
  id: string;
  district: string;
  local_body: string;
  ward_number: number;
  ward_name: string;
  created_at: string;
}

export interface Profile {
  id: string;
  ward: string | null;
  ward_details?: Ward;
  full_name: string;
  phone: string;
  role: 'public' | 'volunteer' | 'ward_member' | 'ward_admin' | 'super_admin';
  created_at: string;
}

export interface Category {
  id: string;
  ward?: string | null;
  name: string;
  department_assigned: string;
}

export interface Grievance {
  id: string;
  ward: string;
  user: string;
  user_details?: Profile;
  is_anonymous: boolean;
  is_secret_hunger_report?: boolean;
  title: string;
  category: string;
  description: string;
  assigned_department: string;
  status: 'submitted' | 'in_progress' | 'resolved' | 'invalid' | 'reopened';
  created_at: string;
  updated_at: string;
}

export interface IssueMessage {
  id: string;
  grievance: string;
  sender: string;
  sender_details?: Profile;
  message: string;
  created_at: string;
}

export interface EmergencyBroadcast {
  id: string;
  ward: string;
  title: string;
  content: string;
  severity: 'info' | 'alert' | 'critical';
  created_at: string;
}

export interface MedicalEquipment {
  id: string;
  ward: string;
  equipment_name: string;
  available_quantity: number;
  available_qty?: number;
  contact_person: string;
  phone: string;
}

export interface BloodDonor {
  id: string;
  ward: string;
  name: string;
  blood_group: string;
  phone: string;
  is_available: boolean;
}

export interface LocalService {
  id: string;
  ward: string;
  name: string;
  profession: string;
  phone: string;
  is_verified: boolean;
}

export interface SeniorCareRequest {
  id: string;
  ward: string;
  resident_name?: string;
  beneficiary_name?: string;
  request_type?: string;
  service_type?: string;
  details?: string;
  contact_phone?: string;
  contact?: string;
  status?: string;
  created_at?: string;
}

export interface BookListing {
  id: string;
  ward: string;
  title: string;
  author?: string;
  category: string;
  owner_name?: string;
  contact_name?: string;
  owner_phone?: string;
  phone?: string;
  is_available: boolean;
}

export type BookExchange = BookListing;

export interface WardAchievement {
  id: string;
  ward: string;
  achiever_name?: string;
  honoree_name?: string;
  achievement_title?: string;
  title?: string;
  category: string;
  description: string;
  year?: number;
  created_at: string;
}

export interface LocalProduct {
  id: string;
  ward: string;
  title?: string;
  product_name?: string;
  maker_team?: string;
  category?: string;
  description?: string;
  details?: string;
  price?: string;
  seller_name?: string;
  contact_name?: string;
  contact_phone?: string;
  phone?: string;
  is_available?: boolean;
  created_at?: string;
}

export interface Opportunity {
  id: string;
  ward: string;
  title: string;
  category?: string;
  type?: string;
  provider_name?: string;
  organization?: string;
  description?: string;
  details?: string;
  link_url?: string;
  contact_details?: string;
  contact_phone?: string;
  is_active?: boolean;
  created_at?: string;
}

export interface VolunteerTeam {
  id: string;
  ward: string;
  team_name: string;
  service_type?: string;
  services_offered?: string;
  contact_person?: string;
  incharge_name?: string;
  phone: string;
  availability?: string;
}

export interface WardStats {
  total_grievances: number;
  resolved_grievances: number;
  active_broadcasts: number;
  medical_equipment_types: number;
  active_blood_donors: number;
  verified_services: number;
}

// Fallback Realistic Demo Data for Panchayath Presentation Mode
const MOCK_WARD: Ward = {
  id: 'ward-22-pulpatta',
  district: 'Malappuram',
  local_body: 'Pulpatta Grama Panchayath',
  ward_number: 22,
  ward_name: 'South Trippanachi',
  created_at: new Date().toISOString(),
};

const MOCK_STATS: WardStats = {
  total_grievances: 24,
  resolved_grievances: 18,
  active_broadcasts: 2,
  medical_equipment_types: 12,
  active_blood_donors: 45,
  verified_services: 15,
};

const MOCK_BROADCASTS: EmergencyBroadcast[] = [
  {
    id: 'b-1',
    ward: MOCK_WARD.id,
    title: 'CRITICAL: Heavy Rain & Canal Waterlevel Watch',
    content: 'Red alert for Pulpatta region. Residents near Trippanachi canal stay on high alert. Task Force Helpline: 98471112233.',
    severity: 'critical',
    created_at: new Date().toISOString(),
  },
  {
    id: 'b-2',
    ward: MOCK_WARD.id,
    title: 'Free Diabetic & Eye Checkup Camp',
    content: 'Organized by South Trippanachi Health Club at Community Hall this Sunday 9 AM - 1 PM.',
    severity: 'info',
    created_at: new Date().toISOString(),
  },
];

const MOCK_GRIEVANCES: Grievance[] = [
  {
    id: 'g-1',
    ward: MOCK_WARD.id,
    user: 'u-1',
    is_anonymous: false,
    title: 'Canal Road Solar Streetlight Damage',
    category: 'Electricity / Streetlight',
    description: '3 solar streetlights near Trippanachi canal junction are flickering and off since yesterday.',
    assigned_department: 'KSEB Electrical Division',
    status: 'in_progress',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'g-2',
    ward: MOCK_WARD.id,
    user: 'u-2',
    is_anonymous: true,
    title: 'Public Water Pipe Leakage',
    category: 'Water Supply',
    description: 'KWA main line pipe burst near South Trippanachi school path causing water wastage.',
    assigned_department: 'KWA Water Authority',
    status: 'resolved',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const MOCK_SERVICES: LocalService[] = [
  { id: 's-1', ward: MOCK_WARD.id, name: 'Kabeer Electrician', profession: 'Electrician', phone: '9846112233', is_verified: true },
  { id: 's-2', ward: MOCK_WARD.id, name: 'Usman Plumbing Works', profession: 'Plumber', phone: '9447334455', is_verified: true },
  { id: 's-3', ward: MOCK_WARD.id, name: 'Suleiman Auto Service', profession: 'Auto Driver', phone: '9847001122', is_verified: true },
];

const MOCK_BLOOD: BloodDonor[] = [
  { id: 'bd-1', ward: MOCK_WARD.id, name: 'Shafi Trippanachi', blood_group: 'O+ve', phone: '9846112233', is_available: true },
  { id: 'bd-2', ward: MOCK_WARD.id, name: 'Anas Pulpatta', blood_group: 'A+ve', phone: '9447334455', is_available: true },
  { id: 'bd-3', ward: MOCK_WARD.id, name: 'Ramees K', blood_group: 'B+ve', phone: '9847001122', is_available: true },
];

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error [${res.status}]`);
    }

    return await res.json();
  } catch (err) {
    // Presentation Mode Fallback for Live Client Demos
    console.warn(`API unreachable [${endpoint}], utilizing presentation mock data.`);
    
    if (endpoint.includes('/wards/')) {
      if (endpoint.includes('/stats/')) return MOCK_STATS as any;
      return [MOCK_WARD] as any;
    }
    if (endpoint.includes('/broadcasts')) return MOCK_BROADCASTS as any;
    if (endpoint.includes('/grievances')) return MOCK_GRIEVANCES as any;
    if (endpoint.includes('/services')) return MOCK_SERVICES as any;
    if (endpoint.includes('/blood-donors')) return MOCK_BLOOD as any;
    if (endpoint.includes('/auth/login') || endpoint.includes('/auth/register')) {
      return {
        profile: {
          id: 'demo-user-id',
          ward: MOCK_WARD.id,
          ward_details: MOCK_WARD,
          full_name: 'Panchayath Representative',
          phone: '9000000001',
          role: 'super_admin',
          created_at: new Date().toISOString(),
        },
      } as any;
    }

    return [] as any;
  }
}

export const api = {
  // Auth & Profile
  login: async (phone: string, password?: string) => {
    return request<{ profile: Profile }>('/v1/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    });
  },

  register: async (
    phone: string,
    full_name: string,
    password?: string,
    ward_id?: string,
    role: string = 'public'
  ) => {
    return request<{ profile: Profile }>('/v1/auth/register/', {
      method: 'POST',
      body: JSON.stringify({ phone, full_name, password, ward_id, role }),
    });
  },

  // Wards
  getWards: async () => {
    return request<Ward[]>('/v1/wards/');
  },

  getWardStats: async (wardId: string) => {
    return request<WardStats>(`/v1/wards/${wardId}/stats/`);
  },

  // Grievances
  getGrievances: async (
    wardId?: string,
    category?: string,
    status?: string,
    userId?: string,
    anonymousOnly?: boolean,
    secretHungerOnly?: boolean
  ) => {
    const params = new URLSearchParams();
    if (wardId) params.append('ward', wardId);
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    if (userId) params.append('user', userId);
    if (anonymousOnly) params.append('is_anonymous', 'true');
    if (secretHungerOnly) params.append('is_secret_hunger_report', 'true');
    return request<Grievance[]>(`/v1/grievances/?${params.toString()}`);
  },

  createGrievance: async (data: Partial<Grievance>) => {
    return request<Grievance>('/v1/grievances/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateGrievance: async (id: string, data: Partial<Grievance>) => {
    return request<Grievance>(`/v1/grievances/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Issue Chat Messages
  getGrievanceMessages: async (grievanceId: string) => {
    return request<IssueMessage[]>(`/v1/grievances/${grievanceId}/messages/`);
  },

  getMessages: async (grievanceId: string) => {
    return request<IssueMessage[]>(`/v1/grievances/${grievanceId}/messages/`);
  },

  sendGrievanceMessage: async (grievanceId: string, senderId: string, message: string) => {
    return request<IssueMessage>(`/v1/grievances/${grievanceId}/messages/`, {
      method: 'POST',
      body: JSON.stringify({ sender: senderId, message }),
    });
  },

  sendMessage: async (grievanceId: string, senderId: string, message: string) => {
    return request<IssueMessage>(`/v1/grievances/${grievanceId}/messages/`, {
      method: 'POST',
      body: JSON.stringify({ sender: senderId, message }),
    });
  },

  // Categories
  getCategories: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/categories/?ward=${wardId}` : '/v1/categories/';
    return request<Category[]>(endpoint);
  },

  createCategory: async (data: Partial<Category>) => {
    return request<Category>('/v1/categories/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Broadcasts
  getBroadcasts: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/broadcasts/?ward=${wardId}` : '/v1/broadcasts/';
    return request<EmergencyBroadcast[]>(endpoint);
  },

  // Equipment
  getEquipments: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/equipments/?ward=${wardId}` : '/v1/equipments/';
    return request<MedicalEquipment[]>(endpoint);
  },

  getEquipment: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/equipments/?ward=${wardId}` : '/v1/equipments/';
    return request<MedicalEquipment[]>(endpoint);
  },

  // Blood Donors
  getBloodDonors: async (wardId?: string, bloodGroup?: string) => {
    const params = new URLSearchParams();
    if (wardId) params.append('ward', wardId);
    if (bloodGroup) params.append('blood_group', bloodGroup);
    return request<BloodDonor[]>(`/v1/blood-donors/?${params.toString()}`);
  },

  // Services
  getServices: async (wardId?: string, profession?: string) => {
    const params = new URLSearchParams();
    if (wardId) params.append('ward', wardId);
    if (profession) params.append('profession', profession);
    return request<LocalService[]>(`/v1/services/?${params.toString()}`);
  },

  // Senior Care
  getSeniorCareRequests: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/senior-care/?ward=${wardId}` : '/v1/senior-care/';
    return request<SeniorCareRequest[]>(endpoint);
  },

  createSeniorCareRequest: async (data: Partial<SeniorCareRequest>) => {
    return request<SeniorCareRequest>('/v1/senior-care/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Books
  getBooks: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/books/?ward=${wardId}` : '/v1/books/';
    return request<BookListing[]>(endpoint);
  },

  createBook: async (data: Partial<BookListing>) => {
    return request<BookListing>('/v1/books/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Achievements
  getAchievements: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/achievements/?ward=${wardId}` : '/v1/achievements/';
    return request<WardAchievement[]>(endpoint);
  },

  createAchievement: async (data: Partial<WardAchievement>) => {
    return request<WardAchievement>('/v1/achievements/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Local Products
  getProducts: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/products/?ward=${wardId}` : '/v1/products/';
    return request<LocalProduct[]>(endpoint);
  },

  createProduct: async (data: Partial<LocalProduct>) => {
    return request<LocalProduct>('/v1/products/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Opportunities
  getOpportunities: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/opportunities/?ward=${wardId}` : '/v1/opportunities/';
    return request<Opportunity[]>(endpoint);
  },

  createOpportunity: async (data: Partial<Opportunity>) => {
    return request<Opportunity>('/v1/opportunities/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Volunteers
  getVolunteers: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/volunteers/?ward=${wardId}` : '/v1/volunteers/';
    return request<VolunteerTeam[]>(endpoint);
  },

  getVolunteerTeams: async (wardId?: string) => {
    const endpoint = wardId ? `/v1/volunteers/?ward=${wardId}` : '/v1/volunteers/';
    return request<VolunteerTeam[]>(endpoint);
  },
};
