const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
};

// Helper to build URL with params
export const buildUrl = (endpoint: string, params?: Record<string, string | number>) => {
  let url = endpoint.startsWith('http') ? endpoint : `${apiConfig.baseURL}${endpoint}`;
  
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return url;
};