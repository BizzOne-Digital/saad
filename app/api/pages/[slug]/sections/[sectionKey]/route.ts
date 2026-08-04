import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PageSection, { fieldsToObject } from "@/models/PageSection";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/pages/[slug]/sections/[sectionKey] */
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string; sectionKey: string } }
) {
  try {
    await connectDB();

    const section = await PageSection.findOne({
      pageSlug: params.slug,
      key: params.sectionKey,
    }).lean();

    if (!section) {
      return NextResponse.json(
        { success: false, error: "Section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      section: {
        ...section,
        fields: fieldsToObject(section.fields),
      },
    });
  } catch (error) {
    console.error("GET section error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to load section",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/pages/[slug]/sections/[sectionKey]
 * Body: { fields?, images?, items?, title?, published?, order? }
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string; sectionKey: string } }
) {
  try {
    const body = await req.json();
    await connectDB();

    const update: Record<string, unknown> = {};
    if (body.title !== undefined) update.title = body.title;
    if (body.published !== undefined) update.published = body.published;
    if (body.order !== undefined) update.order = body.order;
    if (body.fields !== undefined) update.fields = body.fields;
    if (body.images !== undefined) update.images = body.images;
    if (body.items !== undefined) update.items = body.items;

    const section = await PageSection.findOneAndUpdate(
      { pageSlug: params.slug, key: params.sectionKey },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!section) {
      return NextResponse.json(
        { success: false, error: "Section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Section saved",
      section: {
        key: section.key,
        title: section.title,
        order: section.order,
        published: section.published,
        fields: fieldsToObject(section.fields),
        images: section.images,
        items: section.items,
      },
    });
  } catch (error) {
    console.error("PUT section error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save section",
      },
      { status: 500 }
    );
  }
}
