"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Edit3, Plus, ArrowUpRight, Calendar } from "lucide-react";
import { offers } from "@/lib/data";

export default function AdminOffersPage() {
  return (
    <div className="px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-4 mb-8"
        >
          <div>
            <p className="kicker text-gold-600">— Promotions</p>
            <h1 className="display mt-3 text-4xl md:text-5xl text-forest-800">
              Offers
            </h1>
            <p className="mt-2 text-ink-muted">
              Manage seasonal and stay-length offers shown on the public site.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-6 py-3 text-sm tracking-wide transition-colors">
            <Plus className="h-4 w-4" />
            New offer
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {offers.map((offer, idx) => (
            <motion.div
              key={offer.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-cream-300 bg-cream-50 overflow-hidden hover:border-forest-700/20 transition-colors"
            >
              <div className="aspect-[16/9] relative bg-cream-200">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full bg-cream-100/95 backdrop-blur text-xs uppercase tracking-wider text-forest-800 px-3 py-1">
                  Active
                </span>
              </div>
              <div className="p-5">
                <h3 className="display text-xl text-forest-800">
                  {offer.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted line-clamp-2">
                  {offer.summary}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
                  <Calendar className="h-3.5 w-3.5 text-gold-500" />
                  {offer.validity}
                </div>
                <div className="mt-5 flex gap-2">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-cream-100 border border-cream-300 hover:border-forest-700/30 text-forest-800 px-4 py-2 text-xs transition-colors">
                    <Edit3 className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <Link
                    href="/offers"
                    target="_blank"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-100 px-4 py-2 text-xs transition-colors"
                  >
                    View
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-xs text-ink-muted">
          Note: This is a demo interface. Edits are not persisted.
        </p>
      </div>
    </div>
  );
}
