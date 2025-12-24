// app/products/components/AddPostForm.tsx (create this file)
'use client';

import { useState } from 'react';
import { useCreatePost } from '../hooks/useCreatePost';

export default function AddPostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { createPost, isLoading, isError, error, isSuccess } = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    // Create post with dummy data (userId: 5 as per your example)
    await createPost({
      title,
      userId: 5, // Hardcoded as per your example
      body, // Optional
    });

    // Reset form on success
    if (isSuccess) {
      setTitle('');
      setBody('');
    }
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium mb-1">
            Content (Optional)
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post content"
            rows={3}
            className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isLoading
                ? 'bg-zinc-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            } text-white`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating...
              </span>
            ) : (
              'Create Post'
            )}
          </button>

          {/* Status Messages */}
          {isSuccess && (
            <span className="text-emerald-600 dark:text-emerald-400 text-sm">
              ✓ Post created successfully!
            </span>
          )}
          
          {isError && error && (
            <span className="text-red-600 dark:text-red-400 text-sm">
              ✗ Error: {error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}