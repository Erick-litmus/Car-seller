"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

// Luxury car brands for the marquee
const BRANDS = [
  "Toyota", "Mercedes-Benz", "BMW", "Audi", "Range Rover",
  "Porsche", "Lexus", "Bentley", "Rolls-Royce", "Jaguar"
];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [bodyType, setBodyType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (bodyType) params.set("bodyType", bodyType);
    router.push(`/vehicles?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-brand-dark pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-brand-dark">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 blur-[2px] contrast-125 saturate-50"
        >
          {/* Using the local downloaded YouTube video for the luxury feel. */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Cinematic Overlays */}
        {/* 1. Vignette effect to focus attention on center/text */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-dark/20 to-brand-dark" />
        
        {/* 2. Left-to-right gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/70 to-transparent" />
        
        {/* 3. Bottom gradient to blend smoothly into the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full flex-grow flex items-center">
        {/* Left column: text + buttons + search — takes only ~half the width */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-[1.1] mb-4">
              Experience <span className="text-accent italic">Unrivaled</span>{" "}
              Luxury
            </h1>
            <p className="text-sm md:text-base text-white/70 mb-8 leading-relaxed max-w-md">
              Discover a curated collection of premium used cars. Transparent pricing, technical excellence, and a seamless buying journey.
            </p>

            {/* Buttons row */}
            <div className="flex flex-row gap-3 mb-8 flex-wrap">
              <Link
                href="/vehicles"
                className="group flex items-center gap-2 px-6 py-3 gold-gradient text-white rounded-full font-bold text-sm shadow-2xl shadow-accent/20 hover:scale-105 transition-all"
              >
                Browse Inventory
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md rounded-full font-bold text-sm transition-all"
              >
                Expert Consultancy
              </Link>
            </div>
          </motion.div>

          {/* Compact Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex flex-row items-center gap-1 max-w-lg"
          >
            <div className="flex-1 flex items-center">
              <div className="flex-1 px-4 py-2.5 flex items-center gap-2 border-r border-white/10">
                <Search className="w-4 h-4 text-accent shrink-0" />
                <input
                  type="text"
                  placeholder="Brand or model..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/30 w-full outline-none text-xs"
                />
              </div>
              <div className="px-4 py-2.5 flex items-center gap-2 relative">
                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-white/60 outline-none appearance-none cursor-pointer text-xs pr-5"
                >
                  <option value="" className="bg-brand-dark">Body Type</option>
                  <option value="SUV" className="bg-brand-dark">SUV</option>
                  <option value="Sedan" className="bg-brand-dark">Sedan</option>
                  <option value="Coupe" className="bg-brand-dark">Coupe</option>
                  <option value="Pickup" className="bg-brand-dark">Pickup</option>
                </select>
                <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 pointer-events-none" />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2.5 gold-gradient text-white rounded-full font-bold text-sm shadow-lg shadow-accent/20 hover:scale-[1.02] transition-all whitespace-nowrap"
            >
              Find Car
            </button>
          </motion.div>
        </div>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative z-10 w-full bg-black/40 backdrop-blur-md border-y border-white/5 py-4 mt-16 overflow-hidden">
        <div className="flex w-[200%] animate-marquee">
          <div className="flex w-1/2 justify-around items-center">
            {BRANDS.map((brand, i) => (
              <span key={i} className="text-white/40 text-sm md:text-xl font-serif font-bold uppercase tracking-widest px-4 md:px-8 shrink-0">
                {brand}
              </span>
            ))}
          </div>
          <div className="flex w-1/2 justify-around items-center">
            {BRANDS.map((brand, i) => (
              <span key={`dup-${i}`} className="text-white/40 text-sm md:text-xl font-serif font-bold uppercase tracking-widest px-4 md:px-8 shrink-0">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
