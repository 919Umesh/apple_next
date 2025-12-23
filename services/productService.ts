import { BaseService } from './baseService';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}

class ProductService extends BaseService {
  constructor() {
    super('/products');
  }

  // Custom methods for products
  useProductsByCategory(category: string) {
    return this.useCustomQuery<Product[]>(`/category/${category}`);
  }

  useProductsOnSale() {
    return this.useCustomQuery<Product[]>('/sale', {
      cache: 'no-store',
    });
  }

  useUpdateStock(productId: number, quantity: number) {
    return this.useCustomMutation<{ quantity: number }, Product>(
      `/${productId}/stock`,
      'PATCH'
    );
  }

  useBulkDelete(productIds: number[]) {
    return this.useCustomMutation<{ ids: number[] }, { deleted: number }>(
      '/bulk-delete',
      'DELETE'
    );
  }
}

export const productService = new ProductService();