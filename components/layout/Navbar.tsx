"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Car, Phone, Info, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Vehicles", href: "/vehicles", icon: Car },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled
          ? "premium-blur shadow-lg border-b border-white/10 py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center shadow-lg shadow-accent/20">
            <Car className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-serif tracking-tight text-white">
            ERICK <span className="text-accent">&</span> MUTUA
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                pathname === link.href ? "text-accent" : "text-white/80"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/vehicles"
            className="px-5 py-2.5 gold-gradient text-white rounded-full text-sm font-semibold shadow-lg shadow-accent/20 hover:scale-105 transition-transform active:scale-95"
          >
            Sell Your Car
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark border-t border-white/10 shadow-2xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 text-lg font-medium p-3 rounded-xl transition-colors",
                  pathname === link.href
                    ? "bg-accent/10 text-accent"
                    : "text-white/80 hover:bg-white/5"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
            <Link
              href="/vehicles"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full py-4 gold-gradient text-white text-center rounded-xl font-bold shadow-lg shadow-accent/20"
            >
              Sell Your Car
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
