"use client";

import React, { useState } from "react";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [make, setMake] = useState(searchParams.get("make") || "All Brands");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (make && make !== "All Brands") params.set("make", make);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (search) params.set("q", search);
    
    router.push(`/vehicles?${params.toString()}`);
  };

  const handleReset = () => {
    setMake("All Brands");
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    router.push("/vehicles");
  };

  return (
    <div className="bg-brand-dark/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/10 h-fit sticky top-24 relative overflow-hidden group">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-all duration-700 group-hover:bg-accent/20" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-2xl font-serif font-bold text-white tracking-wide">Filter Vehicles</h3>
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <SlidersHorizontal className="w-4 h-4 text-accent" />
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Search */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-white/70 uppercase tracking-[0.15em]">Search</label>
          <div className="relative group/input">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within/input:text-accent transition-colors" />
            <input
              type="text"
              placeholder="e.g. BMW X5"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm text-white placeholder:text-white/30 transition-all"
            />
          </div>
        </div>

        {/* Budget Range */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-white/70 uppercase tracking-[0.15em]">Budget (KES)</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm text-white placeholder:text-white/30 transition-all appearance-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm text-white placeholder:text-white/30 transition-all appearance-none"
            />
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-white/70 uppercase tracking-[0.15em]">Brand</label>
          <div className="relative group/input">
            <select 
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm appearance-none cursor-pointer text-white transition-all [&>option]:bg-brand-dark [&>option]:text-white"
            >
              <option value="All Brands">All Brands</option>
              <option value="Toyota">Toyota</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="BMW">BMW</option>
              <option value="Land Rover">Land Rover</option>
              <option value="Range Rover">Range Rover</option>
              <option value="Audi">Audi</option>
              <option value="Lexus">Lexus</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none group-focus-within/input:text-accent transition-colors" />
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <button 
            onClick={handleApplyFilters}
            className="w-full py-4 gold-gradient text-white rounded-xl font-bold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            Apply Filters
            <SlidersHorizontal className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
          </button>
          
          <button 
            onClick={handleReset}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
