"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-cream-50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-16"
        >
          <p className="kicker">— What guests say</p>
          <h2 className="display mt-4 text-5xl md:text-7xl text-forest-800">
            <em className="font-light not-italic">"</em>
            We came back the next month.
            <em className="font-light not-italic">"</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-3xl bg-cream-100 border border-cream-300/60 p-8 flex flex-col"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-gold-500 text-gold-500"
                  />
                ))}
              </div>
              <blockquote className="display text-2xl text-forest-800 mt-5 leading-snug">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-cream-300/60 text-sm">
                <span className="block text-ink font-medium">{t.name}</span>
                <span className="block text-ink-muted text-xs mt-1 uppercase tracking-wider">
                  {t.location}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
