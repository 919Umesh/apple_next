'use client';

import { useState } from 'react';
import { createProduct } from '../actions/productActions';

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await createProduct(formData);
      
      if (result.success) {
        setSuccess(true);
        const form = document.getElementById('product-form') as HTMLFormElement;
        form?.reset();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Failed to create product');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Add New Product</h3>
      
      <form id="product-form" action={handleSubmit} className="flex gap-2">
        <input
          name="title"
          placeholder="Product title"
          className="flex-1 min-w-0 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
          required
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isLoading ? 'bg-zinc-400' : 'bg-emerald-600 hover:bg-emerald-700'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </form>

      <div className="mt-2 min-h-6">
        {success && (
          <span className="text-emerald-600 dark:text-emerald-400 text-sm">
            ✓ Product added successfully!
          </span>
        )}
        {error && (
          <span className="text-red-600 dark:text-red-400 text-sm">
            ✗ {error}
          </span>
        )}
      </div>
    </div>
  );
}