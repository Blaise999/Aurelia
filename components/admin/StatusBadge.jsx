"use client";

const statusStyles = {
  new: "bg-gold-500/15 text-gold-700 border-gold-500/30",
  contacted: "bg-blue-500/10 text-blue-700 border-blue-500/30",
  confirmed: "bg-forest-700/10 text-forest-700 border-forest-700/30",
  cancelled: "bg-red-500/10 text-red-700 border-red-500/30",
  expired: "bg-ink-muted/10 text-ink-muted border-ink-muted/30",
};

const labels = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  expired: "Expired",
};

export default function StatusBadge({ status, className = "" }) {
  const style = statusStyles[status] || statusStyles.new;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs tracking-wide ${style} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status] || status}
    </span>
  );
}
