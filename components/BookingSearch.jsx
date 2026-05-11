"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, BedDouble, Search } from "lucide-react";
import { rooms } from "@/lib/data";

export default function BookingSearch({ variant = "hero" }) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState("any");

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests,
      roomType,
    });
    router.push(`/rooms?${params.toString()}`);
  };

  const containerStyle =
    variant === "hero"
      ? "bg-cream-100/95 backdrop-blur shadow-2xl"
      : "bg-cream-100 border border-cream-300";

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl ${containerStyle} p-2 grid grid-cols-2 md:grid-cols-5 gap-1`}
    >
      <Field
        label="Check-in"
        icon={<Calendar className="w-4 h-4" />}
      >
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-ink focus:outline-none"
        />
      </Field>

      <Field
        label="Check-out"
        icon={<Calendar className="w-4 h-4" />}
      >
        <input
          type="date"
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-ink focus:outline-none"
        />
      </Field>

      <Field label="Guests" icon={<Users className="w-4 h-4" />}>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-ink focus:outline-none cursor-pointer"
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Room" icon={<BedDouble className="w-4 h-4" />}>
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-ink focus:outline-none cursor-pointer"
        >
          <option value="any">Any Room</option>
          {rooms.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name}
            </option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        className="col-span-2 md:col-span-1 rounded-xl bg-forest-700 hover:bg-forest-800 transition-colors text-cream-100 font-medium py-4 md:py-0 text-sm tracking-wide flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4" />
        Check Availability
      </button>
    </form>
  );
}

function Field({ label, icon, children }) {
  return (
    <label className="rounded-xl px-4 py-3 hover:bg-cream-200/50 transition-colors cursor-pointer block">
      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        {icon}
        {label}
      </span>
      <span className="block mt-1.5">{children}</span>
    </label>
  );
}
