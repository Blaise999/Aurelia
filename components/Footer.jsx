import Link from "next/link";
import { hotelInfo } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-forest-800 text-cream-100/80 mt-32 pb-24 lg:pb-0">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Logo tone="dark" size="lg" asLink={false} />
            <p className="mt-4 max-w-md text-cream-100/60 leading-relaxed">
              A boutique hotel in Independence Layout, Enugu. Twelve rooms and
              suites, a courtyard restaurant, and a small team that genuinely
              cares whether your stay was good.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              <Link
                href="/booking"
                className="rounded-full bg-gold-500 hover:bg-gold-600 text-forest-900 px-5 py-3 text-sm tracking-wide text-center font-medium transition-colors"
              >
                Request Booking
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-cream-100/30 hover:border-cream-100/60 text-cream-100 px-5 py-3 text-sm tracking-wide text-center transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <p className="kicker text-cream-100/50">Visit</p>
            <ul className="mt-4 space-y-2 text-cream-100/80 text-sm leading-relaxed">
              <li>{hotelInfo.address}</li>
              <li>{hotelInfo.phone}</li>
              <li>{hotelInfo.email}</li>
              <li className="text-cream-100/60">{hotelInfo.hours}</li>
            </ul>
          </div>

          <div>
            <p className="kicker text-cream-100/50">Browse</p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["Rooms & Suites", "/rooms"],
                ["Offers", "/offers"],
                ["Gallery", "/gallery"],
                ["About", "/about"],
                ["Contact", "/contact"],
                ["Room Service", "/room-service"],
                ["Sponsor Demo", "/demo"],
                ["Admin", "/admin"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-cream-100/80 hover:text-gold-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream-100/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-cream-100/40">
          <p>© {new Date().getFullYear()} Aurelia Hotel & Suites. All rights reserved.</p>
          <p>Site demo built for sponsor preview · Concierge Package</p>
        </div>
      </div>
    </footer>
  );
}
