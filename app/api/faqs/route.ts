import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import {
  getAllFaqsAdmin,
  getPublishedFaqs,
  toFaqDTO,
} from "@/lib/faqs";
import { FAQS_SEED } from "@/lib/faqs-seed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/faqs?all=1 */
export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "1";
  try {
    const faqs = all ? await getAllFaqsAdmin() : await getPublishedFaqs();
    return NextResponse.json({ success: true, faqs });
  } catch (error) {
    console.error("GET /api/faqs error:", error);
    // Last-resort seed so the public FAQ page never goes blank on Vercel
    const { getSeedFaqs } = await import("@/lib/faqs");
    return NextResponse.json({
      success: true,
      faqs: getSeedFaqs(!all),
      fallback: true,
    });
  }
}

/** POST /api/faqs — create */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();

    if (!body.question || !body.answer) {
      return NextResponse.json(
        { success: false, error: "question and answer are required" },
        { status: 400 }
      );
    }

    const faq = await FAQ.create({
      question: body.question,
      answer: body.answer,
      category: body.category || "General",
      published: body.published !== false,
      order: Number(body.order ?? 99),
    });

    return NextResponse.json({
      success: true,
      faq: toFaqDTO(faq.toObject() as unknown as Record<string, unknown>),
    });
  } catch (error) {
    console.error("POST /api/faqs error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create FAQ",
      },
      { status: 500 }
    );
  }
}

/** PUT /api/faqs?reseed=1 */
export async function PUT(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get("reseed") !== "1") {
      return NextResponse.json(
        { success: false, error: "Use PUT ?reseed=1 to reseed FAQs" },
        { status: 400 }
      );
    }
    await connectDB();
    await FAQ.deleteMany({});
    for (const faq of FAQS_SEED) {
      await FAQ.create(faq);
    }
    return NextResponse.json({
      success: true,
      message: `Reseeded ${FAQS_SEED.length} FAQs`,
      count: FAQS_SEED.length,
    });
  } catch (error) {
    console.error("PUT /api/faqs reseed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Reseed failed",
      },
      { status: 500 }
    );
  }
}
