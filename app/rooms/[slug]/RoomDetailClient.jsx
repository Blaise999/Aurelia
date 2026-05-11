"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Users,
  BedDouble,
  Maximize2,
  ArrowUpRight,
  MessageCircle,
  Calendar,
} from "lucide-react";
import {
  formatNGN,
  hotelInfo,
  buildWhatsAppLink,
} from "@/lib/data";
import RoomCard from "@/components/RoomCard";

export default function RoomDetailClient({ room, similar }) {
  const [active, setActive] = useState(0);

  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const wa = buildWhatsAppLink(
    `Hello ${hotelInfo.shortName}, I'd like to enquire about the ${room.name}. Available dates: ?`,
  );

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-32 px-6 md:px-10">
        <div className="mx-auto max-w-7xl flex items-center gap-2 text-xs tracking-wider uppercase text-ink-muted">
          <Link href="/" className="hover:text-forest-700">
            Aurelia
          </Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-forest-700">
            Rooms
          </Link>
          <span>/</span>
          <span className="text-forest-700">{room.name}</span>
        </div>
      </section>

      {/* Title block */}
      <section className="pt-10 pb-14 px-6 md:px-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="kicker text-gold-700">— {room.tier}</p>
            <h1 className="display mt-4 text-5xl md:text-7xl text-forest-800">
              {room.name}
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-baseline gap-3"
          >
            <span className="kicker">From</span>
            <span className="display text-5xl text-forest-700">
              {formatNGN(room.pricePerNight)}
            </span>
            <span className="text-xs uppercase tracking-wider text-ink-muted">
              / night
            </span>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-cream-200"
          >
            <motion.img
              key={active}
              src={room.images[active]}
              alt={room.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {room.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200 transition-all ${
                  active === i
                    ? "ring-2 ring-gold-500 ring-offset-4 ring-offset-cream-100"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detail body + sticky booking card */}
      <section className="px-6 md:px-10 mt-20 mb-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: description, amenities */}
          <div className="lg:col-span-2 space-y-14">
            <div>
              <p className="kicker mb-4">— About this room</p>
              <p className="text-ink leading-relaxed text-lg">
                {room.description}
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <Stat icon={<Users className="w-4 h-4" />} label="Guests" value={room.capacity} />
                <Stat icon={<BedDouble className="w-4 h-4" />} label="Bed" value={room.bedType} />
                <Stat icon={<Maximize2 className="w-4 h-4" />} label="Size" value={`${room.sizeSqm} sqm`} />
              </div>
            </div>

            <div>
              <p className="kicker mb-6">— What's included</p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {room.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-3 text-ink py-2 border-b border-cream-300/60"
                  >
                    <span className="w-7 h-7 rounded-full bg-forest-50 text-forest-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="kicker mb-4">— Room policies</p>
              <dl className="space-y-3 text-sm">
                <Row term="Check-in" def="From 2:00 PM" />
                <Row term="Check-out" def="By 12:00 PM" />
                <Row term="Cancellation" def="Free up to 48 hours before arrival" />
                <Row term="Children" def="Welcome — please mention ages on booking" />
                <Row term="Pets" def="Not permitted" />
              </dl>
            </div>
          </div>

          {/* Right: sticky booking card */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-cream-300 bg-cream-50 p-7 shadow-xl shadow-forest-900/5">
                <p className="kicker text-gold-700">— Reserve this room</p>
                <p className="display text-3xl text-forest-800 mt-3 leading-snug">
                  Available
                  <br />
                  on request.
                </p>
                <p className="mt-3 text-xs text-ink-muted leading-relaxed">
                  Reception will confirm availability with you directly. No
                  payment required now.
                </p>

                <form
                  action="/booking"
                  method="get"
                  className="mt-6 space-y-3"
                >
                  <input type="hidden" name="roomType" value={room.slug} />

                  <Field label="Check-in">
                    <input
                      type="date"
                      name="checkIn"
                      defaultValue={today}
                      min={today}
                      required
                      className="w-full bg-transparent text-sm text-ink focus:outline-none"
                    />
                  </Field>

                  <Field label="Check-out">
                    <input
                      type="date"
                      name="checkOut"
                      defaultValue={tomorrow}
                      min={today}
                      required
                      className="w-full bg-transparent text-sm text-ink focus:outline-none"
                    />
                  </Field>

                  <Field label="Guests">
                    <select
                      name="guests"
                      defaultValue={2}
                      className="w-full bg-transparent text-sm text-ink focus:outline-none cursor-pointer"
                    >
                      {Array.from({ length: room.capacity }, (_, i) => i + 1).map(
                        (n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ),
                      )}
                    </select>
                  </Field>

                  <button
                    type="submit"
                    className="w-full mt-2 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 py-4 text-sm tracking-wide font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to request
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>

                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-3 rounded-full border border-forest-700/20 hover:bg-cream-100 text-forest-700 py-4 text-sm tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask on WhatsApp
                </a>

                <div className="mt-6 pt-6 border-t border-cream-300/60 text-xs text-ink-muted leading-relaxed">
                  Or call reception directly:
                  <a
                    href={`tel:${hotelInfo.phone.replace(/\s/g, "")}`}
                    className="block mt-1 text-ink font-medium"
                  >
                    {hotelInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Similar rooms */}
      <section className="px-6 md:px-10 pb-20 bg-cream-50 pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="kicker">— You might also like</p>
              <h2 className="display mt-3 text-4xl md:text-5xl text-forest-800">
                Other rooms.
              </h2>
            </div>
            <Link
              href="/rooms"
              className="link-underline text-sm tracking-wider uppercase text-forest-700"
            >
              View all rooms
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {similar.map((r, i) => (
              <RoomCard key={r.slug} room={r} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-cream-50 border border-cream-300/60 p-5">
      <span className="flex items-center gap-2 text-ink-muted text-[10px] uppercase tracking-[0.2em]">
        {icon} {label}
      </span>
      <p className="display text-2xl text-forest-800 mt-2 leading-none">
        {value}
      </p>
    </div>
  );
}

function Row({ term, def }) {
  return (
    <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-cream-300/60">
      <dt className="text-ink-muted">{term}</dt>
      <dd className="text-ink text-right">{def}</dd>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block rounded-xl bg-cream-100 border border-cream-300/60 px-4 py-3 hover:border-forest-700/30 transition-colors cursor-pointer">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        {label}
      </span>
      <span className="block mt-1.5">{children}</span>
    </label>
  );
}
