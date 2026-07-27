import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing Wish ID" }, { status: 400 });

    await prisma.wish.update({
      where: { id },
      data: { status: "REJECTED" }
    });

    return new NextResponse(
      "<h1>❌ Wish Rejected</h1><p>It has been hidden from the website.</p>", 
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error("Error rejecting:", error);
    return NextResponse.json({ error: "Failed to reject" }, { status: 500 });
  }
}