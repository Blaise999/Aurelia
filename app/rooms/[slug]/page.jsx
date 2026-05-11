import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import RoomDetailClient from "./RoomDetailClient";
import { rooms, getRoomBySlug } from "@/lib/data";

export async function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const room = getRoomBySlug(params.slug);
  if (!room) return { title: "Room not found" };
  return {
    title: `${room.name} — Aurelia Hotel`,
    description: room.short,
  };
}

export default function RoomDetailPage({ params }) {
  const room = getRoomBySlug(params.slug);
  if (!room) notFound();

  const similar = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  return (
    <main>
      <Navbar />
      <RoomDetailClient room={room} similar={similar} />
      <Footer />
      <MobileBottomCTA />
      <FloatingWhatsApp />
    </main>
  );
}
