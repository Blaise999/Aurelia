import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin · Aurelia Hotel & Suites",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream-100">
      <AdminSidebar />
      <main className="lg:pl-64">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-forest-800 text-cream-100 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="display text-lg leading-none">Aurelia</p>
            <p className="kicker text-gold-400 mt-1">— Admin</p>
          </div>
          <a
            href="/"
            className="text-xs text-cream-100/70 underline-offset-4 hover:underline"
          >
            View site
          </a>
        </div>
        {children}
      </main>
    </div>
  );
}
