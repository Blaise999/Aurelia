import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SuccessClient from "./SuccessClient";

export const metadata = {
  title: "Booking Request Sent — Aurelia Hotel",
};

export default function SuccessPage({ searchParams }) {
  return (
    <main>
      <Navbar />
      <SuccessClient searchParams={searchParams} />
      <Footer />
      <MobileBottomCTA />
      <FloatingWhatsApp />
    </main>
  );
}
