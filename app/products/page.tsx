import { getProducts } from "./service";
import ProductCard from "./components/ProductCard";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Product Management
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your products, inventory, and pricing
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">All Products ({products.length})</h2>
          <p className="text-sm text-zinc-500">Showing all available products</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
          Add New Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Product Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-lg mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-lg mb-2">Average Rating</h3>
          <p className="text-3xl font-bold">
            {(products.reduce((acc, product) => acc + product.rating, 0) / products.length).toFixed(1)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-lg mb-2">Total Categories</h3>
          <p className="text-3xl font-bold">
            {new Set(products.map(p => p.category)).size}
          </p>
        </div>
      </div>
    </main>
  );
}