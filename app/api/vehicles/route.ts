import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const make = searchParams.get("make");
  const bodyType = searchParams.get("bodyType");
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const status = searchParams.get("status");

  try {
    const where: any = {};
    if (make) where.make = { contains: make };
    if (bodyType) where.bodyType = bodyType;
    if (status) where.status = status;
    
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = minPrice;
      if (maxPrice) where.price.lte = maxPrice;
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Parse images and features strings back to arrays
    const formattedVehicles = vehicles.map((v) => ({
      ...v,
      images: JSON.parse(v.images as string),
      features: JSON.parse(v.features as string),
    }));

    return NextResponse.json(formattedVehicles);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
  }
}
