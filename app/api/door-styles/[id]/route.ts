import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import DoorStyle from "@/models/DoorStyle";
import { toDoorStyleDTO } from "@/lib/door-styles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** PUT /api/door-styles/[id] */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await connectDB();

    const update: Record<string, unknown> = {};
    const fields = [
      "modelName",
      "description",
      "size",
      "colour",
      "windowStyle",
      "material",
      "category",
      "images",
      "featured",
      "published",
      "order",
    ] as const;

    for (const key of fields) {
      if (body[key] !== undefined) update[key] = body[key];
    }

    if (body.slug !== undefined) {
      update.slug = slugify(String(body.slug));
    } else if (body.modelName) {
      // keep existing slug unless explicitly changed
    }

    const style = await DoorStyle.findByIdAndUpdate(
      params.id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!style) {
      return NextResponse.json(
        { success: false, error: "Door style not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Door style saved",
      style: toDoorStyleDTO(
        style.toObject() as unknown as Record<string, unknown>
      ),
    });
  } catch (error) {
    console.error("PUT /api/door-styles/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to save door style",
      },
      { status: 500 }
    );
  }
}

/** DELETE /api/door-styles/[id] */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const result = await DoorStyle.findByIdAndDelete(params.id);
    if (!result) {
      return NextResponse.json(
        { success: false, error: "Door style not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Door style deleted" });
  } catch (error) {
    console.error("DELETE /api/door-styles/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete door style",
      },
      { status: 500 }
    );
  }
}
