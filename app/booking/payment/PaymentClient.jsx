"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  CreditCard,
  Check,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react";
import { getRoomBySlug, formatNGN, hotelInfo } from "@/lib/data";

export default function PaymentClient({ searchParams }) {
  const router = useRouter();

  const roomType = searchParams?.roomType || "";
  const room = getRoomBySlug(roomType);
  const checkIn = searchParams?.checkIn || "";
  const checkOut = searchParams?.checkOut || "";
  const guests = parseInt(searchParams?.guests || "1", 10);
  const numRooms = parseInt(searchParams?.numRooms || "1", 10);
  const fullName = searchParams?.fullName || "Guest";
  const email = searchParams?.email || "";
  const phone = searchParams?.phone || "";

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const a = new Date(checkIn);
    const b = new Date(checkOut);
    return Math.max(1, Math.round((b - a) / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  const total = (room?.pricePerNight || 0) * nights * numRooms;
  const deposit = Math.round(total * 0.6);
  const balance = total - deposit;

  const [showPaystack, setShowPaystack] = useState(false);

  if (!room) {
    return (
      <section className="pt-44 pb-32 px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker text-gold-600">— Missing booking</p>
          <h1 className="display mt-4 text-3xl text-forest-800">
            We couldn't find that booking.
          </h1>
          <Link
            href="/booking"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-6 py-3 text-sm"
          >
            Start over
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 md:pt-40 pb-24 px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-forest-700 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to booking
          </button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="kicker text-gold-600">— Step 2 of 2 · Payment</p>
            <h1 className="display mt-4 text-4xl md:text-5xl text-forest-800 leading-tight">
              Pay <em className="font-light not-italic text-forest-600">60% now</em>, balance at checkout.
            </h1>
            <p className="mt-3 text-ink-muted max-w-xl">
              We hold your room when the deposit clears. The rest is settled when you check out — cash, card, or transfer.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: payment summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Booking summary card */}
              <div className="rounded-3xl border border-cream-300 bg-cream-50 overflow-hidden">
                <div className="grid sm:grid-cols-3 gap-0">
                  <div className="aspect-[4/3] sm:aspect-auto bg-cream-200 overflow-hidden">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="sm:col-span-2 p-6 md:p-8">
                    <p className="kicker text-gold-600">— You're booking</p>
                    <h2 className="display mt-3 text-2xl md:text-3xl text-forest-800">
                      {room.name}
                    </h2>
                    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      <Field label="Check-in" value={fmt(checkIn)} />
                      <Field label="Check-out" value={fmt(checkOut)} />
                      <Field label="Nights" value={nights} />
                      <Field label="Rooms" value={numRooms} />
                      <Field label="Guests" value={guests} />
                      <Field label="Per night" value={formatNGN(room.pricePerNight)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest details */}
              <div className="rounded-3xl border border-cream-300 bg-cream-50 p-6 md:p-8">
                <p className="kicker text-gold-600">— Guest</p>
                <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
                  <Field label="Name" value={fullName} />
                  <Field label="Email" value={email} />
                  <Field label="Phone" value={phone} />
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="rounded-3xl border border-cream-300 bg-cream-50 p-6 md:p-8">
                <p className="kicker text-gold-600">— Breakdown</p>
                <div className="mt-5 space-y-3 text-sm">
                  <Row
                    label={`${formatNGN(room.pricePerNight)} × ${nights} ${nights === 1 ? "night" : "nights"}`}
                    value={formatNGN(room.pricePerNight * nights)}
                  />
                  {numRooms > 1 && (
                    <Row label={`× ${numRooms} rooms`} value={formatNGN(total)} />
                  )}
                  <div className="h-px bg-cream-300 my-3" />
                  <Row label="Total" value={formatNGN(total)} bold />
                  <Row
                    label="Deposit (60%)"
                    value={formatNGN(deposit)}
                    accent
                  />
                  <Row
                    label="Balance at checkout (40%)"
                    value={formatNGN(balance)}
                    muted
                  />
                </div>
              </div>

              {/* Trust */}
              <div className="rounded-3xl bg-forest-800 text-cream-100 p-6 md:p-7 flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-cream-100/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-cream-100 font-medium">Secure checkout via Paystack</p>
                  <p className="mt-1.5 text-sm text-cream-100/70 leading-relaxed">
                    Card details are processed by Paystack — we never see them. Your deposit is refundable up to 48 hours before check-in.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: pay sticky */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="lg:sticky lg:top-28 rounded-3xl border border-forest-700/30 bg-forest-800 text-cream-100 p-7 md:p-8">
                <p className="kicker text-gold-400">— Pay now</p>
                <p className="mt-3 text-sm text-cream-100/70">Your deposit, due today</p>
                <p className="display mt-2 text-4xl md:text-5xl text-cream-100 leading-none">
                  {formatNGN(deposit)}
                </p>

                <button
                  onClick={() => setShowPaystack(true)}
                  className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-6 py-4 text-sm font-medium tracking-wide transition-colors"
                >
                  <Lock className="h-4 w-4" />
                  Pay with Paystack
                </button>

                <div className="mt-5 flex items-center justify-center gap-3 text-xs text-cream-100/50">
                  <span>Card</span>
                  <span>·</span>
                  <span>Bank Transfer</span>
                  <span>·</span>
                  <span>USSD</span>
                </div>

                <p className="mt-6 text-xs text-cream-100/50 leading-relaxed">
                  By proceeding you agree to Aurelia's{" "}
                  <Link href="#" className="underline-offset-4 underline hover:text-gold-400">
                    booking terms
                  </Link>
                  .
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Paystack mock modal */}
      <AnimatePresence>
        {showPaystack && (
          <PaystackModal
            amount={deposit}
            email={email}
            onClose={() => setShowPaystack(false)}
            onSuccess={() => {
              const params = new URLSearchParams(searchParams);
              params.set("paid", "true");
              params.set("deposit", String(deposit));
              params.set("balance", String(balance));
              params.set("nights", String(nights));
              router.push(`/booking/success?${params.toString()}`);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Helpers ---------- */

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-muted/70 mb-0.5">{label}</p>
      <p className="text-forest-800 truncate">{value || "—"}</p>
    </div>
  );
}

function Row({ label, value, bold, accent, muted }) {
  return (
    <div className="flex justify-between items-baseline">
      <span
        className={`${
          accent ? "text-forest-800" : muted ? "text-ink-muted" : "text-forest-800"
        }`}
      >
        {label}
      </span>
      <span
        className={`${
          bold
            ? "display text-xl text-forest-800"
            : accent
              ? "display text-lg text-gold-600"
              : muted
                ? "text-ink-muted"
                : "text-forest-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function fmt(d) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ---------- Paystack mock modal ---------- */

function PaystackModal({ amount, email, onClose, onSuccess }) {
  // Visual states: form -> processing -> success
  const [phase, setPhase] = useState("form");
  const [card, setCard] = useState({
    number: "4084 0840 8408 4081",
    exp: "12 / 28",
    cvv: "408",
  });

  const handlePay = (e) => {
    e.preventDefault();
    setPhase("processing");
    setTimeout(() => setPhase("success"), 1700);
    setTimeout(() => onSuccess(), 3200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={phase === "form" ? onClose : undefined}
    >
      <motion.div
        initial={{ scale: 0.96, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* Paystack-styled header */}
        <div className="bg-[#011B33] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-[#00C3F7] flex items-center justify-center">
              <span className="text-[#011B33] font-bold text-sm">P</span>
            </div>
            <span className="font-medium">paystack</span>
          </div>
          {phase === "form" && (
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {phase === "form" && (
          <form onSubmit={handlePay} className="p-6 space-y-5">
            <div className="text-center">
              <p className="text-xs text-gray-500">Pay with card</p>
              <p className="mt-2 text-xs text-gray-500">{email || "guest@email.com"}</p>
              <p className="mt-3 text-3xl font-semibold text-gray-900">
                NGN {amount.toLocaleString("en-NG")}
              </p>
            </div>

            <div className="space-y-3 pt-3">
              <label className="block">
                <span className="text-xs text-gray-600 mb-1 block">Card number</span>
                <div className="relative">
                  <input
                    type="text"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#00C3F7] focus:outline-none focus:ring-2 focus:ring-[#00C3F7]/20"
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-gray-600 mb-1 block">Expiry</span>
                  <input
                    type="text"
                    value={card.exp}
                    onChange={(e) => setCard({ ...card, exp: e.target.value })}
                    placeholder="MM / YY"
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#00C3F7] focus:outline-none focus:ring-2 focus:ring-[#00C3F7]/20"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-gray-600 mb-1 block">CVV</span>
                  <input
                    type="text"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#00C3F7] focus:outline-none focus:ring-2 focus:ring-[#00C3F7]/20"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#00C3F7] hover:bg-[#00afdd] text-[#011B33] font-medium py-3.5 text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" />
              Pay NGN {amount.toLocaleString("en-NG")}
            </button>

            <p className="text-center text-[10px] text-gray-400 leading-relaxed">
              Demo only. No card is actually charged. Use any details — submit will simulate success.
            </p>

            <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-gray-400 uppercase tracking-wider">
              <Lock className="h-3 w-3" /> Secured by Paystack
            </div>
          </form>
        )}

        {phase === "processing" && (
          <div className="p-12 flex flex-col items-center text-center">
            <Loader2 className="h-10 w-10 text-[#00C3F7] animate-spin" />
            <p className="mt-6 text-gray-900 font-medium">Processing payment…</p>
            <p className="mt-2 text-sm text-gray-500">
              Don't close this window.
            </p>
          </div>
        )}

        {phase === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center"
            >
              <Check className="h-8 w-8 text-green-600" strokeWidth={3} />
            </motion.div>
            <p className="mt-5 text-gray-900 font-medium text-lg">Payment successful</p>
            <p className="mt-2 text-sm text-gray-500">
              NGN {amount.toLocaleString("en-NG")} received
            </p>
            <p className="mt-6 text-xs text-gray-400">Redirecting…</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
