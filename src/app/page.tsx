"use client";
import RoomAllocation from "@/components/organisms/RoomAllocation";
import { getDefaultRoomAllocation } from "@/utils/roomHelpers";
import { useState } from "react";

const guestDescription = { adult: 7, child: 3 };

const roomDescriptions = [
  { id: 1, roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
  { id: 2, roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
  { id: 3, roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
  { id: 4, roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
];

export default function Home() {
  const [guest, setGuest] = useState(guestDescription);
  const [rooms, setRooms] = useState(getDefaultRoomAllocation(guestDescription, roomDescriptions))
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-500px h-full bg-white">
        <RoomAllocation guest={guest} rooms={rooms} onChange={setRooms} />
      </div>
    </main>
  );
}
