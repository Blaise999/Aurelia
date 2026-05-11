import { Suspense } from "react";
import PaymentClient from "./PaymentClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomCTA from "@/components/MobileBottomCTA";

export const metadata = {
  title: "Payment · Aurelia Hotel & Suites",
};

export default function PaymentPage({ searchParams }) {
  return (
    <main className="bg-cream-100 min-h-screen">
      <Navbar />
      <Suspense fallback={<div className="pt-44 px-6 text-center text-ink-muted">Loading…</div>}>
        <PaymentClient searchParams={searchParams} />
      </Suspense>
      <Footer />
      <MobileBottomCTA />
    </main>
  );
}
