'use client';

import { useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api/baseApi';
import { Product, ProductsResponse } from '../model/ProductModel';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

interface CreatePostData {
  title: string;
  userId: number;
  body?: string;
}

export function usePosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const getProducts = useCallback(async (): Promise<Product[]> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const response = await apiFetch<ProductsResponse>({
        endpoint: API_ENDPOINTS.products.getAll,
      });
      setIsSuccess(true);
      return response.products;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (id: number): Promise<Product> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const result = await apiFetch<Product>({
        endpoint: API_ENDPOINTS.products.getById(id),
      });
      setIsSuccess(true);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch product';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPost = useCallback(async (data: CreatePostData): Promise<any> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const result = await apiFetch({
        endpoint:API_ENDPOINTS.posts.create,
        method: 'POST',
        body: data,
      });
      
      setIsSuccess(true);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    isError: !!error,
    isSuccess,
    getProducts,
    getProductById,
    createPost,
  };
}