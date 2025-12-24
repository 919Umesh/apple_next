import { getProducts } from "./service";
import ProductCard from "./components/ProductCard";
import AddProductForm from "./components/AddProductForm";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Management</h1>
        <p className="text-zinc-600">Manage your products</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          All Products ({products.length})
        </h2>

        <AddProductForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
