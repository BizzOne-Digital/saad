import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryProject from "@/models/GalleryProject";
import { toGalleryDTO } from "@/lib/gallery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** PUT /api/gallery/[id] */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await connectDB();

    const update: Record<string, unknown> = {};
    if (body.title !== undefined) update.title = body.title;
    if (body.city !== undefined) update.city = body.city;
    if (body.description !== undefined) update.description = body.description;
    if (body.category !== undefined) update.category = body.category;
    if (body.images !== undefined) update.images = body.images;
    if (body.beforeImage !== undefined) update.beforeImage = body.beforeImage;
    if (body.afterImage !== undefined) update.afterImage = body.afterImage;
    if (body.featured !== undefined) update.featured = body.featured;
    if (body.published !== undefined) update.published = body.published;
    if (body.order !== undefined) update.order = Number(body.order);

    if (body.slug !== undefined) {
      const newSlug = slugify(body.slug);
      const clash = await GalleryProject.findOne({
        slug: newSlug,
        _id: { $ne: params.id },
      });
      if (clash) {
        return NextResponse.json(
          { success: false, error: "Slug already in use" },
          { status: 409 }
        );
      }
      update.slug = newSlug;
    }

    const project = await GalleryProject.findByIdAndUpdate(
      params.id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gallery project saved",
      project: toGalleryDTO(project.toObject() as unknown as Record<string, unknown>),
    });
  } catch (error) {
    console.error("PUT /api/gallery/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save project",
      },
      { status: 500 }
    );
  }
}

/** DELETE /api/gallery/[id] */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const project = await GalleryProject.findByIdAndDelete(params.id);
    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error("DELETE /api/gallery/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete project",
      },
      { status: 500 }
    );
  }
}
