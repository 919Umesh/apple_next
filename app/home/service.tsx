import { apiFetch } from "@/lib/api/baseApi";
import { Post } from "./model";

export async function getHomePosts(): Promise<Post[]> {
  return apiFetch<Post[]>({
    endpoint: "https://jsonplaceholder.typicode.com/posts?_limit=5",
  });
}
