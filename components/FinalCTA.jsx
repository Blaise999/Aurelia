"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { hotelInfo, buildWhatsAppLink } from "@/lib/data";

export default function FinalCTA() {
  const wa = buildWhatsAppLink(
    `Hello ${hotelInfo.shortName}, I'd like to ask about availability.`,
  );

  return (
    <section className="px-6 md:px-10 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl bg-forest-800 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative grain"
      >
        <div className="relative px-8 md:px-20 py-20 md:py-32 text-center text-cream-100">
          <p className="kicker text-gold-400">— Ready when you are</p>
          <h2 className="display mt-6 text-5xl md:text-7xl lg:text-8xl">
            Reserve a room.
            <br />
            <em className="font-light not-italic text-gold-400">
              We'll take care of the rest.
            </em>
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-cream-100/70 leading-relaxed">
            Pay the 60% deposit on Paystack. We'll email your QR code. Show it at reception, settle the balance at checkout. That's it.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
            <Link
              href="/booking"
              className="rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-8 py-4 text-sm tracking-wide font-medium transition-colors flex-1 inline-flex items-center justify-center gap-2"
            >
              Reserve a Room
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-cream-100/30 hover:border-cream-100/70 text-cream-100 px-8 py-4 text-sm tracking-wide transition-colors flex-1 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Reception
            </a>
          </div>
        </div>

        {/* Decorative gold ring */}
        <svg
          className="absolute -top-32 -right-32 w-[400px] h-[400px] text-gold-500/10 pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </section>
  );
}
