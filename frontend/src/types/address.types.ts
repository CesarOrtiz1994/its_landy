export interface Address {
  id: number;
  userId: number;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressData {
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  isDefault?: boolean;
}

export interface UpdateAddressData extends CreateAddressData {}

export interface AddressesResponse {
  success: boolean;
  data?: Address[];
  message?: string;
}

export interface AddressResponse {
  success: boolean;
  data?: Address;
  message?: string;
}
