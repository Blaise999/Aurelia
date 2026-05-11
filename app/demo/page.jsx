"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import {
  ArrowUpRight,
  Smartphone,
  Building2,
  Utensils,
  ShieldCheck,
  Home,
  ScanLine,
} from "lucide-react";
import Logo from "@/components/Logo";

/**
 * Sponsor-facing demo hub. Renders a live QR code for every key flow
 * so sponsors can scan straight from the screen with their phone camera.
 *
 * Each QR encodes an absolute URL (built client-side from window.location.origin)
 * which means the codes work whether the demo is running on localhost,
 * a tunnel (ngrok/cloudflared), or a deployed domain.
 */

export default function DemoPage() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const flows = [
    {
      id: "site",
      icon: Home,
      title: "The hotel website",
      blurb:
        "Start here. The full guest-facing site — homepage, rooms, gallery, offers.",
      path: "/",
      cta: "Open homepage",
      tone: "forest",
    },
    {
      id: "book",
      icon: Building2,
      title: "Reserve a room",
      blurb:
        "Walk through the booking form, the Paystack-styled deposit modal, and the QR confirmation page.",
      path: "/booking",
      cta: "Start a booking",
      tone: "gold",
    },
    {
      id: "rs",
      icon: Utensils,
      title: "Room Service · Room 204",
      blurb:
        "What a guest sees after scanning the QR card on the desk in their room. Order food, request housekeeping, send maintenance issues.",
      path: "/room-service/204",
      cta: "Open room service",
      tone: "gold",
    },
    {
      id: "recep",
      icon: ScanLine,
      title: "Reception scanner",
      blurb:
        "What reception staff use to verify a guest's QR at check-in. Includes a viewfinder and manual reference fallback.",
      path: "/reception/scan",
      cta: "Open scanner",
      tone: "forest",
    },
    {
      id: "admin",
      icon: ShieldCheck,
      title: "Admin dashboard",
      blurb:
        "Behind the scenes — bookings, live room service requests, rooms inventory, settings.",
      path: "/admin",
      cta: "Open admin",
      tone: "forest",
    },
    {
      id: "rs-admin",
      icon: Utensils,
      title: "Live room service feed",
      blurb:
        "Staff view of incoming room service requests with status pipeline (pending → accepted → preparing → on the way → completed).",
      path: "/admin/room-service",
      cta: "Open feed",
      tone: "gold",
    },
  ];

  return (
    <main className="min-h-screen bg-cream-100">
      {/* Top bar */}
      <header className="bg-forest-800 text-cream-100">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 flex items-center justify-between">
          <Logo tone="dark" size="md" asLink={false} />
          <Link
            href="/"
            className="text-xs text-cream-100/70 hover:text-gold-400 underline-offset-4 hover:underline transition-colors"
          >
            Back to homepage
          </Link>
        </div>
      </header>

      {/* Intro */}
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-[10px] tracking-[0.32em] uppercase text-gold-600">
              Demo · Sponsor preview
            </p>
            <h1 className="display mt-4 text-4xl md:text-6xl text-forest-800 leading-[1.05]">
              Scan any QR.
              <br />
              <em className="font-light not-italic text-forest-600">
                See the flow on your phone.
              </em>
            </h1>
            <p className="mt-5 text-ink-muted leading-relaxed">
              Six flows we built for Aurelia Hotel. Each QR opens the matching page directly on your phone — no app, no install, no friction. Point your camera at any code, or click the buttons to open them in this browser.
            </p>
          </motion.div>

          {/* Origin notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 rounded-2xl bg-forest-700/5 border border-forest-700/15 p-5 max-w-3xl"
          >
            <div className="flex items-start gap-3">
              <Smartphone className="h-5 w-5 text-gold-600 mt-0.5 shrink-0" />
              <div className="text-sm text-forest-800">
                <p className="font-medium">Scanning from this screen?</p>
                <p className="mt-1 text-ink-muted leading-relaxed">
                  The QR codes encode the URLs running on this exact server (
                  <span className="font-mono text-xs">{origin || "loading…"}</span>
                  ). If you're running locally, your phone needs to be on the same Wi-Fi — or use a tunnel like ngrok / cloudflared.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flow grid */}
      <section className="px-6 md:px-10 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {flows.map((flow, i) => (
              <FlowCard
                key={flow.id}
                flow={flow}
                origin={origin}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="px-6 md:px-10 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] tracking-[0.32em] uppercase text-gold-600">
            How this works in production
          </p>
          <p className="mt-4 text-sm text-ink-muted leading-relaxed">
            In the live hotel, the booking QR is emailed to the guest after deposit payment. The room service QR is printed on a card placed on each desk. The reception scanner runs on a tablet at the front desk. Each code is a plain URL — every modern phone camera reads them automatically.
          </p>
        </div>
      </section>
    </main>
  );
}

function FlowCard({ flow, origin, index }) {
  const url = origin ? `${origin}${flow.path}` : "";
  const Icon = flow.icon;
  const isGold = flow.tone === "gold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-3xl bg-cream-50 border border-cream-300 overflow-hidden hover:border-forest-700/30 transition-colors"
    >
      {/* QR section */}
      <div
        className={`p-8 flex items-center justify-center ${
          isGold ? "bg-gradient-to-br from-gold-500/10 to-cream-50" : "bg-forest-800"
        }`}
      >
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          {url ? (
            <QRCode
              value={url}
              size={160}
              bgColor="#ffffff"
              fgColor={isGold ? "#5C4A1F" : "#1F3329"}
            />
          ) : (
            <div className="h-[160px] w-[160px] bg-cream-200 rounded animate-pulse" />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Icon className="h-4 w-4 text-gold-600" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold-600">
            Flow {String(index + 1).padStart(2, "0")}
          </p>
        </div>
        <h3 className="display text-xl text-forest-800 leading-tight">
          {flow.title}
        </h3>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
          {flow.blurb}
        </p>

        {url && (
          <p className="mt-3 text-[10px] font-mono text-ink-muted/60 truncate">
            {url}
          </p>
        )}

        <Link
          href={flow.path}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-5 py-2.5 text-xs transition-colors group"
        >
          {flow.cta}
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:rotate-45" />
        </Link>
      </div>
    </motion.div>
  );
}
