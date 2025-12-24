// lib/api/endpoints.ts
export const API_ENDPOINTS = {
  products: {
    getAll: 'https://dummyjson.com/products',
    getById: (id: number) => `https://dummyjson.com/products/${id}`,
    create: 'https://dummyjson.com/products/add',  // For your dummy API
    // For real projects, it would be: 'https://dummyjson.com/posts/add'
  },
  // Add other endpoints here
} as const;