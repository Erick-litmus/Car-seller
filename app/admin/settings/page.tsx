import React from "react";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Database,
  Smartphone,
  Save
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-500">Manage your account preferences and system configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <aside className="space-y-1">
          {[
            { name: "General", icon: Globe, current: true },
            { name: "Profile", icon: User, current: false },
            { name: "Notifications", icon: Bell, current: false },
            { name: "Security", icon: Shield, current: false },
            { name: "Mobile App", icon: Smartphone, current: false },
            { name: "Data Backup", icon: Database, current: false },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                item.current 
                  ? "bg-white text-accent shadow-sm border border-slate-200" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </button>
          ))}
        </aside>

        <div className="md:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">General Configuration</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Marketplace Name</label>
                <input 
                  type="text" 
                  defaultValue="Erick & Mutua Luxury Cars"
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Support Email</label>
                <input 
                  type="email" 
                  defaultValue="info@erickandmutua.com"
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Currency</label>
                <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-slate-900 appearance-none cursor-pointer">
                  <option>KES - Kenyan Shilling</option>
                  <option>USD - US Dollar</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 gold-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:opacity-90 transition-all">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Notification Settings</h3>
            <div className="space-y-4">
              {[
                { title: "Email Notifications", desc: "Receive email updates for new leads." },
                { title: "WhatsApp Alerts", desc: "Get instant notifications on your WhatsApp." },
                { title: "Inventory Alerts", desc: "Notify when a vehicle has been listed for > 30 days." },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
