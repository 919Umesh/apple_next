'use server';

import { apiFetch } from '@/lib/api/baseApi';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  const title = formData.get('title') as string;
  
  if (!title?.trim()) {
    return { success: false, error: 'Title is required' };
  }

  try {
    await apiFetch({
      endpoint: 'https://dummyjson.com/products/add',
      method: 'POST',
      body: { title },
    });

    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}