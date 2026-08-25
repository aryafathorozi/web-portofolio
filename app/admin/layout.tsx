import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import MobileNotSupported from "@/components/ui/MobileNotSupported";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Mobile Error State */}
      <div className="md:hidden">
        <MobileNotSupported />
      </div>

      {/* Desktop Admin Layout */}
      <div className="hidden md:flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
