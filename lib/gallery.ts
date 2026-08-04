import connectDB from "@/lib/mongodb";
import GalleryProject from "@/models/GalleryProject";
import {
  GALLERY_SEED,
  type GalleryProjectDTO,
  type GalleryImageDTO,
} from "@/lib/gallery-seed";

export type { GalleryProjectDTO, GalleryImageDTO } from "@/lib/gallery-seed";
export { primaryImageUrl } from "@/lib/gallery-seed";

function toImage(img: unknown): GalleryImageDTO | undefined {
  if (!img || typeof img !== "object") return undefined;
  const o = img as Record<string, unknown>;
  if (!o.url) return undefined;
  return {
    url: String(o.url),
    alt: String(o.alt || ""),
    type: (o.type as GalleryImageDTO["type"]) || "main",
  };
}

export function toGalleryDTO(doc: Record<string, unknown>): GalleryProjectDTO {
  const images = Array.isArray(doc.images)
    ? (doc.images as unknown[])
        .map(toImage)
        .filter((i): i is GalleryImageDTO => Boolean(i))
    : [];

  return {
    _id: String(doc._id),
    title: String(doc.title || ""),
    slug: String(doc.slug || ""),
    city: String(doc.city || ""),
    description: doc.description ? String(doc.description) : "",
    category: Array.isArray(doc.category) ? (doc.category as string[]) : [],
    images,
    beforeImage: toImage(doc.beforeImage),
    afterImage: toImage(doc.afterImage),
    featured: Boolean(doc.featured),
    published: Boolean(doc.published),
    order: Number(doc.order || 0),
  };
}

export async function ensureGallerySeeded() {
  await connectDB();
  const count = await GalleryProject.countDocuments();

  if (count === 0) {
    for (const project of GALLERY_SEED) {
      await GalleryProject.create(project);
    }
    return { seeded: true, count: GALLERY_SEED.length };
  }

  const empty = await GalleryProject.countDocuments({
    $or: [{ images: { $size: 0 } }, { images: { $exists: false } }],
  });
  if (empty > 0 && count <= 3) {
    await GalleryProject.deleteMany({});
    for (const project of GALLERY_SEED) {
      await GalleryProject.create(project);
    }
    return { seeded: true, count: GALLERY_SEED.length, upgraded: true };
  }

  for (const seed of GALLERY_SEED) {
    const exists = await GalleryProject.findOne({ slug: seed.slug });
    if (!exists) {
      await GalleryProject.create(seed);
    } else if (!exists.images?.length && seed.images?.length) {
      await GalleryProject.updateOne(
        { slug: seed.slug },
        {
          $set: {
            images: seed.images,
            beforeImage: seed.beforeImage,
            afterImage: seed.afterImage,
            description: seed.description,
            category: seed.category,
            featured: seed.featured,
            order: seed.order,
          },
        }
      );
    }
  }

  return { seeded: false, count };
}

/** Static seed (works when MongoDB is unreachable on Vercel). */
export function getSeedGallery(publishedOnly = true): GalleryProjectDTO[] {
  return GALLERY_SEED.filter((p) => !publishedOnly || p.published).map(
    (p, i) => ({
      ...p,
      _id: `seed-gallery-${i + 1}`,
    })
  );
}

export async function getPublishedGallery(): Promise<GalleryProjectDTO[]> {
  try {
    await connectDB();
    await ensureGallerySeeded();
    const docs = await GalleryProject.find({ published: true })
      .sort({ order: 1 })
      .lean();
    if (!docs.length) return getSeedGallery(true);
    return docs.map((d) =>
      toGalleryDTO(d as unknown as Record<string, unknown>)
    );
  } catch (error) {
    console.error("getPublishedGallery DB error — using seed fallback:", error);
    return getSeedGallery(true);
  }
}

export async function getAllGalleryAdmin(): Promise<GalleryProjectDTO[]> {
  try {
    await connectDB();
    await ensureGallerySeeded();
    const docs = await GalleryProject.find().sort({ order: 1 }).lean();
    if (!docs.length) return getSeedGallery(false);
    return docs.map((d) =>
      toGalleryDTO(d as unknown as Record<string, unknown>)
    );
  } catch (error) {
    console.error("getAllGalleryAdmin DB error — using seed fallback:", error);
    return getSeedGallery(false);
  }
}

export async function getFeaturedGallery(
  limit = 6
): Promise<GalleryProjectDTO[]> {
  try {
    await connectDB();
    await ensureGallerySeeded();
    const docs = await GalleryProject.find({ published: true, featured: true })
      .sort({ order: 1 })
      .limit(limit)
      .lean();
    if (docs.length) {
      return docs.map((d) =>
        toGalleryDTO(d as unknown as Record<string, unknown>)
      );
    }
    const fallback = await GalleryProject.find({ published: true })
      .sort({ order: 1 })
      .limit(limit)
      .lean();
    if (fallback.length) {
      return fallback.map((d) =>
        toGalleryDTO(d as unknown as Record<string, unknown>)
      );
    }
    return getSeedGallery(true).slice(0, limit);
  } catch (error) {
    console.error("getFeaturedGallery DB error — using seed fallback:", error);
    return getSeedGallery(true).slice(0, limit);
  }
}
