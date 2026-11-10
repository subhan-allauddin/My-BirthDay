import { moderateWish } from "@/lib/wish-moderation";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return moderateWish(req, "REJECTED");
}
