import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import { ArrowRight, ShieldCheck, Zap, Heart } from "lucide-react";
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
    <main className="flex-grow">
      <Navbar />
      <Hero />

      {/* Featured Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
                Featured Vehicles
              </h2>
              <p className="text-muted text-lg max-w-xl">
                Explore our hand-picked selection of premium vehicles, all passing our rigorous 150-point technical inspection.
              </p>
            </div>
            <Link
              href="/vehicles"
              className="flex items-center gap-2 text-accent font-bold group"
            >
              View Full Inventory
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-black/5 group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
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
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Keep as is since it's informational */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/hero-car.png"
              alt="Consultancy"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">
              Experience the difference
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-8">
              Why Erick and Mutua is <br />
              the Preferred Choice
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "Transparent Pricing",
                  desc: "No hidden fees or surprise costs. We provide clear, market-driven pricing for every vehicle.",
                },
                {
                  title: "Expert Inspection",
                  desc: "Every car undergoes a comprehensive 150-point technical check by our master mechanics.",
                },
                {
                  title: "Personalized Consultancy",
                  desc: "Not sure which car fits your lifestyle? Our experts guide you through the entire process.",
                },
              ].map((feature, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 flex-shrink-0 gold-gradient rounded-xl flex items-center justify-center">
                    <ShieldCheck className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-dark mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-muted leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
