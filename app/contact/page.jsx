"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { hotelInfo, nearbyPlaces, buildWhatsAppLink } from "@/lib/data";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // simulated submit for demo
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 700);
  };

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <main className="bg-cream-100 min-h-screen">
      <Navbar />

      <PageHeader
        kicker="— Contact"
        title={
          <>
            We pick up
            <br />
            <em className="font-light not-italic text-forest-600">
              the phone.
            </em>
          </>
        }
        intro="Reception is open 24 hours. Reservations is on email and WhatsApp from 7am to 10pm. For anything urgent, please just call."
      />

      {/* Urgent contact strip */}
      <section className="px-6 md:px-10 pb-12">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-4">
          <a
            href={`tel:${hotelInfo.phone.replace(/\s/g, "")}`}
            className="group flex items-center gap-5 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-100 p-6 md:p-8 transition-colors"
          >
            <div className="h-14 w-14 rounded-full bg-cream-100/10 flex items-center justify-center shrink-0">
              <Phone className="h-6 w-6 text-gold-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="kicker text-gold-400">— Call reception</p>
              <p className="mt-1 text-xl md:text-2xl display text-cream-100 truncate">
                {hotelInfo.phone}
              </p>
            </div>
          </a>
          <a
            href={buildWhatsAppLink(
              "Hello, I'd like to ask about a stay at Aurelia Hotel."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-2xl bg-gold-500 hover:bg-gold-600 text-forest-900 p-6 md:p-8 transition-colors"
          >
            <div className="h-14 w-14 rounded-full bg-forest-900/10 flex items-center justify-center shrink-0">
              <MessageCircle className="h-6 w-6 text-forest-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="kicker">— Chat on WhatsApp</p>
              <p className="mt-1 text-xl md:text-2xl display text-forest-900">
                Send a message
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Two column: details + form */}
      <section className="px-6 md:px-10 pb-32">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <p className="kicker text-gold-600">— Where to find us</p>
              <h2 className="display mt-4 text-3xl md:text-4xl text-forest-800 leading-tight">
                Independence Layout, <em className="font-light not-italic text-forest-600">Enugu.</em>
              </h2>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="h-11 w-11 rounded-full bg-cream-50 border border-cream-300 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-gold-600" />
                </div>
                <div>
                  <p className="kicker">Address</p>
                  <p className="mt-1 text-forest-800">{hotelInfo.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      hotelInfo.mapsQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-gold-600 underline-offset-4 hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-11 w-11 rounded-full bg-cream-50 border border-cream-300 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-gold-600" />
                </div>
                <div>
                  <p className="kicker">Phone</p>
                  <a
                    href={`tel:${hotelInfo.phone.replace(/\s/g, "")}`}
                    className="mt-1 block text-forest-800 hover:text-forest-600"
                  >
                    {hotelInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-11 w-11 rounded-full bg-cream-50 border border-cream-300 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-gold-600" />
                </div>
                <div>
                  <p className="kicker">Email</p>
                  <a
                    href={`mailto:${hotelInfo.email}`}
                    className="mt-1 block text-forest-800 hover:text-forest-600"
                  >
                    {hotelInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-11 w-11 rounded-full bg-cream-50 border border-cream-300 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-gold-600" />
                </div>
                <div>
                  <p className="kicker">Reception</p>
                  <p className="mt-1 text-forest-800">{hotelInfo.hours}</p>
                  <p className="text-sm text-ink-muted mt-1">
                    Reservations team: 7am – 10pm daily
                  </p>
                </div>
              </div>
            </div>

            {/* Nearby */}
            <div className="rounded-3xl bg-cream-50 border border-cream-300 p-7">
              <p className="kicker text-gold-600">— Getting here</p>
              <h3 className="display mt-3 text-2xl text-forest-800">
                Nearby landmarks
              </h3>
              <ul className="mt-5 space-y-3">
                {nearbyPlaces.map((place) => (
                  <li
                    key={place.name}
                    className="flex justify-between items-baseline gap-3 text-sm"
                  >
                    <span className="text-forest-800">{place.name}</span>
                    <span className="h-px flex-1 bg-cream-300/80 translate-y-[-2px]" />
                    <span className="text-ink-muted">{place.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-cream-50 border border-cream-300 p-8 md:p-10">
              <p className="kicker text-gold-600">— Send us a note</p>
              <h2 className="display mt-3 text-3xl md:text-4xl text-forest-800 leading-tight">
                Questions, group stays, or just hello.
              </h2>
              <p className="mt-3 text-ink-muted">
                Replies usually arrive within an hour during reservations hours.
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 rounded-2xl bg-forest-700 text-cream-100 p-7 flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-gold-500 flex items-center justify-center shrink-0">
                    <Check className="h-5 w-5 text-forest-900" />
                  </div>
                  <div>
                    <p className="display text-xl text-cream-100">
                      Thank you. We'll be in touch.
                    </p>
                    <p className="mt-2 text-sm text-cream-100/70">
                      Your note has reached the reservations team. For anything urgent, the phone line is the fastest path.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="kicker block mb-2">Full name</span>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={update("name")}
                        className="w-full rounded-xl bg-cream-100 border border-cream-300 px-4 py-3 text-forest-800 placeholder:text-ink-muted/50 focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30 transition-all"
                        placeholder="Chinedu Okeke"
                      />
                    </label>
                    <label className="block">
                      <span className="kicker block mb-2">Phone</span>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={update("phone")}
                        className="w-full rounded-xl bg-cream-100 border border-cream-300 px-4 py-3 text-forest-800 placeholder:text-ink-muted/50 focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30 transition-all"
                        placeholder="+234 803 000 0000"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="kicker block mb-2">Email</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      className="w-full rounded-xl bg-cream-100 border border-cream-300 px-4 py-3 text-forest-800 placeholder:text-ink-muted/50 focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30 transition-all"
                      placeholder="you@email.com"
                    />
                  </label>

                  <label className="block">
                    <span className="kicker block mb-2">Your message</span>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={update("message")}
                      className="w-full rounded-xl bg-cream-100 border border-cream-300 px-4 py-3 text-forest-800 placeholder:text-ink-muted/50 focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30 transition-all resize-none"
                      placeholder="Tell us what you're planning — dates, room preference, anything we should know."
                    />
                  </label>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-2 rounded-full bg-forest-700 hover:bg-forest-800 disabled:opacity-60 text-cream-100 px-8 py-4 text-sm tracking-wide transition-colors"
                    >
                      {submitting ? "Sending…" : "Send message"}
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <p className="mt-4 text-xs text-ink-muted">
                      We'll only use your details to reply to this enquiry.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map block (illustrated, not a real embed for the demo) */}
      <section className="px-6 md:px-10 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl rounded-3xl overflow-hidden bg-forest-800 relative aspect-[16/8] md:aspect-[16/6]"
        >
          {/* Decorative SVG map */}
          <svg
            viewBox="0 0 800 300"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="grid-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#C9A961" opacity="0.18" />
              </pattern>
            </defs>
            <rect width="800" height="300" fill="url(#grid-dots)" />
            {/* roads */}
            <path d="M0,180 Q200,140 400,170 T800,150" stroke="#C9A961" strokeWidth="1.5" fill="none" opacity="0.4" />
            <path d="M120,0 Q140,150 100,300" stroke="#C9A961" strokeWidth="1.5" fill="none" opacity="0.3" />
            <path d="M580,0 Q600,160 640,300" stroke="#C9A961" strokeWidth="1.5" fill="none" opacity="0.3" />
            {/* pin */}
            <g transform="translate(400, 150)">
              <circle r="40" fill="#C9A961" opacity="0.15">
                <animate attributeName="r" values="40;60;40" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle r="22" fill="#C9A961" opacity="0.25" />
              <circle r="10" fill="#C9A961" />
              <circle r="4" fill="#1F3329" />
            </g>
          </svg>
          <div className="absolute inset-0 flex items-end p-8 md:p-12">
            <div>
              <p className="kicker text-gold-400">— You'll find us here</p>
              <p className="mt-3 display text-2xl md:text-4xl text-cream-100 max-w-md leading-tight">
                12 Independence Layout, <em className="font-light not-italic text-gold-400">Enugu.</em>
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  hotelInfo.mapsQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream-100 hover:bg-gold-500 text-forest-900 px-6 py-3 text-sm tracking-wide transition-colors"
              >
                Open directions
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
      <MobileBottomCTA />
      <FloatingWhatsApp />
    </main>
  );
}
