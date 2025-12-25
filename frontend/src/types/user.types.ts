export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'SALES' | 'USER';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface UpdateUserData {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UsersResponse {
  success: boolean;
  data?: User[];
  message?: string;
}

export interface UserResponse {
  success: boolean;
  data?: User;
  message?: string;
}
