// ============================================================
// Admin Service - Admin API calls
// ============================================================

import { api } from './client';
import type { UpdateKycRequest, SeedResponse, User } from '../types';

export const adminService = {
  // Get pending KYC requests
  getPendingKyc: () =>
    api.get<{ pending_users: User[] }>('/admin/users/pending-kyc', true),

  // Approve user KYC
  approveKyc: (userId: number) =>
    api.put<{ message: string; user: Partial<User> }>(`/admin/users/${userId}/kyc`, { kyc_status: 'approved' }, true),

  // Reject user KYC
  rejectKyc: (userId: number) =>
    api.put<{ message: string; user: Partial<User> }>(`/admin/users/${userId}/kyc`, { kyc_status: 'rejected' }, true),

  // Update user KYC status
  updateKycStatus: (userId: number, data: UpdateKycRequest) =>
    api.put<{ message: string; user: Partial<User> }>(`/admin/users/${userId}/kyc`, data, true),

  // Seed stock market data
  seedStocks: () =>
    api.post<SeedResponse>('/admin/seed-stocks', {}, true),
};
