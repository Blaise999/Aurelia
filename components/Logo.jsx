"use client";

import Link from "next/link";

/**
 * Aurelia wordmark.
 * Tone: "light" (cream/forest text on light bg) | "dark" (cream text over dark/image)
 * Size: "sm" | "md" | "lg"
 */
export default function Logo({ tone = "light", size = "md", asLink = true, className = "" }) {
  const isDark = tone === "dark";

  const sizes = {
    sm: { word: "text-xl md:text-2xl", sub: "text-[9px]", gap: "mt-0.5" },
    md: { word: "text-2xl md:text-[28px]", sub: "text-[10px]", gap: "mt-1" },
    lg: { word: "text-3xl md:text-4xl", sub: "text-[11px]", gap: "mt-1.5" },
  };
  const s = sizes[size] || sizes.md;

  const wordColor = isDark ? "text-cream-100" : "text-forest-800";
  const subColor = isDark ? "text-gold-400" : "text-gold-600";
  const lineColor = isDark ? "bg-gold-400/70" : "bg-gold-500/70";

  const inner = (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <span
        className={`display ${s.word} ${wordColor} tracking-tight font-light italic`}
        style={{ letterSpacing: "-0.01em" }}
      >
        Aurelia
      </span>
      <span className={`flex items-center gap-1.5 ${s.gap}`}>
        <span className={`h-px w-3 ${lineColor}`} />
        <span
          className={`block h-1 w-1 rotate-45 ${isDark ? "bg-gold-400" : "bg-gold-500"}`}
        />
        <span className={`h-px w-3 ${lineColor}`} />
        <span
          className={`${s.sub} ${subColor} uppercase tracking-[0.28em] font-body ml-1`}
        >
          Hotel
        </span>
      </span>
    </span>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="Aurelia Hotel — home" className="inline-block">
        {inner}
      </Link>
    );
  }
  return inner;
}
