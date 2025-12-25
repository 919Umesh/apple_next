import { getProducts } from './actions/productActions';
import AddPostForm from './components/AddPostForm';
import ProductCard from './components/ProductCard';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      <AddPostForm />
      
      {products.length === 0 ? (
        <p className="text-zinc-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
