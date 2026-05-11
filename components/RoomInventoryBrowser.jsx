"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BedDouble, Maximize2, Eye } from "lucide-react";
import { roomInventory, formatNGN, rooms as roomTypes } from "@/lib/data";

const floors = [
  { key: "all", label: "All floors" },
  { key: "1", label: "Ground" },
  { key: "2", label: "Floor 2" },
  { key: "3", label: "Floor 3" },
  { key: "4", label: "Floor 4" },
  { key: "5", label: "Top floor" },
];

const statusBadges = {
  available: "bg-forest-700/10 text-forest-700 border-forest-700/30",
  held: "bg-gold-500/15 text-gold-700 border-gold-500/30",
  occupied: "bg-cream-200 text-ink-muted border-cream-300",
};

const statusLabels = {
  available: "Available",
  held: "On hold",
  occupied: "Occupied",
};

export default function RoomInventoryBrowser() {
  const [floor, setFloor] = useState("all");
  const [type, setType] = useState("all");
  const [showOccupied, setShowOccupied] = useState(true);

  const filtered = useMemo(() => {
    return roomInventory.filter((r) => {
      if (floor !== "all" && String(r.floor) !== floor) return false;
      if (type !== "all" && r.typeSlug !== type) return false;
      if (!showOccupied && r.status === "occupied") return false;
      return true;
    });
  }, [floor, type, showOccupied]);

  return (
    <section className="bg-cream-50 px-6 md:px-10 py-20 md:py-28 border-y border-cream-300">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="kicker text-gold-600">— Room inventory</p>
            <h2 className="display mt-3 text-4xl md:text-6xl text-forest-800 leading-[1.05]">
              Browse all {roomInventory.length} rooms.
            </h2>
            <p className="mt-4 text-ink-muted max-w-xl leading-relaxed">
              Pick a specific room by floor or category. Each one has its own view, light, and price.
            </p>
          </div>
          <div className="text-sm text-ink-muted">
            <span className="display text-3xl text-forest-800 block leading-none">
              {filtered.length}
            </span>
            <span className="text-xs uppercase tracking-wider mt-1 block">
              {filtered.length === 1 ? "room shown" : "rooms shown"}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-10">
          {/* Floor filter */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-ink-muted/60 mb-2">
              Floor
            </p>
            <div className="flex flex-wrap gap-2">
              {floors.map((f) => {
                const active = floor === f.key;
                const count =
                  f.key === "all"
                    ? roomInventory.length
                    : roomInventory.filter((r) => String(r.floor) === f.key).length;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFloor(f.key)}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      active
                        ? "bg-forest-800 text-cream-100"
                        : "bg-cream-100 border border-cream-300 text-ink-muted hover:border-forest-700/30 hover:text-forest-800"
                    }`}
                  >
                    {f.label}
                    <span className={`ml-2 text-xs ${active ? "text-gold-400" : "text-ink-muted/60"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Type filter */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-ink-muted/60 mb-2">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setType("all")}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  type === "all"
                    ? "bg-forest-800 text-cream-100"
                    : "bg-cream-100 border border-cream-300 text-ink-muted hover:border-forest-700/30 hover:text-forest-800"
                }`}
              >
                All categories
                <span className={`ml-2 text-xs ${type === "all" ? "text-gold-400" : "text-ink-muted/60"}`}>
                  {roomInventory.length}
                </span>
              </button>
              {roomTypes.map((t) => {
                const active = type === t.slug;
                const count = roomInventory.filter((r) => r.typeSlug === t.slug).length;
                return (
                  <button
                    key={t.slug}
                    onClick={() => setType(t.slug)}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      active
                        ? "bg-forest-800 text-cream-100"
                        : "bg-cream-100 border border-cream-300 text-ink-muted hover:border-forest-700/30 hover:text-forest-800"
                    }`}
                  >
                    {t.name}
                    <span className={`ml-2 text-xs ${active ? "text-gold-400" : "text-ink-muted/60"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Show occupied toggle */}
          <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-ink-muted">
            <span
              className={`relative h-4 w-7 rounded-full transition-colors ${
                showOccupied ? "bg-forest-700" : "bg-cream-300"
              }`}
              onClick={() => setShowOccupied(!showOccupied)}
            >
              <span
                className={`absolute top-0.5 h-3 w-3 rounded-full bg-cream-100 transition-transform ${
                  showOccupied ? "translate-x-3.5" : "translate-x-0.5"
                }`}
              />
            </span>
            <span onClick={() => setShowOccupied(!showOccupied)}>
              Show currently occupied rooms
            </span>
          </label>
        </div>

        {/* Inventory grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((room, idx) => (
              <RoomInventoryCard key={room.slug} room={room} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-cream-300 bg-cream-100 p-12 text-center">
            <p className="text-ink-muted">No rooms match your filters.</p>
            <button
              onClick={() => {
                setFloor("all");
                setType("all");
                setShowOccupied(true);
              }}
              className="mt-4 text-sm text-gold-600 hover:text-gold-700 underline-offset-4 hover:underline"
            >
              Clear filters →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function RoomInventoryCard({ room, index }) {
  const [imgIdx, setImgIdx] = useState(0);
  const isAvailable = room.status === "available";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.025, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group rounded-2xl bg-cream-100 border border-cream-300 overflow-hidden hover:border-forest-700/30 transition-all ${
        !isAvailable ? "opacity-80" : ""
      }`}
    >
      {/* Image carousel */}
      <div
        className="relative aspect-[4/3] bg-cream-200 overflow-hidden"
        onMouseLeave={() => setImgIdx(0)}
      >
        {room.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${room.name} — view ${i + 1}`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === imgIdx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Image thumbnail strip — appears on hover */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {room.images.map((_, i) => (
            <button
              key={i}
              onMouseEnter={() => setImgIdx(i)}
              onClick={(e) => {
                e.preventDefault();
                setImgIdx(i);
              }}
              className={`flex-1 h-1 rounded-full transition-colors ${
                i === imgIdx ? "bg-cream-100" : "bg-cream-100/40 hover:bg-cream-100/70"
              }`}
              aria-label={`Show image ${i + 1}`}
            />
          ))}
        </div>

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="rounded-full bg-cream-100/95 backdrop-blur text-forest-800 text-[10px] uppercase tracking-wider px-3 py-1">
            {room.floorLabel}
          </span>
        </div>

        {/* Top-right status */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur ${statusBadges[room.status]}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                room.status === "available"
                  ? "bg-forest-700"
                  : room.status === "held"
                    ? "bg-gold-600"
                    : "bg-ink-muted"
              }`}
            />
            {statusLabels[room.status]}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="display text-2xl text-forest-800 leading-none">
            Room {room.number}
          </h3>
          <span className="text-[10px] uppercase tracking-wider text-gold-600">
            {room.typeName}
          </span>
        </div>
        <p className="text-sm text-ink-muted mt-1">{room.view}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="h-3 w-3" />
            {room.bedType}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Maximize2 className="h-3 w-3" />
            {room.sizeSqm}m²
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="h-3 w-3" />
            Sleeps {room.capacity}
          </span>
        </div>

        <div className="mt-5 pt-4 border-t border-cream-200 flex items-end justify-between">
          <div>
            <p className="display text-xl text-forest-800 leading-none">
              {formatNGN(room.pricePerNight)}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-ink-muted/70 mt-1">
              per night
            </p>
          </div>
          {isAvailable ? (
            <Link
              href={`/booking?roomType=${room.typeSlug}&roomNumber=${room.number}`}
              className="group/btn inline-flex items-center gap-1.5 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-4 py-2 text-xs transition-colors"
            >
              Reserve
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover/btn:rotate-45" />
            </Link>
          ) : (
            <Link
              href={`/rooms/${room.typeSlug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-cream-50 border border-cream-300 hover:border-forest-700/30 text-ink-muted px-4 py-2 text-xs transition-colors"
            >
              View category
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
