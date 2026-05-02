"use client";

import React, { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { markAsSold } from "@/lib/actions/vehicles";

export default function MarkAsSoldButton({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  if (currentStatus === "Sold") return null;

  return (
    <button
      onClick={async () => {
        if (confirm("Mark this vehicle as sold?")) {
          setLoading(true);
          try {
            await markAsSold(id);
          } catch (error) {
            alert("Failed to update status");
          } finally {
            setLoading(false);
          }
        }
      }}
      disabled={loading}
      className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
      title="Mark as Sold"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
    </button>
  );
}
