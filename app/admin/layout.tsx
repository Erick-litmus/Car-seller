"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Car, 
  Settings, 
  LogOut, 
  ExternalLink,
  PlusCircle,
  Menu,
  X,
  Mail
} from "lucide-react";
import { logout } from "@/lib/actions/logout";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const adminLinks = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Inventory", icon: Car, href: "/admin/vehicles" },
  { name: "Add Vehicle", icon: PlusCircle, href: "/admin/vehicles/new" },
  { name: "Inquiries", icon: Mail, href: "/admin/inquiries" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-8">
        <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
          <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center shadow-lg">
            <Car className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-serif tracking-tight text-white">
            ADMIN <span className="text-accent">PANEL</span>
          </span>
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-2">
        {adminLinks.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group",
              pathname === item.href 
                ? "bg-accent text-white shadow-lg shadow-accent/20" 
                : "hover:bg-white/5 text-white/70 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              pathname === item.href ? "text-white" : "text-white/40 group-hover:text-accent"
            )} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-8 border-t border-white/5 space-y-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-white"
        >
          <ExternalLink className="w-5 h-5 text-accent" />
          <span className="font-medium text-sm">View Site</span>
        </Link>
        <form action={logout}>
          <button type="submit" className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-red-500/10 text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-brand-dark hidden lg:flex flex-col sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-brand-dark z-[101] lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 lg:hidden text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Link href="/" className="hover:text-accent transition-colors font-bold text-slate-800">
                Home
              </Link>
              {pathname !== "/" && (
                <>
                  <span className="text-accent font-bold">•</span>
                  <span className="text-slate-800 font-bold truncate">
                    {adminLinks.find(l => l.href === pathname)?.name || "Admin Panel"}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
              <span className="text-xs font-bold text-slate-600">AD</span>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 flex-grow max-w-[100vw] overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
