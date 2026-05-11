"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Choose your room",
    text: "Four room categories. Photos, sizes, prices, what's included.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
  },
  {
    num: "02",
    title: "Pay 60% on Paystack",
    text: "Pick your dates, fill in your details, pay the deposit. Card, transfer, or USSD — whatever works.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
  },
  {
    num: "03",
    title: "Get your QR by email",
    text: "We send your booking reference and a QR code straight to your inbox. Save it to your phone.",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=80",
  },
  {
    num: "04",
    title: "Show the QR at reception",
    text: "Reception scans your code, hands you a key, and you're in. Settle the balance at checkout.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function BookingFlow() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="bg-forest-800 text-cream-100 py-24 md:py-32 px-6 md:px-10 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20 md:mb-32"
        >
          <p className="kicker text-gold-400">— How booking works</p>
          <h2 className="display mt-4 text-5xl md:text-7xl">
            Four steps. Pay 60%.{" "}
            <em className="text-gold-400 font-light not-italic">
              Show your QR.
            </em>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-x-16">
          {/* Sticky visual on the left */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-forest-700/40">
                {steps.map((step, i) => (
                  <StickyStepImage
                    key={step.num}
                    step={step}
                    index={i}
                    total={steps.length}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling steps on the right */}
          <div className="space-y-24 lg:space-y-40">
            {steps.map((step) => (
              <Step key={step.num} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ step }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.4, once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="lg:min-h-[60vh] lg:flex lg:flex-col lg:justify-center"
    >
      <span className="display text-7xl text-gold-400/60 font-light leading-none">
        {step.num}
      </span>
      <h3 className="mt-6 display text-4xl md:text-5xl">{step.title}</h3>
      <p className="mt-5 text-cream-100/70 max-w-md leading-relaxed text-base md:text-lg">
        {step.text}
      </p>

      {/* Mobile-only image */}
      <div className="lg:hidden mt-8 rounded-3xl overflow-hidden aspect-[4/5]">
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}

// Each step image is its own component so hooks are called consistently per render.
function StickyStepImage({ step, index, total, progress }) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - 0.05),
      start + 0.05,
      end - 0.05,
      Math.min(1, end + 0.05),
    ],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0],
  );

  const scale = useTransform(progress, [start, end], [1, 1.06]);

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <img
        src={step.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent" />
      <div className="absolute bottom-8 left-8 right-8">
        <span className="display text-gold-400 text-5xl font-light leading-none">
          {step.num}
        </span>
        <h4 className="mt-3 display text-3xl text-cream-100">{step.title}</h4>
      </div>
    </motion.div>
  );
}
