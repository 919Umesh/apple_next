// lib/api/endpoints.ts
export const API_ENDPOINTS = {
  // Products endpoints
  products: {
    getAll: 'https://dummyjson.com/products',
    getById: (id: number) => `https://dummyjson.com/products/${id}`,
    create: 'https://dummyjson.com/products/add',
    update: (id: number) => `https://dummyjson.com/products/${id}`,
    delete: (id: number) => `https://dummyjson.com/products/${id}`,
    search: (query: string) => `https://dummyjson.com/products/search?q=${query}`,
  },
  
  posts: {
    getAll: 'https://dummyjson.com/posts',
    getById: (id: number) => `https://dummyjson.com/posts/${id}`,
    create: 'https://dummyjson.com/posts/add',
    update: (id: number) => `https://dummyjson.com/posts/${id}`,
    delete: (id: number) => `https://dummyjson.com/posts/${id}`,
    search: (query: string) => `https://dummyjson.com/posts/search?q=${query}`,
  },
  

} as const;