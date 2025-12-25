export interface Room {
  idx: number;
  room_id: string;
  property_id: string;
  room_number: string;
  rent_amount: number;
  security_deposit: number;
  room_type: "single" | "double" | "shared" | string;
  is_occupied: boolean;
  created_at: string;  
  updated_at: string;   
  attributes: string[];
  description: string;
}
