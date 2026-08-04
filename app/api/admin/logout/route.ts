import { NextResponse } from "next/server";
import { clearAdminSessionCookieOptions } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/admin/logout */
export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(clearAdminSessionCookieOptions());
  return res;
}
