"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { offers, getRoomBySlug } from "@/lib/data";

export default function OffersPage() {
  return (
    <main className="bg-cream-100 min-h-screen">
      <Navbar />

      <PageHeader
        kicker="— Offers"
        title={
          <>
            Quiet rates,
            <br />
            <em className="font-light not-italic text-forest-600">
              honest value.
            </em>
          </>
        }
        intro="A small collection of seasonal and stay-length rates. We don't run sales — we run reasonable prices for thoughtful guests."
      />

      <section className="px-6 md:px-10 pb-32">
        <div className="mx-auto max-w-7xl space-y-10 md:space-y-16">
          {offers.map((offer, idx) => {
            const isReverse = idx % 2 === 1;
            return (
              <motion.article
                key={offer.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-center rounded-3xl bg-cream-50 border border-cream-300 overflow-hidden ${
                  isReverse ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[440px] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute top-5 left-5 rounded-full bg-cream-100/95 backdrop-blur px-4 py-2 text-xs uppercase tracking-wider text-forest-800 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-gold-500" />
                    {offer.title}
                  </div>
                </div>

                <div className="p-8 md:p-12 lg:p-14">
                  <p className="kicker text-gold-600">— Offer 0{idx + 1}</p>
                  <h2 className="display mt-4 text-4xl md:text-5xl text-forest-800 leading-[1.05]">
                    {offer.title}
                  </h2>
                  <p className="mt-5 text-lg text-forest-700 font-medium">
                    {offer.summary}
                  </p>
                  <p className="mt-4 text-ink-muted leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-sm text-ink-muted">
                    <Calendar className="h-4 w-4 text-gold-500" />
                    <span>Valid: {offer.validity}</span>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-wider text-ink-muted/70 mb-3">
                      Eligible rooms
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {offer.eligibleRooms.map((slug) => {
                        const room = getRoomBySlug(slug);
                        return (
                          <Link
                            key={slug}
                            href={`/rooms/${slug}`}
                            className="rounded-full border border-forest-700/20 px-4 py-1.5 text-sm text-forest-800 hover:border-forest-700/50 transition-colors"
                          >
                            {room?.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      href={`/booking?offer=${offer.slug}`}
                      className="group inline-flex items-center gap-2 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-7 py-3.5 text-sm tracking-wide transition-colors"
                    >
                      Request this offer
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </Link>
                    <Link
                      href={`/rooms/${offer.eligibleRooms[0]}`}
                      className="inline-flex items-center rounded-full border border-forest-700/20 hover:border-forest-700/40 px-7 py-3.5 text-sm tracking-wide text-forest-800 transition-colors"
                    >
                      View room details
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Closing note */}
      <section className="px-6 md:px-10 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="kicker text-gold-600">— A note</p>
          <p className="mt-5 text-2xl md:text-3xl display text-forest-800 leading-tight">
            Don't see what you need? <em className="font-light not-italic text-forest-600">Just ask.</em>
          </p>
          <p className="mt-5 text-ink-muted">
            For group stays, weddings, or extended bookings, please reach our reservations team directly. We'll put together a quiet, fair rate for your stay.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-7 py-3.5 text-sm tracking-wide transition-colors"
          >
            Contact reservations
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
      <MobileBottomCTA />
      <FloatingWhatsApp />
    </main>
  );
}
