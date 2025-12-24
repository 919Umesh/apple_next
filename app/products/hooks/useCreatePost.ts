// app/products/hooks/useCreatePost.ts (create this file)
'use client';

import { useState } from 'react';

interface CreatePostData {
  title: string;
  userId: number;
  body?: string;
}

interface UseCreatePostReturn {
  createPost: (data: CreatePostData) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSuccess: boolean;
}

export function useCreatePost(): UseCreatePostReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createPost = async (data: CreatePostData) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Add your API key if needed: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Post created successfully:', result);
      setIsSuccess(true);
      
      // You can return the result if needed
      return result;
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error creating post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost,
    isLoading,
    isError,
    error,
    isSuccess,
  };
}