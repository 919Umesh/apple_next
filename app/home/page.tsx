import { getUsers } from './actions/userActions';
import UserTile from './components/UserTile';

export default async function HomePage() {
  const posts = await getUsers(); 

  if (!posts || posts.length === 0) {
    return (
      <main className="p-6">
        <p className="text-gray-500">No posts available.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
         <li key={post.id}>
           <UserTile title={post.title} bodyText={post.body} />
         </li>
        ))}
      </ul>
    </main>
  );
}
