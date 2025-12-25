'use client';

import { useProductHook } from '../hooks/useProductHook';

export default function AddPostForm() {
  const { loading, message, submit } = useProductHook();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const success = await submit(formData);

    if (success) {
      form.reset(); // ✅ clear all input fields
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3 items-start">
      <input
        name="title"
        required
        placeholder="Product title"
        className="flex-1 border border-zinc-300 rounded px-4 py-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Creating…' : 'Create'}
      </button>

      {message && (
        <span className="text-sm text-zinc-600 mt-2 block">
          {message}
        </span>
      )}
    </form>
  );
}
