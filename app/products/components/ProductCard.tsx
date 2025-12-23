'use client';

import { Product } from '../service';
import { useUpdateProduct, useDeleteProduct } from '../service';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { mutate: updateProduct, loading: updating } = useUpdateProduct(product.id);
  const { mutate: deleteProduct, loading: deleting } = useDeleteProduct(product.id);

  const handleUpdateStock = (increment: number) => {
    updateProduct({ stock: product.stock + increment });
  };

  const handleDelete = async () => {
    if (confirm(`Delete ${product.name}?`)) {
      try {
        await deleteProduct();
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          <div className="mt-2">
            <span className="font-bold text-blue-600">${product.price}</span>
            <span className="ml-4 text-sm bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleUpdateStock(-1)}
            disabled={product.stock <= 0 || updating}
            className="px-3 py-1 bg-gray-100 rounded text-sm"
          >
            -
          </button>
          <span className="px-2">{product.stock} in stock</span>
          <button
            onClick={() => handleUpdateStock(1)}
            disabled={updating}
            className="px-3 py-1 bg-gray-100 rounded text-sm"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{product.rating}</span>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}