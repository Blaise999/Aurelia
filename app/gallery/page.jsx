"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { gallery, galleryCategories } from "@/lib/data";
import { X } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === "All"
      ? gallery
      : gallery.filter((g) => g.category === activeCategory);

  return (
    <main className="bg-cream-100 min-h-screen">
      <Navbar />

      <PageHeader
        kicker="— Gallery"
        title={
          <>
            Quiet rooms,
            <br />
            <em className="font-light not-italic text-forest-600">
              warm corners.
            </em>
          </>
        }
        intro={`A look around the hotel — ${gallery.length} photographs across rooms, the courtyard, the restaurant, and the small details we care about.`}
      />

      {/* Filter pills */}
      <section className="px-6 md:px-10 pb-8">
        <div className="mx-auto max-w-7xl flex flex-wrap gap-2 md:gap-3">
          {galleryCategories.map((cat) => {
            const active = cat === activeCategory;
            const count =
              cat === "All"
                ? gallery.length
                : gallery.filter((g) => g.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 md:px-5 py-2 md:py-2.5 text-sm tracking-wide transition-all ${
                  active
                    ? "bg-forest-800 text-cream-100"
                    : "bg-cream-50 border border-cream-300 text-ink-muted hover:border-forest-700/30 hover:text-forest-800"
                }`}
              >
                {cat}
                <span className={`ml-2 text-xs ${active ? "text-gold-400" : "text-ink-muted/60"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Masonry grid */}
      <section className="px-6 md:px-10 pb-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => {
                // Vary aspect ratios for visual interest
                const tall = idx % 5 === 0 || idx % 7 === 0;
                return (
                  <motion.button
                    key={`${item.category}-${item.caption}-${idx}`}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setLightboxIndex(idx)}
                    className={`group relative overflow-hidden rounded-2xl bg-cream-200 ${
                      tall ? "row-span-2 aspect-[3/4]" : "aspect-square"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-4 right-4 text-left text-cream-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs uppercase tracking-wider text-gold-300">
                        {item.category}
                      </p>
                      <p className="text-sm mt-1">{item.caption}</p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] bg-forest-900/95 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 h-12 w-12 rounded-full bg-cream-100/10 hover:bg-cream-100/20 text-cream-100 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="mt-6 text-center">
                <p className="kicker text-gold-400">
                  {filtered[lightboxIndex].category}
                </p>
                <p className="mt-2 text-cream-100 text-lg">
                  {filtered[lightboxIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <MobileBottomCTA />
      <FloatingWhatsApp />
    </main>
  );
}
