// ============================================================
// React Query Hooks - Data fetching with TanStack Query
// ============================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stocksService, tradingService, authService, adminService } from '../api';
import type { Timeframe, TradeRequest, LoginRequest, RegisterRequest, UpdateProfileRequest } from '../types';

// ---------------------- Stock Queries ----------------------

export function useMarketOverview() {
  return useQuery({
    queryKey: ['market-overview'],
    queryFn: () => stocksService.getMarketOverview(),
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000,
  });
}

export function useCompanies(limit = 50, offset = 0) {
  return useQuery({
    queryKey: ['companies', limit, offset],
    queryFn: () => stocksService.getCompanies(limit, offset),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useSearchCompanies(query: string) {
  return useQuery({
    queryKey: ['companies-search', query],
    queryFn: () => stocksService.searchCompanies(query),
    enabled: query.length > 0,
    staleTime: 30 * 1000,
  });
}

export function useCompaniesBySector(sector: string, limit = 50, offset = 0) {
  return useQuery({
    queryKey: ['companies-sector', sector, limit, offset],
    queryFn: () => stocksService.getCompaniesBySector(sector, limit, offset),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCompany(symbol: string) {
  return useQuery({
    queryKey: ['company', symbol],
    queryFn: () => stocksService.getCompany(symbol),
    staleTime: 2 * 60 * 1000,
  });
}

export function useStockPrice(symbol: string) {
  return useQuery({
    queryKey: ['stock-price', symbol],
    queryFn: () => stocksService.getStockPrice(symbol),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000,
  });
}

export function usePriceHistory(symbol: string, timeframe: Timeframe = '1d', days = 30) {
  return useQuery({
    queryKey: ['price-history', symbol, timeframe, days],
    queryFn: () => stocksService.getPriceHistory(symbol, timeframe, days),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTopGainers(limit = 10) {
  return useQuery({
    queryKey: ['top-gainers', limit],
    queryFn: () => stocksService.getTopGainers(limit),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
}

export function useTopLosers(limit = 10) {
  return useQuery({
    queryKey: ['top-losers', limit],
    queryFn: () => stocksService.getTopLosers(limit),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
}

export function useMostActive(limit = 10) {
  return useQuery({
    queryKey: ['most-active', limit],
    queryFn: () => stocksService.getMostActive(limit),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
}

export function useStockEvents(symbol: string) {
  return useQuery({
    queryKey: ['stock-events', symbol],
    queryFn: () => stocksService.getStockEvents(symbol),
    staleTime: 5 * 60 * 1000,
  });
}

// ---------------------- Trading Queries ----------------------

export function useWallet() {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: () => tradingService.getWallet(),
    staleTime: 30 * 1000,
  });
}

export function usePortfolio() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: () => tradingService.getPortfolio(),
    staleTime: 30 * 1000,
  });
}

export function useTradingTransactions(limit = 50, offset = 0) {
  return useQuery({
    queryKey: ['trading-transactions', limit, offset],
    queryFn: () => tradingService.getTransactions(limit, offset),
    staleTime: 30 * 1000,
  });
}

// ---------------------- Trading Mutations ----------------------

export function useBuyStock() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: TradeRequest) => tradingService.buyStock(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['trading-transactions'] });
    },
  });
}

export function useSellStock() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: TradeRequest) => tradingService.sellStock(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['trading-transactions'] });
    },
  });
}

// ---------------------- Auth Mutations ----------------------

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getProfile(),
    staleTime: 5 * 60 * 1000,
  });
}

// ---------------------- Admin Queries ----------------------

export function usePendingKyc() {
  return useQuery({
    queryKey: ['pending-kyc'],
    queryFn: () => adminService.getPendingKyc(),
    staleTime: 30 * 1000,
  });
}

// ---------------------- Admin Mutations ----------------------

export function useApproveKyc() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: number) => adminService.approveKyc(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-kyc'] });
    },
  });
}

export function useRejectKyc() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: number) => adminService.rejectKyc(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-kyc'] });
    },
  });
}

export function useSeedData() {
  return useMutation({
    mutationFn: () => adminService.seedStocks(),
  });
}
