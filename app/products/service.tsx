'use client';

import { productService, Product, CreateProductDto } from '@/services/productService';

// Re-export types
export type { Product, CreateProductDto };

// Custom hooks for products
export function useProducts() {
  return productService.useGetAll<Product>();
}

export function useProductById(id: number) {
  return productService.useGetById<Product>(id);
}

export function useCreateProduct() {
  return productService.useCreate<CreateProductDto, Product>();
}

export function useUpdateProduct(id: number) {
  return productService.useUpdate<Partial<CreateProductDto>, Product>(id);
}

export function useDeleteProduct(id: number) {
  return productService.useDelete<Product>(id);
}

export function useProductsByCategory(category: string) {
  return productService.useProductsByCategory(category);
}