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
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          {/* We use a high-quality free stock video for the luxury feel. 
              The user can replace this with a local /hero-video.mp4 later. */}
          <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/60 to-brand-dark/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full flex-grow flex items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6">
              Experience <span className="text-accent italic">Unrivaled</span> <br />
              Luxury
            </h1>
            <p className="text-sm md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
              Discover a curated collection of premium used cars. Transparent pricing, technical excellence, and a seamless buying journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/vehicles"
                className="group flex items-center justify-center gap-2 px-8 py-4 gold-gradient text-white rounded-full font-bold text-base md:text-lg shadow-2xl shadow-accent/20 hover:scale-105 transition-all"
              >
                Browse Inventory
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md rounded-full font-bold text-base md:text-lg transition-all"
              >
                Expert Consultancy
              </Link>
            </div>
          </motion.div>

          {/* Quick Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 md:mt-16 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center gap-2 max-w-4xl"
          >
            <div className="flex-1 w-full flex flex-col md:flex-row items-center">
              <div className="flex-1 w-full px-6 py-4 flex items-center gap-3 border-b md:border-b-0 md:border-r border-white/10">
                <Search className="w-5 h-5 text-accent shrink-0" />
                <input
                  type="text"
                  placeholder="Brand or model..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/30 w-full outline-none text-sm md:text-base"
                />
              </div>
              <div className="flex-1 w-full px-6 py-4 flex items-center gap-3 relative">
                <select 
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-white/60 w-full outline-none appearance-none cursor-pointer text-sm md:text-base"
                >
                  <option value="" className="bg-brand-dark">Body Type</option>
                  <option value="SUV" className="bg-brand-dark">SUV</option>
                  <option value="Sedan" className="bg-brand-dark">Sedan</option>
                  <option value="Coupe" className="bg-brand-dark">Coupe</option>
                  <option value="Pickup" className="bg-brand-dark">Pickup</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto px-10 py-4 gold-gradient text-white rounded-2xl md:rounded-full font-bold shadow-lg shadow-accent/20 hover:scale-[1.02] transition-all"
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
              <span key={i} className="text-white/40 text-xl font-serif font-bold uppercase tracking-widest px-8">
                {brand}
              </span>
            ))}
          </div>
          <div className="flex w-1/2 justify-around items-center">
            {BRANDS.map((brand, i) => (
              <span key={`dup-${i}`} className="text-white/40 text-xl font-serif font-bold uppercase tracking-widest px-8">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
