import api from './api';
import type {
  User,
  CreateUserData,
  UpdateUserData,
  UsersResponse,
  UserResponse,
} from '../types/user.types';

// Obtener todos los usuarios
export const getAllUsers = async (params?: {
  role?: string;
  search?: string;
  isActive?: string;
}): Promise<User[]> => {
  const response = await api.get<UsersResponse>('/api/users', { params });
  return response.data.data || [];
};

// Obtener usuario por ID
export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get<UserResponse>(`/api/users/${id}`);
  if (!response.data.data) {
    throw new Error('Usuario no encontrado');
  }
  return response.data.data;
};

// Crear usuario
export const createUser = async (data: CreateUserData): Promise<User> => {
  const response = await api.post<UserResponse>('/api/users', data);
  if (!response.data.data) {
    throw new Error('Error al crear usuario');
  }
  return response.data.data;
};

// Actualizar usuario
export const updateUser = async (id: number, data: UpdateUserData): Promise<User> => {
  const response = await api.put<UserResponse>(`/api/users/${id}`, data);
  if (!response.data.data) {
    throw new Error('Error al actualizar usuario');
  }
  return response.data.data;
};

// Eliminar usuario
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/api/users/${id}`);
};

// Activar/Desactivar usuario
export const toggleUserStatus = async (id: number): Promise<User> => {
  const response = await api.patch<UserResponse>(`/api/users/${id}/toggle-status`);
  if (!response.data.data) {
    throw new Error('Error al cambiar estado del usuario');
  }
  return response.data.data;
};
