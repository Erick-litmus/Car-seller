import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VehicleGallery from "@/components/vehicles/VehicleGallery";
import WhatsAppButton from "@/components/vehicles/WhatsAppButton";
import StickyCTA from "@/components/vehicles/StickyCTA";
import { 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Calendar, 
  Gauge, 
  Info, 
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  MapPin
} from "lucide-react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  const vehicleData = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicleData) {
    notFound();
  }

  const vehicle = {
    ...vehicleData,
    images: JSON.parse(vehicleData.images as string),
    features: JSON.parse(vehicleData.features as string),
  };

  const specs = [
    { label: "Engine", value: vehicle.engineSize },
    { label: "Fuel Type", value: vehicle.fuelType },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Year", value: vehicle.year },
    { label: "Mileage", value: `${vehicle.mileage.toLocaleString()} km` },
    { label: "Body Type", value: vehicle.bodyType },
  ];

  const whatsappMessage = `Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} priced at KES ${(vehicle.price / 1000000).toFixed(1)}M. Is it still available?`;
  const whatsappUrl = `https://wa.me/254706546644?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="flex-grow bg-brand-light">
      <Navbar />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-muted text-xs mb-8 uppercase tracking-widest font-medium">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span>Inventory</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-dark">{vehicle.make} {vehicle.model}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Images and Info */}
            <div className="flex-1 space-y-12">
              <VehicleGallery images={vehicle.images} />

              {/* Quick Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Calendar, label: "Year", value: vehicle.year },
                  { icon: Gauge, label: "Mileage", value: `${vehicle.mileage.toLocaleString()} km` },
                  { icon: Zap, label: "Fuel", value: vehicle.fuelType },
                  { icon: ShieldCheck, label: "Trans.", value: vehicle.transmission },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm text-center group hover:border-accent/50 transition-colors">
                    <item.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                    <p className="text-xs text-muted font-medium mb-1 uppercase tracking-wider">{item.label}</p>
                    <p className="text-brand-dark font-bold">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">About this Vehicle</h2>
                <p className="text-muted leading-relaxed text-lg">
                  This {vehicle.make} {vehicle.model} is a masterpiece of engineering and luxury. It comes with a full service history and has been meticulously maintained by our certified technical team. Experience unparalleled comfort and performance with its {vehicle.engineSize} engine and state-of-the-art features.
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicle.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-brand-dark font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Specs Table */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">Technical Specifications</h2>
                <div className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm">
                  {specs.map((spec, i) => (
                    <div
                      key={i}
                      className={`flex justify-between p-6 ${
                        i !== specs.length - 1 ? "border-b border-black/5" : ""
                      } ${i % 2 === 0 ? "bg-white" : "bg-brand-light/30"}`}
                    >
                      <span className="text-muted font-medium">{spec.label}</span>
                      <span className="text-brand-dark font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sticky Card */}
            <div className="w-full lg:w-[400px]">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <div className="bg-brand-dark text-white p-8 rounded-3xl shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full blur-3xl -mr-16 -mt-16" />
                  <div className="relative z-10">
                    <p className="text-accent font-bold text-sm mb-2 uppercase tracking-widest">{vehicle.status}</p>
                    <h2 className="text-4xl font-serif font-bold mb-6">
                      KES {(vehicle.price / 1000000).toFixed(1)}M
                    </h2>
                    <div className="space-y-4">
                      <WhatsAppButton 
                        vehicleId={vehicle.id} 
                        whatsappUrl={whatsappUrl} 
                      />
                      <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold flex items-center justify-center gap-3 transition-all">
                        <PhoneCall className="w-5 h-5" />
                        Book a Viewing
                      </button>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-white/60 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>Located in {vehicle.location}</span>
                    </div>
                  </div>
                </div>

                {/* Seller Note */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-brand-dark font-bold mb-1">Buy with Confidence</h4>
                    <p className="text-sm text-muted leading-relaxed">
                      Every car in our inventory comes with a certificate of quality and a detailed inspection report.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StickyCTA 
        vehicleId={vehicle.id}
        make={vehicle.make}
        model={vehicle.model}
        price={vehicle.price}
        whatsappUrl={whatsappUrl}
      />

      <Footer />
    </main>
  );
}
