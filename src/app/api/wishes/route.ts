import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force Next.js to treat this API route dynamically (prevents build-time prerendering)
export const dynamic = "force-dynamic";

// POST: Save a new wish
export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    const newWish = await prisma.wish.create({
      data: { name, message },
    });

    return NextResponse.json({ success: true, data: newWish }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to submit wish." },
      { status: 500 }
    );
  }
}

// GET: Fetch all wishes
export async function GET() {
  try {
    const wishes = await prisma.wish.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: wishes }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishes." },
      { status: 500 }
    );
  }
}