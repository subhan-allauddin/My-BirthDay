import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

export function isValidObjectId(id: string): boolean {
  return OBJECT_ID_REGEX.test(id);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function resolveBaseUrl(req: Request): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  const forwardedHost = req.headers.get("x-forwarded-host");
  const forwardedProto = req.headers.get("x-forwarded-proto") || "https";
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  try {
    return new URL(req.url).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export function renderStatusHtml({
  badge,
  title,
  message,
  accent,
  homeUrl,
}: {
  badge: string;
  title: string;
  message: string;
  accent: "emerald" | "rose" | "amber";
  homeUrl: string;
}): string {
  const colors = {
    emerald: { bg: "rgba(34,197,94,0.14)", border: "rgba(34,197,94,0.35)", text: "#86efac" },
    rose: { bg: "rgba(244,63,94,0.14)", border: "rgba(244,63,94,0.35)", text: "#fda4af" },
    amber: { bg: "rgba(245,158,11,0.14)", border: "rgba(245,158,11,0.35)", text: "#fcd34d" },
  }[accent];

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} • Abdus Subhan</title>
  </head>
  <body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#050816;color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:24px;">
    <div style="max-width:440px;width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:32px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.45);">
      <div style="display:inline-block;padding:6px 14px;border-radius:999px;background:${colors.bg};border:1px solid ${colors.border};color:${colors.text};font-size:12px;font-weight:600;letter-spacing:0.04em;margin-bottom:16px;">
        ${escapeHtml(badge)}
      </div>
      <h1 style="margin:0 0 10px;font-size:24px;line-height:1.25;">${escapeHtml(title)}</h1>
      <p style="margin:0 0 24px;color:rgba(248,250,252,0.72);font-size:14px;line-height:1.6;">
        ${escapeHtml(message)}
      </p>
      <a href="${escapeHtml(homeUrl)}" style="display:inline-block;padding:12px 22px;border-radius:14px;background:linear-gradient(90deg,#7c3aed,#c026d3);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;">
        Back to Celebration Page
      </a>
    </div>
  </body>
</html>`;
}

export async function moderateWish(
  req: Request,
  targetStatus: "APPROVED" | "REJECTED"
) {
  const homeUrl = resolveBaseUrl(req);

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")?.trim();

    if (!id || !isValidObjectId(id)) {
      return new NextResponse(
        renderStatusHtml({
          badge: "Invalid Request",
          title: "Invalid Wish ID",
          message: "The moderation link is missing a valid wish identifier.",
          accent: "amber",
          homeUrl,
        }),
        { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    const existing = await prisma.wish.findUnique({ where: { id } });
    if (!existing) {
      return new NextResponse(
        renderStatusHtml({
          badge: "Not Found",
          title: "Wish Not Found",
          message: "This wish could not be found or may have already been removed.",
          accent: "amber",
          homeUrl,
        }),
        { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    await prisma.wish.update({
      where: { id },
      data: { status: targetStatus },
    });

    if (targetStatus === "APPROVED") {
      return new NextResponse(
        renderStatusHtml({
          badge: "Approved",
          title: "Wish Approved Successfully",
          message: `The birthday wish from ${existing.name} is now live on your website.`,
          accent: "emerald",
          homeUrl,
        }),
        { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    return new NextResponse(
      renderStatusHtml({
        badge: "Rejected",
        title: "Wish Hidden",
        message: `The birthday wish from ${existing.name} has been rejected and will remain hidden.`,
        accent: "rose",
        homeUrl,
      }),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (error) {
    console.error(`Error updating wish to ${targetStatus}:`, error);
    return NextResponse.json(
      { error: "Failed to update wish status." },
      { status: 500 }
    );
  }
}
