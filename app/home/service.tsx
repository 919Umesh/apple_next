'use client';

import { homeService, Post, CreatePostDto, UpdatePostDto } from '@/services/homeService';
import { useFetch, useMutation } from '@/hooks';

// Re-export types
export type { Post, CreatePostDto, UpdatePostDto };

// Custom hooks for home module
export function useHomePosts() {
  return homeService.useGetAll<Post>();
}

export function useFeaturedPosts() {
  return homeService.useFeaturedPosts();
}

export function usePostById(id: number) {
  return homeService.useGetById<Post>(id);
}

export function useCreatePost() {
  return homeService.useCreate<CreatePostDto, Post>();
}

export function useUpdatePost(id: number) {
  return homeService.useUpdate<UpdatePostDto, Post>(id);
}

export function useDeletePost(id: number) {
  return homeService.useDelete<Post>(id);
}

// Traditional async function for server components
export async function getServerPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}