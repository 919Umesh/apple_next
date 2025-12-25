type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequest<T> {
  endpoint: string;
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
}

export async function apiFetch<T>({
  endpoint,
  method = "GET",
  body,
  headers = {},
  cache = "no-store",
}: ApiRequest<T>): Promise<T> {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const res = await fetch(endpoint, {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `API Error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}