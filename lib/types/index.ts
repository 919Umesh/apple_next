// ============================================================
// API Types - Stock Trading Platform
// ============================================================

// ---------------------- User & Auth ----------------------
export interface User {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  kyc_status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  full_name?: string;
  phone?: string;
}

// ---------------------- Stock Market ----------------------
export interface Company {
  id: number;
  symbol: string;
  name: string;
  sector: string;
  market_cap: number;
  description: string;
  founded_year: number;
  employees: number;
  is_active: boolean;
}

export interface StockPrice {
  id: number;
  company_id: number;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume: number;
  timestamp: string;
  timeframe: string;
}

export interface PriceChange {
  id?: number;
  symbol: string;
  name: string;
  current_price: number;
  previous_price: number;
  change: number;
  change_percent: number;
  sector?: string;
}

export interface MarketOverview {
  total_companies: number;
  top_gainers: PriceChange[];
  top_losers: PriceChange[];
  most_active: Company[];
}

export interface StockEvent {
  id: number;
  company_id: number;
  event_type: string;
  title: string;
  description: string;
  impact_percentage: number;
  event_date: string;
}

export type Timeframe = '1m' | '5m' | '15m' | '1h' | '1d' | '1w' | '1M';

export const SECTORS = [
  'Banking',
  'Hydropower',
  'Insurance',
  'Manufacturing',
  'Hotels',
  'Finance',
] as const;

export type Sector = (typeof SECTORS)[number];

// ---------------------- Trading ----------------------
export interface VirtualWallet {
  id: number;
  user_id: number;
  balance: number;
  total_invested: number;
  total_profit_loss: number;
  created_at: string;
  updated_at: string;
}

export interface Holding {
  id: number;
  user_id: number;
  company_id: number;
  company_symbol: string;
  company_name: string;
  quantity: number;
  avg_buy_price: number;
  total_invested: number;
  current_price: number;
  current_value: number;
  profit_loss: number;
  profit_loss_percent: number;
}

export interface Portfolio {
  total_value: number;
  total_invested: number;
  total_profit_loss: number;
  profit_loss_percent: number;
  holdings: Holding[];
}

export interface TradeRequest {
  symbol: string;
  quantity: number;
}

export interface TradeResponse {
  success: boolean;
  message: string;
  quantity?: number;
  price_per_share?: number;
  total_amount?: number;
  new_balance?: number;
}

export interface TradingTransaction {
  id: number;
  user_id: number;
  company_id: number;
  type: 'buy' | 'sell';
  quantity: number;
  price_per_share: number;
  total_amount: number;
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
}

// ---------------------- Admin ----------------------
export interface UpdateKycRequest {
  kyc_status: 'pending' | 'approved' | 'rejected';
}

export interface SeedResponse {
  success: boolean;
  message: string;
  companies_created?: number;
  prices_created?: number;
  events_created?: number;
}

// ---------------------- API Response Wrappers ----------------------
export interface ApiError {
  message: string;
  status?: number;
}

export interface CompaniesResponse {
  companies: Company[];
  limit: number;
  offset: number;
}

export interface SectorResponse {
  sector: string;
  companies: Company[];
  limit: number;
  offset: number;
}

export interface PriceHistoryResponse {
  symbol: string;
  timeframe: string;
  prices: StockPrice[];
}

export interface TransactionsResponse {
  transactions: TradingTransaction[];
  limit: number;
  offset: number;
}
