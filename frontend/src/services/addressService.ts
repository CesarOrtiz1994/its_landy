import api from './api';
import type {
  Address,
  CreateAddressData,
  UpdateAddressData,
  AddressesResponse,
  AddressResponse,
} from '../types/address.types';

// Obtener todas las direcciones del usuario
export const getAllAddresses = async (): Promise<Address[]> => {
  const response = await api.get<AddressesResponse>('/api/addresses');
  return response.data.data || [];
};

// Obtener dirección por ID
export const getAddressById = async (id: number): Promise<Address> => {
  const response = await api.get<AddressResponse>(`/api/addresses/${id}`);
  if (!response.data.data) {
    throw new Error('Dirección no encontrada');
  }
  return response.data.data;
};

// Crear dirección
export const createAddress = async (data: CreateAddressData): Promise<Address> => {
  const response = await api.post<AddressResponse>('/api/addresses', data);
  if (!response.data.data) {
    throw new Error('Error al crear dirección');
  }
  return response.data.data;
};

// Actualizar dirección
export const updateAddress = async (id: number, data: UpdateAddressData): Promise<Address> => {
  const response = await api.put<AddressResponse>(`/api/addresses/${id}`, data);
  if (!response.data.data) {
    throw new Error('Error al actualizar dirección');
  }
  return response.data.data;
};

// Eliminar dirección
export const deleteAddress = async (id: number): Promise<void> => {
  await api.delete(`/api/addresses/${id}`);
};

// Establecer dirección como predeterminada
export const setDefaultAddress = async (id: number): Promise<Address> => {
  const response = await api.patch<AddressResponse>(`/api/addresses/${id}/set-default`);
  if (!response.data.data) {
    throw new Error('Error al establecer dirección predeterminada');
  }
  return response.data.data;
};
