import "./globals.css";

export const metadata = {
  title: "Aurelia Hotel & Suites — A small, quiet hotel in Enugu",
  description:
    "Twelve rooms in Independence Layout, Enugu. Reserve a room online, pay 60% deposit, and show your QR code at reception.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-cream-100 text-ink antialiased">{children}</body>
    </html>
  );
}
