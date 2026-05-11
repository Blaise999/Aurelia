import { notFound } from "next/navigation";
import { roomNumbers } from "@/lib/data";
import RoomServiceClient from "./RoomServiceClient";

export function generateStaticParams() {
  return roomNumbers.map((room) => ({ room }));
}

export function generateMetadata({ params }) {
  return {
    title: `Room ${params.room} · Aurelia Room Service`,
  };
}

export default function RoomServicePage({ params }) {
  if (!roomNumbers.includes(params.room)) {
    notFound();
  }
  return <RoomServiceClient room={params.room} />;
}
