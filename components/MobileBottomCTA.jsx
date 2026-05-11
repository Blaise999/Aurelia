"use client";

import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { hotelInfo, buildWhatsAppLink } from "@/lib/data";

export default function MobileBottomCTA() {
  const wa = buildWhatsAppLink(
    `Hello ${hotelInfo.shortName}, I'd like to make a booking enquiry.`,
  );

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-cream-100/95 backdrop-blur-md border-t border-cream-300">
      <div className="grid grid-cols-3 gap-2 px-4 py-3">
        <a
          href={`tel:${hotelInfo.phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-2 rounded-full border border-forest-700/20 text-forest-700 py-3 text-sm"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full border border-forest-700/20 text-forest-700 py-3 text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        <Link
          href="/booking"
          className="flex items-center justify-center gap-2 rounded-full bg-forest-700 text-cream-100 py-3 text-sm"
        >
          Reserve
        </Link>
      </div>
    </div>
  );
}
