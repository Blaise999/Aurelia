"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const values = [
  {
    title: "Quietness, on purpose",
    text: "We design every floor for low ambient noise. Heavy doors, considered HVAC, soft hallways. The hotel should feel calmer than the city you arrived from.",
  },
  {
    title: "Honest hospitality",
    text: "We don't oversell. If a room is small, we say so. If breakfast is included, it's actually included. If your request can't be done, you'll know within an hour.",
  },
  {
    title: "Built for return guests",
    text: "Our regulars get the same room when they ask. Their breakfast preference is on file. The receptionist remembers their name. That's the entire job.",
  },
  {
    title: "Local, in the right way",
    text: "The art on the walls is from Enugu artists. Breakfast leans into local produce. The driver who picks you up from the airport has lived here his whole life.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-cream-100 min-h-screen">
      <Navbar />

      <PageHeader
        kicker="— About Aurelia"
        title={
          <>
            A small hotel,
            <br />
            <em className="font-light not-italic text-forest-600">
              quietly run.
            </em>
          </>
        }
        intro="Twenty-four rooms in Independence Layout, Enugu. Built in 2019, run by people who would rather get a hundred details right than make any one thing flashy."
      />

      {/* Story */}
      <section className="px-6 md:px-10 pb-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-cream-200">
              <img
                src="https://images.unsplash.com/photo-1551776235-dde6d482980b?auto=format&fit=crop&w=1600&q=80"
                alt="The courtyard at Aurelia"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 space-y-7 text-lg text-forest-800/90 leading-relaxed"
          >
            <p className="kicker text-gold-600">— Our story</p>
            <h2 className="display text-4xl md:text-5xl text-forest-800 leading-[1.05]">
              We built the hotel <em className="font-light not-italic text-forest-600">we wanted to stay in.</em>
            </h2>
            <p>
              Aurelia opened in 2019. Before that, our founder had spent a decade travelling for work — booking last-minute rooms in cities he didn't know, paying for things that didn't matter, and never once finding a hotel that just understood quiet.
            </p>
            <p>
              So we built one. Twenty-four rooms arranged around an internal courtyard. Heavy curtains. A reading lamp on each side of the bed. A receptionist who actually answers the phone. A small restaurant that serves three things at breakfast and does all three properly.
            </p>
            <p>
              We are not a chain. We will probably never be one. We have one hotel, in one city, run by people who live here. When you stay with us, you are staying with the people who own the building, and that's how we like it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-50 px-6 md:px-10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="kicker text-gold-600">— What we believe</p>
            <h2 className="display mt-5 text-4xl md:text-6xl text-forest-800 leading-[1.05]">
              Four things <em className="font-light not-italic text-forest-600">we don't compromise on.</em>
            </h2>
          </motion.div>

          <div className="mt-16 grid md:grid-cols-2 gap-6 md:gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-3xl bg-cream-100 border border-cream-300 p-8 md:p-10"
              >
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-gold-500 text-sm tracking-wider">
                    0{idx + 1}
                  </span>
                  <div className="h-px flex-1 bg-cream-300" />
                </div>
                <h3 className="display text-2xl md:text-3xl text-forest-800 mb-4">
                  {v.title}
                </h3>
                <p className="text-ink-muted leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The team teaser */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <div>
              <p className="kicker text-gold-600">— The people here</p>
              <h2 className="display mt-5 text-4xl md:text-5xl text-forest-800 leading-[1.05]">
                Twelve of us, <em className="font-light not-italic text-forest-600">all on shift.</em>
              </h2>
              <p className="mt-7 text-ink-muted leading-relaxed text-lg">
                Reception, housekeeping, kitchen, security, drivers — twelve full-time team members who know the building, the neighbourhood, and most of our regulars by name.
              </p>
              <p className="mt-4 text-ink-muted leading-relaxed">
                If you call the hotel, a person picks up. If you message us on WhatsApp, a person reads it. There is no call centre, no overseas reservation desk, no app you have to download. It's just us.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-cream-50 border border-cream-300 p-5">
                  <p className="display text-3xl text-forest-800">24</p>
                  <p className="kicker mt-2">Rooms</p>
                </div>
                <div className="rounded-2xl bg-cream-50 border border-cream-300 p-5">
                  <p className="display text-3xl text-forest-800">12</p>
                  <p className="kicker mt-2">Team</p>
                </div>
                <div className="rounded-2xl bg-cream-50 border border-cream-300 p-5">
                  <p className="display text-3xl text-forest-800">2019</p>
                  <p className="kicker mt-2">Opened</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream-200">
                  <img
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
                    alt="Reception"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-cream-200">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
                    alt="Restaurant"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="aspect-square rounded-2xl overflow-hidden bg-cream-200">
                  <img
                    src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80"
                    alt="Lobby"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream-200">
                  <img
                    src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80"
                    alt="Courtyard"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 md:px-10 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl rounded-3xl bg-forest-800 text-cream-100 p-10 md:p-16 text-center"
        >
          <p className="kicker text-gold-400">— Come and see</p>
          <h2 className="display mt-5 text-4xl md:text-6xl text-cream-100 leading-[1.05] max-w-2xl mx-auto">
            The hotel is <em className="font-light not-italic text-gold-400">better in person.</em>
          </h2>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/rooms"
              className="group inline-flex items-center gap-2 rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-8 py-4 text-sm tracking-wide transition-colors"
            >
              Browse rooms
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-cream-100/30 hover:border-cream-100/60 text-cream-100 px-8 py-4 text-sm tracking-wide transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
      <MobileBottomCTA />
      <FloatingWhatsApp />
    </main>
  );
}
