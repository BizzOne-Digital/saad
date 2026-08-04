import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryProject from "@/models/GalleryProject";
import {
  getAllGalleryAdmin,
  getFeaturedGallery,
  getPublishedGallery,
  toGalleryDTO,
} from "@/lib/gallery";
import { GALLERY_SEED } from "@/lib/gallery-seed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** GET /api/gallery?all=1&featured=1 */
export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "1";
  const featured = req.nextUrl.searchParams.get("featured") === "1";
  try {
    if (featured && !all) {
      const projects = await getFeaturedGallery(12);
      return NextResponse.json({ success: true, projects });
    }

    const projects = all
      ? await getAllGalleryAdmin()
      : await getPublishedGallery();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    const { getSeedGallery } = await import("@/lib/gallery");
    let projects = getSeedGallery(!all);
    if (featured && !all) {
      projects = projects.filter((p) => p.featured);
    }
    return NextResponse.json({ success: true, projects, fallback: true });
  }
}

/** POST /api/gallery — create project */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();

    if (!body.title || !body.city) {
      return NextResponse.json(
        { success: false, error: "title and city are required" },
        { status: 400 }
      );
    }

    const slug =
      slugify(body.slug || body.title) || `project-${Date.now()}`;
    const exists = await GalleryProject.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists" },
        { status: 409 }
      );
    }

    const project = await GalleryProject.create({
      title: body.title,
      slug,
      city: body.city,
      description: body.description || "",
      category: body.category || ["installations"],
      images: body.images || [],
      beforeImage: body.beforeImage || undefined,
      afterImage: body.afterImage || undefined,
      featured: Boolean(body.featured),
      published: body.published !== false,
      order: Number(body.order ?? 99),
    });

    return NextResponse.json({
      success: true,
      project: toGalleryDTO(project.toObject() as unknown as Record<string, unknown>),
    });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create project",
      },
      { status: 500 }
    );
  }
}

/** PUT /api/gallery?reseed=1 */
export async function PUT(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get("reseed") !== "1") {
      return NextResponse.json(
        { success: false, error: "Use PUT ?reseed=1 to reseed gallery" },
        { status: 400 }
      );
    }
    await connectDB();
    await GalleryProject.deleteMany({});
    for (const project of GALLERY_SEED) {
      await GalleryProject.create(project);
    }
    return NextResponse.json({
      success: true,
      message: `Reseeded ${GALLERY_SEED.length} gallery projects`,
      count: GALLERY_SEED.length,
    });
  } catch (error) {
    console.error("PUT /api/gallery reseed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Reseed failed",
      },
      { status: 500 }
    );
  }
}
