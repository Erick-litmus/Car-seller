import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import { ArrowRight, ShieldCheck, Zap, Heart, Star, Users, Award, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Home() {
  const featuredVehiclesData = await prisma.vehicle.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  const featuredVehicles = featuredVehiclesData.map((v) => ({
    ...v,
    image: JSON.parse(v.images as string)[0],
  }));

  return (
    <main className="flex-grow bg-brand-light">
      <Navbar />
      <Hero />

      {/* Impact Stats */}
      <section className="relative z-20 -mt-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Happy Clients", value: "500+", icon: Users },
            { label: "Premium Cars", value: "150+", icon: Zap },
            { label: "Years Experience", value: "12+", icon: Award },
            { label: "Global Reach", value: "10+", icon: MapPin },
          ].map((stat, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[32px] border border-white shadow-xl flex flex-col items-center text-center group hover:scale-105 transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <stat.icon className="w-6 h-6 text-slate-400 group-hover:text-accent transition-colors" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-brand-dark mb-1">{stat.value}</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Luxury Categories */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Tailored Selections</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Explore By Category</h2>
            <div className="h-1 w-20 gold-gradient mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: "SUVs", count: "45+", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" },
              { name: "Sedans", count: "32+", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80" },
              { name: "Sports", count: "12+", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80" },
              { name: "Luxury", count: "28+", img: "https://images.unsplash.com/photo-1563720223185-11003d516905?auto=format&fit=crop&q=80" },
            ].map((cat, i) => (
              <Link href={`/vehicles?bodyType=${cat.name.slice(0, -1)}`} key={i} className="group relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-lg">
                <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-white/60 text-xs font-bold mb-1">{cat.count} Listings</p>
                  <h4 className="text-2xl font-serif font-bold text-white">{cat.name}</h4>
                </div>
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 md:py-32 bg-white rounded-[60px] md:rounded-[100px] shadow-2xl relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Hand-Picked</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
                Featured Collection
              </h2>
              <p className="text-muted text-sm md:text-base max-w-xl">
                Discover the pinnacle of automotive engineering from our exclusive inventory of certified pre-owned luxury vehicles.
              </p>
            </div>
            <Link
              href="/vehicles"
              className="flex items-center gap-3 px-8 py-4 bg-slate-50 text-brand-dark rounded-2xl font-bold group hover:bg-brand-dark hover:text-white transition-all"
            >
              View All
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {featuredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-brand-light rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-black/5 group"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute top-6 left-6 ${vehicle.status === "Available" ? "bg-brand-dark/80" : "bg-red-500/80"} backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest`}>
                    {vehicle.status}
                  </div>
                  <button className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-brand-dark mb-1">{vehicle.make} {vehicle.model}</h3>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
                    </div>
                    <p className="text-xl font-bold text-accent">KES {(vehicle.price / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-black/5 mb-8">
                    <div className="flex items-center gap-3 text-xs font-bold text-brand-dark/60 uppercase tracking-widest">
                      <Zap className="w-4 h-4 text-accent" />
                      <span>{vehicle.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-brand-dark/60 uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4 text-accent" />
                      <span>{vehicle.transmission}</span>
                    </div>
                  </div>
                  <Link
                    href={`/vehicles/${vehicle.id}`}
                    className="flex items-center justify-center gap-3 w-full py-5 bg-brand-dark text-white text-center rounded-2xl font-bold hover:bg-accent transition-all shadow-xl shadow-brand-dark/10 group/btn"
                  >
                    Experience Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80"
              alt="Luxury Car Interior"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-xl rounded-[40px] border border-white/20">
              <Star className="text-accent w-8 h-8 mb-4 fill-accent" />
              <p className="text-white text-xl font-serif italic italic leading-relaxed">
                "Our mission is to provide more than just a car; we provide a lifestyle of technical perfection and unrivaled service."
              </p>
              <p className="text-accent font-bold mt-6 uppercase tracking-widest text-xs">— Erick & Mutua</p>
            </div>
          </div>
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">
              The Gold Standard
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-10 leading-tight">
              Why We Are The <br />
              Preferred Choice
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: "Transparent Heritage",
                  desc: "We provide complete history reports and clear, market-driven pricing for every single vehicle in our collection.",
                  icon: ShieldCheck
                },
                {
                  title: "Master Inspection",
                  desc: "Our elite technicians perform a rigorous 150-point surgical inspection to ensure absolute performance reliability.",
                  icon: Zap
                },
                {
                  title: "VIP Consultancy",
                  desc: "Receive one-on-one guidance from automotive experts who prioritize your lifestyle and technical requirements.",
                  icon: Star
                },
              ].map((feature, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-16 h-16 flex-shrink-0 bg-white shadow-lg rounded-2xl flex items-center justify-center group-hover:gold-gradient transition-all duration-500">
                    <feature.icon className="text-slate-400 w-7 h-7 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-dark mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-muted leading-relaxed text-sm md:text-base">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-24 md:pb-40 px-6">
        <div className="max-w-7xl mx-auto bg-brand-dark rounded-[60px] md:rounded-[100px] p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-brand-dark/80" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-serif font-bold text-white mb-8">Ready to Elevate <br /> Your Driving Experience?</h2>
            <p className="text-white/60 text-sm md:text-lg max-w-2xl mx-auto mb-12">
              Join the hundreds of satisfied clients who have found their dream vehicle with Erick & Mutua. Your journey to unrivaled luxury begins here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/vehicles" className="w-full sm:w-auto px-12 py-5 gold-gradient text-white rounded-full font-bold shadow-2xl shadow-accent/20 hover:scale-105 transition-all">
                Browse Inventory
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all">
                Speak with an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
