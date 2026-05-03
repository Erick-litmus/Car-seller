"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactInquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  await prisma.contactInquiry.create({
    data: {
      name,
      email,
      subject: subject || "General Inquiry",
      message,
    },
  });

  revalidatePath("/admin"); 
  revalidatePath("/admin/inquiries");
  return { success: true };
}
