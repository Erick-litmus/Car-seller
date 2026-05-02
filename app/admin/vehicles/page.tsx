import React from "react";
import prisma from "@/lib/prisma";
import { 
  Edit, 
  Trash2, 
  CheckCircle,
  XCircle,
  ExternalLink,
  PlusCircle,
  Plus,
  Search
} from "lucide-react";
import Link from "next/link";
import DeleteVehicleButton from "@/components/admin/DeleteVehicleButton";
import MarkAsSoldButton from "@/components/admin/MarkAsSoldButton";

export default async function AdminVehicles() {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Inventory Management</h1>
          <p className="text-slate-500 text-sm md:text-base">View and manage all your vehicle listings.</p>
        </div>
        <Link 
          href="/admin/vehicles/new"
          className="flex items-center justify-center gap-2 px-6 py-4 gold-gradient text-white rounded-2xl font-bold shadow-lg shadow-accent/20 hover:opacity-90 transition-all w-full md:w-fit"
        >
          <Plus className="w-5 h-5" />
          Add Vehicle
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by make, model or year..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select className="px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-accent cursor-pointer w-full md:w-40">
            <option>All Brands</option>
            <option>Toyota</option>
            <option>Mercedes-Benz</option>
          </select>
          <select className="px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-accent cursor-pointer w-full md:w-40">
            <option>All Status</option>
            <option>Available</option>
            <option>Sold</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 md:px-8 py-6 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Vehicle</th>
                <th className="px-6 md:px-8 py-6 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Pricing</th>
                <th className="hidden md:table-cell px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Details</th>
                <th className="px-6 md:px-8 py-6 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 md:px-8 py-6 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200">
                        <img 
                          src={JSON.parse(vehicle.images as string)[0] || "/hero-car.png"} 
                          alt="Car" 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{vehicle.make} {vehicle.model}</h4>
                        <p className="text-xs text-slate-500">Added on {new Date(vehicle.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-6">
                    <p className="font-bold text-slate-900 text-sm md:text-base">KES {(vehicle.price / 1000000).toFixed(1)}M</p>
                    <p className="text-[10px] md:text-xs text-slate-500">{vehicle.mileage.toLocaleString()} km</p>
                  </td>
                  <td className="hidden md:table-cell px-8 py-6">
                    <p className="text-sm text-slate-700">{vehicle.year} • {vehicle.fuelType}</p>
                    <p className="text-xs text-slate-500">{vehicle.transmission}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      vehicle.status === "Available" 
                        ? "bg-green-100 text-green-600" 
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {vehicle.status === "Available" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/vehicles/${vehicle.id}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                        title="View Live"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <MarkAsSoldButton id={vehicle.id} currentStatus={vehicle.status} />
                      <Link 
                        href={`/admin/vehicles/${vehicle.id}/edit`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteVehicleButton id={vehicle.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
          <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900">{vehicles.length}</span> vehicles</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
