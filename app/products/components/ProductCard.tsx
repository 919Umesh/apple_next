import { Product } from '../model/ProductModel';

export default function ProductCard({ product }: { product: Product }) {
  const discounted =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="border rounded-lg overflow-hidden">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-zinc-500">{product.category}</p>

        <div className="mt-2">
          <span className="font-bold">${discounted.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <span className="ml-2 text-sm line-through text-zinc-400">
              ${product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
