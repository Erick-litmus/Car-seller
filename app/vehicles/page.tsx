import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VehiclesLayout from "@/components/vehicles/VehiclesLayout";
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
    <main className="flex-grow bg-brand-light min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-brand-dark pt-32 pb-16 md:pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm mb-4 uppercase tracking-[0.2em] font-bold">
            <span>Home</span>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="text-accent">Inventory</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Available Inventory
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed">
            Browse our wide range of premium inspected vehicles. Find the one that matches your style and performance needs.
          </p>
        </div>
      </div>

      <VehiclesLayout vehicles={formattedVehicles as any} />

      <Footer />
    </main>
  );
}
