import { getHomePosts } from "./service";

export default async function HomePage() {
  const posts = await getHomePosts();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-zinc-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
