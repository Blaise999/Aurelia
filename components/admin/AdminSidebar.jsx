"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Sparkles,
  ImageIcon,
  Settings,
  LogOut,
  Globe,
  ConciergeBell,
  ScanLine,
} from "lucide-react";
import { hotelInfo } from "@/lib/data";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/room-service", label: "Room Service", icon: ConciergeBell },
  { href: "/reception/scan", label: "Scan QR", icon: ScanLine },
  { href: "/admin/rooms", label: "Rooms", icon: BedDouble },
  { href: "/admin/offers", label: "Offers", icon: Sparkles },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-forest-800 text-cream-100 fixed inset-y-0 left-0 z-40">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-cream-100/10">
        <Link href="/admin" className="block">
          <p className="display text-2xl text-cream-100 leading-none">
            Aurelia
          </p>
          <p className="kicker mt-2 text-gold-400">— Admin</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-cream-100/10 text-cream-100"
                  : "text-cream-100/70 hover:text-cream-100 hover:bg-cream-100/5"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="admin-nav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-r bg-gold-400"
                  transition={{ duration: 0.3 }}
                />
              )}
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-5 border-t border-cream-100/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream-100/70 hover:text-cream-100 hover:bg-cream-100/5 transition-colors"
        >
          <Globe className="h-4 w-4" />
          View public site
        </Link>
        <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream-100/70 hover:text-cream-100 hover:bg-cream-100/5 transition-colors">
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
        <div className="pt-4 px-3 text-xs text-cream-100/40">
          {hotelInfo.shortName} demo
        </div>
      </div>
    </aside>
  );
}
