import { apiFetch } from "@/lib/api/baseApi";
import { Post } from "./model";

export function getHomePosts() {
  return apiFetch<Post[]>({
    endpoint: `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?_limit=5`,
  });
}
