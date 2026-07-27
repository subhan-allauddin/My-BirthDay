// app/api/wishes/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
    }

    // 1. Wish ko PENDING status ke sath save karein
    const newWish = await prisma.wish.create({
      data: { 
        name, 
        message,
        status: "PENDING" // Default pending hoga
      },
    });

    // 2. Email bhejne ke liye Approve/Reject URLs banayein
    // Jab app live ho toh "http://localhost:3000" ko apni actual domain se replace kar dein
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const approveUrl = `${baseUrl}/api/wishes/approve?id=${newWish.id}`;
    const rejectUrl = `${baseUrl}/api/wishes/reject?id=${newWish.id}`;

    // 3. Resend se admin (aap) ko email bhejein
    await resend.emails.send({
      from: "onboarding@resend.dev", // Resend ki test email (ya apna verified domain lagayein)
      to: "subhanallauddin@gmail.com", // Yahan APNI email likhein
      subject: `New Wish from ${name} - Action Required`,
      html: `
        <h2>New Birthday Wish Received!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Message:</strong> "${message}"</p>
        <br/>
        <a href="${approveUrl}" style="padding: 10px 20px; background-color: #22c55e; color: white; text-decoration: none; border-radius: 5px;">Approve Wish</a>
        &nbsp;&nbsp;&nbsp;
        <a href="${rejectUrl}" style="padding: 10px 20px; background-color: #ef4444; color: white; text-decoration: none; border-radius: 5px;">Reject Wish</a>
      `,
    });

    return NextResponse.json({ success: true, data: newWish }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to submit wish." }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Sirf wahi wishes fetch karein jo APPROVED hain
    const wishes = await prisma.wish.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: wishes }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch wishes." }, { status: 500 });
  }
}