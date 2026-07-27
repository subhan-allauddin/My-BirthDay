import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing Wish ID" }, { status: 400 });

    await prisma.wish.update({
      where: { id },
      data: { status: "APPROVED" }
    });

    return new NextResponse(
      "<h1>✅ Wish Approved Successfully!</h1><p>It will now show on your website.</p>", 
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error("Error approving:", error);
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }
}