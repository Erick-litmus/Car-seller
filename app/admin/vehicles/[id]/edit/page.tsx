import React from "react";
import prisma from "@/lib/prisma";
import VehicleForm from "@/components/admin/VehicleForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVehiclePage({ params }: PageProps) {
  const { id } = await params;
  
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle) {
    notFound();
  }

  return <VehicleForm vehicle={vehicle} isEditing />;
}
