import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const COOKIE_NAME = "soro_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return (
    process.env.AUTH_SECRET ||
    process.env.ADMIN_SESSION_SECRET ||
    "dev-only-change-me-soro-admin"
  );
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function encodeSession(email: string, exp: number): string {
  const payload = Buffer.from(JSON.stringify({ email, exp }), "utf8").toString(
    "base64url"
  );
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function decodeSession(
  token: string
): { email: string; exp: number } | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { email?: string; exp?: number };
    if (!data.email || !data.exp) return null;
    if (Date.now() > data.exp) return null;
    return { email: data.email, exp: data.exp };
  } catch {
    return null;
  }
}

export function createAdminSessionToken(email: string): string {
  const exp = Date.now() + MAX_AGE_SECONDS * 1000;
  return encodeSession(email, exp);
}

export function getAdminSessionCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}

export function clearAdminSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

/** Server Components / Route Handlers using next/headers cookies() */
export function getAdminSessionFromCookies(): { email: string } | null {
  const jar = cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const session = decodeSession(token);
  return session ? { email: session.email } : null;
}

function getBearerToken(req: NextRequest): string | null {
  const header = req.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

/** Route Handlers with NextRequest — cookie OR Authorization: Bearer <token> */
export function getAdminSessionFromRequest(
  req: NextRequest
): { email: string } | null {
  const cookieToken = req.cookies.get(COOKIE_NAME)?.value;
  if (cookieToken) {
    const session = decodeSession(cookieToken);
    if (session) return { email: session.email };
  }

  const bearer = getBearerToken(req);
  if (bearer) {
    const session = decodeSession(bearer);
    if (session) return { email: session.email };
  }

  return null;
}

export function requireAdmin(req: NextRequest): { email: string } {
  const session = getAdminSessionFromRequest(req);
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export { COOKIE_NAME };
