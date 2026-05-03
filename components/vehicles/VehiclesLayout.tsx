"use client";

import React, { useState } from "react";
import FilterSidebar from "@/components/vehicles/FilterSidebar";
import VehicleCard from "@/components/vehicles/VehicleCard";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  image: string;
  status: "Available" | "Sold";
}

export default function VehiclesLayout({ vehicles }: { vehicles: Vehicle[] }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest Arrivals");

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Year: Newest First") return b.year - a.year;
    // "Latest Arrivals" — keep original order (already ordered by createdAt desc from server)
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-8">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="w-full py-4 bg-brand-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl"
        >
          <SlidersHorizontal className="w-5 h-5 text-accent" />
          Show Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <p className="text-muted font-medium">
              Showing <span className="text-brand-dark font-bold">{sortedVehicles.length}</span> premium vehicles
            </p>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <span className="text-sm text-muted hidden sm:block whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto bg-white border border-black/5 rounded-xl px-5 py-3 text-sm font-bold text-brand-dark shadow-sm outline-none cursor-pointer hover:border-accent/50 transition-colors"
              >
                <option>Latest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Year: Newest First</option>
              </select>
            </div>
          </div>

          {sortedVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {sortedVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-black/10">
              <p className="text-muted text-lg">No vehicles found matching your criteria.</p>
              <button 
                onClick={() => window.location.href = "/vehicles"}
                className="text-accent font-bold mt-4 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[90%] max-w-[400px] bg-brand-dark z-[101] lg:hidden p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif font-bold text-white">Filters</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar />
              <div className="mt-8">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 gold-gradient text-white rounded-2xl font-bold shadow-lg shadow-accent/20"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
