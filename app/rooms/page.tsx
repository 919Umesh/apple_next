import { getRooms } from "./actions/roomActions";
import RoomCard from "./components/RoomCard";

export default async function RoomPage() {
  const rooms = await getRooms();

  if (!rooms || rooms.length === 0) {
    return (
      <main className="p-6">
        <p className="text-gray-500">No rooms available.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <li key={room.room_id}>
            <RoomCard room={room} />
          </li>
        ))}
      </ul>
    </main>
  );
}
