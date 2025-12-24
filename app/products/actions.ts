"use server";

import { apiFetch } from "@/lib/api/baseApi";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;

  await apiFetch({
    endpoint: "https://dummyjson.com/products/add",
    method: "POST",
    body: {
      title,
    },
  });

  // Refresh product list
  revalidatePath("/products");
}
