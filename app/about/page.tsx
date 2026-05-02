import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { ShieldCheck, Target, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-grow bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-5 rounded-full blur-3xl -mr-64 -mt-64" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">
            Redefining the <br />
            Car Buying Experience
          </h1>
          <p className="text-white/60 text-xl max-w-2xl leading-relaxed">
            Erick & Mutua was founded on the principle of transparency. We believe that buying a premium vehicle should be as enjoyable as driving one.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-car.png"
                alt="Luxury Car"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Our Mission</h2>
                <p className="text-muted text-lg leading-relaxed">
                  To provide Kenyan car buyers with a curated selection of high-quality, pre-inspected vehicles while maintaining the highest standards of integrity and customer service in the industry.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: ShieldCheck, label: "Trust", desc: "150+ point technical inspections on every vehicle." },
                  { icon: Target, label: "Quality", desc: "Only the finest premium cars make it to our inventory." },
                  { icon: Users, label: "Community", desc: "Building long-term relationships with our clients." },
                  { icon: Award, label: "Excellence", desc: "Setting the gold standard in car consultancy." },
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center shadow-lg">
                      <item.icon className="text-white w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-brand-dark">{item.label}</h4>
                    <p className="text-sm text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Founders Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold text-brand-dark mb-16">Meet the Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              { name: "Erick", role: "Co-Founder & CEO", desc: "With over 10 years in automotive consultancy, Erick leads the vision and strategic growth of the brand." },
              { name: "Mutua", role: "Co-Founder & Operations", desc: "Mutua ensures operational excellence and oversees our rigorous technical inspection standards." },
            ].map((member, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-black/5 hover:shadow-xl transition-all group">
                <div className="w-24 h-24 bg-brand-light rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-accent border-2 border-accent/20 group-hover:scale-110 transition-transform">
                  {member.name[0]}
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">{member.name}</h3>
                <p className="text-accent font-bold text-sm mb-4 uppercase tracking-widest">{member.role}</p>
                <p className="text-muted leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
