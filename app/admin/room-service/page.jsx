"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Clock,
  Phone,
  MoreVertical,
  Search,
  Bell,
} from "lucide-react";
import {
  mockServiceRequests,
  serviceStatuses,
  formatNGN,
  hotelInfo,
} from "@/lib/data";

const statusStyles = {
  pending: "bg-gold-500/15 text-gold-700 border-gold-500/30",
  accepted: "bg-blue-500/10 text-blue-700 border-blue-500/30",
  preparing: "bg-purple-500/10 text-purple-700 border-purple-500/30",
  on_the_way: "bg-orange-500/10 text-orange-700 border-orange-500/30",
  completed: "bg-forest-700/10 text-forest-700 border-forest-700/30",
};

function statusLabel(key) {
  return serviceStatuses.find((s) => s.key === key)?.label || key;
}

function nextStatus(current) {
  const idx = serviceStatuses.findIndex((s) => s.key === current);
  if (idx === -1 || idx === serviceStatuses.length - 1) return null;
  return serviceStatuses[idx + 1];
}

function formatRelative(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function AdminRoomServicePage() {
  const [requests, setRequests] = useState(mockServiceRequests);
  const [filter, setFilter] = useState("active");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = { all: requests.length, active: 0 };
    for (const r of requests) {
      c[r.status] = (c[r.status] || 0) + 1;
      if (r.status !== "completed") c.active++;
    }
    return c;
  }, [requests]);

  const filtered = useMemo(() => {
    let list = requests;
    if (filter === "active") {
      list = list.filter((r) => r.status !== "completed");
    } else if (filter !== "all") {
      list = list.filter((r) => r.status === filter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.room.includes(q) ||
          r.items.some((i) => i.name.toLowerCase().includes(q))
      );
    }
    // Sort by createdAt desc within active, asc within completed
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [requests, filter, query]);

  const advanceStatus = (id) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next = nextStatus(r.status);
        return next ? { ...r, status: next.key } : r;
      })
    );
  };

  const setStatus = (id, statusKey) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: statusKey } : r))
    );
  };

  return (
    <div className="px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-4 mb-8"
        >
          <div>
            <p className="kicker text-gold-600">— Operations</p>
            <h1 className="display mt-3 text-4xl md:text-5xl text-forest-800">
              Room Service
            </h1>
            <p className="mt-2 text-ink-muted">
              Live requests from rooms across the hotel.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {counts.pending > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-700 px-4 py-2 text-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-600" />
                </span>
                {counts.pending} new {counts.pending === 1 ? "request" : "requests"}
              </motion.div>
            )}
            <button className="h-11 w-11 rounded-full bg-cream-50 border border-cream-300 hover:border-forest-700/30 flex items-center justify-center text-forest-800 transition-colors">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8"
        >
          {serviceStatuses.map((s) => (
            <div
              key={s.key}
              className="rounded-xl bg-cream-50 border border-cream-300 p-4"
            >
              <p className="kicker text-ink-muted/70">{s.label}</p>
              <p className="display mt-2 text-2xl text-forest-800">
                {counts[s.key] || 0}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Filters + search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <div className="flex flex-wrap gap-2">
            {[
              { key: "active", label: "Active", count: counts.active },
              { key: "all", label: "All", count: counts.all },
              ...serviceStatuses.map((s) => ({
                key: s.key,
                label: s.label,
                count: counts[s.key] || 0,
              })),
            ].map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    active
                      ? "bg-forest-800 text-cream-100"
                      : "bg-cream-50 border border-cream-300 text-ink-muted hover:text-forest-800"
                  }`}
                >
                  {f.label}
                  <span className={`ml-2 ${active ? "text-gold-400" : "text-ink-muted/60"}`}>
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="relative ml-auto w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search room, item, ID…"
              className="w-full rounded-full bg-cream-50 border border-cream-300 pl-10 pr-4 py-2 text-sm text-forest-800 placeholder:text-ink-muted/60 focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30 transition-all"
            />
          </div>
        </motion.div>

        {/* Requests list */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((req, idx) => (
              <RequestCard
                key={req.id}
                request={req}
                index={idx}
                onAdvance={advanceStatus}
                onSetStatus={setStatus}
              />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-cream-300 bg-cream-50 p-12 text-center">
              <p className="text-ink-muted">No requests match your filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Request card ---------- */

function RequestCard({ request, index, onAdvance, onSetStatus }) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const next = nextStatus(request.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-cream-300 bg-cream-50 overflow-hidden hover:border-forest-700/20 transition-colors"
    >
      {/* Header row */}
      <div
        className="p-4 md:p-5 flex flex-wrap md:flex-nowrap gap-4 md:items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Room badge */}
        <div className="shrink-0 h-14 w-14 rounded-2xl bg-forest-800 text-cream-100 flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-gold-400">
            Room
          </span>
          <span className="display text-xl">{request.room}</span>
        </div>

        {/* Items */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-1">
            <p className="kicker text-ink-muted/70">{request.id}</p>
            <span className="text-ink-muted/40">·</span>
            <p className="text-xs text-ink-muted inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatRelative(request.createdAt)}
            </p>
          </div>
          <p className="text-forest-800 leading-snug">
            {request.items
              .map((it) => `${it.quantity}× ${it.name}`)
              .join(", ")}
          </p>
          {request.note && (
            <p className="mt-1 text-xs text-ink-muted italic line-clamp-1">
              "{request.note}"
            </p>
          )}
        </div>

        {/* Status + actions */}
        <div className="flex items-center gap-3 shrink-0 ml-auto md:ml-0">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs tracking-wide ${statusStyles[request.status]}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {statusLabel(request.status)}
          </span>
          {request.total > 0 && (
            <span className="hidden md:block display text-sm text-forest-800">
              {formatNGN(request.total)}
            </span>
          )}
          {next && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdvance(request.id);
              }}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 px-4 py-1.5 text-xs transition-colors"
            >
              {next.label}
              <ChevronRight className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="h-8 w-8 rounded-full bg-cream-100 border border-cream-300 hover:border-forest-700/30 flex items-center justify-center text-forest-800 transition-colors relative"
          >
            <MoreVertical className="h-3.5 w-3.5" />
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 z-10 rounded-xl bg-cream-50 border border-cream-300 shadow-lg py-1 w-44 text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  {serviceStatuses.map((s) => (
                    <button
                      key={s.key}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSetStatus(request.id, s.key);
                        setMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-xs hover:bg-cream-100 transition-colors ${
                        request.status === s.key
                          ? "text-forest-800 font-medium"
                          : "text-ink-muted"
                      }`}
                    >
                      Mark {s.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-cream-300 overflow-hidden"
          >
            <div className="p-5 grid md:grid-cols-3 gap-6 bg-cream-100">
              {/* Items */}
              <div className="md:col-span-2">
                <p className="kicker text-gold-600">— Items</p>
                <ul className="mt-3 space-y-2">
                  {request.items.map((it, i) => (
                    <li
                      key={i}
                      className="flex items-baseline justify-between gap-3 text-sm"
                    >
                      <span className="text-forest-800">
                        {it.quantity}× {it.name}
                      </span>
                      {it.price && (
                        <span className="text-ink-muted">
                          {formatNGN(it.price * it.quantity)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                {request.note && (
                  <div className="mt-4 rounded-lg bg-cream-50 border border-cream-300 p-3">
                    <p className="kicker text-gold-600">— Note from guest</p>
                    <p className="mt-2 text-sm text-forest-800 italic">
                      "{request.note}"
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {request.total > 0 && (
                  <div className="rounded-lg bg-forest-800 text-cream-100 p-4">
                    <p className="kicker text-gold-400">— Total</p>
                    <p className="display text-2xl mt-1">
                      {formatNGN(request.total)}
                    </p>
                    <p className="text-xs text-cream-100/60 mt-1">
                      {request.paid ? "Charged to room" : "No charge"}
                    </p>
                  </div>
                )}
                <a
                  href={`tel:${hotelInfo.phone.replace(/\s/g, "")}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-cream-50 border border-cream-300 hover:border-forest-700/30 text-forest-800 px-4 py-2.5 text-sm transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Ring room {request.room}
                </a>

                {/* Pipeline visualisation */}
                <div className="rounded-lg bg-cream-50 border border-cream-300 p-3">
                  <p className="kicker text-gold-600">— Status</p>
                  <ol className="mt-3 space-y-2">
                    {serviceStatuses.map((s) => {
                      const curIdx = serviceStatuses.findIndex(
                        (x) => x.key === request.status
                      );
                      const thisIdx = serviceStatuses.findIndex(
                        (x) => x.key === s.key
                      );
                      const done = thisIdx <= curIdx;
                      return (
                        <li
                          key={s.key}
                          className={`flex items-center gap-3 text-xs ${
                            done ? "text-forest-800" : "text-ink-muted/40"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              done ? "bg-forest-700" : "bg-cream-300"
                            }`}
                          />
                          {s.label}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
