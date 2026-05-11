"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import {
  Utensils,
  Sparkles,
  Wrench,
  ConciergeBell,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  X,
  Clock,
  ArrowLeft,
  Phone,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { roomServiceMenu, formatNGN, hotelInfo } from "@/lib/data";
import Logo from "@/components/Logo";

const sectionIcons = {
  "Food & Drinks": Utensils,
  Housekeeping: Sparkles,
  Maintenance: Wrench,
  Concierge: ConciergeBell,
};

export default function RoomServiceClient({ room }) {
  // cart: { itemId: { item, quantity, note } }
  const [cart, setCart] = useState({});
  const [activeSection, setActiveSection] = useState(roomServiceMenu[0].section);
  const [showCart, setShowCart] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const pageUrl = origin ? `${origin}/room-service/${room}` : "";

  const cartItems = Object.values(cart).filter((c) => c.quantity > 0);
  const cartCount = cartItems.reduce((sum, c) => sum + c.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, c) => sum + (c.item.price || 0) * c.quantity,
    0
  );

  const update = (item, delta) => {
    setCart((prev) => {
      const cur = prev[item.id] || { item, quantity: 0, note: "" };
      const nextQty = Math.max(0, cur.quantity + delta);
      if (nextQty === 0) {
        const { [item.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [item.id]: { ...cur, item, quantity: nextQty } };
    });
  };

  const setNote = (id, note) => {
    setCart((prev) => ({ ...prev, [id]: { ...prev[id], note } }));
  };

  const handleSubmit = () => {
    // Generate a fake request id
    const id = `RS-${Math.floor(2000 + Math.random() * 1000)}`;
    setSubmitted({
      id,
      items: cartItems.map((c) => ({
        name: c.item.name,
        quantity: c.quantity,
        note: c.note,
        price: c.item.price,
      })),
      total: cartTotal,
      timestamp: new Date().toISOString(),
    });
    setShowCart(false);
  };

  // After submit show confirmation screen
  if (submitted) {
    return <SubmittedScreen submitted={submitted} room={room} onNew={() => { setSubmitted(null); setCart({}); }} />;
  }

  return (
    <main className="bg-cream-100 min-h-screen pb-32">
      {/* Mobile-first sticky top */}
      <header className="sticky top-0 z-40 bg-forest-800 text-cream-100">
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo tone="dark" size="sm" asLink={false} />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQr(true)}
              className="h-10 w-10 rounded-full bg-cream-100/10 flex items-center justify-center text-cream-100 hover:bg-cream-100/20 transition-colors"
              aria-label="Show QR for this page"
              title="Show QR for sponsors"
            >
              <QrCode className="h-4 w-4" />
            </button>
            <a
              href={`tel:${hotelInfo.phone.replace(/\s/g, "")}`}
              className="h-10 w-10 rounded-full bg-cream-100/10 flex items-center justify-center text-cream-100 hover:bg-cream-100/20 transition-colors"
              aria-label="Call reception"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Welcome */}
      <section className="px-5 py-8 md:py-12">
        <div className="mx-auto max-w-2xl">
          <p className="kicker text-gold-600">— Welcome to</p>
          <h1 className="display mt-3 text-4xl md:text-5xl text-forest-800 leading-[1.05]">
            Room {room}.
          </h1>
          <p className="mt-3 text-ink-muted leading-relaxed">
            Tap anything below to send a request. Reception confirms in seconds — most things arrive within 20 minutes.
          </p>
        </div>
      </section>

      {/* Section tabs */}
      <div className="sticky top-[64px] z-30 bg-cream-100/95 backdrop-blur-md border-y border-cream-300">
        <div className="px-3 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max mx-auto max-w-2xl">
            {roomServiceMenu.map((sec) => {
              const Icon = sectionIcons[sec.section] || Utensils;
              const active = activeSection === sec.section;
              return (
                <button
                  key={sec.section}
                  onClick={() => {
                    setActiveSection(sec.section);
                    document.getElementById(`section-${sec.section}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                    active
                      ? "bg-forest-800 text-cream-100"
                      : "bg-cream-50 border border-cream-300 text-ink-muted hover:text-forest-800"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {sec.section}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="px-5 mt-6 mx-auto max-w-2xl space-y-12">
        {roomServiceMenu.map((sec) => {
          const Icon = sectionIcons[sec.section] || Utensils;
          return (
            <section
              key={sec.section}
              id={`section-${sec.section}`}
              className="scroll-mt-32"
            >
              <div className="flex items-center gap-3 mb-5">
                <Icon className="h-5 w-5 text-gold-600" />
                <h2 className="display text-2xl text-forest-800">
                  {sec.section}
                </h2>
              </div>
              <div className="space-y-3">
                {sec.items.map((item, idx) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    cartEntry={cart[item.id]}
                    onUpdate={update}
                    onNote={setNote}
                    delay={idx * 0.04}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Sticky cart button */}
      <AnimatePresence>
        {cartCount > 0 && !showCart && (
          <motion.button
            key="cart-btn"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setShowCart(true)}
            className="fixed bottom-5 left-5 right-5 md:left-auto md:right-8 md:bottom-8 md:max-w-sm z-50 rounded-2xl bg-forest-800 hover:bg-forest-900 text-cream-100 px-5 py-4 shadow-xl flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-3">
              <span className="h-9 w-9 rounded-full bg-gold-500 text-forest-900 flex items-center justify-center font-medium">
                {cartCount}
              </span>
              <span className="text-left">
                <p className="text-xs text-cream-100/60">Your request</p>
                <p className="text-sm font-medium">Review and send</p>
              </span>
            </span>
            <ShoppingBag className="h-5 w-5 text-gold-400" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart sheet */}
      <AnimatePresence>
        {showCart && (
          <CartSheet
            cartItems={cartItems}
            cartTotal={cartTotal}
            room={room}
            onClose={() => setShowCart(false)}
            onUpdate={update}
            onNote={setNote}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>

      {/* QR overlay — for sponsors to scan from a screen/slide */}
      <AnimatePresence>
        {showQr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-forest-900/80 backdrop-blur-md flex items-center justify-center p-5"
            onClick={() => setShowQr(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl bg-cream-50 overflow-hidden"
            >
              <button
                onClick={() => setShowQr(false)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-cream-100 border border-cream-300 flex items-center justify-center text-forest-800"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="bg-forest-800 text-cream-100 p-6 text-center">
                <p className="text-[10px] tracking-[0.32em] uppercase text-gold-400">
                  Room {room} · Room service
                </p>
                <p className="display text-2xl text-cream-100 mt-2">Scan me</p>
              </div>
              <div className="p-8 flex flex-col items-center">
                <div className="bg-white p-5 rounded-2xl shadow-lg">
                  {pageUrl ? (
                    <QRCode
                      value={pageUrl}
                      size={200}
                      bgColor="#ffffff"
                      fgColor="#1F3329"
                    />
                  ) : (
                    <div className="h-[200px] w-[200px] bg-cream-200 rounded animate-pulse" />
                  )}
                </div>
                <p className="mt-5 text-sm text-forest-800 font-medium">
                  Open the menu on your phone
                </p>
                <p className="mt-2 text-xs text-ink-muted text-center">
                  Same QR a guest finds on their desk in Room {room}.
                </p>
                {pageUrl && (
                  <p className="mt-3 text-[10px] font-mono text-ink-muted/60 break-all text-center">
                    {pageUrl}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ---------- Item card ---------- */

function ItemCard({ item, cartEntry, onUpdate, onNote, delay }) {
  const inCart = cartEntry && cartEntry.quantity > 0;
  const [showNote, setShowNote] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border transition-colors ${
        inCart
          ? "bg-forest-700/5 border-forest-700/30"
          : "bg-cream-50 border-cream-300"
      }`}
    >
      <div className="p-4 md:p-5 flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-forest-800 font-medium">{item.name}</h3>
            {item.price && (
              <p className="display text-sm text-forest-800 shrink-0">
                {formatNGN(item.price)}
              </p>
            )}
            {!item.paid && (
              <p className="text-[10px] uppercase tracking-wider text-gold-600 shrink-0">
                Free
              </p>
            )}
          </div>
          {item.description && (
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">
              {item.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-3 text-xs text-ink-muted">
            {item.deliveryMins && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />~{item.deliveryMins} min
              </span>
            )}
            {!item.deliveryMins && item.deliveryMins !== 0 && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                On request
              </span>
            )}
          </div>
        </div>

        {/* Add / quantity controls */}
        {!inCart ? (
          <button
            onClick={() => onUpdate(item, 1)}
            className="shrink-0 h-10 w-10 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 flex items-center justify-center transition-colors"
            aria-label={`Add ${item.name}`}
          >
            <Plus className="h-4 w-4" />
          </button>
        ) : (
          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => onUpdate(item, -1)}
              className="h-9 w-9 rounded-full bg-cream-100 border border-cream-300 hover:border-forest-700 text-forest-800 flex items-center justify-center transition-colors"
              aria-label={`Remove ${item.name}`}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="display text-lg text-forest-800 w-6 text-center">
              {cartEntry.quantity}
            </span>
            <button
              onClick={() => onUpdate(item, 1)}
              className="h-9 w-9 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 flex items-center justify-center transition-colors"
              aria-label={`Add another ${item.name}`}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Note row, expands when in cart */}
      {inCart && (
        <div className="px-4 md:px-5 pb-4">
          {!showNote && !cartEntry.note ? (
            <button
              onClick={() => setShowNote(true)}
              className="text-xs text-gold-600 hover:text-gold-700 underline-offset-4 hover:underline"
            >
              + Add a note
            </button>
          ) : (
            <input
              type="text"
              value={cartEntry.note}
              onChange={(e) => onNote(item.id, e.target.value)}
              placeholder="Any preferences?"
              className="w-full rounded-lg bg-cream-100 border border-cream-300 px-3 py-2 text-sm text-forest-800 placeholder:text-ink-muted/50 focus:border-forest-700 focus:outline-none"
              autoFocus={showNote}
            />
          )}
        </div>
      )}
    </motion.div>
  );
}

/* ---------- Cart sheet ---------- */

function CartSheet({ cartItems, cartTotal, room, onClose, onUpdate, onNote, onSubmit }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] bg-forest-900/70 backdrop-blur-sm flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full md:max-w-lg md:rounded-3xl bg-cream-100 max-h-[90vh] flex flex-col rounded-t-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-cream-300 flex items-center justify-between bg-cream-50">
          <div>
            <p className="kicker text-gold-600">— Room {room}</p>
            <h2 className="display text-2xl text-forest-800 mt-0.5">Your request</h2>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-cream-100 border border-cream-300 flex items-center justify-center text-forest-800"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cartItems.map(({ item, quantity, note }) => (
            <div
              key={item.id}
              className="rounded-2xl bg-cream-50 border border-cream-300 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-forest-800 font-medium">{item.name}</p>
                  {note && (
                    <p className="mt-1 text-xs text-ink-muted italic">"{note}"</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  {item.price && (
                    <p className="display text-sm text-forest-800">
                      {formatNGN(item.price * quantity)}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => onNote(item.id, e.target.value)}
                  placeholder="Note (optional)"
                  className="flex-1 mr-3 rounded-lg bg-cream-100 border border-cream-300 px-3 py-1.5 text-xs text-forest-800 placeholder:text-ink-muted/50 focus:border-forest-700 focus:outline-none"
                />
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onUpdate(item, -1)}
                    className="h-7 w-7 rounded-full bg-cream-100 border border-cream-300 text-forest-800 flex items-center justify-center"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm text-forest-800 w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onUpdate(item, 1)}
                    className="h-7 w-7 rounded-full bg-forest-700 text-cream-100 flex items-center justify-center"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-5 border-t border-cream-300 bg-cream-50">
          {cartTotal > 0 && (
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-ink-muted text-sm">Charged to room</span>
              <span className="display text-2xl text-forest-800">
                {formatNGN(cartTotal)}
              </span>
            </div>
          )}
          <button
            onClick={onSubmit}
            className="w-full rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-6 py-4 text-sm font-medium transition-colors"
          >
            Send request
          </button>
          <p className="mt-3 text-center text-xs text-ink-muted">
            Charges to your room are settled at checkout.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Submitted screen ---------- */

function SubmittedScreen({ submitted, room, onNew }) {
  return (
    <main className="bg-cream-100 min-h-screen">
      <header className="bg-forest-800 text-cream-100 px-5 py-4 flex items-center justify-between">
        <Logo tone="dark" size="sm" asLink={false} />
        <span className="text-xs text-cream-100/60">Room {room}</span>
      </header>

      <section className="px-5 pt-12 pb-24">
        <div className="mx-auto max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="mx-auto h-20 w-20 rounded-full bg-forest-700 flex items-center justify-center"
          >
            <Check className="h-10 w-10 text-cream-100" strokeWidth={3} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <p className="kicker text-gold-600">— Request received</p>
            <h1 className="display mt-3 text-4xl text-forest-800 leading-tight">
              We're on it.
            </h1>
            <p className="mt-3 text-ink-muted">
              Reception has been notified. Most things arrive within 20 minutes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 rounded-2xl bg-cream-50 border border-cream-300 overflow-hidden"
          >
            <div className="p-5 border-b border-cream-300 flex items-center justify-between">
              <div>
                <p className="kicker">Reference</p>
                <p className="display text-xl text-forest-800 mt-1">
                  {submitted.id}
                </p>
              </div>
              <span className="rounded-full bg-gold-500/15 text-gold-700 border border-gold-500/30 px-3 py-1 text-xs">
                Pending
              </span>
            </div>
            <ul className="divide-y divide-cream-300">
              {submitted.items.map((it, i) => (
                <li key={i} className="px-5 py-3 flex items-baseline justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-forest-800">
                      {it.quantity}× {it.name}
                    </p>
                    {it.note && (
                      <p className="text-xs text-ink-muted italic mt-0.5">"{it.note}"</p>
                    )}
                  </div>
                  {it.price && (
                    <p className="text-sm text-ink-muted shrink-0">
                      {formatNGN(it.price * it.quantity)}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            {submitted.total > 0 && (
              <div className="px-5 py-4 bg-cream-100 border-t border-cream-300 flex justify-between items-baseline">
                <span className="kicker">Total</span>
                <span className="display text-lg text-forest-800">
                  {formatNGN(submitted.total)}
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 space-y-3"
          >
            <button
              onClick={onNew}
              className="w-full rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-6 py-4 text-sm transition-colors"
            >
              Send another request
            </button>
            <a
              href={`tel:${hotelInfo.phone.replace(/\s/g, "")}`}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-cream-50 border border-cream-300 hover:border-forest-700/30 text-forest-800 px-6 py-4 text-sm transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call reception instead
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
