"use client";

import { motion } from "framer-motion";
import { trustPoints } from "@/lib/data";

export default function TrustStrip() {
  return (
    <section className="bg-forest-700 text-cream-100">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-7">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[11px] tracking-[0.25em] uppercase text-cream-100/80">
          {trustPoints.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <span className="w-1 h-1 rounded-full bg-gold-400" />
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
