import { NextResponse } from "next/server";
import { getAllPages, ensurePageContentSeeded } from "@/lib/page-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/pages — list all pages with sections */
export async function GET() {
  try {
    await ensurePageContentSeeded();
    const pages = await getAllPages();
    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error("GET /api/pages error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to load pages",
      },
      { status: 500 }
    );
  }
}
