// Demo seed data for Aurelia Hotel & Suites
// All images are sourced from free Unsplash URLs

export const hotelInfo = {
  name: "Aurelia Hotel & Suites",
  shortName: "Aurelia",
  tagline: "A small, quiet hotel in Enugu.",
  address: "12 Independence Layout, Enugu, Nigeria",
  city: "Enugu",
  state: "Enugu State",
  phone: "+234 803 000 0000",
  whatsapp: "2348030000000",
  email: "reservations@aureliahotel.com",
  hours: "Reception open 24/7",
  mapsQuery: "Independence Layout, Enugu, Nigeria",
};

export const rooms = [
  {
    slug: "garden-room",
    name: "Garden Room",
    tier: "Best for short stays",
    pricePerNight: 35000,
    capacity: 2,
    bedType: "Queen Bed",
    sizeSqm: 22,
    short:
      "Our smallest room, opening onto the courtyard garden.",
    description:
      "The Garden Room is the quietest in the house. A queen bed dressed in good linen, a generous wardrobe, walk-in shower, and a desk by the window that looks onto the courtyard. Best for solo travellers or short stays.",
    amenities: [
      "Air Conditioning",
      "Free Wi-Fi",
      "Smart TV",
      "Walk-in Shower",
      "Work Desk",
      "Daily Housekeeping",
    ],
    highlights: ["Garden view", "Walk-in shower", "Queen bed"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    tier: "Best for couples",
    pricePerNight: 55000,
    capacity: 2,
    bedType: "King Bed",
    sizeSqm: 30,
    short:
      "Our most-booked room. King bed, marble bath, breakfast for two.",
    description:
      "The room most guests come back for. A king bed, marble-tiled bathroom, a reading chair by the window, and a desk wide enough for two laptops. Breakfast at the courtyard restaurant is included for two.",
    amenities: [
      "Air Conditioning",
      "Free Wi-Fi",
      "Smart TV",
      "Marble Bathroom",
      "Work Desk",
      "Breakfast Included",
      "Mini Bar",
      "Coffee Machine",
    ],
    highlights: ["King bed", "Breakfast for two", "Marble bath"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    tier: "Best for business travellers",
    pricePerNight: 95000,
    capacity: 3,
    bedType: "King Bed + Sofa",
    sizeSqm: 48,
    short:
      "Separate sitting room, soaking tub, corner view. Best for business stays.",
    description:
      "Built around a sitting room — somewhere to take a call without closing the bedroom door. Large wardrobe, soaking tub in the bath, and a pour-over coffee setup in the room so you don't have to ring reception at six in the morning.",
    amenities: [
      "Separate Sitting Room",
      "Soaking Tub",
      "Free Wi-Fi",
      "Smart TV",
      "Executive Desk",
      "Breakfast Included",
      "Pour-over Coffee Setup",
      "Premium Toiletries",
    ],
    highlights: ["Sitting room", "Soaking tub", "Corner view"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
  },
  {
    slug: "courtyard-suite",
    name: "Courtyard Suite",
    tier: "Best for longer stays",
    pricePerNight: 130000,
    capacity: 3,
    bedType: "King Bed + Daybed",
    sizeSqm: 62,
    short:
      "Our biggest suite. Private terrace, kitchenette, soaking tub.",
    description:
      "Made for guests staying a week or more. A king bed plus daybed, a kitchenette with kettle and fridge, a soaking tub, and french doors that open onto a private corner of the courtyard. Breakfast included for the duration of your stay.",
    amenities: [
      "Private Terrace",
      "Kitchenette",
      "Soaking Tub",
      "Free Wi-Fi",
      "Smart TV",
      "Breakfast Included",
      "Daily Housekeeping",
      "Laundry Service",
    ],
    highlights: ["Private terrace", "Kitchenette", "62 sqm"],
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1601565415267-724db0e1cd2c?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: false,
  },
];

export const offers = [
  {
    slug: "weekend-escape",
    title: "Weekend Escape",
    summary: "20% off Friday to Sunday stays in the Deluxe Room.",
    description:
      "Two-night minimum across the weekend. Breakfast for two included. Late checkout until 2pm.",
    validity: "Now through July 2026",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80",
    eligibleRooms: ["deluxe-room", "garden-room"],
  },
  {
    slug: "long-stay",
    title: "Long Stay",
    summary: "Book seven nights, the eighth is on us.",
    description:
      "Stay seven consecutive nights in any suite and the eighth night is free. Daily breakfast and one airport transfer included.",
    validity: "Year-round",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
    eligibleRooms: ["executive-suite", "courtyard-suite"],
  },
  {
    slug: "business-rate",
    title: "Mid-week Rate",
    summary: "Lower rate Sunday to Thursday for stays of three nights or more.",
    description:
      "Reduced rate Sunday through Thursday for stays of three nights or more. Breakfast and a pressed shirt each morning.",
    validity: "Sunday – Thursday",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    eligibleRooms: ["deluxe-room", "executive-suite"],
  },
];

// 110+ curated Unsplash photo IDs grouped by category.
// Edit this array per client — all images use the same Unsplash CDN format.
const _img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const gallery = [
  // ===== ROOMS (33) =====
  { category: "Rooms", src: _img("1631049307264-da0ec9d70304"), caption: "Garden Room — morning light" },
  { category: "Rooms", src: _img("1611892440504-42a792e24d32"), caption: "Deluxe Room — king bed" },
  { category: "Rooms", src: _img("1578683010236-d716f9a3f461"), caption: "Suite — bedroom" },
  { category: "Rooms", src: _img("1551882547-ff40c63fe5fa"), caption: "Suite living area" },
  { category: "Rooms", src: _img("1540518614846-7eded433c457"), caption: "Twin Garden Room" },
  { category: "Rooms", src: _img("1591088398332-8a7791972843"), caption: "Reading nook" },
  { category: "Rooms", src: _img("1505693416388-ac5ce068fe85"), caption: "Linen-dressed bed" },
  { category: "Rooms", src: _img("1598928506311-c55ded91a20c"), caption: "Deluxe — corner view" },
  { category: "Rooms", src: _img("1631049552057-403cdb8f0658"), caption: "Suite reading lamp" },
  { category: "Rooms", src: _img("1571508601891-ca5e7a713859"), caption: "Premier Room" },
  { category: "Rooms", src: _img("1566665797739-1674de7a421a"), caption: "Welcome turn-down" },
  { category: "Rooms", src: _img("1631049035634-c44f95c0bca0"), caption: "Wardrobe corner" },
  { category: "Rooms", src: _img("1631049307990-9b4b04b1c4f5"), caption: "Soft morning, Garden Room" },
  { category: "Rooms", src: _img("1582037928769-181f2644ecb7"), caption: "Suite desk" },
  { category: "Rooms", src: _img("1616594039964-ae9021a400a0"), caption: "Premier — long view" },
  { category: "Rooms", src: _img("1616486338812-3dadae4b4ace"), caption: "Twin Suite" },
  { category: "Rooms", src: _img("1616594039964-ae9021a400a0"), caption: "Garden Room — entry" },
  { category: "Rooms", src: _img("1505691938895-1758d7feb511"), caption: "Sitting area" },
  { category: "Rooms", src: _img("1542838132-92c53300491e"), caption: "Suite — quiet afternoon" },
  { category: "Rooms", src: _img("1582719478250-c89cae4dc85b"), caption: "Bedroom side table" },
  { category: "Rooms", src: _img("1595576508898-0ad5c879a061"), caption: "Welcome detail" },
  { category: "Rooms", src: _img("1611892440504-42a792e24d32", 1600), caption: "King-size linen" },
  { category: "Rooms", src: _img("1560448204-e02f11c3d0e2"), caption: "Suite — couch" },
  { category: "Rooms", src: _img("1560448204-603b3fc33ddc"), caption: "Suite — view to courtyard" },
  { category: "Rooms", src: _img("1591088398332-8a7791972843", 1600), caption: "Side lamp" },
  { category: "Rooms", src: _img("1631049552057-403cdb8f0658", 1600), caption: "Bedside detail" },
  { category: "Rooms", src: _img("1568084680786-a84f91d1153c"), caption: "Suite living, evening" },
  { category: "Rooms", src: _img("1505693416388-ac5ce068fe85", 1600), caption: "Folded throw" },
  { category: "Rooms", src: _img("1540518614846-7eded433c457", 1600), caption: "Twin beds" },
  { category: "Rooms", src: _img("1582037928769-181f2644ecb7", 1600), caption: "Working desk" },
  { category: "Rooms", src: _img("1551776235-dde6d482980b"), caption: "Looking out to the courtyard" },
  { category: "Rooms", src: _img("1631049307264-da0ec9d70304", 1600), caption: "Quiet corner" },
  { category: "Rooms", src: _img("1578683010236-d716f9a3f461", 1600), caption: "Made up for the night" },

  // ===== LOBBY (12) =====
  { category: "Lobby", src: _img("1564501049412-61c2a3083791"), caption: "Reception desk" },
  { category: "Lobby", src: _img("1590381105924-c72589b9ef3f"), caption: "Lounge seating" },
  { category: "Lobby", src: _img("1564013799919-ab600027ffc6"), caption: "Library corner" },
  { category: "Lobby", src: _img("1505691938895-1758d7feb511"), caption: "Reception waiting area" },
  { category: "Lobby", src: _img("1568084680786-a84f91d1153c"), caption: "Lounge afternoon" },
  { category: "Lobby", src: _img("1582719508461-905c673771fd"), caption: "Concierge" },
  { category: "Lobby", src: _img("1551776235-dde6d482980b", 1600), caption: "Stairwell" },
  { category: "Lobby", src: _img("1567552379078-3e8ec5b41bc8"), caption: "Entrance hall" },
  { category: "Lobby", src: _img("1564501049412-61c2a3083791", 1600), caption: "Check-in" },
  { category: "Lobby", src: _img("1559339352-11d035aa65de"), caption: "Coffee bar" },
  { category: "Lobby", src: _img("1590381105924-c72589b9ef3f", 1600), caption: "Lounge with art" },
  { category: "Lobby", src: _img("1564013799919-ab600027ffc6", 1600), caption: "Reading library" },

  // ===== RESTAURANT (18) =====
  { category: "Restaurant", src: _img("1414235077428-338989a2e8c0"), caption: "Courtyard Restaurant" },
  { category: "Restaurant", src: _img("1592861956120-e524fc739696"), caption: "Breakfast service" },
  { category: "Restaurant", src: _img("1517248135467-4c7edcad34c4"), caption: "Bar at sunset" },
  { category: "Restaurant", src: _img("1530541930197-ff16ac917b0e"), caption: "Plated breakfast" },
  { category: "Restaurant", src: _img("1567521464027-f127ff144326"), caption: "Coffee in the morning" },
  { category: "Restaurant", src: _img("1559339352-11d035aa65de", 1600), caption: "Pour over" },
  { category: "Restaurant", src: _img("1559329007-40df8a9345d8"), caption: "Pastries" },
  { category: "Restaurant", src: _img("1606787366850-de6330128bfc"), caption: "Bowl, lunch" },
  { category: "Restaurant", src: _img("1414235077428-338989a2e8c0", 1600), caption: "Dinner service" },
  { category: "Restaurant", src: _img("1592861956120-e524fc739696", 1600), caption: "Breakfast spread" },
  { category: "Restaurant", src: _img("1517248135467-4c7edcad34c4", 1600), caption: "Glassware" },
  { category: "Restaurant", src: _img("1530541930197-ff16ac917b0e", 1600), caption: "Brunch plate" },
  { category: "Restaurant", src: _img("1559329007-40df8a9345d8", 1600), caption: "Pastry cabinet" },
  { category: "Restaurant", src: _img("1567521464027-f127ff144326", 1600), caption: "Espresso" },
  { category: "Restaurant", src: _img("1606787366850-de6330128bfc", 1600), caption: "Lunch — courtyard table" },
  { category: "Restaurant", src: _img("1485955900006-10f4d324d411"), caption: "Latte detail" },
  { category: "Restaurant", src: _img("1495474472287-4d71bcdd2085"), caption: "Loose-leaf tea" },
  { category: "Restaurant", src: _img("1559339352-11d035aa65de"), caption: "Coffee bar — morning" },

  // ===== BATHROOM (10) =====
  { category: "Bathroom", src: _img("1552321554-5fefe8c9ef14"), caption: "Marble bath" },
  { category: "Bathroom", src: _img("1600585154340-be6161a56a0c"), caption: "Suite bathroom" },
  { category: "Bathroom", src: _img("1604578762246-41134e37f9cc"), caption: "Walk-in shower" },
  { category: "Bathroom", src: _img("1620626011761-996317b8d101"), caption: "Vanity detail" },
  { category: "Bathroom", src: _img("1552321554-5fefe8c9ef14", 1600), caption: "Folded towels" },
  { category: "Bathroom", src: _img("1600585154340-be6161a56a0c", 1600), caption: "Brass fittings" },
  { category: "Bathroom", src: _img("1604578762246-41134e37f9cc", 1600), caption: "Rainfall shower" },
  { category: "Bathroom", src: _img("1620626011761-996317b8d101", 1600), caption: "Linen amenities" },
  { category: "Bathroom", src: _img("1554629947-334ff61d85dc"), caption: "Towel detail" },
  { category: "Bathroom", src: _img("1487412947147-5cebf100ffc2"), caption: "Cushioned bench" },

  // ===== EXTERIOR (15) =====
  { category: "Exterior", src: _img("1542314831-068cd1dbfeeb"), caption: "Pool terrace" },
  { category: "Exterior", src: _img("1566073771259-6a8506099945"), caption: "Evening façade" },
  { category: "Exterior", src: _img("1455587734955-081b22074882"), caption: "Garden walkway" },
  { category: "Exterior", src: _img("1551776235-dde6d482980b"), caption: "Inner courtyard" },
  { category: "Exterior", src: _img("1517840901100-8179e982acb7"), caption: "From the front gate" },
  { category: "Exterior", src: _img("1571896349842-33c89424de2d"), caption: "Architectural detail" },
  { category: "Exterior", src: _img("1520250497591-112f2f40a3f4"), caption: "Garden steps" },
  { category: "Exterior", src: _img("1602002418816-5c0aeef426aa"), caption: "Late afternoon" },
  { category: "Exterior", src: _img("1542314831-068cd1dbfeeb", 1600), caption: "Pool — quiet hour" },
  { category: "Exterior", src: _img("1566073771259-6a8506099945", 1600), caption: "Lights coming on" },
  { category: "Exterior", src: _img("1455587734955-081b22074882", 1600), caption: "Walkway, dusk" },
  { category: "Exterior", src: _img("1551776235-dde6d482980b", 1600), caption: "Courtyard fountain" },
  { category: "Exterior", src: _img("1517840901100-8179e982acb7", 1600), caption: "Approach to entry" },
  { category: "Exterior", src: _img("1571896349842-33c89424de2d", 1600), caption: "Roof line" },
  { category: "Exterior", src: _img("1520250497591-112f2f40a3f4", 1600), caption: "Garden corner" },

  // ===== DETAIL (15) =====
  { category: "Detail", src: _img("1521017432531-fbd92d768814"), caption: "Books on the side table" },
  { category: "Detail", src: _img("1534430480872-3498386e7856"), caption: "Reading lamp" },
  { category: "Detail", src: _img("1502602898657-3e91760cbb34"), caption: "Room key" },
  { category: "Detail", src: _img("1528909514045-2fa4ac7a08ba"), caption: "Flowers in the lobby" },
  { category: "Detail", src: _img("1485955900006-10f4d324d411"), caption: "Coffee, mid-morning" },
  { category: "Detail", src: _img("1495474472287-4d71bcdd2085"), caption: "Loose-leaf tea" },
  { category: "Detail", src: _img("1453831362806-3d5577f014a4"), caption: "An open novel" },
  { category: "Detail", src: _img("1453928582365-b6ad33cbcf64"), caption: "Bookshelves" },
  { category: "Detail", src: _img("1554629947-334ff61d85dc"), caption: "Folded linen" },
  { category: "Detail", src: _img("1487412947147-5cebf100ffc2"), caption: "Cushion stack" },
  { category: "Detail", src: _img("1521017432531-fbd92d768814", 1600), caption: "Welcome card" },
  { category: "Detail", src: _img("1534430480872-3498386e7856", 1600), caption: "Brass switch plate" },
  { category: "Detail", src: _img("1502602898657-3e91760cbb34", 1600), caption: "Carry-on by the door" },
  { category: "Detail", src: _img("1528909514045-2fa4ac7a08ba", 1600), caption: "Vase, fresh stems" },
  { category: "Detail", src: _img("1485955900006-10f4d324d411", 1600), caption: "First coffee of the day" },
];

export const galleryCategories = [
  "All",
  "Rooms",
  "Lobby",
  "Restaurant",
  "Bathroom",
  "Exterior",
  "Detail",
];

export const testimonials = [
  {
    name: "Chinedu A.",
    location: "Lagos",
    rating: 5,
    text: "Spent four nights for a conference. The room was thoughtful, the staff remembered my name, and the courtyard breakfast was a quiet pleasure each morning.",
  },
  {
    name: "Funmi O.",
    location: "Abuja",
    rating: 5,
    text: "I came for a weekend and stayed an extra night. The Deluxe Room is everything the photos show — and the bed is genuinely excellent.",
  },
  {
    name: "Daniel U.",
    location: "Port Harcourt",
    rating: 5,
    text: "Booked through their site, got a WhatsApp confirmation within minutes. No drama. Will return for our anniversary.",
  },
];

export const trustPoints = [
  "24/7 Reception",
  "Secure Parking",
  "Free Wi-Fi Throughout",
  "Courtyard Restaurant & Bar",
  "Airport Pickup On Request",
  "Standby Power",
];

export const amenityList = [
  { label: "Free Wi-Fi", icon: "wifi" },
  { label: "Air Conditioning", icon: "wind" },
  { label: "24/7 Power", icon: "zap" },
  { label: "Secure Parking", icon: "car" },
  { label: "Breakfast Available", icon: "coffee" },
  { label: "Restaurant & Bar", icon: "utensils" },
  { label: "Daily Housekeeping", icon: "sparkles" },
  { label: "Airport Transfer", icon: "plane" },
];

export const nearbyPlaces = [
  { name: "Akanu Ibiam Airport", distance: "12 minutes by car" },
  { name: "Independence Layout", distance: "5 minutes walk" },
  { name: "Polo Park Mall", distance: "8 minutes by car" },
  { name: "Government House", distance: "10 minutes by car" },
  { name: "Michael Okpara Square", distance: "15 minutes by car" },
];

// Mock bookings used by the admin dashboard demo
export const mockBookings = [
  {
    id: "BK-1029",
    guestName: "Chinedu Okeke",
    phone: "+234 803 124 5566",
    email: "chinedu.okeke@email.com",
    roomSlug: "deluxe-room",
    roomName: "Deluxe Room",
    checkIn: "2026-05-02",
    checkOut: "2026-05-04",
    nights: 2,
    guests: 2,
    rooms: 1,
    specialRequest: "Early check-in if possible.",
    preferredContact: "WhatsApp",
    status: "new",
    createdAt: "2026-04-26T08:42:00",
  },
  {
    id: "BK-1028",
    guestName: "Funmi Odetola",
    phone: "+234 805 998 1244",
    email: "funmi.o@email.com",
    roomSlug: "executive-suite",
    roomName: "Executive Suite",
    checkIn: "2026-05-08",
    checkOut: "2026-05-11",
    nights: 3,
    guests: 2,
    rooms: 1,
    specialRequest: "Anniversary stay — flowers if available.",
    preferredContact: "Phone",
    status: "contacted",
    createdAt: "2026-04-25T17:20:00",
  },
  {
    id: "BK-1027",
    guestName: "Daniel Uzo",
    phone: "+234 813 555 4422",
    email: "daniel.uzo@email.com",
    roomSlug: "garden-room",
    roomName: "Garden Room",
    checkIn: "2026-04-30",
    checkOut: "2026-05-02",
    nights: 2,
    guests: 1,
    rooms: 1,
    specialRequest: "",
    preferredContact: "WhatsApp",
    status: "confirmed",
    createdAt: "2026-04-24T11:05:00",
  },
  {
    id: "BK-1026",
    guestName: "Ada Nwankwo",
    phone: "+234 909 332 7788",
    email: "ada.n@email.com",
    roomSlug: "courtyard-suite",
    roomName: "Courtyard Suite",
    checkIn: "2026-06-12",
    checkOut: "2026-06-19",
    nights: 7,
    guests: 3,
    rooms: 1,
    specialRequest: "Family stay, two adults and one child (9).",
    preferredContact: "Email",
    status: "confirmed",
    createdAt: "2026-04-22T09:14:00",
  },
  {
    id: "BK-1025",
    guestName: "Tunde Ade",
    phone: "+234 802 411 9090",
    email: "tunde.a@email.com",
    roomSlug: "deluxe-room",
    roomName: "Deluxe Room",
    checkIn: "2026-04-29",
    checkOut: "2026-04-30",
    nights: 1,
    guests: 1,
    rooms: 1,
    specialRequest: "Late arrival, around 11pm.",
    preferredContact: "Phone",
    status: "new",
    createdAt: "2026-04-26T07:11:00",
  },
  {
    id: "BK-1024",
    guestName: "Kemi Bakare",
    phone: "+234 706 555 1212",
    email: "kemi.b@email.com",
    roomSlug: "garden-room",
    roomName: "Garden Room",
    checkIn: "2026-04-20",
    checkOut: "2026-04-22",
    nights: 2,
    guests: 2,
    rooms: 1,
    specialRequest: "",
    preferredContact: "WhatsApp",
    status: "cancelled",
    createdAt: "2026-04-15T13:30:00",
  },
  {
    id: "BK-1023",
    guestName: "Ibrahim Sani",
    phone: "+234 818 777 4040",
    email: "ibrahim.s@email.com",
    roomSlug: "executive-suite",
    roomName: "Executive Suite",
    checkIn: "2026-05-15",
    checkOut: "2026-05-18",
    nights: 3,
    guests: 1,
    rooms: 1,
    specialRequest: "Quiet floor preferred.",
    preferredContact: "Email",
    status: "new",
    createdAt: "2026-04-26T05:55:00",
  },
];

// Helper to find a room by slug
export function getRoomBySlug(slug) {
  return rooms.find((r) => r.slug === slug);
}

// Helper to format Naira
export function formatNGN(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Build a pre-filled WhatsApp link
export function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${hotelInfo.whatsapp}?text=${text}`;
}

// =================================================================
// ROOM SERVICE
// =================================================================

// Available room numbers in the demo (24 rooms across 2 floors)
export const roomNumbers = [
  "101","102","103","104","105","106","107","108","109","110","111","112",
  "201","202","203","204","205","206","207","208","209","210","211","212",
];

// Room service menu — guests scan a QR in their room which opens
// /room-service/[room] and lets them request items from these sections.
export const roomServiceMenu = [
  {
    section: "Food & Drinks",
    icon: "utensils",
    items: [
      { id: "fd-1", name: "Jollof Rice", description: "With grilled chicken or fish", price: 4500, deliveryMins: 25, paid: true },
      { id: "fd-2", name: "Continental Breakfast", description: "Eggs, toast, fruit, coffee", price: 5500, deliveryMins: 20, paid: true },
      { id: "fd-3", name: "Pepper Soup", description: "Catfish or goat", price: 6000, deliveryMins: 30, paid: true },
      { id: "fd-4", name: "Suya Platter", description: "Beef suya with onions and tomato", price: 5000, deliveryMins: 25, paid: true },
      { id: "fd-5", name: "Bottled Water", description: "75cl chilled", price: 500, deliveryMins: 10, paid: true },
      { id: "fd-6", name: "Soft Drink", description: "Coke, Fanta, Sprite or 7Up", price: 800, deliveryMins: 10, paid: true },
      { id: "fd-7", name: "Beer", description: "Star, Heineken or Gulder", price: 1500, deliveryMins: 10, paid: true },
      { id: "fd-8", name: "Wine (glass)", description: "Red or white house wine", price: 3500, deliveryMins: 15, paid: true },
      { id: "fd-9", name: "Snack Plate", description: "Plantain chips, peanuts, suya", price: 2500, deliveryMins: 15, paid: true },
      { id: "fd-10", name: "Coffee or Tea", description: "Cafetiere or loose-leaf tea", price: 1200, deliveryMins: 10, paid: true },
    ],
  },
  {
    section: "Housekeeping",
    icon: "sparkles",
    items: [
      { id: "hk-1", name: "Extra Towel", deliveryMins: 10, paid: false },
      { id: "hk-2", name: "Clean Room", description: "Full housekeeping pass", deliveryMins: 30, paid: false },
      { id: "hk-3", name: "Change Bedsheets", deliveryMins: 30, paid: false },
      { id: "hk-4", name: "Toiletries", description: "Soap, shampoo, toothbrush", deliveryMins: 15, paid: false },
      { id: "hk-5", name: "Laundry Pickup", description: "Charged at checkout", deliveryMins: 20, paid: false },
      { id: "hk-6", name: "Iron & Ironing Board", deliveryMins: 15, paid: false },
      { id: "hk-7", name: "Extra Pillow / Blanket", deliveryMins: 10, paid: false },
    ],
  },
  {
    section: "Maintenance",
    icon: "wrench",
    items: [
      { id: "mt-1", name: "AC Issue", description: "Not cooling, leaking, or noisy", deliveryMins: 20, paid: false },
      { id: "mt-2", name: "TV Issue", description: "No signal, remote not working", deliveryMins: 15, paid: false },
      { id: "mt-3", name: "Wi-Fi Issue", description: "Can't connect or slow", deliveryMins: 10, paid: false },
      { id: "mt-4", name: "Light / Bulb", description: "Bulb out or switch faulty", deliveryMins: 15, paid: false },
      { id: "mt-5", name: "Plumbing Issue", description: "Tap, shower, or toilet", deliveryMins: 20, paid: false },
    ],
  },
  {
    section: "Concierge",
    icon: "concierge-bell",
    items: [
      { id: "cn-1", name: "Late Checkout", description: "Subject to availability", deliveryMins: null, paid: false },
      { id: "cn-2", name: "Extra Key Card", deliveryMins: 10, paid: false },
      { id: "cn-3", name: "Airport Transfer", description: "12 mins to Akanu Ibiam Airport", price: 8000, deliveryMins: null, paid: true },
      { id: "cn-4", name: "Wake-up Call", deliveryMins: null, paid: false },
      { id: "cn-5", name: "Local Recommendations", description: "Restaurants, sights, drivers", deliveryMins: null, paid: false },
    ],
  },
];

// Status pipeline used by both guest and admin views
export const serviceStatuses = [
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "preparing", label: "Preparing" },
  { key: "on_the_way", label: "On the way" },
  { key: "completed", label: "Completed" },
];

// Mock service requests for the admin dashboard demo
export const mockServiceRequests = [
  {
    id: "RS-2041",
    room: "204",
    items: [
      { name: "Jollof Rice", quantity: 2, price: 4500 },
      { name: "Bottled Water", quantity: 1, price: 500 },
    ],
    note: "Please make it spicy.",
    status: "preparing",
    createdAt: "2026-04-28T13:42:00",
    total: 9500,
    paid: true,
  },
  {
    id: "RS-2040",
    room: "108",
    items: [{ name: "Extra Towel", quantity: 2 }],
    note: "",
    status: "completed",
    createdAt: "2026-04-28T12:10:00",
    total: 0,
    paid: false,
  },
  {
    id: "RS-2039",
    room: "211",
    items: [
      { name: "Continental Breakfast", quantity: 1, price: 5500 },
      { name: "Coffee or Tea", quantity: 1, price: 1200 },
    ],
    note: "Coffee not too strong, please.",
    status: "on_the_way",
    createdAt: "2026-04-28T13:15:00",
    total: 6700,
    paid: true,
  },
  {
    id: "RS-2038",
    room: "103",
    items: [{ name: "AC Issue", quantity: 1 }],
    note: "Not cooling since this morning.",
    status: "accepted",
    createdAt: "2026-04-28T13:50:00",
    total: 0,
    paid: false,
  },
  {
    id: "RS-2037",
    room: "207",
    items: [
      { name: "Beer", quantity: 3, price: 1500 },
      { name: "Snack Plate", quantity: 1, price: 2500 },
    ],
    note: "",
    status: "pending",
    createdAt: "2026-04-28T14:02:00",
    total: 7000,
    paid: true,
  },
  {
    id: "RS-2036",
    room: "112",
    items: [{ name: "Wi-Fi Issue", quantity: 1 }],
    note: "Keeps disconnecting.",
    status: "pending",
    createdAt: "2026-04-28T14:08:00",
    total: 0,
    paid: false,
  },
  {
    id: "RS-2035",
    room: "204",
    items: [{ name: "Late Checkout", quantity: 1 }],
    note: "Until 2pm if possible.",
    status: "completed",
    createdAt: "2026-04-28T09:30:00",
    total: 0,
    paid: false,
  },
];

// Helper to find a service request
export function getServiceRequestById(id) {
  return mockServiceRequests.find((r) => r.id === id);
}

// =================================================================
// ROOM INVENTORY (54 individual rooms across 5 floors)
// =================================================================
// Each entry is a real, bookable room. Multiple rooms map to each
// of the 4 room "types" defined in `rooms` above. Each room has
// its own photos drawn from a large Unsplash pool, plus a floor,
// view, and direction. Used on the /rooms page below the categories.

const _roomImg = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Pool of unique room photo IDs — varied beds, light, and styling
const _roomPhotoPool = [
  "1631049307264-da0ec9d70304", "1611892440504-42a792e24d32", "1578683010236-d716f9a3f461",
  "1551882547-ff40c63fe5fa", "1540518614846-7eded433c457", "1591088398332-8a7791972843",
  "1505693416388-ac5ce068fe85", "1598928506311-c55ded91a20c", "1631049552057-403cdb8f0658",
  "1571508601891-ca5e7a713859", "1566665797739-1674de7a421a", "1631049035634-c44f95c0bca0",
  "1582037928769-181f2644ecb7", "1616594039964-ae9021a400a0", "1616486338812-3dadae4b4ace",
  "1505691938895-1758d7feb511", "1582719478250-c89cae4dc85b", "1595576508898-0ad5c879a061",
  "1560448204-e02f11c3d0e2", "1560448204-603b3fc33ddc", "1568084680786-a84f91d1153c",
  "1542314831-068cd1dbfeeb", "1566073771259-6a8506099945", "1564501049412-61c2a3083791",
  "1590381105924-c72589b9ef3f", "1564013799919-ab600027ffc6", "1567552379078-3e8ec5b41bc8",
  "1606744837616-056d8eaa66da", "1590490360182-c33d57733427", "1618773928121-c32242e63f39",
  "1601565415267-724db0e1cd2c", "1611892440504-42a792e24d32", "1455587734955-081b22074882",
  "1551776235-dde6d482980b", "1517840901100-8179e982acb7", "1571896349842-33c89424de2d",
  "1520250497591-112f2f40a3f4", "1602002418816-5c0aeef426aa", "1535827841776-24afc1e255ac",
  "1586023492125-27b2c045efd7", "1559599101-f09722fb4948", "1562438668-bcf0ca6578f0",
];

// Quick deterministic picker — given a room number, pick 4 unique photos
function _pickPhotos(seed, count = 4) {
  const photos = [];
  let i = seed * 7 + 13;
  const used = new Set();
  while (photos.length < count) {
    const idx = i % _roomPhotoPool.length;
    if (!used.has(idx)) {
      used.add(idx);
      photos.push(_roomImg(_roomPhotoPool[idx]));
    }
    i += 31;
  }
  return photos;
}

const _viewByDirection = {
  N: "Garden view",
  S: "Courtyard view",
  E: "Sunrise side",
  W: "Sunset side",
};

const _typeMap = {
  garden: { typeSlug: "garden-room", typeName: "Garden Room", basePrice: 35000, capacity: 2, bedType: "Queen Bed", sizeSqm: 22 },
  deluxe: { typeSlug: "deluxe-room", typeName: "Deluxe Room", basePrice: 55000, capacity: 2, bedType: "King Bed", sizeSqm: 30 },
  exec:   { typeSlug: "executive-suite", typeName: "Executive Suite", basePrice: 95000, capacity: 3, bedType: "King + Sofa", sizeSqm: 48 },
  yard:   { typeSlug: "courtyard-suite", typeName: "Courtyard Suite", basePrice: 130000, capacity: 3, bedType: "King + Daybed", sizeSqm: 62 },
};

// Layout per floor: floor 1-3 rooms 01-12, floor 4-5 rooms 01-09
// Mix of types per floor
function _buildInventory() {
  const inv = [];
  // Floor 1: garden rooms (overlooking courtyard ground floor)
  // Floor 2: mix of deluxe + garden
  // Floor 3: deluxe + executive
  // Floor 4: executive + courtyard suite
  // Floor 5 (top): courtyard suites + executive (premium floor)
  const layouts = [
    { floor: 1, count: 12, mix: ["garden","garden","garden","garden","garden","garden","deluxe","deluxe","garden","garden","deluxe","deluxe"] },
    { floor: 2, count: 12, mix: ["deluxe","deluxe","garden","garden","deluxe","deluxe","deluxe","deluxe","garden","deluxe","deluxe","exec"] },
    { floor: 3, count: 12, mix: ["deluxe","deluxe","deluxe","deluxe","deluxe","exec","deluxe","deluxe","deluxe","exec","exec","exec"] },
    { floor: 4, count: 9,  mix: ["deluxe","exec","exec","exec","exec","exec","yard","yard","yard"] },
    { floor: 5, count: 9,  mix: ["exec","exec","yard","yard","yard","yard","yard","yard","yard"] },
  ];
  let idx = 0;
  for (const { floor, count, mix } of layouts) {
    for (let i = 0; i < count; i++) {
      const num = String(i + 1).padStart(2, "0");
      const number = `${floor}${num}`;
      const typeKey = mix[i] || "deluxe";
      const t = _typeMap[typeKey];
      // Direction rotates around the building
      const dir = ["N","E","S","W"][i % 4];
      // Floor premium: top floor +15%, floor 4 +8%
      const floorMult = floor === 5 ? 1.15 : floor === 4 ? 1.08 : 1.0;
      const dirMult = dir === "N" || dir === "W" ? 1.04 : 1.0;
      const price = Math.round((t.basePrice * floorMult * dirMult) / 500) * 500;
      // Status mix — most available, a few held/occupied for realism
      const statusRoll = (idx * 7 + 3) % 10;
      const status = statusRoll < 7 ? "available" : statusRoll < 9 ? "occupied" : "held";

      inv.push({
        slug: `room-${number}`,
        number,
        floor,
        typeSlug: t.typeSlug,
        typeName: t.typeName,
        name: `Room ${number} · ${t.typeName}`,
        bedType: t.bedType,
        capacity: t.capacity,
        sizeSqm: t.sizeSqm,
        view: _viewByDirection[dir],
        direction: dir,
        pricePerNight: price,
        images: _pickPhotos(idx),
        status,
        floorLabel:
          floor === 1 ? "Ground" :
          floor === 5 ? "Top floor" :
          `Floor ${floor}`,
      });
      idx++;
    }
  }
  return inv;
}

export const roomInventory = _buildInventory();

// Helper: fetch by inventory slug (room-101 etc) or by number
export function getRoomFromInventory(slug) {
  return roomInventory.find((r) => r.slug === slug || r.number === slug);
}

// Group rooms by floor (for the floor picker UI)
export function getRoomsByFloor() {
  const byFloor = {};
  for (const r of roomInventory) {
    if (!byFloor[r.floor]) byFloor[r.floor] = [];
    byFloor[r.floor].push(r);
  }
  return byFloor;
}
