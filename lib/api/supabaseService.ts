import { supabase } from "./supabaseClient";

/* ======================================================
   RESULT TYPES (Discriminated Union)
====================================================== */
export type SupabaseSuccess<T> = {
  error: false;
  data: T;
};

export type SupabaseFailure = {
  error: true;
  message: string;
  code?: string;
};

export type SupabaseResult<T> = SupabaseSuccess<T> | SupabaseFailure;

/* ======================================================
   FETCH PARAMS
====================================================== */
type FetchParams = {
  tableName: string;
  filterColumn?: string;
  filterValue?: any;
  limit?: number;
  columns?: string[];
};

/* ======================================================
   SUPABASE BASE SERVICE
====================================================== */
export class SupabaseService {
  /* ===================== GET (LIST) ===================== */
  static async fetchData<T>({
    tableName,
    filterColumn,
    filterValue,
    limit,
    columns,
  }: FetchParams): Promise<SupabaseResult<T[]>> {
    try {
      let query = supabase
        .from(tableName)
        .select(columns?.join(",") ?? "*");

      if (filterColumn && filterValue !== undefined) {
        query = query.eq(filterColumn, filterValue);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      return {
        error: false,
        data: data as T[],
      };
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  /* ===================== GET (SINGLE) ===================== */
  static async fetchSingle<T>(
    tableName: string,
    columnName: string,
    columnValue: any,
    columns?: string[]
  ): Promise<SupabaseResult<T>> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select(columns?.join(",") ?? "*")
        .eq(columnName, columnValue)
        .single();

      if (error) throw error;

      return {
        error: false,
        data: data as T,
      };
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  /* ===================== INSERT ===================== */
  static async insertData<T>(
    tableName: string,
    payload: Record<string, any>
  ): Promise<SupabaseResult<T>> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      return {
        error: false,
        data: data as T,
      };
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  /* ===================== UPDATE ===================== */
  static async updateData<T>(
    tableName: string,
    columnName: string,
    columnValue: any,
    payload: Record<string, any>
  ): Promise<SupabaseResult<T[]>> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update(payload)
        .eq(columnName, columnValue)
        .select();

      if (error) throw error;

      return {
        error: false,
        data: data as T[],
      };
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  /* ===================== DELETE ===================== */
  static async deleteData(
    tableName: string,
    columnName: string,
    columnValue: any
  ): Promise<SupabaseResult<null>> {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq(columnName, columnValue);

      if (error) throw error;

      return {
        error: false,
        data: null,
      };
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  /* ===================== ERROR HANDLER ===================== */
  private static handleError(error: any): SupabaseFailure {
    return {
      error: true,
      message: error?.message ?? "Unexpected Supabase error",
      code: error?.code,
    };
  }
}
