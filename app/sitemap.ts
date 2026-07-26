import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://erickandmutua.com";

  // Fetch all vehicles for dynamic pages
  const vehicles = await prisma.vehicle.findMany({
    select: {
      id: true,
      updatedAt: true,
      images: true,
    },
  });

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/vehicles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/luxury`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic vehicle pages
  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((vehicle) => {
    const firstImage = JSON.parse(vehicle.images as string)[0];
    
    // We must escape ampersands in URLs for XML, otherwise it breaks the sitemap parser
    const safeImageUrl = firstImage ? firstImage.replace(/&/g, "&amp;") : undefined;
    
    return {
      url: `${siteUrl}/vehicles/${vehicle.id}`,
      lastModified: vehicle.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: safeImageUrl ? [safeImageUrl] : undefined,
    };
  });

  return [...staticPages, ...vehiclePages];
}
