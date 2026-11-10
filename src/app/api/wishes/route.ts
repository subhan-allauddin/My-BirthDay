import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { escapeHtml, resolveBaseUrl } from "@/lib/wish-moderation";
import { PROFILE } from "@/data/profile";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const rawName =
      typeof (body as { name?: unknown })?.name === "string"
        ? (body as { name: string }).name
        : "";
    const rawMessage =
      typeof (body as { message?: unknown })?.message === "string"
        ? (body as { message: string }).message
        : "";

    const name = rawName.trim().replace(/\s+/g, " ");
    const message = rawMessage.trim();

    if (name.length < 2 || name.length > 60) {
      return NextResponse.json(
        { error: "Please enter a name between 2 and 60 characters." },
        { status: 400 }
      );
    }

    if (message.length < 3 || message.length > 500) {
      return NextResponse.json(
        { error: "Please write a message between 3 and 500 characters." },
        { status: 400 }
      );
    }

    const newWish = await prisma.wish.create({
      data: {
        name,
        message,
        status: "PENDING",
      },
    });

    const baseUrl = resolveBaseUrl(req);
    const approveUrl = `${baseUrl}/api/wishes/approve?id=${newWish.id}`;
    const rejectUrl = `${baseUrl}/api/wishes/reject?id=${newWish.id}`;

    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY?.trim();

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const safeName = escapeHtml(name);
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev",
          to: PROFILE.email,
          subject: `New Birthday Wish from ${name} - Action Required`,
          html: `
            <div style="font-family:sans-serif;max-width:520px;padding:20px;border:1px solid #e5e7eb;border-radius:12px;">
              <h2 style="margin-top:0;color:#111827;">New Birthday Wish Received</h2>
              <p><strong>From:</strong> ${safeName}</p>
              <p><strong>Message:</strong><br/>"${safeMessage}"</p>
              <div style="margin-top:24px;">
                <a href="${approveUrl}" style="display:inline-block;padding:10px 20px;background-color:#22c55e;color:white;text-decoration:none;border-radius:8px;font-weight:600;">Approve Wish</a>
                &nbsp;&nbsp;
                <a href="${rejectUrl}" style="display:inline-block;padding:10px 20px;background-color:#ef4444;color:white;text-decoration:none;border-radius:8px;font-weight:600;">Reject Wish</a>
              </div>
            </div>
          `,
        });
        emailSent = true;
      } catch (emailError) {
        console.error("Resend notification failed (wish saved as PENDING):", emailError);
      }
    }

    return NextResponse.json(
      { success: true, data: newWish, emailSent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating wish:", error);
    return NextResponse.json(
      { error: "Failed to submit wish. Please try again shortly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [wishes, total] = await Promise.all([
      prisma.wish.findMany({
        where: { status: "APPROVED" },
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      prisma.wish.count({ where: { status: "APPROVED" } }),
    ]);

    return NextResponse.json(
      { success: true, data: wishes, total },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Database error fetching wishes:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishes." },
      { status: 500 }
    );
  }
}
