import { BaseService } from './baseService';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostDto {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostDto {
  title?: string;
  body?: string;
}

class HomeService extends BaseService {
  constructor() {
    super('/posts'); // Base endpoint for posts
  }

  // Custom methods for home module
  useFeaturedPosts() {
    return this.useCustomQuery<Post[]>('/featured', {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
  }

  usePostsByUser(userId: number) {
    return this.useCustomQuery<Post[]>(`/user/${userId}`);
  }

  useSearchPosts(keyword: string) {
    return this.useCustomQuery<Post[]>('/search', {
      params: { q: keyword },
      enabled: !!keyword, // Only fetch if keyword exists
    });
  }
}

export const homeService = new HomeService();