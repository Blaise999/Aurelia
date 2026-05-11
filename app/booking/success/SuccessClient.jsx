"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import {
  Check,
  MessageCircle,
  Phone,
  Mail,
  Download,
  Calendar,
  Copy,
  ShieldCheck,
} from "lucide-react";
import { getRoomBySlug, hotelInfo, buildWhatsAppLink, formatNGN } from "@/lib/data";

export default function SuccessClient({ searchParams = {} }) {
  const room = getRoomBySlug(searchParams.roomType);
  const firstName = (searchParams.fullName || "").split(" ")[0] || "there";
  const email = searchParams.email || "";
  const phone = searchParams.phone || "";
  const checkIn = searchParams.checkIn || "";
  const checkOut = searchParams.checkOut || "";
  const guests = searchParams.guests || "1";
  const numRooms = parseInt(searchParams.numRooms || "1", 10);
  const nights = parseInt(searchParams.nights || "1", 10);
  const deposit = parseInt(searchParams.deposit || "0", 10);
  const balance = parseInt(searchParams.balance || "0", 10);

  // Generate a stable booking reference from inputs
  const bookingRef = useMemo(() => {
    const seed = `${searchParams.roomType || ""}${checkIn}${checkOut}${email}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return `AUR-${(hash % 900000 + 100000).toString()}`;
  }, [searchParams.roomType, checkIn, checkOut, email]);

  // QR encodes a verification URL — scanning with any phone camera opens it.
  // In production this URL would carry a signed token; for the demo, we encode
  // the booking ref + key fields directly in query params so reception can verify.
  const verifyUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams({
      ref: bookingRef,
      room: room?.name || "",
      slug: room?.slug || "",
      in: checkIn,
      out: checkOut,
      name: searchParams.fullName || "",
      deposit: String(deposit),
      balance: String(balance),
      nights: String(nights),
      guests: String(guests),
    });
    return `${window.location.origin}/reception/verify?${params.toString()}`;
  }, [bookingRef, room, checkIn, checkOut, searchParams.fullName, deposit, balance, nights, guests]);

  const wa = buildWhatsAppLink(
    `Hello ${hotelInfo.shortName}, I just paid the deposit on booking ${bookingRef}.`
  );

  return (
    <section className="min-h-screen pt-32 md:pt-40 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Animated check */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
          className="mx-auto w-20 h-20 rounded-full bg-forest-700 flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-cream-100" strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="kicker text-gold-600">— Booking confirmed</p>
          <h1 className="display mt-4 text-4xl md:text-6xl text-forest-800 leading-[1.05]">
            Thanks, {firstName}.<br />
            <em className="font-light not-italic text-forest-600">Your room is held.</em>
          </h1>
          <p className="mt-5 text-ink-muted max-w-xl mx-auto">
            We've emailed your QR code and booking details to{" "}
            <span className="text-forest-700">{email || "your email"}</span>. Show it at reception when you arrive.
          </p>
        </motion.div>

        {/* QR + booking card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 rounded-3xl bg-cream-50 border border-cream-300 overflow-hidden grid md:grid-cols-5"
        >
          {/* Left: QR code */}
          <div className="md:col-span-2 bg-forest-800 text-cream-100 p-8 md:p-10 flex flex-col items-center justify-center">
            <p className="kicker text-gold-400">— Booking QR</p>
            <div className="mt-5 bg-white p-5 rounded-2xl">
              {verifyUrl && (
                <QRCode
                  value={verifyUrl}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#1F3329"
                />
              )}
            </div>
            <p className="display mt-6 text-2xl text-cream-100 tracking-wide">
              {bookingRef}
            </p>
            <p className="mt-2 text-xs text-cream-100/60 text-center">
              Show at reception. Saved to your email.
            </p>
            <button
              onClick={() => {
                if (navigator.clipboard) navigator.clipboard.writeText(bookingRef);
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream-100/10 hover:bg-cream-100/20 text-cream-100 px-5 py-2.5 text-xs transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy reference
            </button>

            {/* Demo affordance — testing the QR */}
            <div className="mt-6 w-full pt-5 border-t border-cream-100/10 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400/80 text-center">
                Demo · Test the QR
              </p>
              <Link
                href={verifyUrl ? new URL(verifyUrl).pathname + "?" + new URL(verifyUrl).searchParams.toString() : "#"}
                className="block w-full rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 text-xs px-4 py-2.5 text-center transition-colors"
              >
                Open as if reception scanned it
              </Link>
              <Link
                href="/reception/scan"
                className="block w-full rounded-full bg-cream-100/10 hover:bg-cream-100/20 text-cream-100 text-xs px-4 py-2.5 text-center transition-colors"
              >
                Open reception scanner
              </Link>
              <p className="text-[10px] text-cream-100/40 text-center pt-1 leading-relaxed">
                Or scan the QR above with your phone camera — it opens the verification page.
              </p>
            </div>
          </div>

          {/* Right: details */}
          <div className="md:col-span-3 p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="aspect-[4/3] w-28 md:w-32 rounded-xl overflow-hidden bg-cream-200 shrink-0">
                {room && (
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <p className="kicker">Booked</p>
                <h2 className="display text-2xl md:text-3xl text-forest-800 mt-1">
                  {room?.name || "Your room"}
                </h2>
                <p className="text-sm text-ink-muted mt-1">
                  {numRooms} {numRooms === 1 ? "room" : "rooms"} · {guests}{" "}
                  {guests === "1" ? "guest" : "guests"} · {nights}{" "}
                  {nights === 1 ? "night" : "nights"}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-cream-100 border border-cream-300 p-4">
                <p className="text-xs text-ink-muted/70 mb-1">Check-in</p>
                <p className="text-forest-800">{fmt(checkIn)}</p>
                <p className="text-xs text-ink-muted mt-0.5">From 2pm</p>
              </div>
              <div className="rounded-xl bg-cream-100 border border-cream-300 p-4">
                <p className="text-xs text-ink-muted/70 mb-1">Check-out</p>
                <p className="text-forest-800">{fmt(checkOut)}</p>
                <p className="text-xs text-ink-muted mt-0.5">By 11am</p>
              </div>
            </div>

            {/* Payment status */}
            <div className="mt-6 rounded-xl bg-forest-700/5 border border-forest-700/15 p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-forest-700" />
                <p className="kicker text-forest-700">— Payment</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-baseline">
                  <span className="text-forest-800">Deposit paid</span>
                  <span className="display text-lg text-forest-800">
                    {formatNGN(deposit)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-ink-muted">Balance at checkout</span>
                  <span className="text-ink-muted">{formatNGN(balance)}</span>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-5 py-2.5 text-sm transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp us
              </a>
              <a
                href={`tel:${hotelInfo.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full bg-cream-100 border border-cream-300 hover:border-forest-700/30 text-forest-800 px-5 py-2.5 text-sm transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call reception
              </a>
            </div>
          </div>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 rounded-2xl bg-cream-50 border border-cream-300 p-6 md:p-8"
        >
          <p className="kicker text-gold-600">— What happens next</p>
          <ol className="mt-5 space-y-4">
            <Step
              n="1"
              title="Confirmation email"
              text={`We've sent your QR code and booking details to ${email || "your email"}. Check spam if it's not in your inbox.`}
              icon={Mail}
            />
            <Step
              n="2"
              title="WhatsApp message"
              text="A member of reception will WhatsApp you within the hour to confirm your room is ready and answer any questions."
              icon={MessageCircle}
            />
            <Step
              n="3"
              title="Show your QR at check-in"
              text="When you arrive, show the QR code at reception. They'll match it to your booking and hand over your key."
              icon={Calendar}
            />
          </ol>
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-forest-700 underline-offset-4 hover:underline"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, text, icon: Icon }) {
  return (
    <li className="flex gap-4">
      <div className="h-9 w-9 rounded-full bg-forest-700 text-cream-100 flex items-center justify-center shrink-0 text-sm">
        {n}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gold-600" />
          <p className="text-forest-800 font-medium">{title}</p>
        </div>
        <p className="mt-1 text-sm text-ink-muted leading-relaxed">{text}</p>
      </div>
    </li>
  );
}

function fmt(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
