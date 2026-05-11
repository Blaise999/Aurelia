"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { rooms, formatNGN, getRoomBySlug } from "@/lib/data";

export default function BookingForm({ searchParams = {} }) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const initialRoomSlug =
    searchParams?.roomType && searchParams.roomType !== "any"
      ? searchParams.roomType
      : rooms[1].slug;

  const [form, setForm] = useState({
    roomType: initialRoomSlug,
    checkIn: searchParams?.checkIn || today,
    checkOut: searchParams?.checkOut || tomorrow,
    guests: Number(searchParams?.guests) || 2,
    numRooms: 1,
    fullName: "",
    phone: "",
    email: "",
    specialRequest: "",
    contactMethod: "WhatsApp",
  });

  const [submitting, setSubmitting] = useState(false);

  const selectedRoom = getRoomBySlug(form.roomType) || rooms[0];

  const nights = useMemo(() => {
    const a = new Date(form.checkIn);
    const b = new Date(form.checkOut);
    const diff = Math.max(1, Math.round((b - a) / 86400000));
    return diff;
  }, [form.checkIn, form.checkOut]);

  const estimate = nights * selectedRoom.pricePerNight * form.numRooms;

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // In production this would POST to /api/bookings (or Supabase, or Resend).
    // For the seed/demo we just simulate, then redirect to success with the data
    const params = new URLSearchParams({
      roomType: form.roomType,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests,
      numRooms: form.numRooms,
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      specialRequest: form.specialRequest,
      contactMethod: form.contactMethod,
    });

    await new Promise((r) => setTimeout(r, 500));
    router.push(`/booking/payment?${params.toString()}`);
  };

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-12 md:pt-44 md:pb-16 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="kicker"
          >
            — Booking request
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="display mt-5 text-5xl md:text-7xl text-forest-800"
          >
            Reserve a room.
            <br />
            <em className="font-light not-italic text-forest-600">
              Pay 60% to lock it in.
            </em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-ink-muted leading-relaxed"
          >
            Pick your dates, fill in a few details, and pay the deposit on the next page. We'll send your QR code by email — show it at reception when you arrive.
          </motion.p>
        </div>
      </section>

      {/* Form + summary */}
      <section className="px-6 md:px-10 pb-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Left: Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-2 space-y-10"
          >
            <Section title="Stay details" number="01">
              <Grid>
                <SelectField
                  label="Room"
                  value={form.roomType}
                  onChange={update("roomType")}
                >
                  {rooms.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.name} — from {formatNGN(r.pricePerNight)}
                    </option>
                  ))}
                </SelectField>

                <SelectField
                  label="Number of rooms"
                  value={form.numRooms}
                  onChange={update("numRooms")}
                >
                  {[1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </SelectField>

                <InputField
                  label="Check-in"
                  type="date"
                  value={form.checkIn}
                  min={today}
                  onChange={update("checkIn")}
                  required
                />

                <InputField
                  label="Check-out"
                  type="date"
                  value={form.checkOut}
                  min={form.checkIn}
                  onChange={update("checkOut")}
                  required
                />

                <SelectField
                  label="Guests"
                  value={form.guests}
                  onChange={update("guests")}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </SelectField>
              </Grid>
            </Section>

            <Section title="Your details" number="02">
              <Grid>
                <InputField
                  label="Full name"
                  value={form.fullName}
                  onChange={update("fullName")}
                  required
                  placeholder="Chinedu Okeke"
                  full
                />
                <InputField
                  label="Phone number"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  required
                  placeholder="+234 803 000 0000"
                />
                <InputField
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  required
                  placeholder="you@email.com"
                />
              </Grid>

              <div className="mt-6">
                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-2">
                    Special request (optional)
                  </span>
                  <textarea
                    value={form.specialRequest}
                    onChange={update("specialRequest")}
                    rows={3}
                    placeholder="Early check-in, dietary needs, room preference, etc."
                    className="w-full rounded-2xl bg-cream-50 border border-cream-300 px-4 py-3 text-sm focus:outline-none focus:border-forest-700/40 resize-none"
                  />
                </label>
              </div>
            </Section>

            <Section title="How should we reach you?" number="03">
              <div className="grid sm:grid-cols-3 gap-3">
                {["WhatsApp", "Phone", "Email"].map((method) => (
                  <label
                    key={method}
                    className={`cursor-pointer rounded-2xl border px-5 py-4 transition-all ${
                      form.contactMethod === method
                        ? "border-forest-700 bg-forest-50/50 text-forest-800"
                        : "border-cream-300 hover:border-forest-700/30 text-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={form.contactMethod === method}
                      onChange={update("contactMethod")}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border-2 transition-all ${
                          form.contactMethod === method
                            ? "border-forest-700 bg-forest-700"
                            : "border-ink-muted"
                        }`}
                      />
                      <span className="font-medium text-sm">{method}</span>
                    </div>
                  </label>
                ))}
              </div>
            </Section>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto rounded-full bg-forest-700 hover:bg-forest-800 disabled:opacity-50 text-cream-100 px-10 py-5 text-sm tracking-wide font-medium transition-colors inline-flex items-center justify-center gap-3"
              >
                {submitting ? "Loading..." : "Continue to payment"}
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
                <Info className="w-3.5 h-3.5" />
                You'll pay a 60% deposit on the next page. Balance due at checkout.
              </p>
            </div>
          </form>

          {/* Right: Summary */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 rounded-3xl border border-cream-300 bg-cream-50 overflow-hidden">
              <div className="aspect-[5/3] bg-cream-200 overflow-hidden">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7">
                <p className="kicker text-gold-700">— Your stay</p>
                <h3 className="display text-3xl text-forest-800 mt-2">
                  {selectedRoom.name}
                </h3>

                <dl className="mt-6 space-y-3 text-sm">
                  <SumRow term="Check-in" def={form.checkIn} />
                  <SumRow term="Check-out" def={form.checkOut} />
                  <SumRow term="Nights" def={nights} />
                  <SumRow term="Guests" def={form.guests} />
                  <SumRow term="Rooms" def={form.numRooms} />
                  <SumRow
                    term="Per night"
                    def={formatNGN(selectedRoom.pricePerNight)}
                  />
                </dl>

                <div className="mt-5 pt-5 border-t border-cream-300/60 flex items-baseline justify-between">
                  <span className="text-ink-muted text-xs uppercase tracking-wider">
                    Estimate
                  </span>
                  <span className="display text-3xl text-forest-700">
                    {formatNGN(estimate)}
                  </span>
                </div>
                <p className="mt-3 text-[11px] text-ink-muted leading-relaxed">
                  An estimate only. Final rate confirmed by reception based on
                  availability and any applicable offers.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Section({ title, number, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-baseline gap-4 mb-7">
        <span className="display text-5xl text-gold-500/70 leading-none">
          {number}
        </span>
        <h2 className="display text-3xl md:text-4xl text-forest-800">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}

function Grid({ children }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}

function InputField({ label, full, ...props }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="block text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-2">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-2xl bg-cream-50 border border-cream-300 px-4 py-3.5 text-sm focus:outline-none focus:border-forest-700/40"
      />
    </label>
  );
}

function SelectField({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-2">
        {label}
      </span>
      <select
        {...props}
        className="w-full rounded-2xl bg-cream-50 border border-cream-300 px-4 py-3.5 text-sm focus:outline-none focus:border-forest-700/40 cursor-pointer"
      >
        {children}
      </select>
    </label>
  );
}

function SumRow({ term, def }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-ink-muted">{term}</dt>
      <dd className="text-ink text-right font-medium">{def}</dd>
    </div>
  );
}
