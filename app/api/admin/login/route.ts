import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import {
  createAdminSessionToken,
  getAdminSessionCookieOptions,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/login
 * Sets httpOnly admin session cookie (required for /api/upload on Vercel).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password required" },
        { status: 400 }
      );
    }

    let authenticated = false;

    // Prefer DB user
    try {
      await connectDB();
      const user = await User.findOne({ email, isActive: true });
      if (user) {
        authenticated = await bcrypt.compare(password, user.password);
      }
    } catch (dbError) {
      console.warn("Admin login DB check failed, trying env fallback:", dbError);
    }

    // Fallback: seed env credentials (dev / first deploy)
    if (!authenticated) {
      const seedEmail = (
        process.env.ADMIN_SEED_EMAIL || "admin@sorogaragedoors.ca"
      )
        .trim()
        .toLowerCase();
      const seedPassword =
        process.env.ADMIN_SEED_PASSWORD || "Admin@2024!";
      if (email === seedEmail && password === seedPassword) {
        authenticated = true;
      }
    }

    // Legacy hardcoded fallback (matches existing UI)
    if (
      !authenticated &&
      email === "admin@sorogaragedoors.ca" &&
      password === "Admin@2024!"
    ) {
      authenticated = true;
    }

    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken(email);
    const cookie = getAdminSessionCookieOptions(token);
    const res = NextResponse.json({
      success: true,
      email,
      token, // also returned so client can send Authorization header (cookie fallback)
      message: "Logged in",
    });
    res.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite,
      path: cookie.path,
      maxAge: cookie.maxAge,
    });
    return res;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      },
      { status: 500 }
    );
  }
}
