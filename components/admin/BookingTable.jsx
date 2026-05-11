"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, MessageCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { buildWhatsAppLink } from "@/lib/data";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatRelative(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function BookingTable({ bookings, showActions = true }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-cream-50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream-100 border-b border-cream-300">
            <tr className="text-left">
              <th className="px-5 py-4 kicker font-normal">Booking</th>
              <th className="px-5 py-4 kicker font-normal">Guest</th>
              <th className="px-5 py-4 kicker font-normal">Room</th>
              <th className="px-5 py-4 kicker font-normal">Stay</th>
              <th className="px-5 py-4 kicker font-normal">Status</th>
              <th className="px-5 py-4 kicker font-normal">Received</th>
              {showActions && <th className="px-5 py-4 kicker font-normal text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-300">
            {bookings.map((b, idx) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="hover:bg-cream-100/60 transition-colors"
              >
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/bookings/${b.id}`}
                    className="text-forest-800 font-medium hover:text-forest-600"
                  >
                    {b.id}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <p className="text-forest-800">{b.guestName}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{b.phone}</p>
                </td>
                <td className="px-5 py-4 text-forest-800">{b.roomName}</td>
                <td className="px-5 py-4">
                  <p className="text-forest-800">
                    {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {b.nights} {b.nights === 1 ? "night" : "nights"} · {b.guests}{" "}
                    {b.guests === 1 ? "guest" : "guests"}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={b.status} />
                </td>
                <td className="px-5 py-4 text-ink-muted text-xs">
                  {formatRelative(b.createdAt)}
                </td>
                {showActions && (
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`tel:${b.phone.replace(/\s/g, "")}`}
                        className="h-8 w-8 rounded-full bg-forest-800/5 hover:bg-forest-800/10 flex items-center justify-center text-forest-700 transition-colors"
                        title="Call"
                      >
                        <Phone className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={buildWhatsAppLink(
                          `Hello ${b.guestName.split(" ")[0]}, this is Aurelia Hotel regarding your booking ${b.id}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 rounded-full bg-gold-500/10 hover:bg-gold-500/20 flex items-center justify-center text-gold-700 transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                      </a>
                      <Link
                        href={`/admin/bookings/${b.id}`}
                        className="h-8 w-8 rounded-full bg-forest-800/5 hover:bg-forest-800/10 flex items-center justify-center text-forest-700 transition-colors"
                        title="View"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {bookings.length === 0 && (
        <div className="p-12 text-center text-ink-muted">
          <p>No bookings to show.</p>
        </div>
      )}
    </div>
  );
}
