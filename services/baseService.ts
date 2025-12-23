import { useFetch, useMutation } from '@/hooks';
import { ApiRequest } from '@/types/api.types';

export abstract class BaseService {
  protected baseEndpoint: string;

  constructor(baseEndpoint: string) {
    this.baseEndpoint = baseEndpoint;
  }

  // GET all items
  useGetAll<T = any>(params?: any) {
    return useFetch<T[]>(this.baseEndpoint, { params });
  }

  // GET single item by ID
  useGetById<T = any>(id: string | number) {
    return useFetch<T>(`${this.baseEndpoint}/${id}`);
  }

  // POST create item
  useCreate<T = any, R = T>() {
    return useMutation<T, R>(this.baseEndpoint, 'POST');
  }

  // PUT update item
  useUpdate<T = any, R = T>(id?: string | number) {
    const endpoint = id ? `${this.baseEndpoint}/${id}` : this.baseEndpoint;
    return useMutation<T, R>(endpoint, 'PUT');
  }

  // DELETE item
  useDelete<T = any>(id: string | number) {
    return useMutation<void, T>(`${this.baseEndpoint}/${id}`, 'DELETE');
  }

  // PATCH partial update
  usePatch<T = any, R = T>(id: string | number) {
    return useMutation<T, R>(`${this.baseEndpoint}/${id}`, 'PATCH');
  }

  // Custom query
  useCustomQuery<T = any>(endpoint: string, options?: any) {
    const fullEndpoint = `${this.baseEndpoint}${endpoint}`;
    return useFetch<T>(fullEndpoint, options);
  }

  // Custom mutation
  useCustomMutation<T = any, R = any>(
    endpoint: string,
    method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST'
  ) {
    const fullEndpoint = `${this.baseEndpoint}${endpoint}`;
    return useMutation<T, R>(fullEndpoint, method);
  }
}