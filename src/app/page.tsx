"use client";
import RoomAllocation from "@/components/organisms/RoomAllocation";
import { getDefaultRoomAllocation } from "@/utils/roomHelpers";
import { useState } from "react";
import { testData } from "@/data/roomAllocation";

const guestDescription = testData[0].input.guest;
const roomDescriptions = testData[0].input.rooms;

export default function Home() {
  const [guest] = useState(guestDescription);
  const [rooms, setRooms] = useState(getDefaultRoomAllocation(guestDescription, roomDescriptions))
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-500px h-full bg-white">
        <RoomAllocation guest={guest} rooms={rooms} onChange={setRooms} />
      </div>
    </main>
  );
}
