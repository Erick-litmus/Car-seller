"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, PhoneCall } from "lucide-react";
import { trackLead } from "@/lib/actions/leads";

interface StickyCTAProps {
  vehicleId: string;
  make: string;
  model: string;
  price: number;
  whatsappUrl: string;
}

export default function StickyCTA({ vehicleId, make, model, price, whatsappUrl }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the sticky bar after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-dark/95 backdrop-blur-xl border-t border-white/10 shadow-2xl transform transition-transform duration-500 translate-y-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-0.5">Interested?</p>
          <h3 className="text-white font-bold text-lg leading-none">{make} {model}</h3>
        </div>
        
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <p className="text-xl font-bold text-accent whitespace-nowrap">
            KES {(price / 1000000).toFixed(1)}M
          </p>
          <div className="flex items-center gap-2">
            <button className="hidden md:flex p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all">
              <PhoneCall className="w-5 h-5" />
            </button>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead(vehicleId, "WhatsApp")}
              className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold shadow-lg shadow-[#25D366]/20 hover:scale-105 transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Inquire Now</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
