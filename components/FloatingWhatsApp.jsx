"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { hotelInfo, buildWhatsAppLink } from "@/lib/data";

export default function FloatingWhatsApp() {
  const wa = buildWhatsAppLink(
    `Hello ${hotelInfo.shortName}, I have a question about my stay.`,
  );

  return (
    <motion.a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with reception on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="hidden lg:flex fixed bottom-8 right-8 z-30 w-14 h-14 rounded-full bg-forest-700 hover:bg-forest-800 text-cream-100 items-center justify-center shadow-2xl shadow-forest-900/30"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="sr-only">WhatsApp</span>
      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold-500 border-2 border-cream-100" />
    </motion.a>
  );
}
