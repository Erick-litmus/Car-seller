import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Zap, ShieldCheck } from "lucide-react";

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

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-black/5 group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Glass Shine Effect */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[300%] transition-all duration-1000 ease-in-out pointer-events-none" />
        <div className={`absolute top-4 left-4 ${vehicle.status === "Available" ? "bg-brand-dark/80" : "bg-red-500/80"} backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
          {vehicle.status}
        </div>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-brand-dark">{vehicle.make} {vehicle.model}</h3>
            <p className="text-muted text-sm">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
          </div>
          <p className="text-xl font-bold text-accent">KES {(vehicle.price / 1000000).toFixed(1)}M</p>
        </div>
        <div className="flex items-center gap-4 py-4 border-y border-black/5 mb-6">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <Zap className="w-4 h-4 text-accent" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>
        <Link
          href={`/vehicles/${vehicle.id}`}
          className="block w-full py-3 bg-brand-dark text-white text-center rounded-xl font-bold hover:bg-brand-dark/90 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
