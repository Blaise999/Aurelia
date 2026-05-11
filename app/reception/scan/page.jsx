"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ScanLine,
  Camera,
  Type,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import Logo from "@/components/Logo";

/**
 * Demo scanner page. Provides three ways to "scan":
 *  1) Camera viewfinder (visual only — no actual camera permissions in demo)
 *  2) Type/paste a booking reference
 *  3) Paste a full QR URL
 *
 * In production: integrate `html5-qrcode` or `react-zxing` to read codes
 * directly from the device camera and route to /reception/verify.
 */

export default function ReceptionScanPage() {
  const router = useRouter();
  const [mode, setMode] = useState("camera");
  const [refInput, setRefInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");

  const submitRef = (e) => {
    e.preventDefault();
    setError("");
    const cleaned = refInput.trim().toUpperCase();
    if (!cleaned.match(/^AUR-\d{6}$/)) {
      setError("Reference should look like AUR-123456");
      return;
    }
    // Build a minimal verify URL; pages handle missing fields gracefully.
    const params = new URLSearchParams({ ref: cleaned });
    router.push(`/reception/verify?${params.toString()}`);
  };

  const submitUrl = (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = new URL(urlInput.trim());
      if (!url.pathname.includes("/reception/verify")) {
        setError("That URL isn't a booking QR.");
        return;
      }
      router.push(`/reception/verify?${url.searchParams.toString()}`);
    } catch {
      setError("That doesn't look like a valid URL.");
    }
  };

  return (
    <main className="min-h-screen bg-forest-900 text-cream-100">
      {/* Top bar */}
      <header className="bg-forest-800 px-5 py-4 flex items-center justify-between border-b border-cream-100/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="h-9 w-9 rounded-full bg-cream-100/10 flex items-center justify-center hover:bg-cream-100/20 transition-colors"
            aria-label="Back to admin"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Logo tone="dark" size="sm" asLink={false} />
        </div>
        <span className="text-xs text-gold-400 tracking-[0.25em] uppercase">
          Reception
        </span>
      </header>

      <section className="px-5 py-8 md:py-12">
        <div className="mx-auto max-w-md">
          <p className="text-[10px] tracking-[0.32em] uppercase text-gold-400">
            Check-in
          </p>
          <h1 className="display mt-3 text-3xl md:text-4xl text-cream-100 leading-tight">
            Scan a guest's QR.
          </h1>
          <p className="mt-3 text-sm text-cream-100/60 leading-relaxed">
            Hold the QR card from the guest's phone in front of the camera. The
            booking will load automatically. Or type the reference manually.
          </p>

          {/* Mode tabs */}
          <div className="mt-7 flex gap-2 bg-cream-100/5 rounded-full p-1">
            {[
              { key: "camera", label: "Camera", Icon: Camera },
              { key: "ref", label: "Reference", Icon: Type },
              { key: "url", label: "URL", Icon: ScanLine },
            ].map(({ key, label, Icon }) => {
              const active = mode === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setMode(key);
                    setError("");
                  }}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs transition-colors ${
                    active
                      ? "bg-cream-100 text-forest-900"
                      : "text-cream-100/70 hover:text-cream-100"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Camera viewfinder */}
          {mode === "camera" && (
            <motion.div
              key="camera"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
            >
              <CameraViewfinder />
              <p className="mt-4 text-xs text-cream-100/50 text-center leading-relaxed">
                Demo viewfinder — no camera access. In production, this is a
                live camera feed reading QR codes via{" "}
                <code className="bg-cream-100/10 px-1.5 py-0.5 rounded">
                  html5-qrcode
                </code>
                .
              </p>
              <button
                onClick={() => setMode("ref")}
                className="mt-4 w-full rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-6 py-3 text-sm font-medium transition-colors"
              >
                Type reference instead
              </button>
            </motion.div>
          )}

          {/* Reference input */}
          {mode === "ref" && (
            <motion.form
              key="ref"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={submitRef}
              className="mt-6 space-y-4"
            >
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400">
                  Booking reference
                </span>
                <input
                  type="text"
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  placeholder="AUR-123456"
                  className="mt-2 w-full rounded-xl bg-cream-100/10 border border-cream-100/20 px-4 py-4 text-cream-100 placeholder:text-cream-100/30 text-lg tracking-wider font-mono uppercase focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30 transition-all"
                  autoFocus
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                Verify booking
              </button>
              <p className="text-xs text-cream-100/50 text-center">
                Hint: any guest who booked through the demo will have a reference
                like <span className="text-gold-400 font-mono">AUR-XXXXXX</span>{" "}
                shown on the success page.
              </p>
            </motion.form>
          )}

          {/* URL input */}
          {mode === "url" && (
            <motion.form
              key="url"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={submitUrl}
              className="mt-6 space-y-4"
            >
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400">
                  Paste QR URL
                </span>
                <textarea
                  rows={3}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://aurelia.example/reception/verify?ref=AUR-..."
                  className="mt-2 w-full rounded-xl bg-cream-100/10 border border-cream-100/20 px-4 py-3 text-cream-100 placeholder:text-cream-100/30 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30 transition-all resize-none"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                Verify
              </button>
              <p className="text-xs text-cream-100/50 text-center leading-relaxed">
                Tip: from a guest's confirmation page, scan the QR with another
                device (or use the "Open as if reception scanned it" button).
              </p>
            </motion.form>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 p-4 text-sm flex items-start gap-3"
            >
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

/* --------------- Camera viewfinder ---------------- */

function CameraViewfinder() {
  return (
    <div className="relative aspect-square rounded-3xl overflow-hidden bg-black">
      {/* Simulated camera feed — gradient + grain */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-black" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(201,169,97,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Viewfinder frame corners */}
      <div className="absolute inset-12 pointer-events-none">
        {[
          "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
          "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
          "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
          "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
        ].map((cls, i) => (
          <span
            key={i}
            className={`absolute w-12 h-12 border-gold-400 ${cls}`}
          />
        ))}
      </div>

      {/* Animated scan line */}
      <motion.div
        initial={{ y: "-50%" }}
        animate={{ y: "50%" }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute left-12 right-12 top-1/2 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #C9A961 50%, transparent 100%)",
          boxShadow: "0 0 12px #C9A961",
        }}
      />

      {/* Centre prompt */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <ScanLine className="h-8 w-8 text-gold-400/60 mb-3" />
        <p className="text-sm text-cream-100/70">Hold the QR inside the frame</p>
      </div>
    </div>
  );
}
