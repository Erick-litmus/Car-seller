"use client";

import React, { useState } from "react";
import { createVehicle, updateVehicle } from "@/lib/actions/vehicles";
import { Save, X, Car, Image as ImageIcon, ListFilter, Loader2 } from "lucide-react";
import Link from "next/link";

interface VehicleFormProps {
  vehicle?: any;
  isEditing?: boolean;
}

export default function VehicleForm({ vehicle, isEditing }: VehicleFormProps) {
  const [loading, setLoading] = useState(false);
  const imagesInitial = vehicle ? JSON.parse(vehicle.images as string).join(", ") : "";
  const featuresInitial = vehicle ? JSON.parse(vehicle.features as string).join(", ") : "";

  const clientAction = async (formData: FormData) => {
    setLoading(true);
    try {
      if (isEditing) {
        await updateVehicle(vehicle.id, formData);
      } else {
        await createVehicle(formData);
      }
    } catch (error) {
      console.error("Form error:", error);
      alert("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action={clientAction} className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">
            {isEditing ? "Edit Vehicle" : "Add New Vehicle"}
          </h1>
          <p className="text-slate-500">
            {isEditing ? `Updating ${vehicle.make} ${vehicle.model}` : "List a new premium car in the marketplace."}
          </p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/admin/vehicles"
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            <X className="w-4 h-4" />
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 gold-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? "Processing..." : isEditing ? "Save Changes" : "Publish Listing"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Basic Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-accent mb-2">
              <Car className="w-5 h-5" />
              <h3 className="font-bold text-slate-900">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Make</label>
                <input 
                  name="make" 
                  defaultValue={vehicle?.make} 
                  placeholder="e.g. Mercedes-Benz" 
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Model</label>
                <input 
                  name="model" 
                  defaultValue={vehicle?.model} 
                  placeholder="e.g. GLE 350" 
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900" 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Year</label>
                <input 
                  name="year" 
                  type="number" 
                  defaultValue={vehicle?.year} 
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900" 
                  required 
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Price (KES)</label>
                <input 
                  name="price" 
                  type="number" 
                  defaultValue={vehicle?.price} 
                  placeholder="e.g. 14500000" 
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900" 
                  required 
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-accent mb-2">
              <ImageIcon className="w-5 h-5" />
              <h3 className="font-bold text-slate-900">Media & Description</h3>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Image URLs (comma separated)</label>
              <textarea 
                name="images" 
                defaultValue={imagesInitial} 
                rows={3}
                placeholder="/hero-car.png, https://example.com/car1.jpg"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm resize-none text-slate-900" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Location</label>
              <input 
                name="location" 
                defaultValue={vehicle?.location || "Nairobi, Kenya"} 
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900" 
                required 
              />
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-accent mb-2">
              <ListFilter className="w-5 h-5" />
              <h3 className="font-bold text-slate-900">Features</h3>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Features List (comma separated)</label>
              <textarea 
                name="features" 
                defaultValue={featuresInitial} 
                rows={3}
                placeholder="Sunroof, Leather Seats, 360 Camera"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm resize-none text-slate-900" 
                required 
              />
            </div>
          </section>
        </div>

        {/* Sidebar Specs */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900">Technical Specs</h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mileage (KM)</label>
                <input 
                  name="mileage" 
                  type="number" 
                  defaultValue={vehicle?.mileage} 
                  className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900" 
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Body Type</label>
                <select name="bodyType" defaultValue={vehicle?.bodyType || "SUV"} className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-accent outline-none text-sm appearance-none cursor-pointer text-slate-900">
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Coupe</option>
                  <option>Pickup</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fuel Type</label>
                <select name="fuelType" defaultValue={vehicle?.fuelType || "Petrol"} className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-accent outline-none text-sm appearance-none cursor-pointer text-slate-900">
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transmission</label>
                <select name="transmission" defaultValue={vehicle?.transmission || "Automatic"} className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-accent outline-none text-sm appearance-none cursor-pointer text-slate-900">
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Engine Size</label>
                <input 
                  name="engineSize" 
                  defaultValue={vehicle?.engineSize || "3.0L"} 
                  className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900" 
                  required 
                />
              </div>
              {isEditing && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                  <select name="status" defaultValue={vehicle?.status} className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-accent outline-none text-sm appearance-none cursor-pointer text-slate-900">
                    <option>Available</option>
                    <option>Sold</option>
                  </select>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
