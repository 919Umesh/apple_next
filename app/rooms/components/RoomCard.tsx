import { Room } from "../model/RoomModel";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Room {room.room_number}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            room.is_occupied
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {room.is_occupied ? "Occupied" : "Available"}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
        {room.description}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-gray-500">Room Type</p>
          <p className="font-medium capitalize">{room.room_type}</p>
        </div>

        <div>
          <p className="text-gray-500">Rent</p>
          <p className="font-medium">₹ {room.rent_amount.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-gray-500">Security Deposit</p>
          <p className="font-medium">
            ₹ {room.security_deposit.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Property ID</p>
          <p className="font-medium truncate">{room.property_id}</p>
        </div>
      </div>

      {/* Attributes */}
      {room.attributes?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {room.attributes.map((attr, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md"
            >
              {attr}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          Created: {new Date(room.created_at).toLocaleDateString()}
        </span>
        <span>
          Updated: {new Date(room.updated_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
