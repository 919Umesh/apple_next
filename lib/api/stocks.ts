// ============================================================
// Stocks Service - Stock Market API calls
// ============================================================

import { api } from './client';
import type {
  Company,
  CompaniesResponse,
  SectorResponse,
  StockPrice,
  PriceHistoryResponse,
  MarketOverview,
  PriceChange,
  StockEvent,
  Timeframe,
} from '../types';

export const stocksService = {
  // List all companies with pagination
  getCompanies: (limit = 50, offset = 0) =>
    api.get<CompaniesResponse>(`/stocks?limit=${limit}&offset=${offset}`),

  // Search companies
  searchCompanies: (query: string) =>
    api.get<{ companies: Company[] }>(`/stocks/search?q=${encodeURIComponent(query)}`),

  // Get companies by sector
  getCompaniesBySector: (sector: string, limit = 50, offset = 0) =>
    api.get<SectorResponse>(`/stocks/sector/${encodeURIComponent(sector)}?limit=${limit}&offset=${offset}`),

  // Get single company details
  getCompany: (symbol: string) =>
    api.get<{ company: Company }>(`/stocks/${symbol}`),

  // Get current stock price
  getStockPrice: (symbol: string) =>
    api.get<{ price: StockPrice }>(`/stocks/${symbol}/price`),

  // Get price history
  getPriceHistory: (symbol: string, timeframe: Timeframe = '1d', days = 30) =>
    api.get<PriceHistoryResponse>(`/stocks/${symbol}/history?timeframe=${timeframe}&days=${days}`),

  // Get market overview
  getMarketOverview: () =>
    api.get<MarketOverview>('/stocks/market-overview'),

  // Get top gainers
  getTopGainers: (limit = 10) =>
    api.get<{ gainers: PriceChange[] }>(`/stocks/top-gainers?limit=${limit}`),

  // Get top losers
  getTopLosers: (limit = 10) =>
    api.get<{ losers: PriceChange[] }>(`/stocks/top-losers?limit=${limit}`),

  // Get most active stocks
  getMostActive: (limit = 10) =>
    api.get<{ active: Company[] }>(`/stocks/most-active?limit=${limit}`),

  // Get upcoming events for a company
  getStockEvents: (symbol: string) =>
    api.get<{ events: StockEvent[] }>(`/stocks/${symbol}/events`),
};
