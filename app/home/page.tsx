import { getServerPosts } from './service';
import Hero from './components/Hero';

// Server Component - can fetch data directly
export default async function HomePage() {
  // Server-side fetch (for SEO, initial data)
  const initialPosts = await getServerPosts();
  
  return (
    <div>
      {/* Pass initial data to client component */}
      <Hero />
      
      {/* Server-rendered content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Server-Rendered Posts</h2>
        <div className="space-y-3">
          {initialPosts.slice(0, 3).map((post) => (
            <div key={post.id} className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.body.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}