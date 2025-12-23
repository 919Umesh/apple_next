export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequest<T = any> {
  endpoint: string;
  method?: HttpMethod;
  body?: T;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface UseApiOptions<T = any> extends Omit<ApiRequest<T>, 'endpoint' | 'method'> {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}