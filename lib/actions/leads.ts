"use server";

import prisma from "@/lib/prisma";

export async function trackLead(vehicleId: string, type: string = "WhatsApp") {
  try {
    await prisma.lead.create({
      data: {
        vehicleId,
        type,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Lead tracking error:", error);
    return { success: false };
  }
}
