"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  BedDouble,
  Calendar,
  Users,
  MessageSquare,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { mockBookings, getRoomBySlug, formatNGN, buildWhatsAppLink } from "@/lib/data";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BookingDetailPage({ params }) {
  const { id } = params;
  const booking = mockBookings.find((b) => b.id === id);
  const [status, setStatus] = useState(booking?.status || "new");

  if (!booking) {
    notFound();
  }

  const room = getRoomBySlug(booking.roomSlug);
  const total = room ? room.pricePerNight * booking.nights * booking.rooms : 0;

  return (
    <div className="px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-5xl">
        {/* Breadcrumb */}
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-forest-700 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to bookings
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-start justify-between gap-4 mb-8"
        >
          <div>
            <p className="kicker text-gold-600">— Booking</p>
            <h1 className="display mt-2 text-4xl md:text-5xl text-forest-800">
              {booking.id}
            </h1>
            <p className="mt-2 text-ink-muted">
              Received {formatDateTime(booking.createdAt)}
            </p>
          </div>
          <StatusBadge status={status} className="text-sm px-4 py-1.5" />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        >
          <a
            href={`tel:${booking.phone.replace(/\s/g, "")}`}
            className="group flex items-center gap-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-cream-100 px-5 py-4 text-sm transition-colors"
          >
            <Phone className="h-4 w-4 text-gold-400" />
            Call guest
          </a>
          <a
            href={buildWhatsAppLink(
              `Hello ${booking.guestName.split(" ")[0]}, this is Aurelia Hotel regarding your booking ${booking.id}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-forest-900 px-5 py-4 text-sm transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`mailto:${booking.email}`}
            className="group flex items-center gap-3 rounded-xl bg-cream-50 border border-cream-300 hover:border-forest-700/30 text-forest-800 px-5 py-4 text-sm transition-colors"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
          <button
            onClick={() => setStatus("contacted")}
            className="flex items-center gap-3 rounded-xl bg-cream-50 border border-cream-300 hover:border-forest-700/30 text-forest-800 px-5 py-4 text-sm transition-colors"
          >
            <Clock className="h-4 w-4" />
            Mark contacted
          </button>
        </motion.div>

        {/* Two-col grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Guest */}
            <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 md:p-7">
              <div className="flex items-center gap-2 mb-5">
                <User className="h-4 w-4 text-gold-600" />
                <p className="kicker">Guest details</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-ink-muted/70 mb-1">Full name</p>
                  <p className="text-forest-800">{booking.guestName}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-muted/70 mb-1">Phone</p>
                  <p className="text-forest-800">{booking.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-muted/70 mb-1">Email</p>
                  <p className="text-forest-800">{booking.email}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-muted/70 mb-1">Preferred contact</p>
                  <p className="text-forest-800">{booking.preferredContact}</p>
                </div>
              </div>
            </div>

            {/* Stay */}
            <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 md:p-7">
              <div className="flex items-center gap-2 mb-5">
                <BedDouble className="h-4 w-4 text-gold-600" />
                <p className="kicker">Stay details</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-ink-muted/70 mb-1">Room</p>
                  <Link
                    href={`/rooms/${booking.roomSlug}`}
                    target="_blank"
                    className="text-forest-800 hover:text-forest-600"
                  >
                    {booking.roomName} ↗
                  </Link>
                </div>
                <div>
                  <p className="text-xs text-ink-muted/70 mb-1">Number of rooms</p>
                  <p className="text-forest-800">
                    {booking.rooms} {booking.rooms === 1 ? "room" : "rooms"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-muted/70 mb-1">Check-in</p>
                  <p className="text-forest-800">{formatDate(booking.checkIn)}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-muted/70 mb-1">Check-out</p>
                  <p className="text-forest-800">{formatDate(booking.checkOut)}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-muted/70 mb-1">Nights</p>
                  <p className="text-forest-800">{booking.nights}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-muted/70 mb-1">Guests</p>
                  <p className="text-forest-800">{booking.guests}</p>
                </div>
              </div>
            </div>

            {/* Special request */}
            {booking.specialRequest && (
              <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 md:p-7">
                <div className="flex items-center gap-2 mb-5">
                  <MessageSquare className="h-4 w-4 text-gold-600" />
                  <p className="kicker">Special request</p>
                </div>
                <p className="text-forest-800 leading-relaxed italic">
                  "{booking.specialRequest}"
                </p>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Estimate */}
            <div className="rounded-2xl border border-cream-300 bg-forest-800 text-cream-100 p-6 md:p-7">
              <p className="kicker text-gold-400">— Estimate</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cream-100/70">
                    {formatNGN(room?.pricePerNight || 0)} × {booking.nights}{" "}
                    nights
                  </span>
                  <span className="text-cream-100">
                    {formatNGN((room?.pricePerNight || 0) * booking.nights)}
                  </span>
                </div>
                {booking.rooms > 1 && (
                  <div className="flex justify-between">
                    <span className="text-cream-100/70">
                      × {booking.rooms} rooms
                    </span>
                    <span className="text-cream-100">
                      {formatNGN(total)}
                    </span>
                  </div>
                )}
                <div className="h-px bg-cream-100/10 my-3" />
                <div className="flex justify-between items-baseline">
                  <span className="kicker text-gold-400">Total</span>
                  <span className="display text-2xl text-cream-100">
                    {formatNGN(total)}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-cream-100/50">
                Estimate only. Confirm final amount with guest.
              </p>
            </div>

            {/* Status actions */}
            <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6">
              <p className="kicker text-gold-600">— Update status</p>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setStatus("confirmed")}
                  className="w-full flex items-center gap-3 rounded-xl bg-cream-100 hover:bg-forest-700 hover:text-cream-100 text-forest-800 px-4 py-3 text-sm transition-colors group"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Confirm booking
                </button>
                <button
                  onClick={() => setStatus("cancelled")}
                  className="w-full flex items-center gap-3 rounded-xl bg-cream-100 hover:bg-red-700 hover:text-cream-100 text-forest-800 px-4 py-3 text-sm transition-colors"
                >
                  <XCircle className="h-4 w-4" />
                  Cancel booking
                </button>
              </div>
            </div>

            {/* Activity */}
            <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6">
              <p className="kicker text-gold-600">— Activity</p>
              <ol className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gold-500 shrink-0" />
                  <div>
                    <p className="text-forest-800">Request received</p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {formatDateTime(booking.createdAt)}
                    </p>
                  </div>
                </li>
                {status !== "new" && (
                  <li className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                    <div>
                      <p className="text-forest-800">Status: {status}</p>
                      <p className="text-xs text-ink-muted mt-0.5">Just now</p>
                    </div>
                  </li>
                )}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
