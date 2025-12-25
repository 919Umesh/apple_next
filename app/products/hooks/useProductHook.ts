'use client';

import { useState } from 'react';
import { createProduct } from '../actions/productActions';

export function useProductHook() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const res = await createProduct(formData);

    if (res.success) {
      setMessage('✓ Product created successfully');
    } else {
      setMessage(res.error ?? 'Failed to create product');
    }

    setLoading(false);
  }

  return {
    loading,
    message,
    submit,
  };
}
