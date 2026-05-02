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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-dark/98 backdrop-blur-2xl z-[60] flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
                  <Car className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold font-serif text-white">ERICK & MUTUA</span>
              </Link>
              <button
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 text-2xl font-serif font-bold transition-all",
                      pathname === link.href ? "text-accent" : "text-white/60"
                    )}
                  >
                    <link.icon className={cn("w-6 h-6", pathname === link.href ? "text-accent" : "text-white/20")} />
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto space-y-6">
              <Link
                href="/vehicles"
                onClick={() => setIsOpen(false)}
                className="block w-full py-5 gold-gradient text-white text-center rounded-2xl font-bold text-lg shadow-xl shadow-accent/20"
              >
                Sell Your Car
              </Link>
              
              <div className="flex items-center justify-center gap-8 py-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white/40" />
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Info className="w-5 h-5 text-white/40" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
