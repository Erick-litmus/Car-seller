"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

async function processImageUrls(urls: string[]) {
  const processedUrls = [];
  for (const url of urls) {
    if (!url.startsWith("http")) {
      processedUrls.push(url);
      continue;
    }
    try {
      let finalImageUrl = url;
      let res = await fetch(finalImageUrl);
      if (!res.ok) {
        processedUrls.push(url);
        continue;
      }
      
      let contentType = res.headers.get("content-type");

      // If the URL is an HTML page, try to scrape the og:image
      if (contentType && contentType.includes("text/html")) {
        const html = await res.text();
        let scrapedUrl = null;
        
        const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) || 
                             html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i) ||
                             html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
                             
        if (ogImageMatch && ogImageMatch[1]) {
          scrapedUrl = ogImageMatch[1];
        } else {
          const anyImageMatch = html.match(/https:\/\/[^"'\s>\\\]]+\.(?:jpg|jpeg|png|webp)/i);
          if (anyImageMatch && anyImageMatch[0]) {
            scrapedUrl = anyImageMatch[0];
          }
        }

        if (scrapedUrl) {
          finalImageUrl = scrapedUrl;
          // Fetch the actual scraped image
          res = await fetch(finalImageUrl);
          if (!res.ok) {
            processedUrls.push(url);
            continue;
          }
          contentType = res.headers.get("content-type");
        } else {
          processedUrls.push(url);
          continue;
        }
      }

      if (!contentType || !contentType.startsWith("image/")) {
        processedUrls.push(finalImageUrl);
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });

      let ext = contentType.split("/")[1]?.split(";")[0] || "jpg";
      if (ext === "jpeg") ext = "jpg";
      
      const filename = `${crypto.randomBytes(16).toString("hex")}.${ext}`;
      const filePath = path.join(uploadsDir, filename);
      
      await fs.writeFile(filePath, buffer);
      processedUrls.push(`/uploads/${filename}`);
    } catch (e) {
      console.error("Error downloading image:", e);
      processedUrls.push(url);
    }
  }
  return processedUrls;
}

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

  const processedImages = await processImageUrls(images);

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
      images: JSON.stringify(processedImages),
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

  const processedImages = await processImageUrls(images);

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
      images: JSON.stringify(processedImages),
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

export async function markAsSold(id: string) {
  await prisma.vehicle.update({
    where: { id },
    data: { status: "Sold" },
  });

  revalidatePath("/admin/vehicles");
  revalidatePath("/vehicles");
  revalidatePath("/");
}
