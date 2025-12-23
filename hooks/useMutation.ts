'use client';

import { useState, useCallback } from 'react';
import { useApi } from './useApi';
import { HttpMethod } from '@/types/api.types';

interface UseMutationOptions<T, R> {
  onSuccess?: (data: R) => void;
  onError?: (error: any) => void;
  onSettled?: () => void;
}

export function useMutation<T = any, R = any>(
  endpoint: string,
  method: HttpMethod = 'POST',
  options?: UseMutationOptions<T, R>
) {
  const { request, loading, error } = useApi();
  const [data, setData] = useState<R | null>(null);

  const mutate = useCallback(async (
    body?: T,
    customEndpoint?: string,
    customMethod?: HttpMethod
  ) => {
    try {
      const response = await request<T, R>({
        endpoint: customEndpoint || endpoint,
        method: customMethod || method,
        body,
      });
      
      setData(response.data);
      options?.onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      options?.onError?.(err);
      throw err;
    } finally {
      options?.onSettled?.();
    }
  }, [endpoint, method, request, options]);

  return {
    mutate,
    data,
    loading,
    error,
    reset: () => {
      setData(null);
    },
  };
}