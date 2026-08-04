import connectDB from "@/lib/mongodb";
import DoorStyle from "@/models/DoorStyle";
import {
  DOOR_STYLES_SEED,
  type DoorStyleDTO,
  type DoorStyleImageDTO,
} from "@/lib/door-styles-seed";

export type { DoorStyleDTO, DoorStyleImageDTO } from "@/lib/door-styles-seed";
export {
  DOOR_STYLE_CATEGORIES,
  primaryDoorStyleImage,
} from "@/lib/door-styles-seed";

function toImage(img: unknown): DoorStyleImageDTO | undefined {
  if (!img || typeof img !== "object") return undefined;
  const o = img as Record<string, unknown>;
  if (!o.url) return undefined;
  return {
    url: String(o.url),
    alt: String(o.alt || ""),
  };
}

export function toDoorStyleDTO(doc: Record<string, unknown>): DoorStyleDTO {
  const images = Array.isArray(doc.images)
    ? (doc.images as unknown[])
        .map(toImage)
        .filter((i): i is DoorStyleImageDTO => Boolean(i))
    : [];

  return {
    _id: String(doc._id),
    modelName: String(doc.modelName || ""),
    slug: String(doc.slug || ""),
    description: doc.description ? String(doc.description) : "",
    size: String(doc.size || ""),
    colour: String(doc.colour || ""),
    windowStyle: String(doc.windowStyle || ""),
    material: doc.material ? String(doc.material) : "",
    category: Array.isArray(doc.category) ? (doc.category as string[]) : [],
    images,
    featured: Boolean(doc.featured),
    published: Boolean(doc.published),
    order: Number(doc.order || 0),
  };
}

export function getSeedDoorStyles(publishedOnly = true): DoorStyleDTO[] {
  return DOOR_STYLES_SEED.filter((s) => !publishedOnly || s.published).map(
    (s, i) => ({
      ...s,
      _id: `seed-door-style-${i + 1}`,
    })
  );
}

export async function ensureDoorStylesSeeded() {
  await connectDB();
  const count = await DoorStyle.countDocuments();

  if (count === 0) {
    for (const style of DOOR_STYLES_SEED) {
      await DoorStyle.create(style);
    }
    return { seeded: true, count: DOOR_STYLES_SEED.length };
  }

  for (const seed of DOOR_STYLES_SEED) {
    const exists = await DoorStyle.findOne({ slug: seed.slug });
    if (!exists) {
      await DoorStyle.create(seed);
    } else if (!exists.images?.length && seed.images?.length) {
      await DoorStyle.updateOne(
        { slug: seed.slug },
        {
          $set: {
            images: seed.images,
            size: seed.size,
            colour: seed.colour,
            windowStyle: seed.windowStyle,
            material: seed.material,
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

export async function getPublishedDoorStyles(): Promise<DoorStyleDTO[]> {
  try {
    await connectDB();
    await ensureDoorStylesSeeded();
    const docs = await DoorStyle.find({ published: true })
      .sort({ order: 1 })
      .lean();
    if (!docs.length) return getSeedDoorStyles(true);
    return docs.map((d) =>
      toDoorStyleDTO(d as unknown as Record<string, unknown>)
    );
  } catch (error) {
    console.error("getPublishedDoorStyles DB error — seed fallback:", error);
    return getSeedDoorStyles(true);
  }
}

export async function getAllDoorStylesAdmin(): Promise<DoorStyleDTO[]> {
  try {
    await connectDB();
    await ensureDoorStylesSeeded();
    const docs = await DoorStyle.find().sort({ order: 1 }).lean();
    if (!docs.length) return getSeedDoorStyles(false);
    return docs.map((d) =>
      toDoorStyleDTO(d as unknown as Record<string, unknown>)
    );
  } catch (error) {
    console.error("getAllDoorStylesAdmin DB error — seed fallback:", error);
    return getSeedDoorStyles(false);
  }
}
