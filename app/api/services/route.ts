import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import {
  getAllServicesAdmin,
  getPublishedServices,
  toServiceDTO,
} from "@/lib/services";
import { SERVICES_SEED } from "@/lib/services-seed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/services?all=1 for admin (includes unpublished) */
export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "1";
  try {
    const services = all
      ? await getAllServicesAdmin()
      : await getPublishedServices();
    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("GET /api/services error:", error);
    const { getSeedServices } = await import("@/lib/services");
    return NextResponse.json({
      success: true,
      services: getSeedServices(!all),
      fallback: true,
    });
  }
}

/** POST /api/services — create service */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { success: false, error: "title and slug are required" },
        { status: 400 }
      );
    }

    const slug = String(body.slug)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");

    const exists = await Service.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { success: false, error: "A service with this slug already exists" },
        { status: 409 }
      );
    }

    const service = await Service.create({
      title: body.title,
      slug,
      description: body.description || "",
      content: body.content || "",
      benefits: body.benefits || [],
      icon: body.icon || "Wrench",
      image: body.image || "",
      imageAlt: body.imageAlt || "",
      price: body.price || "",
      featured: Boolean(body.featured),
      published: body.published !== false,
      order: Number(body.order || 99),
      category: body.category || "general",
      urgent: Boolean(body.urgent),
      eyebrow: body.eyebrow || "",
      heroImage: body.heroImage || body.image || "",
      heroImageAlt: body.heroImageAlt || "",
      includesHeading: body.includesHeading || "What's Included",
      includesDescription: body.includesDescription || "",
      includes: body.includes || [],
      cardsHeading: body.cardsHeading || "",
      cardsDescription: body.cardsDescription || "",
      cards: body.cards || [],
      whyHeading: body.whyHeading || "",
      whyItems: body.whyItems || [],
      ctaHeading: body.ctaHeading || "",
      ctaDescription: body.ctaDescription || "",
      ctaPrimary: body.ctaPrimary || "Request Free Quote",
      ctaPrimaryLink: body.ctaPrimaryLink || "/contact",
      ctaSecondary: body.ctaSecondary || "Call 647-299-0283",
      ctaSecondaryLink: body.ctaSecondaryLink || "tel:+16472990283",
      videoSrc: body.videoSrc || "",
      videoTitle: body.videoTitle || "",
      videoDescription: body.videoDescription || "",
      videoThumbnail: body.videoThumbnail || "",
      phoneDisplay: body.phoneDisplay || "647-299-0283",
      seo: body.seo || {},
    });

    return NextResponse.json({
      success: true,
      service: toServiceDTO(service.toObject() as unknown as Record<string, unknown>),
    });
  } catch (error) {
    console.error("POST /api/services error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create service",
      },
      { status: 500 }
    );
  }
}

/** PUT /api/services?reseed=1 — wipe and reseed from defaults */
export async function PUT(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get("reseed") !== "1") {
      return NextResponse.json(
        { success: false, error: "Use PUT ?reseed=1 to reseed services" },
        { status: 400 }
      );
    }

    await connectDB();
    await Service.deleteMany({});
    for (const service of SERVICES_SEED) {
      await Service.create(service);
    }

    return NextResponse.json({
      success: true,
      message: `Reseeded ${SERVICES_SEED.length} services`,
      count: SERVICES_SEED.length,
    });
  } catch (error) {
    console.error("PUT /api/services reseed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Reseed failed",
      },
      { status: 500 }
    );
  }
}
