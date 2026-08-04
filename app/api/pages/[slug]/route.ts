import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Page from "@/models/Page";
import { getPageBySlug, ensurePageContentSeeded } from "@/lib/page-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/pages/[slug] */
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await ensurePageContentSeeded();
    const page = await getPageBySlug(params.slug);

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error("GET /api/pages/[slug] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to load page",
      },
      { status: 500 }
    );
  }
}

/** PATCH /api/pages/[slug] — update page meta/seo */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();
    await connectDB();

    const page = await Page.findOneAndUpdate(
      { slug: params.slug },
      {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.icon !== undefined && { icon: body.icon }),
        ...(body.published !== undefined && { published: body.published }),
        ...(body.seo !== undefined && { seo: body.seo }),
      },
      { new: true }
    );

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error("PATCH /api/pages/[slug] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update page",
      },
      { status: 500 }
    );
  }
}
