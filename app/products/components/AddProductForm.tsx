"use client";

import { createProduct } from "../actions";

export default function AddProductForm() {
  return (
    <form action={createProduct} className="flex gap-2">
      <input
        name="title"
        placeholder="Product title"
        className="border px-3 py-2 rounded"
        required
      />

      <button
        type="submit"
        className="px-4 py-2 bg-emerald-600 text-white rounded"
      >
        Add Product
      </button>
    </form>
  );
}
