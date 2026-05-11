"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Users, BedDouble } from "lucide-react";
import { formatNGN } from "@/lib/data";

export default function RoomCard({ room, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <Link href={`/rooms/${room.slug}`} className="block">
        <div className="relative overflow-hidden rounded-3xl bg-cream-200 aspect-[4/5]">
          <motion.img
            src={room.images[0]}
            alt={room.name}
            className="absolute inset-0 h-full w-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Tier ribbon */}
          <div className="absolute top-5 left-5">
            <span className="inline-block rounded-full bg-cream-100/90 backdrop-blur px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase text-forest-700">
              {room.tier}
            </span>
          </div>

          {/* Bottom info card */}
          <div className="absolute inset-x-5 bottom-5">
            <div className="rounded-2xl bg-cream-100/95 backdrop-blur-md p-5 flex items-end justify-between gap-4">
              <div>
                <h3 className="display text-2xl text-forest-800 leading-none">
                  {room.name}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-[11px] tracking-wider uppercase text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3 h-3" />
                    Sleeps {room.capacity}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="w-3 h-3" />
                    {room.bedType}
                  </span>
                </div>
              </div>
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full bg-forest-700 text-cream-100 flex items-center justify-center shrink-0"
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <p className="text-sm text-ink-muted leading-relaxed pr-4 line-clamp-2">
            {room.short}
          </p>
          <div className="text-right shrink-0">
            <p className="text-[10px] tracking-[0.25em] uppercase text-ink-muted">
              From
            </p>
            <p className="display text-3xl text-forest-700 leading-none mt-1">
              {formatNGN(room.pricePerNight)}
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-1">
              per night
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
