// ============================================================
// API Client - Centralized HTTP layer
// ============================================================

import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
  cache?: RequestCache;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    requiresAuth = false,
    cache = 'no-store',
  } = options;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add auth token if required
  if (requiresAuth) {
    const token = Cookies.get('auth_token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...headers },
    cache,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    let message = `API Error: ${response.status}`;
    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
      // Use status text if JSON parsing fails
      message = response.statusText || message;
    }
    throw new ApiError(message, response.status);
  }

  // Handle empty responses
  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string, requiresAuth = false) =>
    apiClient<T>(endpoint, { requiresAuth }),

  post: <T>(endpoint: string, body: unknown, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: 'POST', body, requiresAuth }),

  put: <T>(endpoint: string, body: unknown, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: 'PUT', body, requiresAuth }),

  delete: <T>(endpoint: string, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: 'DELETE', requiresAuth }),
};
