"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  ArrowLeft,
  CalendarCheck,
  User,
  Phone,
  BedDouble,
  Key,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import Logo from "@/components/Logo";
import { getRoomBySlug, formatNGN, hotelInfo } from "@/lib/data";

export default function VerifyClient({ searchParams = {} }) {
  const ref = searchParams.ref || "";
  const roomName = searchParams.room || "";
  const slug = searchParams.slug || "";
  const room = slug ? getRoomBySlug(slug) : null;
  const checkIn = searchParams.in || "";
  const checkOut = searchParams.out || "";
  const name = searchParams.name || "Guest";
  const deposit = parseInt(searchParams.deposit || "0", 10);
  const balance = parseInt(searchParams.balance || "0", 10);
  const nights = parseInt(searchParams.nights || "1", 10);
  const guests = searchParams.guests || "1";

  const valid = ref && ref.match(/^AUR-\d{6}$/);

  const [checkedIn, setCheckedIn] = useState(false);

  if (!valid) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-forest-900 text-cream-100">
      {/* Top bar */}
      <header className="bg-forest-800 px-5 py-4 flex items-center justify-between border-b border-cream-100/10">
        <div className="flex items-center gap-3">
          <Link
            href="/reception/scan"
            className="h-9 w-9 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-cream-100/20 transition-colors"
            aria-label="Back to scanner"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Logo tone="dark" size="sm" asLink={false} />
        </div>
        <span className="text-xs text-gold-400 tracking-[0.25em] uppercase">
          Reception
        </span>
      </header>

      <section className="px-5 py-10 md:py-14">
        <div className="mx-auto max-w-md">
          {!checkedIn ? (
            <>
              {/* Verified badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="mx-auto h-20 w-20 rounded-full bg-forest-700 flex items-center justify-center"
              >
                <ShieldCheck className="h-10 w-10 text-gold-400" strokeWidth={2} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-7"
              >
                <p className="text-[10px] tracking-[0.32em] uppercase text-gold-400">
                  QR verified
                </p>
                <h1 className="display mt-3 text-3xl md:text-4xl text-cream-100 leading-tight">
                  Booking confirmed.
                </h1>
                <p className="mt-3 text-sm text-cream-100/60">
                  Reference: <span className="text-gold-400 font-mono">{ref}</span>
                </p>
              </motion.div>

              {/* Booking card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 rounded-3xl bg-cream-100/5 border border-cream-100/10 overflow-hidden"
              >
                {room?.images?.[0] && (
                  <div className="aspect-[16/8] relative bg-forest-800">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold-300">
                        Room reserved
                      </p>
                      <p className="display text-2xl text-cream-100 mt-1">
                        {room.name}
                      </p>
                    </div>
                  </div>
                )}
                {!room && roomName && (
                  <div className="px-6 pt-6">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">
                      Room reserved
                    </p>
                    <p className="display text-2xl text-cream-100 mt-1">
                      {roomName}
                    </p>
                  </div>
                )}

                <div className="p-6 space-y-5">
                  <DetailRow
                    Icon={User}
                    label="Guest"
                    value={name}
                  />
                  <DetailRow
                    Icon={CalendarCheck}
                    label="Stay"
                    value={
                      checkIn && checkOut
                        ? `${fmt(checkIn)} → ${fmt(checkOut)}`
                        : "Dates pending"
                    }
                    sub={`${nights} ${nights === 1 ? "night" : "nights"} · ${guests} ${guests === "1" ? "guest" : "guests"}`}
                  />
                  {(deposit > 0 || balance > 0) && (
                    <div className="rounded-xl bg-forest-800 border border-cream-100/5 p-4">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-xs text-cream-100/60">Deposit paid</span>
                        <span className="display text-base text-cream-100">
                          {formatNGN(deposit)}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-cream-100/60">Balance due at checkout</span>
                        <span className="text-cream-100/80 text-sm">
                          {formatNGN(balance)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-6 space-y-3"
              >
                <button
                  onClick={() => setCheckedIn(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-6 py-4 text-sm font-medium transition-colors"
                >
                  <Key className="h-4 w-4" />
                  Check guest in
                </button>
                <Link
                  href="/reception/scan"
                  className="block w-full text-center rounded-full bg-cream-100/10 hover:bg-cream-100/20 text-cream-100 px-6 py-3.5 text-sm transition-colors"
                >
                  Scan another
                </Link>
              </motion.div>

              <p className="mt-6 text-[10px] text-cream-100/40 text-center leading-relaxed">
                Demo only — in production, "Check in" updates the booking status, allocates a physical room, and triggers welcome SMS to the guest.
              </p>
            </>
          ) : (
            /* CHECKED IN */
            <CheckedInScreen ref_={ref} name={name} room={room?.name || roomName} />
          )}
        </div>
      </section>
    </main>
  );
}

function DetailRow({ Icon, label, value, sub }) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-cream-100/5 border border-cream-100/10 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-gold-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cream-100/40">
          {label}
        </p>
        <p className="text-cream-100 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-cream-100/50 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function CheckedInScreen({ ref_, name, room }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="mx-auto h-20 w-20 rounded-full bg-gold-500 flex items-center justify-center"
      >
        <Check className="h-10 w-10 text-forest-900" strokeWidth={3} />
      </motion.div>
      <p className="mt-7 text-[10px] tracking-[0.32em] uppercase text-gold-400">
        Checked in
      </p>
      <h1 className="display mt-3 text-3xl md:text-4xl text-cream-100 leading-tight">
        Welcome, {name.split(" ")[0]}.
      </h1>
      <p className="mt-3 text-sm text-cream-100/60">
        {room ? `${room} is ready.` : "Room is ready."} Reference {ref_}.
      </p>

      <div className="mt-8 rounded-2xl bg-cream-100/5 border border-cream-100/10 p-5 text-left">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">
          Next steps for reception
        </p>
        <ol className="mt-3 space-y-2 text-sm text-cream-100/80">
          <li className="flex gap-3">
            <span className="text-gold-400">01</span>
            Hand over key card and Wi-Fi sheet.
          </li>
          <li className="flex gap-3">
            <span className="text-gold-400">02</span>
            Confirm phone number for any urgent messages.
          </li>
          <li className="flex gap-3">
            <span className="text-gold-400">03</span>
            Walk guest to room or call a porter.
          </li>
        </ol>
      </div>

      <Link
        href="/reception/scan"
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-cream-100/10 hover:bg-cream-100/20 text-cream-100 px-6 py-3.5 text-sm transition-colors"
      >
        <ScanLine className="h-4 w-4" />
        Scan next guest
      </Link>
    </motion.div>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen bg-forest-900 text-cream-100 px-5 py-16 flex items-center">
      <div className="mx-auto max-w-md text-center">
        <p className="text-[10px] tracking-[0.32em] uppercase text-red-400">
          Invalid QR
        </p>
        <h1 className="display mt-3 text-3xl text-cream-100">
          We couldn't read that.
        </h1>
        <p className="mt-3 text-sm text-cream-100/60">
          The reference is missing or doesn't match the format AUR-XXXXXX.
        </p>
        <Link
          href="/reception/scan"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-6 py-3 text-sm font-medium transition-colors"
        >
          <ScanLine className="h-4 w-4" />
          Try again
        </Link>
      </div>
    </main>
  );
}

function fmt(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
