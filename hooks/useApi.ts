'use client';

import { useState, useCallback } from 'react';
import { apiConfig, buildUrl } from '@/config/api';
import { ApiRequest, ApiResponse, ApiError } from '@/types/api.types';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const request = useCallback(async <T = any, R = any>(
    options: ApiRequest<T>
  ): Promise<ApiResponse<R>> => {
    setLoading(true);
    setError(null);

    try {
      const { endpoint, method = 'GET', body, params, headers = {}, ...rest } = options;
      
      const url = buildUrl(endpoint, params);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);

      const response = await fetch(url, {
        method,
        headers: {
          ...apiConfig.defaultHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        ...rest,
      });

      clearTimeout(timeoutId);

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data,
        };
      }

      const result: ApiResponse<R> = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };

      return result;
    } catch (err) {
      const apiError: ApiError = {
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        status: (err as any).status,
        data: (err as any).data,
      };
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    request,
    loading,
    error,
    setError,
    clearError: () => setError(null),
  };
}