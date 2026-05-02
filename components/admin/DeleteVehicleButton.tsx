"use client";

import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteVehicle } from "@/lib/actions/vehicles";

export default function DeleteVehicleButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    try {
      await deleteVehicle(id);
    } catch (error) {
      alert("Failed to delete vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
      title="Delete"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
