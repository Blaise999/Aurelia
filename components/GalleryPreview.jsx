"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/lib/data";

function first(category) {
  return gallery.find((g) => g.category === category) || gallery[0];
}

const preview = [
  first("Rooms"),
  first("Restaurant"),
  first("Exterior"),
  first("Lobby"),
  first("Bathroom"),
  first("Detail"),
];

export default function GalleryPreview() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-cream-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="kicker">— A look around</p>
            <h2 className="display mt-4 text-5xl md:text-7xl text-forest-800">
              The hotel,
              <br />
              <em className="font-light not-italic text-forest-600">in pictures.</em>
            </h2>
            <p className="mt-5 max-w-md text-ink-muted">
              Over a hundred photographs across rooms, the courtyard restaurant, and the small details we care about.
            </p>
          </motion.div>
          <Link
            href="/gallery"
            className="link-underline inline-flex items-center gap-2 text-forest-700 text-sm tracking-wider uppercase shrink-0"
          >
            Browse all {gallery.length} images
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {preview.map((img, i) => (
            <motion.div
              key={img.src + i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative rounded-2xl overflow-hidden bg-cream-200 ${
                i === 0
                  ? "row-span-2 col-span-2 md:col-span-2 aspect-square md:aspect-auto"
                  : i === 3
                    ? "md:row-span-2 aspect-square md:aspect-auto"
                    : "aspect-square"
              }`}
            >
              <motion.img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-forest-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] uppercase tracking-wider text-gold-300">
                  {img.category}
                </p>
                <p className="text-xs text-cream-100 mt-0.5">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
