"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { trackLead } from "@/lib/actions/leads";

interface WhatsAppButtonProps {
  vehicleId: string;
  whatsappUrl: string;
}

export default function WhatsAppButton({ vehicleId, whatsappUrl }: WhatsAppButtonProps) {
  const handleClick = async () => {
    // We don't await this so the user goes to WhatsApp immediately
    trackLead(vehicleId, "WhatsApp");
  };

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="w-full py-4 gold-gradient text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-accent/20 hover:scale-[1.02] transition-all"
    >
      <MessageCircle className="w-5 h-5" />
      Inquire via WhatsApp
    </a>
  );
}
