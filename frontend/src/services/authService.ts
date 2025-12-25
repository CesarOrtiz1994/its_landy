import api from './api';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types/auth.types';

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/register', data);
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/login', credentials);
    return response.data;
  },

  async getProfile(): Promise<{ success: boolean; data: User }> {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  async updateProfile(data: { firstName: string; lastName: string }): Promise<{ success: boolean; data: User }> {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  },
};
