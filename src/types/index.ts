export type PropertyType = 'LAND' | 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL';
export type PropertyStatus = 'AVAILABLE' | 'SOLD' | 'RESERVED' | 'UNDER_CONSTRUCTION';
export type InquiryStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  area: number;
  location: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  yearBuilt?: number;
  features?: Record<string, any>;
  images: PropertyImage[];
  createdAt: string;
  updatedAt: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
