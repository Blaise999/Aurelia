# Aurelia Hotel & Suites

A polished, animation-rich hotel website template built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Designed as a reusable engine for small-to-mid-size hotels — fictional brand "Aurelia" used here as a demo, but every detail (name, address, rooms, prices, photos, copy) is data-driven and meant to be swapped per client.

This is a **Concierge Tier 2** deliverable: a complete public-facing booking site, a Paystack-style 60% deposit checkout flow with QR-code confirmation, an in-room QR-driven Room Service ordering experience, and an admin dashboard demo to manage everything.

---

## Quick start

Requirements: **Node.js 18.17+** and npm.

```bash
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)
- Room Service (any room): [http://localhost:3000/room-service/204](http://localhost:3000/room-service/204)

```bash
npm run build   # production build (static pre-rendering for 48 routes including all 24 rooms)
npm run start   # serve production build
```

---

## What's inside

### Public website
- **Home** — three-panel Revolut-style sticky-scroll hero, trust strip, featured rooms, infinite image marquee, scroll-driven booking flow explainer, gallery preview, offers, testimonials, location, final CTA
- **Rooms** — listing grid + comparison table; room detail with gallery, amenities, sticky booking sidebar
- **Booking** — multi-section form with live price estimate, routes to payment
- **Payment (NEW)** — Paystack-styled checkout modal that simulates 60% deposit payment
- **Booking success (NEW)** — animated confirmation with **booking QR code**, reference number, and what-happens-next steps
- **Gallery** — 115 photos across 7 categories with filter pills, lightbox, lazy-loading
- **Offers**, **About**, **Contact**

### Room Service (NEW)
A QR-driven in-room ordering experience. Each guest scans the QR card on their desk; it opens a mobile-first ordering page tied to that room. The flow:

1. `/room-service` — public landing page explaining how it works, with demo links to all 24 rooms
2. `/room-service/[room]` — guest-facing menu with sections for Food & Drinks, Housekeeping, Maintenance, and Concierge. Items have prices, delivery time estimates, optional notes, and a sticky cart that lets guests adjust quantity, add notes, and submit a request
3. Submitted requests land in `/admin/room-service` where staff can advance status through the pipeline: **Pending → Accepted → Preparing → On the way → Completed**

### Admin dashboard
- **Dashboard** — stats overview, **live room service banner with pending-request count and pulse animation**, recent bookings, room demand
- **Bookings** — filterable + searchable table; booking detail with guest info, status updates, estimate, activity log
- **Room Service (NEW)** — request feed with status-filter pills, search, expandable cards showing items + notes, one-click status advancement, full status pipeline visualization, in-card menu for jumping to any status
- **Rooms / Offers / Gallery / Settings** — content management surfaces

> ⚠️ The admin dashboard is **unprotected** in this demo. In production, gate it with NextAuth, Clerk, or similar.

---

## Project structure

```
aurelia-hotel/
├── app/
│   ├── (public)
│   │   ├── page.jsx                          # Home
│   │   ├── rooms/, offers/, gallery/, about/, contact/
│   │   ├── booking/                          # Form
│   │   │   ├── payment/                      # 60% deposit + Paystack modal
│   │   │   └── success/                      # QR code + email confirmation
│   │   └── room-service/
│   │       ├── page.jsx                      # Landing + demo room picker
│   │       └── [room]/                       # Guest ordering UI per room
│   ├── admin/
│   │   ├── page.jsx                          # Dashboard with RS banner
│   │   ├── room-service/                     # Live request management
│   │   ├── bookings/, rooms/, offers/, gallery/, settings/
│   │   └── layout.jsx                        # Sidebar shell
│   ├── globals.css
│   └── layout.jsx
├── components/
│   ├── (public)                              # Navbar, Footer, Hero, Logo, RoomCard, etc.
│   └── admin/
├── lib/
│   └── data.js                               # ⭐ Single source of truth
├── tailwind.config.js
└── next.config.js
```

---

## Customising for a real hotel client

Almost everything that changes between hotels lives in `lib/data.js`:

| Export                  | What to change                                                         |
| ----------------------- | ---------------------------------------------------------------------- |
| `hotelInfo`             | Name, tagline, address, phone, WhatsApp, email, hours                  |
| `rooms`                 | Room types, prices, descriptions, amenities, photos                    |
| `offers`                | Current promotions                                                     |
| `gallery`               | 115 categorised photos                                                 |
| `roomNumbers`           | Available room numbers (default: 24 across two floors)                 |
| `roomServiceMenu`       | Room-service items grouped into Food & Drinks / Housekeeping / etc.    |
| `serviceStatuses`       | Status pipeline labels                                                 |
| `mockBookings`          | Demo booking data                                                      |
| `mockServiceRequests`   | Demo room-service requests                                             |

Design tokens live in `tailwind.config.js` (forest, gold, cream, ink) and `app/globals.css` (Cormorant Garamond + Manrope fonts).

---

## Going live: what to wire up

This template ships as a **front-end + demo data** seed. To take it to production:

1. **Booking submission** — `components/BookingForm.jsx` currently routes to a Paystack-styled mock modal that simulates payment success. Replace `PaystackModal` in `app/booking/payment/PaymentClient.jsx` with the real [Paystack Inline](https://paystack.com/docs/payments/accept-payments/) integration. Use `email`, `amount` (NGN kobo, so multiply by 100), and a server-side webhook to confirm payment before issuing the QR.
2. **QR code + email** — the success page currently generates the QR client-side from booking data. In production, generate it server-side with a signed token, store the booking, and send the QR via email (Resend, SendGrid, or AWS SES).
3. **Room Service submissions** — `RoomServiceClient.jsx` simulates submission. Wire it to a backend endpoint that creates a service request, notifies staff (push, WhatsApp, audible alert at reception), and updates the admin feed in real time (Pusher, Supabase Realtime, or Server-Sent Events).
4. **Admin auth** — gate `/admin/*` routes. NextAuth.js with magic links is the smoothest path.
5. **Real bookings + service requests store** — replace `mockBookings` and `mockServiceRequests` with database queries (Postgres / Supabase / Firebase).
6. **WhatsApp/Email automation** — when a booking arrives, fire a notification. n8n / Make / Zapier are the lowest-friction options for non-engineering teams.
7. **Per-room QR cards** — print physical QR cards for each room. Each card encodes `https://yourdomain.com/room-service/<roomNumber>`. Update `roomNumbers` in `data.js` to match the hotel's actual rooms.
8. **Domain + SSL** — deploy to Vercel (one click) or any Node-capable host.

---

## Tech stack

- **[Next.js 14](https://nextjs.org)** — App Router, server components where appropriate
- **[Tailwind CSS 3.4](https://tailwindcss.com)** — utility-first styling
- **[Framer Motion 11](https://www.framer.com/motion/)** — scroll-driven, layout, and spring animations
- **[Lucide React](https://lucide.dev)** — icon set
- **[react-qr-code](https://github.com/rosskhanas/react-qr-code)** — QR generation for booking confirmations
- **JavaScript (.jsx)** — no TypeScript

---

## Animation philosophy

Subtle, decisive, never showy. Most reveals use the same easing — `[0.16, 1, 0.3, 1]` — over 600–900ms. Scroll-driven sections use Framer's `useScroll` + `useTransform`. The hero (`components/Hero.jsx`) demonstrates a sticky-pinned 3-scene scroll sequence; `BookingFlow.jsx` uses the same pattern for the four-step booking explainer.

---

## License

Delivered to the client under the agreed terms. Aurelia name and demo content are placeholders. Unsplash images used under the Unsplash license.
