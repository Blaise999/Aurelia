"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { hotelInfo, nearbyPlaces } from "@/lib/data";

export default function LocationSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-cream-100">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="kicker">— Where we are</p>
          <h2 className="display mt-4 text-5xl md:text-7xl text-forest-800">
            Quietly central.
          </h2>
          <p className="mt-6 text-ink-muted leading-relaxed max-w-md">
            {hotelInfo.address}. Five minutes by foot from Independence Layout,
            twelve minutes by car from Akanu Ibiam Airport, and a short walk
            from most of what you'll want to see in the city.
          </p>

          <ul className="mt-10 space-y-4">
            {nearbyPlaces.map((p, i) => (
              <motion.li
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-baseline justify-between gap-4 pb-4 border-b border-cream-300/60"
              >
                <span className="text-ink font-medium">{p.name}</span>
                <span className="text-ink-muted text-sm">{p.distance}</span>
              </motion.li>
            ))}
          </ul>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              hotelInfo.mapsQuery,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-forest-700 hover:bg-forest-800 transition-colors text-cream-100 px-6 py-3.5 text-sm tracking-wide"
          >
            <MapPin className="w-4 h-4" />
            Open in Google Maps
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-forest-700"
        >
          {/* Stylized map illustration using SVG since we don't have a real map embed */}
          <svg
            viewBox="0 0 600 750"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="mapgrid"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(250,247,242,0.06)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="600" height="750" fill="#1A2B24" />
            <rect width="600" height="750" fill="url(#mapgrid)" />

            {/* Roads */}
            <path
              d="M 0 200 Q 200 180, 600 250"
              stroke="rgba(201,169,97,0.25)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M 0 480 L 600 420"
              stroke="rgba(250,247,242,0.15)"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M 200 0 Q 280 300, 350 750"
              stroke="rgba(250,247,242,0.1)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 450 0 L 380 750"
              stroke="rgba(250,247,242,0.08)"
              strokeWidth="2"
              fill="none"
            />

            {/* Building blocks */}
            <rect x="60" y="100" width="80" height="60" fill="rgba(250,247,242,0.04)" rx="4" />
            <rect x="160" y="280" width="120" height="80" fill="rgba(250,247,242,0.04)" rx="4" />
            <rect x="380" y="100" width="100" height="70" fill="rgba(250,247,242,0.04)" rx="4" />
            <rect x="80" y="540" width="140" height="100" fill="rgba(250,247,242,0.04)" rx="4" />
            <rect x="420" y="540" width="100" height="80" fill="rgba(250,247,242,0.04)" rx="4" />

            {/* Pin marker (centered) */}
            <g transform="translate(300, 370)">
              <circle r="60" fill="rgba(201,169,97,0.12)">
                <animate
                  attributeName="r"
                  values="40;75;40"
                  dur="3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0;0.5"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="32" fill="rgba(201,169,97,0.2)" />
              <circle r="14" fill="#C9A961" />
              <circle r="6" fill="#1A2B24" />
            </g>

            {/* Label card */}
            <foreignObject x="160" y="430" width="280" height="80">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  background: "rgba(250,247,242,0.95)",
                  borderRadius: 16,
                  padding: "12px 18px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#5C5C5C",
                  }}
                >
                  Aurelia Hotel
                </div>
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 22,
                    color: "#22382F",
                    marginTop: 4,
                  }}
                >
                  Independence Layout
                </div>
              </div>
            </foreignObject>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
