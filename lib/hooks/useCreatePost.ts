"use client";

import { useState } from "react";

interface CreatePostPayload {
  title: string;
  userId: number;
}

export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createPost(payload: CreatePostPayload) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create post");

      return await res.json();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { createPost, loading, error };
}
