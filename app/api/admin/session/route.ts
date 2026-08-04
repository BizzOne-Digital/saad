import { NextResponse } from "next/server";
import {
  getAdminSessionFromCookies,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/session
 * Returns current admin session + a fresh bearer token if cookie is valid.
 */
export async function GET() {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 401 }
    );
  }

  const token = createAdminSessionToken(session.email);
  const cookie = getAdminSessionCookieOptions(token);
  const res = NextResponse.json({
    success: true,
    authenticated: true,
    email: session.email,
    token,
  });
  res.cookies.set(cookie.name, cookie.value, {
    httpOnly: cookie.httpOnly,
    secure: cookie.secure,
    sameSite: cookie.sameSite,
    path: cookie.path,
    maxAge: cookie.maxAge,
  });
  return res;
}
