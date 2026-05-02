import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Car, 
  Settings, 
  LogOut, 
  ExternalLink,
  PlusCircle
} from "lucide-react";
import { logout } from "@/lib/actions/logout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-dark text-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center shadow-lg">
              <Car className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold font-serif tracking-tight">
              ADMIN <span className="text-accent">PANEL</span>
            </span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {[
            { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
            { name: "Inventory", icon: Car, href: "/admin/vehicles" },
            { name: "Add Vehicle", icon: PlusCircle, href: "/admin/vehicles/new" },
            { name: "Settings", icon: Settings, href: "/admin/settings" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/5 transition-colors group"
            >
              <item.icon className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors" />
              <span className="font-medium text-white/70 group-hover:text-white">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 space-y-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-accent" />
            <span className="font-medium">View Website</span>
          </Link>
          <form action={logout}>
            <button type="submit" className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-red-500/10 text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
          <h2 className="text-lg font-bold text-slate-800">Welcome Back, Admin</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <span className="text-xs font-bold text-slate-600">AD</span>
            </div>
          </div>
        </header>

        <div className="p-10 flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
}
