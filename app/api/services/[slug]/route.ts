import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { getServiceBySlug, toServiceDTO } from "@/lib/services";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/services/[slug] */
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const service = await getServiceBySlug(params.slug, {
      publishedOnly: false,
    });
    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("GET service error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to load service",
      },
      { status: 500 }
    );
  }
}

/** PUT /api/services/[slug] — update full service + detail page */
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();
    await connectDB();

    const allowed = [
      "title",
      "description",
      "content",
      "benefits",
      "icon",
      "image",
      "imageAlt",
      "price",
      "featured",
      "published",
      "order",
      "category",
      "urgent",
      "eyebrow",
      "heroImage",
      "heroImageAlt",
      "includesHeading",
      "includesDescription",
      "includes",
      "cardsHeading",
      "cardsDescription",
      "cards",
      "whyHeading",
      "whyItems",
      "ctaHeading",
      "ctaDescription",
      "ctaPrimary",
      "ctaPrimaryLink",
      "ctaSecondary",
      "ctaSecondaryLink",
      "videoSrc",
      "videoTitle",
      "videoDescription",
      "videoThumbnail",
      "phoneDisplay",
      "seo",
    ] as const;

    const update: Record<string, unknown> = {};
    for (const key of allowed) {
      if (body[key] !== undefined) update[key] = body[key];
    }

    // Optional slug rename
    if (body.slug && body.slug !== params.slug) {
      const newSlug = String(body.slug)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-|-$/g, "");
      const clash = await Service.findOne({ slug: newSlug });
      if (clash) {
        return NextResponse.json(
          { success: false, error: "Slug already in use" },
          { status: 409 }
        );
      }
      update.slug = newSlug;
    }

    const doc = await Service.findOneAndUpdate(
      { slug: params.slug },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service saved",
      service: toServiceDTO(doc.toObject() as unknown as Record<string, unknown>),
    });
  } catch (error) {
    console.error("PUT service error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save service",
      },
      { status: 500 }
    );
  }
}

/** DELETE /api/services/[slug] */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const doc = await Service.findOneAndDelete({ slug: params.slug });
    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (error) {
    console.error("DELETE service error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete service",
      },
      { status: 500 }
    );
  }
}
