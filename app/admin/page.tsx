import React from "react";
import { 
  TrendingUp, 
  Car, 
  MessageCircle, 
  CheckCircle,
  Clock,
  PlusCircle
} from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const totalVehicles = await prisma.vehicle.count();
  const availableVehicles = await prisma.vehicle.count({ where: { status: "Available" } });
  const soldVehicles = await prisma.vehicle.count({ where: { status: "Sold" } });
  const totalLeads = await prisma.lead.count();
  
  const stats = [
    { name: "Total Listings", value: totalVehicles, icon: Car, color: "blue" },
    { name: "Available Now", value: availableVehicles, icon: CheckCircle, color: "green" },
    { name: "Sold Cars", value: soldVehicles, icon: TrendingUp, color: "amber" },
    { name: "WhatsApp Leads", value: totalLeads, icon: MessageCircle, color: "purple" },
  ];

  const recentVehicles = await prisma.vehicle.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const recentLeads = await prisma.lead.findMany({
    take: 5,
    include: { vehicle: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Dashboard Overview</h1>
        <p className="text-slate-500">Track your inventory and sales performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 group hover:border-accent/50 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-accent/10 transition-colors">
                <stat.icon className="w-6 h-6 text-slate-400 group-hover:text-accent transition-colors" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.name}</p>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Listings */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Recent Listings</h3>
            <Link href="/admin/vehicles" className="text-sm font-bold text-accent hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentVehicles.map((vehicle) => (
              <div key={vehicle.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden relative">
                    <img 
                      src={JSON.parse(vehicle.images as string)[0] || "/hero-car.png"} 
                      alt="Car" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{vehicle.make} {vehicle.model}</h4>
                    <p className="text-xs text-slate-500">{vehicle.year} • KES {(vehicle.price / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                  vehicle.status === "Available" ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500"
                }`}>
                  {vehicle.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Activity */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">WhatsApp Leads</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Activity</span>
          </div>
          <div className="divide-y divide-slate-100">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Inquiry for {lead.vehicle.make} {lead.vehicle.model}</h4>
                      <p className="text-xs text-slate-500">{new Date(lead.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center text-slate-400">
                <p>No leads recorded yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* Quick Actions */}
        <div className="bg-brand-dark rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-serif font-bold mb-4">Grow Your Business</h3>
              <p className="text-white/60 max-w-md">Add new premium vehicles to your marketplace and start tracking your leads in real-time.</p>
            </div>
            <Link 
              href="/admin/vehicles/new"
              className="inline-flex items-center gap-3 px-10 py-5 gold-gradient text-white rounded-2xl font-bold shadow-2xl shadow-accent/20 hover:scale-[1.05] transition-all"
            >
              <PlusCircle className="w-6 h-6" />
              Add New Vehicle Listing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
