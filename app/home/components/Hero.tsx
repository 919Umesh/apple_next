'use client';

import { useHomePosts, useCreatePost, useDeletePost } from '../service';
import { useState } from 'react';

export default function Hero() {
  // Fetch posts
  const { data: posts, loading, error, refetch } = useHomePosts();
  
  // Create post mutation
  const { mutate: createPost, loading: creating } = useCreatePost();
  
  // Delete post mutation
  const { mutate: deletePost } = useDeletePost(0); // ID will be passed dynamically
  
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  const handleCreate = async () => {
    try {
      await createPost({
        ...newPost,
        userId: 1,
      });
      setNewPost({ title: '', body: '' });
      refetch(); // Refresh the list
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await deletePost(undefined, `/posts/${id}`);
        refetch();
      } catch (err) {
        console.error('Failed to delete post:', err);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading posts...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      
      {/* Create Post Form */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Body"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <button
            onClick={handleCreate}
            disabled={creating || !newPost.title || !newPost.body}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            {creating ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div className="grid gap-4">
        {posts?.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.body}</p>
              </div>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}