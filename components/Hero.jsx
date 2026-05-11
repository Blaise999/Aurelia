"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionConfig } from "framer-motion";
import { ArrowUpRight, ArrowDown, MessageCircle } from "lucide-react";
import BookingSearch from "./BookingSearch";
import { buildWhatsAppLink } from "@/lib/data";

/**
 * Three sequential hero scenes pinned via sticky scroll.
 *
 * Layout: text lives in a constrained left column (max ~640px on desktop)
 * so headlines never overflow horizontally. Image fills the entire viewport
 * behind. On desktop, the right side of the viewport is intentionally
 * "empty" of text — letting the photo breathe.
 */

const scenes = [
  {
    id: "quiet",
    kicker: "A small hotel in Enugu",
    title: "Stay where it's quiet.",
    body:
      "Twelve rooms in Independence Layout. Real linen, good coffee, and a small team that picks up the phone when you call.",
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "place",
    kicker: "What we built",
    title: "Twelve rooms. One courtyard.",
    body:
      "We opened in 2019 with a simple idea — make a quiet place to stay in Enugu and treat people the way we'd want to be treated.",
    image:
      "https://images.unsplash.com/photo-1551776235-dde6d482980b?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "book",
    kicker: "Booking is simple",
    title: "Pay 60% online. Show your QR.",
    body:
      "Pick a room, pick your dates, pay the deposit on Paystack. We email you a QR code. Show it at reception, settle the rest at checkout.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2400&q=85",
  },
];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <MotionConfig transition={{ ease: [0.16, 1, 0.3, 1] }}>
      <section
        ref={containerRef}
        className="relative"
        style={{ height: "300svh" }}
        aria-label="Aurelia Hotel introduction"
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-forest-900">
          {scenes.map((scene, idx) => (
            <Scene
              key={scene.id}
              scene={scene}
              index={idx}
              total={scenes.length}
              progress={scrollYProgress}
              isLast={idx === scenes.length - 1}
            />
          ))}
          <SceneProgress progress={scrollYProgress} total={scenes.length} />
          <ScrollCue progress={scrollYProgress} />
        </div>
      </section>
    </MotionConfig>
  );
}

