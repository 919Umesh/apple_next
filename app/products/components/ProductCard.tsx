// app/products/components/ProductCard.tsx
import { Product } from "../model";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image - Using regular img tag */}
      <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-900">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discountPercentage}%
          </div>
        )}
      </div>

      {/* Rest of your component remains the same */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
          <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded">
            {product.category}
          </span>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-sm text-zinc-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex justify-between text-sm text-zinc-500">
          <span>Stock: {product.stock}</span>
          <span>{product.brand}</span>
        </div>
      </div>
    </div>
  );
}