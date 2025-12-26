export enum PropertyType {
  ROOM = "room",
  APARTMENT = "apartment",
  HOUSE = "house",
  COMMERCIAL = "commercial"
}

export enum FurnishingStatus {
  FURNISHED = "furnished",
  SEMI_FURNISHED = "semi_furnished",
  UNFURNISHED = "unfurnished"
}

export interface Property {
  idx: number;
  property_id: string;
  landlord_id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  property_type: PropertyType | string;
  furnishing_status: FurnishingStatus | string;
  area_sqft: number;
  available_from: string | null;
  is_active: boolean;
  updated_at: string;
  created_at: string;
  area_id: string;
  attributes: string[];
  images: string[];
}