function Scene({ scene, index, total, progress, isLast }) {
  const start = index / total;
  const end = (index + 1) / total;
  const fadeIn = start === 0 ? start : start - 0.06;
  const fadeOut = isLast ? 2 : end - 0.06;
  const fullEnd = isLast ? 2 : end;

  const opacity = useTransform(
    progress,
    [fadeIn, start, fadeOut, fullEnd],
    [0, 1, 1, 0]
  );
  const imgScale = useTransform(
    progress,
    [fadeIn, start, end],
    [1.12, 1.0, 1.06]
  );
  const imgY = useTransform(progress, [start, end], ["0%", "-6%"]);
  const textY = useTransform(progress, [start, end], ["0%", "-22%"]);
  const supportOpacity = useTransform(
    progress,
    [fadeIn, start, end - 0.05, fullEnd],
    [0, 1, 1, 0]
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      {/* Background image */}
      <motion.div
        style={{ scale: imgScale, y: imgY }}
        className="absolute inset-0"
      >
        <img
          src={scene.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Overlays — strong on the left for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(15,30,22,0.85) 0%, rgba(15,30,22,0.6) 35%, rgba(15,30,22,0.15) 60%, rgba(15,30,22,0) 80%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,30,22,0.5) 0%, rgba(15,30,22,0) 25%, rgba(15,30,22,0) 65%, rgba(15,30,22,0.85) 100%)",
        }}
      />

      {/* Content layer — flexbox vertical centre, with safe top/bottom space */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full w-full flex items-center"
      >
        <div className="mx-auto max-w-7xl w-full px-6 md:px-10 pt-24 md:pt-28">
          {/* Constrained text column. On desktop, text sits in left ~50% of viewport. */}
          <div className="max-w-xl lg:max-w-2xl">
            {/* Scene number, desktop only */}
            <div className="hidden md:flex items-center gap-3 mb-5">
              <span
                className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-body"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
              >
                0{index + 1} / 0{total}
              </span>
              <span className="h-px w-10 bg-gold-400/60" />
            </div>

            {/* Kicker */}
            <p
              className="text-gold-300 text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-body font-medium"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
            >
              {scene.kicker}
            </p>

            {/*
              Headline. Single <h1> that wraps naturally inside the column.
              No forced line breaks. Sizes tuned per breakpoint:
              - mobile (< 640): clamp 2.5rem—4rem (40—64px) using fluid clamp
              - sm: 3.5rem (56px)
              - md: 4rem (64px)
              - lg: 4.5rem (72px)
              - xl: 5rem (80px)
              These fit one or two short lines comfortably in the column.
            */}
            <h1
              className="display mt-4 text-cream-100 leading-[1.05] tracking-tight"
              style={{
                fontSize: "clamp(2.25rem, 6.4vw, 3.25rem)",
                textShadow: "0 2px 18px rgba(0,0,0,0.45)",
              }}
            >
              <span className="hidden lg:block lg:text-[4.25rem] xl:text-[5rem]">
                {scene.title.split(". ").map((part, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <em className="not-italic font-light text-gold-300 italic">
                        {part}
                      </em>
                    ) : (
                      <>{part}.</>
                    )}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </span>
              {/* Mobile + tablet rendering: simpler, no forced breaks */}
              <span className="lg:hidden">{scene.title}</span>
            </h1>

            {/* Body + CTAs */}
            <motion.div
              style={{ opacity: supportOpacity }}
              className="mt-7 md:mt-9 space-y-7"
            >
              <p
                className="text-cream-100/90 text-base md:text-lg leading-relaxed max-w-md"
                style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
              >
                {scene.body}
              </p>

              <div className="flex flex-wrap gap-3">
                {isLast ? (
                  <>
                    <Link
                      href="/booking"
                      className="group inline-flex items-center gap-2 rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-7 py-4 text-sm tracking-wide font-medium transition-colors"
                    >
                      Reserve a room
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </Link>
                    <a
                      href={buildWhatsAppLink(
                        "Hello, I'd like to ask about a stay at Aurelia Hotel."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-cream-100/40 hover:border-cream-100/80 hover:bg-cream-100/10 text-cream-100 px-7 py-4 text-sm tracking-wide transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      href="/rooms"
                      className="group inline-flex items-center gap-2 rounded-full bg-cream-100 hover:bg-gold-500 text-forest-900 px-7 py-4 text-sm tracking-wide transition-colors"
                    >
                      Browse rooms
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center rounded-full border border-cream-100/40 hover:border-cream-100/80 hover:bg-cream-100/10 text-cream-100 px-7 py-4 text-sm tracking-wide transition-colors"
                    >
                      About the hotel
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Booking search dock — last scene only, desktop */}
      {isLast && (
        <motion.div
          style={{ opacity: supportOpacity }}
          className="absolute bottom-6 left-0 right-0 px-6 md:px-10 z-20 hidden lg:block"
        >
          <div className="mx-auto max-w-7xl">
            <BookingSearch />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function SceneProgress({ progress, total }) {
  return (
    <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 pointer-events-none">
      {Array.from({ length: total }).map((_, i) => {
        const start = i / total;
        const end = (i + 1) / total;
        return <ProgressDot key={i} progress={progress} start={start} end={end} />;
      })}
    </div>
  );
}

function ProgressDot({ progress, start, end }) {
  const fill = useTransform(progress, [start, end], [0, 1]);
  const fillPct = useTransform(
    fill,
    (v) => `${Math.max(0, Math.min(1, v)) * 100}%`
  );
  return (
    <span className="relative h-0.5 w-10 md:w-14 rounded-full bg-cream-100/25 overflow-hidden">
      <motion.span
        style={{ width: fillPct }}
        className="absolute inset-y-0 left-0 bg-gold-400"
      />
    </span>
  );
}

function ScrollCue({ progress }) {
  const opacity = useTransform(progress, [0, 0.05], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span className="text-cream-100/70 text-[10px] tracking-[0.3em] uppercase font-body">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-4 w-4 text-cream-100/70" />
      </motion.div>
    </motion.div>
  );
}
