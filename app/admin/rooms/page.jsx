"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Edit3, Plus, ArrowUpRight, BedDouble, Users } from "lucide-react";
import { rooms, formatNGN } from "@/lib/data";

export default function AdminRoomsPage() {
  const [activeStates, setActiveStates] = useState(
    Object.fromEntries(rooms.map((r) => [r.slug, true]))
  );

  return (
    <div className="px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-4 mb-8"
        >
          <div>
            <p className="kicker text-gold-600">— Inventory</p>
            <h1 className="display mt-3 text-4xl md:text-5xl text-forest-800">
              Rooms
            </h1>
            <p className="mt-2 text-ink-muted">
              {rooms.length} room types listed on the public website.
            </p>
          </div>
          <button className="group inline-flex items-center gap-2 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-6 py-3 text-sm tracking-wide transition-colors">
            <Plus className="h-4 w-4" />
            Add room type
          </button>
        </motion.div>

        {/* Rooms list */}
        <div className="space-y-4">
          {rooms.map((room, idx) => {
            const active = activeStates[room.slug];
            return (
              <motion.div
                key={room.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl border border-cream-300 bg-cream-50 overflow-hidden hover:border-forest-700/20 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-5">
                  {/* Image */}
                  <div className="relative w-full md:w-48 aspect-[4/3] md:aspect-square rounded-xl overflow-hidden bg-cream-200 shrink-0">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {room.featured && (
                      <span className="absolute top-2 left-2 rounded-full bg-gold-500 text-forest-900 text-[10px] uppercase tracking-wider px-2 py-0.5">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-baseline gap-3 mb-2">
                        <h3 className="display text-2xl text-forest-800">
                          {room.name}
                        </h3>
                        <span className="kicker text-gold-600">
                          {room.tier}
                        </span>
                      </div>
                      <p className="text-sm text-ink-muted line-clamp-2">
                        {room.short}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <BedDouble className="h-3.5 w-3.5" />
                          {room.bedType}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {room.capacity}{" "}
                          {room.capacity === 1 ? "guest" : "guests"}
                        </span>
                        <span>{room.sizeSqm} sqm</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="kicker text-ink-muted/60">
                          Per night
                        </p>
                        <p className="display text-2xl text-forest-800">
                          {formatNGN(room.pricePerNight)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Active toggle */}
                        <button
                          onClick={() =>
                            setActiveStates({
                              ...activeStates,
                              [room.slug]: !active,
                            })
                          }
                          className="flex items-center gap-2 rounded-full bg-cream-100 border border-cream-300 px-3 py-2 text-xs text-forest-800 hover:border-forest-700/30 transition-colors"
                        >
                          <span
                            className={`h-4 w-7 rounded-full relative transition-colors ${
                              active ? "bg-forest-700" : "bg-cream-300"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 h-3 w-3 rounded-full bg-cream-100 transition-transform ${
                                active ? "translate-x-3.5" : "translate-x-0.5"
                              }`}
                            />
                          </span>
                          {active ? "Visible" : "Hidden"}
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-full bg-cream-100 border border-cream-300 hover:border-forest-700/30 text-forest-800 px-4 py-2 text-xs transition-colors">
                          <Edit3 className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <Link
                          href={`/rooms/${room.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-2 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-100 px-4 py-2 text-xs transition-colors"
                        >
                          View
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-ink-muted">
          Note: This is a demo interface. Edits are not persisted.
        </p>
      </div>
    </div>
  );
}
