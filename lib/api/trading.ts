// ============================================================
// Trading Service - Stock Trading API calls
// ============================================================

import { api } from './client';
import type {
  VirtualWallet,
  Portfolio,
  TradeRequest,
  TradeResponse,
  TransactionsResponse,
} from '../types';

export const tradingService = {
  // Get virtual wallet balance
  getWallet: () =>
    api.get<{ wallet: VirtualWallet }>('/trading/wallet', true),

  // Get portfolio with holdings
  getPortfolio: () =>
    api.get<Portfolio>('/trading/portfolio', true),

  // Buy stock
  buyStock: (data: TradeRequest) =>
    api.post<TradeResponse>('/trading/buy', data, true),

  // Sell stock
  sellStock: (data: TradeRequest) =>
    api.post<TradeResponse>('/trading/sell', data, true),

  // Get transaction history
  getTransactions: (limit = 50, offset = 0) =>
    api.get<TransactionsResponse>(`/trading/transactions?limit=${limit}&offset=${offset}`, true),
};
