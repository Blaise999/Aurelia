"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import BookingTable from "@/components/admin/BookingTable";
import { mockBookings } from "@/lib/data";

const filters = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "confirmed", label: "Confirmed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = { all: mockBookings.length };
    for (const b of mockBookings) {
      c[b.status] = (c[b.status] || 0) + 1;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    let list = mockBookings;
    if (filter !== "all") list = list.filter((b) => b.status === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.guestName.toLowerCase().includes(q) ||
          b.roomName.toLowerCase().includes(q) ||
          b.phone.includes(q)
      );
    }
    return list;
  }, [filter, query]);

  return (
    <div className="px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="kicker text-gold-600">— Reservations</p>
          <h1 className="display mt-3 text-4xl md:text-5xl text-forest-800">
            Bookings
          </h1>
          <p className="mt-2 text-ink-muted">
            All booking requests received through the website.
          </p>
        </motion.div>

        {/* Filters + search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    active
                      ? "bg-forest-800 text-cream-100"
                      : "bg-cream-50 border border-cream-300 text-ink-muted hover:border-forest-700/30 hover:text-forest-800"
                  }`}
                >
                  {f.label}
                  {counts[f.key] !== undefined && (
                    <span className={`ml-2 ${active ? "text-gold-400" : "text-ink-muted/60"}`}>
                      {counts[f.key]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="relative ml-auto w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ID, name, room…"
              className="w-full rounded-full bg-cream-50 border border-cream-300 pl-10 pr-4 py-2 text-sm text-forest-800 placeholder:text-ink-muted/60 focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30 transition-all"
            />
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BookingTable bookings={filtered} />
          <p className="mt-4 text-xs text-ink-muted">
            Showing {filtered.length} of {mockBookings.length} bookings.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
