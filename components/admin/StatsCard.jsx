"use client";

import { motion } from "framer-motion";

export default function StatsCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl bg-cream-50 border border-cream-300 p-6 hover:border-forest-700/20 transition-colors"
    >
      <div className="flex items-start justify-between">
        <p className="kicker">{label}</p>
        {Icon && (
          <div className="h-9 w-9 rounded-full bg-forest-800/5 flex items-center justify-center">
            <Icon className="h-4 w-4 text-forest-700" />
          </div>
        )}
      </div>
      <p className="display mt-4 text-4xl text-forest-800">{value}</p>
      {delta && (
        <p
          className={`mt-2 text-xs ${
            trend === "up" ? "text-forest-700" : "text-red-700"
          }`}
        >
          {trend === "up" ? "↗" : "↘"} {delta}
        </p>
      )}
    </motion.div>
  );
}
