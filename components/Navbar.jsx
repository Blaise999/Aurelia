"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { hotelInfo, buildWhatsAppLink } from "@/lib/data";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/offers", label: "Offers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ variant = "light" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // For 'transparent' variant, only solidify once we've scrolled past
      // the 3-panel hero (≈ 3× viewport tall). 'light' variant always solid.
      const threshold =
        variant === "transparent"
          ? Math.max(window.innerHeight * 2.6, 600)
          : 30;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [variant]);

  // variant 'transparent' starts see-through over the hero, then solidifies on scroll
  // variant 'light' is always solid cream with dark text (used on inner pages)
  const isTransparent = variant === "transparent" && !scrolled;

  const wa = buildWhatsAppLink(
    `Hello ${hotelInfo.shortName}, I'd like to ask about a booking.`,
  );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isTransparent
            ? "bg-transparent"
            : "bg-cream-100/85 backdrop-blur-md border-b border-cream-300/60"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
          <Logo tone={isTransparent ? "dark" : "light"} size="md" />

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`link-underline text-sm tracking-wide ${
                  isTransparent
                    ? "text-cream-100/90 hover:text-cream-100"
                    : "text-ink-soft hover:text-forest-700"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${hotelInfo.phone.replace(/\s/g, "")}`}
              className={`text-sm flex items-center gap-2 ${
                isTransparent ? "text-cream-100/90" : "text-ink-soft"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{hotelInfo.phone}</span>
            </a>
            <Link
              href="/booking"
              className="rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-6 py-3 text-sm tracking-wide transition-colors"
            >
              Reserve a Room
            </Link>
          </div>

          <button
            aria-label="Open menu"
            className={`lg:hidden p-2 -mr-2 ${
              isTransparent ? "text-cream-100" : "text-forest-700"
            }`}
            onClick={() => setOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-forest-800 text-cream-100"
          >
            <div className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-cream-100/10">
              <Logo tone="dark" size="md" asLink={false} />
              <button
                aria-label="Close menu"
                className="p-2 -mr-2"
                onClick={() => setOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
              className="px-6 md:px-10 py-12 flex flex-col gap-6"
            >
              {links.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display text-5xl md:text-6xl text-cream-100 hover:text-gold-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-8 grid grid-cols-2 gap-3"
              >
                <Link
                  href="/booking"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-6 py-4 text-sm tracking-wide text-center font-medium transition-colors"
                >
                  Reserve a Room
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-cream-100/30 hover:border-cream-100/60 text-cream-100 px-6 py-4 text-sm tracking-wide text-center transition-colors"
                >
                  WhatsApp
                </a>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1 },
                }}
                className="mt-10 pt-10 border-t border-cream-100/10 text-cream-100/60 text-sm leading-relaxed"
              >
                <p>{hotelInfo.address}</p>
                <p className="mt-2">{hotelInfo.phone}</p>
                <p>{hotelInfo.email}</p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
