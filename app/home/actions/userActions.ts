'use server';

import { apiFetch } from "@/lib/api/baseApi";
import { Post } from "../model/UserModel";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export async function getUsers(): Promise<Post[]> {
    try {
     const response = await apiFetch<{posts : Post[]}>({
        endpoint :API_ENDPOINTS.posts.getAll,
        cache: 'no-store'
    });
    
      if (!response?.posts || response.posts.length === 0) {
      console.log('----No posts available-----');
      return [];
    }
    return response.posts;
    } catch(error){
    console.error('Error fetching posts:', error);
    return [];
    }
    
}