"use client";

import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { hotelInfo } from "@/lib/data";

const sections = [
  {
    title: "Hotel details",
    fields: [
      { label: "Hotel name", value: hotelInfo.name },
      { label: "Tagline", value: hotelInfo.tagline },
      { label: "Address", value: hotelInfo.address },
      { label: "City", value: hotelInfo.city },
    ],
  },
  {
    title: "Contact & reservations",
    fields: [
      { label: "Phone number", value: hotelInfo.phone },
      { label: "WhatsApp number", value: `+${hotelInfo.whatsapp}` },
      { label: "Reservations email", value: hotelInfo.email },
      { label: "Reception hours", value: hotelInfo.hours },
    ],
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="kicker text-gold-600">— Configuration</p>
          <h1 className="display mt-3 text-4xl md:text-5xl text-forest-800">
            Settings
          </h1>
          <p className="mt-2 text-ink-muted">
            Hotel details that appear across the public website.
          </p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, sIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + sIdx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-cream-300 bg-cream-50 p-6 md:p-7"
            >
              <h2 className="display text-2xl text-forest-800 mb-5">
                {section.title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {section.fields.map((field) => (
                  <label key={field.label} className="block">
                    <span className="kicker block mb-2">{field.label}</span>
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full rounded-xl bg-cream-100 border border-cream-300 px-4 py-3 text-sm text-forest-800 focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30 transition-all"
                    />
                  </label>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-center gap-4"
        >
          <button className="inline-flex items-center gap-2 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-7 py-3.5 text-sm tracking-wide transition-colors">
            <Save className="h-4 w-4" />
            Save changes
          </button>
          <p className="text-xs text-ink-muted">
            Demo only — changes are not persisted.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
