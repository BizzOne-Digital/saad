import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import DoorStyle from "@/models/DoorStyle";
import {
  getAllDoorStylesAdmin,
  getPublishedDoorStyles,
  toDoorStyleDTO,
} from "@/lib/door-styles";
import { DOOR_STYLES_SEED } from "@/lib/door-styles-seed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** GET /api/door-styles?all=1 */
export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "1";
  try {
    const styles = all
      ? await getAllDoorStylesAdmin()
      : await getPublishedDoorStyles();
    return NextResponse.json({ success: true, styles });
  } catch (error) {
    console.error("GET /api/door-styles error:", error);
    const { getSeedDoorStyles } = await import("@/lib/door-styles");
    return NextResponse.json({
      success: true,
      styles: getSeedDoorStyles(!all),
      fallback: true,
    });
  }
}

/** POST /api/door-styles */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();

    if (!body.modelName) {
      return NextResponse.json(
        { success: false, error: "modelName is required" },
        { status: 400 }
      );
    }

    const slug =
      slugify(body.slug || body.modelName) || `door-style-${Date.now()}`;
    const exists = await DoorStyle.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { success: false, error: "A door style with this slug already exists" },
        { status: 409 }
      );
    }

    const style = await DoorStyle.create({
      modelName: body.modelName,
      slug,
      description: body.description || "",
      size: body.size || "",
      colour: body.colour || "",
      windowStyle: body.windowStyle || "",
      material: body.material || "",
      category: body.category || [],
      images: body.images || [],
      featured: Boolean(body.featured),
      published: body.published !== false,
      order: Number(body.order ?? 99),
    });

    return NextResponse.json({
      success: true,
      style: toDoorStyleDTO(
        style.toObject() as unknown as Record<string, unknown>
      ),
    });
  } catch (error) {
    console.error("POST /api/door-styles error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create door style",
      },
      { status: 500 }
    );
  }
}

/** PUT /api/door-styles?reseed=1 */
export async function PUT(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get("reseed") !== "1") {
      return NextResponse.json(
        { success: false, error: "Use PUT ?reseed=1 to reseed door styles" },
        { status: 400 }
      );
    }
    await connectDB();
    await DoorStyle.deleteMany({});
    for (const style of DOOR_STYLES_SEED) {
      await DoorStyle.create(style);
    }
    return NextResponse.json({
      success: true,
      message: `Reseeded ${DOOR_STYLES_SEED.length} door styles`,
      count: DOOR_STYLES_SEED.length,
    });
  } catch (error) {
    console.error("PUT /api/door-styles reseed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Reseed failed",
      },
      { status: 500 }
    );
  }
}
