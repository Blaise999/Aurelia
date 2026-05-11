import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import RoomCard from "@/components/RoomCard";
import BookingSearch from "@/components/BookingSearch";
import RoomInventoryBrowser from "@/components/RoomInventoryBrowser";
import { rooms, roomInventory } from "@/lib/data";

export const metadata = {
  title: "Rooms & Suites — Aurelia Hotel",
};

export default function RoomsPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        kicker="— Rooms & Suites"
        title={
          <>
            {roomInventory.length} rooms.
            <br />
            <em className="font-light not-italic text-forest-600">
              No two alike.
            </em>
          </>
        }
        intro={`Across five floors and ${roomInventory.length} unique rooms, every stay overlooks something — the courtyard, the garden, or the city beyond. Browse our four room categories, then pick the exact room you want.`}
      />

      {/* Search bar */}
      <section className="px-6 md:px-10 -mt-8 md:-mt-12 relative z-10">
        <div className="mx-auto max-w-7xl">
          <BookingSearch variant="page" />
        </div>
      </section>

      {/* The 4 categories */}
      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="kicker text-gold-600">— Four categories</p>
              <h2 className="display mt-3 text-4xl md:text-5xl text-forest-800">
                Pick a category to start.
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {rooms.map((room, i) => (
              <RoomCard key={room.slug} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Inventory browser */}
      <RoomInventoryBrowser />

      {/* Comparison table */}
      <section className="px-6 md:px-10 pb-24">
        <div className="mx-auto max-w-7xl">
          <p className="kicker mb-6">— Quick comparison</p>
          <div className="overflow-x-auto rounded-3xl border border-cream-300/80 bg-cream-50">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-forest-700 text-cream-100">
                <tr>
                  <th className="text-left p-5 font-medium tracking-wide">Category</th>
                  <th className="text-left p-5 font-medium tracking-wide">Sleeps</th>
                  <th className="text-left p-5 font-medium tracking-wide">Bed</th>
                  <th className="text-left p-5 font-medium tracking-wide">Size</th>
                  <th className="text-right p-5 font-medium tracking-wide">From</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr
                    key={r.slug}
                    className="border-t border-cream-300/60 hover:bg-cream-100/60 transition-colors"
                  >
                    <td className="p-5">
                      <div className="display text-2xl text-forest-800">
                        {r.name}
                      </div>
                      <div className="text-xs text-ink-muted mt-1 uppercase tracking-wider">
                        {r.tier}
                      </div>
                    </td>
                    <td className="p-5 text-ink-muted">{r.capacity}</td>
                    <td className="p-5 text-ink-muted">{r.bedType}</td>
                    <td className="p-5 text-ink-muted">{r.sizeSqm} sqm</td>
                    <td className="p-5 text-right">
                      <a
                        href={`/rooms/${r.slug}`}
                        className="display text-2xl text-forest-700 hover:text-gold-600 transition-colors"
                      >
                        ₦{r.pricePerNight.toLocaleString()}
                      </a>
                      <div className="text-[10px] text-ink-muted uppercase tracking-wider mt-1">
                        per night
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomCTA />
      <FloatingWhatsApp />
    </main>
  );
}
