"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { offers } from "@/lib/data";

export default function OffersSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-cream-100">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-16"
        >
          <p className="kicker">— Current offers</p>
          <h2 className="display mt-4 text-5xl md:text-7xl text-forest-800">
            Quiet ways to stay for less.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {offers.map((offer, i) => (
            <motion.article
              key={offer.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="group bg-cream-50 rounded-3xl overflow-hidden border border-cream-300/60"
            >
              <div className="aspect-[5/3] overflow-hidden">
                <motion.img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="p-7">
                <p className="kicker text-gold-700">{offer.validity}</p>
                <h3 className="display mt-3 text-3xl text-forest-800">
                  {offer.title}
                </h3>
                <p className="mt-3 text-ink-muted leading-relaxed text-sm">
                  {offer.summary}
                </p>
                <Link
                  href="/offers"
                  className="mt-6 inline-flex items-center gap-2 text-forest-700 text-sm tracking-wider uppercase"
                >
                  Read more
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
