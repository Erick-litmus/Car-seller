import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/vehicles/FilterSidebar";
import VehicleCard from "@/components/vehicles/VehicleCard";
import { ChevronRight } from "lucide-react";
import prisma from "@/lib/prisma";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VehiclesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const make = typeof params.make === "string" ? params.make : undefined;
  const bodyType = typeof params.bodyType === "string" ? params.bodyType : undefined;
  const minPrice = typeof params.minPrice === "string" ? Number(params.minPrice) : undefined;
  const maxPrice = typeof params.maxPrice === "string" ? Number(params.maxPrice) : undefined;
  const q = typeof params.q === "string" ? params.q : undefined;

  const where: any = {};
  if (make && make !== "All Brands") where.make = { contains: make };
  if (bodyType) where.bodyType = bodyType;
  if (q) {
    where.OR = [
      { make: { contains: q } },
      { model: { contains: q } },
    ];
  }
  
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = minPrice;
    if (maxPrice) where.price.lte = maxPrice;
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedVehicles = vehicles.map((v) => ({
    ...v,
    image: JSON.parse(v.images as string)[0],
    features: JSON.parse(v.features as string),
  }));

  return (
    <main className="flex-grow bg-brand-light">
      <Navbar />

      {/* Header */}
      <div className="bg-brand-dark pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-4 uppercase tracking-widest font-medium">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent">Inventory</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Available Inventory
          </h1>
          <p className="text-white/60 mt-4 max-w-xl">
            Browse our wide range of premium inspected vehicles. Find the one that matches your style and performance needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted font-medium">
                Showing <span className="text-brand-dark">{formattedVehicles.length}</span> vehicles
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted">Sort by:</span>
                <select className="bg-white border-none rounded-lg px-4 py-2 text-sm font-bold text-brand-dark shadow-sm outline-none cursor-pointer">
                  <option>Latest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Year: Newest First</option>
                </select>
              </div>
            </div>

            {formattedVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {formattedVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle as any} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-muted/30">
                <p className="text-muted text-lg">No vehicles found matching your criteria.</p>
                <button className="text-accent font-bold mt-4">Clear all filters</button>
              </div>
            )}

            {/* Pagination */}
            {formattedVehicles.length > 10 && (
              <div className="mt-16 flex justify-center gap-2">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                      p === 1
                        ? "gold-gradient text-white shadow-lg shadow-accent/20"
                        : "bg-white text-brand-dark hover:bg-brand-dark hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
