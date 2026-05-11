"use client";

import { motion } from "framer-motion";
import { Plus, Trash2, Upload } from "lucide-react";
import { gallery, galleryCategories } from "@/lib/data";

export default function AdminGalleryPage() {
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
            <p className="kicker text-gold-600">— Photos</p>
            <h1 className="display mt-3 text-4xl md:text-5xl text-forest-800">
              Gallery
            </h1>
            <p className="mt-2 text-ink-muted">
              {gallery.length} images across {galleryCategories.length - 1}{" "}
              categories.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-6 py-3 text-sm tracking-wide transition-colors">
            <Upload className="h-4 w-4" />
            Upload images
          </button>
        </motion.div>

        {/* Category counts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8"
        >
          {galleryCategories.slice(1).map((cat) => {
            const count = gallery.filter((g) => g.category === cat).length;
            return (
              <div
                key={cat}
                className="rounded-xl bg-cream-50 border border-cream-300 p-4"
              >
                <p className="kicker">{cat}</p>
                <p className="display mt-2 text-2xl text-forest-800">
                  {count}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {gallery.map((item, idx) => (
            <motion.div
              key={`${item.category}-${idx}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-cream-200"
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <button
                aria-label="Delete"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-cream-100/95 hover:bg-red-600 hover:text-cream-100 text-forest-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] uppercase tracking-wider text-gold-300">
                  {item.category}
                </p>
                <p className="text-xs text-cream-100 line-clamp-2 mt-0.5">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Add tile */}
          <button className="aspect-square rounded-xl border-2 border-dashed border-cream-300 hover:border-forest-700/40 flex flex-col items-center justify-center gap-2 text-ink-muted hover:text-forest-700 transition-colors">
            <div className="h-10 w-10 rounded-full bg-cream-50 flex items-center justify-center">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-xs">Add image</span>
          </button>
        </motion.div>

        <p className="mt-8 text-xs text-ink-muted">
          Note: This is a demo interface. Uploads are not persisted.
        </p>
      </div>
    </div>
  );
}
