import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Page from "@/models/Page";
import PageSection from "@/models/PageSection";
import { PAGE_CONTENT_SEED } from "@/lib/page-content-seed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/seed-pages
 * Force re-seed page content from defaults.
 * Query: ?wipe=true to delete existing pages/sections first.
 */
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const wipe = searchParams.get("wipe") === "true";

    await connectDB();

    if (wipe) {
      await PageSection.deleteMany({});
      await Page.deleteMany({});
    }

    let createdPages = 0;
    let createdSections = 0;
    let skipped = 0;

    for (const page of PAGE_CONTENT_SEED) {
      const existing = await Page.findOne({ slug: page.slug });
      if (existing && !wipe) {
        skipped += 1;
        continue;
      }

      if (!existing) {
        await Page.create({
          slug: page.slug,
          name: page.name,
          path: page.path,
          icon: page.icon,
          order: page.order,
          published: true,
          seo: page.seo,
        });
        createdPages += 1;
      }

      for (const section of page.sections) {
        const existingSection = await PageSection.findOne({
          pageSlug: page.slug,
          key: section.key,
        });

        if (existingSection && !wipe) {
          skipped += 1;
          continue;
        }

        if (existingSection && wipe) {
          // wiped already
        }

        await PageSection.findOneAndUpdate(
          { pageSlug: page.slug, key: section.key },
          {
            pageSlug: page.slug,
            key: section.key,
            title: section.title,
            order: section.order,
            published: true,
            fields: section.fields,
            images: section.images,
            items: section.items,
          },
          { upsert: true, new: true }
        );
        createdSections += 1;
      }
    }

    return NextResponse.json({
      success: true,
      message: wipe
        ? "Pages and sections wiped and re-seeded"
        : "Missing pages/sections seeded",
      createdPages,
      createdSections,
      skipped,
    });
  } catch (error) {
    console.error("seed-pages error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Seed failed",
      },
      { status: 500 }
    );
  }
}
