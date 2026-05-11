import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import FeaturedRooms from "@/components/FeaturedRooms";
import BookingFlow from "@/components/BookingFlow";
import InsideStrip from "@/components/InsideStrip";
import OffersSection from "@/components/OffersSection";
import GalleryPreview from "@/components/GalleryPreview";
import Testimonials from "@/components/Testimonials";
import LocationSection from "@/components/LocationSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <main>
      <Navbar variant="transparent" />
      <Hero />
      <TrustStrip />
      <FeaturedRooms />
      <InsideStrip />
      <BookingFlow />
      <GalleryPreview />
      <OffersSection />
      <Testimonials />
      <LocationSection />
      <FinalCTA />
      <Footer />
      <MobileBottomCTA />
      <FloatingWhatsApp />
    </main>
  );
}
