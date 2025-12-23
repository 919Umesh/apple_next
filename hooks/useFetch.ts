'use client';

import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { UseApiOptions } from '@/types/api.types';

export function useFetch<T = any>(
  endpoint: string,
  options?: UseApiOptions<T>
) {
  const { request, loading, error } = useApi();
  const [data, setData] = useState<T | null>(null);
  const [refetchCount, setRefetchCount] = useState(0);

  const fetchData = useCallback(async () => {
    if (options?.enabled === false) return;

    try {
      const response = await request<T, T>({
        endpoint,
        method: 'GET',
        cache: options?.cache,
        next: options?.next,
        params: options?.params,
      });
      setData(response.data);
      options?.onSuccess?.(response.data);
    } catch (err) {
      options?.onError?.(err as any);
    }
  }, [endpoint, request, options]);

  const refetch = useCallback(() => {
    setRefetchCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refetchCount]);

  return {
    data,
    loading,
    error,
    refetch,
    setData,
  };
}