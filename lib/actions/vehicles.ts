"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createVehicle(formData: FormData) {
  const make = formData.get("make") as string;
  const model = formData.get("model") as string;
  const year = parseInt(formData.get("year") as string);
  const price = parseFloat(formData.get("price") as string);
  const mileage = parseInt(formData.get("mileage") as string);
  const fuelType = formData.get("fuelType") as string;
  const transmission = formData.get("transmission") as string;
  const bodyType = formData.get("bodyType") as string;
  const engineSize = formData.get("engineSize") as string;
  const location = formData.get("location") as string;
  const imagesStr = formData.get("images") as string; // Comma separated for now
  const featuresStr = formData.get("features") as string; // Comma separated

  const images = imagesStr.split(",").map(s => s.trim()).filter(s => s !== "");
  const features = featuresStr.split(",").map(s => s.trim()).filter(s => s !== "");

  await prisma.vehicle.create({
    data: {
      make,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      bodyType,
      engineSize,
      location,
      images: JSON.stringify(images),
      features: JSON.stringify(features),
      status: "Available",
    },
  });

  revalidatePath("/admin/vehicles");
  revalidatePath("/vehicles");
  revalidatePath("/");
  redirect("/admin/vehicles");
}

export async function updateVehicle(id: string, formData: FormData) {
  const make = formData.get("make") as string;
  const model = formData.get("model") as string;
  const year = parseInt(formData.get("year") as string);
  const price = parseFloat(formData.get("price") as string);
  const mileage = parseInt(formData.get("mileage") as string);
  const fuelType = formData.get("fuelType") as string;
  const transmission = formData.get("transmission") as string;
  const bodyType = formData.get("bodyType") as string;
  const engineSize = formData.get("engineSize") as string;
  const location = formData.get("location") as string;
  const imagesStr = formData.get("images") as string;
  const featuresStr = formData.get("features") as string;
  const status = formData.get("status") as string;

  const images = imagesStr.split(",").map(s => s.trim()).filter(s => s !== "");
  const features = featuresStr.split(",").map(s => s.trim()).filter(s => s !== "");

  await prisma.vehicle.update({
    where: { id },
    data: {
      make,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      bodyType,
      engineSize,
      location,
      images: JSON.stringify(images),
      features: JSON.stringify(features),
      status,
    },
  });

  revalidatePath("/admin/vehicles");
  revalidatePath(`/vehicles/${id}`);
  revalidatePath("/vehicles");
  revalidatePath("/");
  redirect("/admin/vehicles");
}

export async function deleteVehicle(id: string) {
  await prisma.vehicle.delete({
    where: { id },
  });

  revalidatePath("/admin/vehicles");
  revalidatePath("/vehicles");
  revalidatePath("/");
}
