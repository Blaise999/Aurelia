"use client";

import { motion } from "framer-motion";
import { gallery } from "@/lib/data";

/**
 * Infinite horizontal marquee of gallery images.
 * Two rows scrolling in opposite directions for a rich, layered feel.
 */
export default function InsideStrip({
  rows = 2,
  speed = 60, // seconds per loop
  showHeader = true,
}) {
  // Pick a varied subset across categories
  const images = gallery.slice(0, 40);
  const half = Math.ceil(images.length / 2);
  const rowA = images.slice(0, half);
  const rowB = images.slice(half);

  return (
    <section className="bg-cream-50 py-20 md:py-28 overflow-hidden">
      {showHeader && (
        <div className="mx-auto max-w-7xl px-6 md:px-10 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="max-w-2xl">
              <p className="kicker text-gold-600">— Inside the hotel</p>
              <h2 className="display mt-4 text-4xl md:text-6xl text-forest-800 leading-[1.05]">
                A hundred small <em className="font-light not-italic text-forest-600">details.</em>
              </h2>
            </div>
            <p className="text-ink-muted max-w-sm">
              Linen, lamps, light through the courtyard, and the coffee that always somehow tastes better here.
            </p>
          </motion.div>
        </div>
      )}

      <div className="space-y-4 md:space-y-5">
        <Marquee items={rowA} duration={speed} direction="left" />
        {rows > 1 && (
          <Marquee items={rowB} duration={speed * 1.15} direction="right" />
        )}
      </div>
    </section>
  );
}

function Marquee({ items, duration, direction }) {
  // Duplicate to allow seamless looping
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-4 md:gap-5 w-max"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loop.map((img, i) => (
          <div
            key={i}
            className="relative shrink-0 w-[60vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] aspect-[4/5] rounded-2xl overflow-hidden bg-cream-200"
          >
            <img
              src={img.src}
              alt={img.caption}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-forest-900/60 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-[10px] uppercase tracking-wider text-gold-300">
                {img.category}
              </p>
              <p className="text-xs text-cream-100 mt-0.5 line-clamp-1">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
