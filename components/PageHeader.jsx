"use client";

import { motion } from "framer-motion";

export default function PageHeader({ kicker, title, intro, dark = false }) {
  return (
    <section
      className={`pt-36 pb-20 md:pt-44 md:pb-28 px-6 md:px-10 ${
        dark ? "bg-forest-800 text-cream-100" : "bg-cream-100"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`kicker ${dark ? "text-gold-400" : ""}`}
        >
          {kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`display mt-5 text-5xl md:text-7xl lg:text-8xl ${
            dark ? "text-cream-100" : "text-forest-800"
          }`}
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className={`mt-8 max-w-2xl text-lg leading-relaxed ${
              dark ? "text-cream-100/70" : "text-ink-muted"
            }`}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
