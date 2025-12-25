'use client';

import { useState, useEffect } from 'react';
import ProductCard from "./components/ProductCard";
import AddProductForm from "./components/AddProductForm";
import AddPostForm from "./components/AddPostForm";
import { usePosts } from './hooks/useCreatePost';
import { Product } from './model';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { getProducts, isLoading, error } = usePosts();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        // Error is handled in the hook
      }
    };
    
    fetchProducts();
  }, [getProducts]);

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></span>
            <div className="text-lg">Loading products...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Management</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your products and create posts
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
        <AddPostForm />
      </section>

      <section>
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-semibold">
            All Products ({products.length})
          </h2>
          <AddProductForm />
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <p className="text-zinc-500 dark:text-zinc-400">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}