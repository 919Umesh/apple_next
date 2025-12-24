import { apiFetch } from "@/lib/api/baseApi";
import { ProductsResponse, Product } from "./model";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiFetch<ProductsResponse>({
      endpoint: "https://dummyjson.com/products",
    });
    return response.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: number): Promise<Product> {
  try {
    const product = await apiFetch<Product>({
      endpoint: `https://dummyjson.com/products/${id}`,
    });
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}