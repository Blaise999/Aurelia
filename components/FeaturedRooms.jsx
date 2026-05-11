"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { rooms } from "@/lib/data";
import RoomCard from "./RoomCard";

export default function FeaturedRooms() {
  const featured = rooms.filter((r) => r.featured);

  return (
    <section id="rooms" className="py-24 md:py-32 px-6 md:px-10 bg-cream-100">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="kicker">— Rooms & Suites</p>
            <h2 className="display mt-4 text-5xl md:text-7xl text-forest-800">
              Twelve rooms.
              <br />
              <em className="font-light not-italic text-forest-600">
                No two alike.
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:max-w-sm"
          >
            <p className="text-ink-muted leading-relaxed">
              Each room is shaped by what it overlooks — the courtyard, the
              garden, or the city beyond. Choose what suits the trip.
            </p>
            <Link
              href="/rooms"
              className="link-underline mt-5 inline-flex items-center gap-2 text-forest-700 text-sm tracking-wider uppercase"
            >
              View all rooms <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featured.map((room, i) => (
            <RoomCard key={room.slug} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
