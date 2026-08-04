import connectDB from "@/lib/mongodb";
import Page from "@/models/Page";
import PageSection, { fieldsToObject, type ISectionImage, type ISectionItem } from "@/models/PageSection";
import { PAGE_CONTENT_SEED } from "@/lib/page-content-seed";
import type { PageDTO, SectionDTO } from "@/lib/page-content-types";

export type { PageDTO, SectionDTO } from "@/lib/page-content-types";

function sectionToDTO(section: {
  key: string;
  title: string;
  order: number;
  published: boolean;
  fields: Map<string, string> | Record<string, string>;
  images: ISectionImage[];
  items: ISectionItem[];
}): SectionDTO {
  return {
    key: section.key,
    title: section.title,
    order: section.order,
    published: section.published,
    fields: fieldsToObject(section.fields),
    images: section.images || [],
    items: (section.items || []).map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      text: item.text,
      image: item.image,
      imageAlt: item.imageAlt,
      features: item.features,
      cta: item.cta,
      link: item.link,
      number: item.number,
      city: item.city,
    })),
  };
}

/** Ensure pages/sections exist in MongoDB (idempotent). */
export async function ensurePageContentSeeded() {
  await connectDB();
  const count = await Page.countDocuments();
  if (count > 0) return { seeded: false, count };

  for (const page of PAGE_CONTENT_SEED) {
    await Page.create({
      slug: page.slug,
      name: page.name,
      path: page.path,
      icon: page.icon,
      order: page.order,
      published: true,
      seo: page.seo,
    });

    for (const section of page.sections) {
      await PageSection.create({
        pageSlug: page.slug,
        key: section.key,
        title: section.title,
        order: section.order,
        published: true,
        fields: section.fields,
        images: section.images,
        items: section.items,
      });
    }
  }

  return { seeded: true, count: PAGE_CONTENT_SEED.length };
}

export async function getAllPages(): Promise<PageDTO[]> {
  await connectDB();
  await ensurePageContentSeeded();

  const pages = await Page.find().sort({ order: 1 }).lean();
  const result: PageDTO[] = [];

  for (const page of pages) {
    const sections = await PageSection.find({ pageSlug: page.slug })
      .sort({ order: 1 })
      .lean();

    result.push({
      slug: page.slug,
      name: page.name,
      path: page.path,
      icon: page.icon,
      published: page.published,
      order: page.order,
      seo: page.seo || {},
      sections: sections.map(sectionToDTO),
    });
  }

  return result;
}

export async function getPageBySlug(slug: string): Promise<PageDTO | null> {
  await connectDB();
  await ensurePageContentSeeded();

  const page = await Page.findOne({ slug }).lean();
  if (!page) return null;

  const sections = await PageSection.find({ pageSlug: slug, published: true })
    .sort({ order: 1 })
    .lean();

  return {
    slug: page.slug,
    name: page.name,
    path: page.path,
    icon: page.icon,
    published: page.published,
    order: page.order,
    seo: page.seo || {},
    sections: sections.map(sectionToDTO),
  };
}

export function getSection(
  page: PageDTO | null | undefined,
  key: string
): SectionDTO | null {
  if (!page) return null;
  return page.sections.find((s) => s.key === key) || null;
}

export function field(
  section: SectionDTO | null | undefined,
  key: string,
  fallback = ""
): string {
  if (!section?.fields) return fallback;
  return section.fields[key] ?? fallback;
}

export function sectionImage(
  section: SectionDTO | null | undefined,
  key: string,
  fallbackUrl = "",
  fallbackAlt = ""
): { url: string; alt: string } {
  const img = section?.images?.find((i) => i.key === key);
  return {
    url: img?.url || fallbackUrl,
    alt: img?.alt || fallbackAlt,
  };
}
