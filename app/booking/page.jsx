import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Request a Booking — Aurelia Hotel",
};

export default function BookingPage({ searchParams }) {
  return (
    <main>
      <Navbar />
      <BookingForm searchParams={searchParams} />
      <Footer />
      <MobileBottomCTA />
      <FloatingWhatsApp />
    </main>
  );
}
