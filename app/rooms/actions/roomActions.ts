'use server';

import { SupabaseService } from "@/lib/api/supabaseService";
import { Room } from "../model/RoomModel";

export async function getRooms(): Promise<Room[]> {
  const response = await SupabaseService.fetchData<Room>({
    tableName: "rooms",
  });

  if (response.error) {
    console.error("Supabase error:", response.message);
    return [];
  }

  return response.data;
}
