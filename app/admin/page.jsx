"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  TrendingUp,
  ConciergeBell,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import BookingTable from "@/components/admin/BookingTable";
import { mockBookings, mockServiceRequests, rooms } from "@/lib/data";

export default function AdminDashboardPage() {
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = mockBookings.filter(
    (b) => b.createdAt.slice(0, 10) === "2026-04-26"
  ).length;
  const pendingCount = mockBookings.filter(
    (b) => b.status === "new" || b.status === "contacted"
  ).length;
  const confirmedCount = mockBookings.filter((b) => b.status === "confirmed")
    .length;
  const cancelledCount = mockBookings.filter((b) => b.status === "cancelled")
    .length;

  const recentBookings = mockBookings.slice(0, 5);

  return (
    <div className="px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="kicker text-gold-600">— Welcome back</p>
            <h1 className="display mt-3 text-4xl md:text-5xl text-forest-800">
              Dashboard
            </h1>
            <p className="mt-2 text-ink-muted">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="group inline-flex items-center gap-2 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-6 py-3 text-sm tracking-wide transition-colors"
          >
            View all bookings
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </motion.div>

        {/* Room service live banner */}
        {(() => {
          const activeRS = mockServiceRequests.filter((r) => r.status !== "completed").length;
          const pendingRS = mockServiceRequests.filter((r) => r.status === "pending").length;
          if (activeRS === 0) return null;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mb-6"
            >
              <Link
                href="/admin/room-service"
                className="group flex items-center gap-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-100 p-5 md:p-6 transition-colors"
              >
                <div className="h-12 w-12 rounded-full bg-gold-500 text-forest-900 flex items-center justify-center shrink-0">
                  <ConciergeBell className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <p className="display text-xl md:text-2xl text-cream-100">
                      {activeRS} active room service {activeRS === 1 ? "request" : "requests"}
                    </p>
                    {pendingRS > 0 && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/20 text-gold-300 px-3 py-1 text-xs">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400" />
                        </span>
                        {pendingRS} need attention
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-cream-100/60">
                    Tap to manage requests, update status, or contact rooms.
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-gold-400 transition-transform group-hover:rotate-45 shrink-0" />
              </Link>
            </motion.div>
          );
        })()}

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatsCard
            label="Today's requests"
            value={todayCount}
            delta="+2 from yesterday"
            trend="up"
            icon={CalendarCheck}
            delay={0}
          />
          <StatsCard
            label="Pending"
            value={pendingCount}
            delta="Awaiting reply"
            trend="up"
            icon={Clock}
            delay={0.1}
          />
          <StatsCard
            label="Confirmed (month)"
            value={confirmedCount}
            delta="+18% vs last month"
            trend="up"
            icon={CheckCircle2}
            delay={0.2}
          />
          <StatsCard
            label="Cancelled"
            value={cancelledCount}
            delta="-1 vs last month"
            trend="up"
            icon={XCircle}
            delay={0.3}
          />
        </div>

        {/* Two col: recent bookings + occupancy */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Recent bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="display text-2xl text-forest-800">
                Recent requests
              </h2>
              <Link
                href="/admin/bookings"
                className="text-sm text-gold-600 hover:text-gold-700 underline-offset-4 hover:underline"
              >
                See all →
              </Link>
            </div>
            <BookingTable bookings={recentBookings} />
          </motion.div>

          {/* Side panel: occupancy by room */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="display text-2xl text-forest-800">
                Room demand
              </h2>
              <TrendingUp className="h-4 w-4 text-gold-600" />
            </div>
            <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 space-y-5">
              {rooms.map((room) => {
                const count = mockBookings.filter(
                  (b) => b.roomSlug === room.slug
                ).length;
                const max = mockBookings.length;
                const pct = Math.round((count / max) * 100);
                return (
                  <div key={room.slug}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm text-forest-800">
                        {room.name}
                      </span>
                      <span className="text-xs text-ink-muted">
                        {count} {count === 1 ? "request" : "requests"}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-cream-200 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.7,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-full bg-gradient-to-r from-forest-700 to-gold-500"
                      />
                    </div>
                  </div>
                );
              })}
              <Link
                href="/admin/rooms"
                className="block text-sm text-gold-600 hover:text-gold-700 underline-offset-4 hover:underline pt-2"
              >
                Manage rooms →
              </Link>
            </div>

            {/* Quick actions */}
            <div className="mt-5 rounded-2xl border border-cream-300 bg-cream-50 p-6">
              <p className="kicker text-gold-600">— Quick actions</p>
              <div className="mt-4 space-y-2">
                <Link
                  href="/admin/bookings?status=new"
                  className="flex items-center justify-between rounded-xl bg-cream-100 hover:bg-forest-800 hover:text-cream-100 px-4 py-3 text-sm text-forest-800 transition-colors group"
                >
                  Reply to new requests
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
                <Link
                  href="/admin/rooms"
                  className="flex items-center justify-between rounded-xl bg-cream-100 hover:bg-forest-800 hover:text-cream-100 px-4 py-3 text-sm text-forest-800 transition-colors group"
                >
                  Update room availability
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
                <Link
                  href="/admin/offers"
                  className="flex items-center justify-between rounded-xl bg-cream-100 hover:bg-forest-800 hover:text-cream-100 px-4 py-3 text-sm text-forest-800 transition-colors group"
                >
                  Edit current offers
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
