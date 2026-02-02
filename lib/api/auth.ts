// ============================================================
// Auth Service - Authentication API calls
// ============================================================

import { api } from './client';
import type {
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  UpdateProfileRequest,
  User,
} from '../types';

export const authService = {
  register: (data: RegisterRequest) =>
    api.post<AuthResponse>('/auth/register', data),

  login: (data: LoginRequest) =>
    api.post<AuthResponse>('/auth/login', data),

  getProfile: () =>
    api.get<{ user: User }>('/auth/profile', true),

  updateProfile: (data: UpdateProfileRequest) =>
    api.put<{ message: string; user: User }>('/auth/profile/update', data, true),
};
