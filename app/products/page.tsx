// app/products/page.tsx (update this file)
import { getProducts } from "./service";
import ProductCard from "./components/ProductCard";
import AddProductForm from "./components/AddProductForm";
import AddPostForm from "./components/AddProductForm"; // Add this import

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Management</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your products and create posts
        </p>
      </div>

      {/* Add Post Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
        <AddPostForm />
      </section>

      {/* Products Section */}
      <section>
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-semibold">
            All Products ({products.length})
          </h2>
          <AddProductForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}