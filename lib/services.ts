import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { SERVICES_SEED } from "@/lib/services-seed";
import type { ServiceDTO } from "@/lib/service-types";

export type { ServiceDTO } from "@/lib/service-types";

export function toServiceDTO(doc: Record<string, unknown>): ServiceDTO {
  return {
    _id: String(doc._id),
    title: String(doc.title || ""),
    slug: String(doc.slug || ""),
    description: String(doc.description || ""),
    content: String(doc.content || ""),
    benefits: (doc.benefits as string[]) || [],
    icon: doc.icon as string | undefined,
    image: doc.image as string | undefined,
    imageAlt: doc.imageAlt as string | undefined,
    price: doc.price as string | undefined,
    featured: Boolean(doc.featured),
    published: Boolean(doc.published),
    order: Number(doc.order || 0),
    category: String(doc.category || "general"),
    urgent: Boolean(doc.urgent),
    eyebrow: doc.eyebrow as string | undefined,
    heroImage: doc.heroImage as string | undefined,
    heroImageAlt: doc.heroImageAlt as string | undefined,
    includesHeading: doc.includesHeading as string | undefined,
    includesDescription: doc.includesDescription as string | undefined,
    includes: (doc.includes as string[]) || [],
    cardsHeading: doc.cardsHeading as string | undefined,
    cardsDescription: doc.cardsDescription as string | undefined,
    cards: (doc.cards as ServiceDTO["cards"]) || [],
    whyHeading: doc.whyHeading as string | undefined,
    whyItems: (doc.whyItems as ServiceDTO["whyItems"]) || [],
    ctaHeading: doc.ctaHeading as string | undefined,
    ctaDescription: doc.ctaDescription as string | undefined,
    ctaPrimary: doc.ctaPrimary as string | undefined,
    ctaPrimaryLink: doc.ctaPrimaryLink as string | undefined,
    ctaSecondary: doc.ctaSecondary as string | undefined,
    ctaSecondaryLink: doc.ctaSecondaryLink as string | undefined,
    videoSrc: doc.videoSrc as string | undefined,
    videoTitle: doc.videoTitle as string | undefined,
    videoDescription: doc.videoDescription as string | undefined,
    videoThumbnail: doc.videoThumbnail as string | undefined,
    phoneDisplay: doc.phoneDisplay as string | undefined,
    seo: (doc.seo as ServiceDTO["seo"]) || {},
  };
}

export async function ensureServicesSeeded() {
  await connectDB();
  const count = await Service.countDocuments();

  if (count === 0) {
    for (const service of SERVICES_SEED) {
      await Service.create(service);
    }
    return { seeded: true, count: SERVICES_SEED.length };
  }

  // Enrich older seed records that lack detail-page fields
  for (const seed of SERVICES_SEED) {
    const existing = await Service.findOne({ slug: seed.slug }).lean();
    if (!existing) {
      await Service.create(seed);
      continue;
    }
    const includes = (existing as { includes?: string[] }).includes;
    if (!includes || includes.length === 0) {
      await Service.updateOne(
        { slug: seed.slug },
        {
          $set: {
            eyebrow: seed.eyebrow,
            heroImage: seed.heroImage,
            heroImageAlt: seed.heroImageAlt,
            includesHeading: seed.includesHeading,
            includesDescription: seed.includesDescription,
            includes: seed.includes,
            cardsHeading: seed.cardsHeading,
            cardsDescription: seed.cardsDescription,
            cards: seed.cards,
            whyHeading: seed.whyHeading,
            whyItems: seed.whyItems,
            ctaHeading: seed.ctaHeading,
            ctaDescription: seed.ctaDescription,
            ctaPrimary: seed.ctaPrimary,
            ctaPrimaryLink: seed.ctaPrimaryLink,
            ctaSecondary: seed.ctaSecondary,
            ctaSecondaryLink: seed.ctaSecondaryLink,
            videoSrc: seed.videoSrc,
            videoTitle: seed.videoTitle,
            videoDescription: seed.videoDescription,
            videoThumbnail: seed.videoThumbnail,
            phoneDisplay: seed.phoneDisplay,
            image: seed.image,
            imageAlt: seed.imageAlt,
            icon: seed.icon,
            urgent: seed.urgent,
            seo: seed.seo,
          },
        }
      );
    }
  }

  return { seeded: false, count };
}

/** Static seed (works when MongoDB is unreachable on Vercel). */
export function getSeedServices(publishedOnly = true): ServiceDTO[] {
  return SERVICES_SEED.filter((s) => !publishedOnly || s.published).map(
    (s, i) => ({
      ...s,
      _id: `seed-service-${i + 1}`,
    })
  );
}

export async function getPublishedServices(): Promise<ServiceDTO[]> {
  try {
    await connectDB();
    await ensureServicesSeeded();
    const docs = await Service.find({ published: true })
      .sort({ order: 1 })
      .lean();
    if (!docs.length) return getSeedServices(true);
    return docs.map((d) =>
      toServiceDTO(d as unknown as Record<string, unknown>)
    );
  } catch (error) {
    console.error("getPublishedServices DB error — using seed fallback:", error);
    return getSeedServices(true);
  }
}

export async function getAllServicesAdmin(): Promise<ServiceDTO[]> {
  try {
    await connectDB();
    await ensureServicesSeeded();
    const docs = await Service.find().sort({ order: 1 }).lean();
    if (!docs.length) return getSeedServices(false);
    return docs.map((d) =>
      toServiceDTO(d as unknown as Record<string, unknown>)
    );
  } catch (error) {
    console.error("getAllServicesAdmin DB error — using seed fallback:", error);
    return getSeedServices(false);
  }
}

export async function getServiceBySlug(
  slug: string,
  opts?: { publishedOnly?: boolean }
): Promise<ServiceDTO | null> {
  try {
    await connectDB();
    await ensureServicesSeeded();
    const query: Record<string, unknown> = { slug };
    if (opts?.publishedOnly !== false) query.published = true;
    const doc = await Service.findOne(query).lean();
    if (doc) return toServiceDTO(doc as unknown as Record<string, unknown>);
  } catch (error) {
    console.error("getServiceBySlug DB error — using seed fallback:", error);
  }

  const fromSeed = getSeedServices(opts?.publishedOnly !== false).find(
    (s) => s.slug === slug
  );
  return fromSeed || null;
}
