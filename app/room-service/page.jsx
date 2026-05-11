"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { QrCode, ArrowUpRight, Smartphone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { roomNumbers } from "@/lib/data";

export default function RoomServiceIndex() {
  return (
    <main className="bg-cream-100 min-h-screen">
      <Navbar />

      <PageHeader
        kicker="— Room Service"
        title={
          <>
            Scan the QR
            <br />
            <em className="font-light not-italic text-forest-600">in your room.</em>
          </>
        }
        intro="Every room at Aurelia has a QR code on the desk. Scan it with your phone camera to order food, request housekeeping, or report a maintenance issue — without leaving the room."
      />

      {/* How it works */}
      <section className="px-6 md:px-10 pb-16">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-3 gap-6">
          {[
            {
              icon: QrCode,
              title: "Find the card",
              text: "On the desk in every room. Or on the bedside table if you've moved it.",
            },
            {
              icon: Smartphone,
              title: "Scan with your camera",
              text: "Point your phone camera at the code. The room service menu opens — no app required.",
            },
            {
              icon: ArrowUpRight,
              title: "Send your request",
              text: "Browse the menu, send your request, and we'll be at your door with whatever you asked for.",
            },
          ].map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-cream-50 border border-cream-300 p-7"
            >
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-gold-500 text-sm tracking-wider">0{idx + 1}</span>
                <div className="h-px flex-1 bg-cream-300" />
              </div>
              <step.icon className="h-7 w-7 text-forest-700 mb-4" strokeWidth={1.5} />
              <h3 className="display text-xl text-forest-800">{step.title}</h3>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Demo: pick a room */}
      <section className="px-6 md:px-10 pb-32">
        <div className="mx-auto max-w-7xl rounded-3xl bg-forest-800 text-cream-100 p-8 md:p-12">
          <p className="kicker text-gold-400">— Demo</p>
          <h2 className="display mt-4 text-3xl md:text-4xl text-cream-100 leading-tight">
            Try the room service interface.
          </h2>
          <p className="mt-3 text-cream-100/70 max-w-xl">
            In the live hotel, the QR card on each desk opens the page for that specific room. To preview the experience, pick any room number below.
          </p>
          <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
            {roomNumbers.map((room) => (
              <Link
                key={room}
                href={`/room-service/${room}`}
                className="rounded-xl bg-cream-100/10 hover:bg-gold-500 hover:text-forest-900 text-cream-100 text-center py-3 text-sm tracking-wide transition-colors"
              >
                {room}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
