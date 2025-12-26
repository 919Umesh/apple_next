'use server';

import { SupabaseService } from "@/lib/api/supabaseService";
import { Property } from "../model/PropertiesModel";

export async function getProperties(): Promise<Property[]> {
  const response = await SupabaseService.fetchData<Property>({
    tableName: "property_with_images",
  });

  if (response.error) {
    console.error("Supabase error:", response.message);
    return [];
  }

  return response.data;
}