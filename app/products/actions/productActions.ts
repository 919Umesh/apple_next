'use server';

import { apiFetch } from '@/lib/api/baseApi';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { Product } from '../model/ProductModel';
import { revalidatePath } from 'next/cache';


export async function getProducts(): Promise<Product[]> {
  const res = await apiFetch<{ products: Product[] }>({
    endpoint: API_ENDPOINTS.products.getAll,
    cache: 'no-store',
  });

  return res.products;
}


export async function createProduct(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title || !title.trim()) {
    return { success: false, error: 'Title is required' };
  }

  await apiFetch({
    endpoint: API_ENDPOINTS.products.create,
    method: 'POST',
    body: { title },
  });

  revalidatePath('/products');

  return { success: true };
}
