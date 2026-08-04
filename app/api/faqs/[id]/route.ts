import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import { toFaqDTO } from "@/lib/faqs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** PUT /api/faqs/[id] */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await connectDB();

    const update: Record<string, unknown> = {};
    if (body.question !== undefined) update.question = body.question;
    if (body.answer !== undefined) update.answer = body.answer;
    if (body.category !== undefined) update.category = body.category;
    if (body.published !== undefined) update.published = body.published;
    if (body.order !== undefined) update.order = Number(body.order);

    const faq = await FAQ.findByIdAndUpdate(
      params.id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!faq) {
      return NextResponse.json(
        { success: false, error: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "FAQ saved",
      faq: toFaqDTO(faq.toObject() as unknown as Record<string, unknown>),
    });
  } catch (error) {
    console.error("PUT /api/faqs/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save FAQ",
      },
      { status: 500 }
    );
  }
}

/** DELETE /api/faqs/[id] */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const faq = await FAQ.findByIdAndDelete(params.id);
    if (!faq) {
      return NextResponse.json(
        { success: false, error: "FAQ not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "FAQ deleted" });
  } catch (error) {
    console.error("DELETE /api/faqs/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete FAQ",
      },
      { status: 500 }
    );
  }
}
