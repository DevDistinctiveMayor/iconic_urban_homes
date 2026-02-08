import axios from 'axios';
import type { Property, AuthResponse, ContactInquiry } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const propertyService = {
  getProperties: (params?: Record<string, any>) =>
    api.get<{ properties: Property[]; pagination: any }>('/properties', { params }),
  
  getPropertyById: (id: string) =>
    api.get<Property>(`/properties/${id}`),
  
  createProperty: (data: Partial<Property>) =>
    api.post<Property>('/properties', data),
  
  updateProperty: (id: string, data: Partial<Property>) =>
    api.put<Property>(`/properties/${id}`, data),
  
  deleteProperty: (id: string) =>
    api.delete(`/properties/${id}`),
};

export const authService = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>('/auth/register', { name, email, password }),
  
  getProfile: () =>
    api.get<{ user: any }>('/auth/profile'),
};

export const inquiryService = {
  createInquiry: (data: Partial<ContactInquiry>) =>
    api.post<ContactInquiry>('/inquiries', data),
  
  getInquiries: (params?: Record<string, any>) =>
    api.get<{ inquiries: ContactInquiry[]; pagination: any }>('/inquiries', { params }),
  
  updateInquiryStatus: (id: string, status: string) =>
    api.patch<ContactInquiry>(`/inquiries/${id}/status`, { status }),
  
  deleteInquiry: (id: string) =>
    api.delete(`/inquiries/${id}`),
};

export default api;
