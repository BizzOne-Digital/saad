import connectDB from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import { FAQS_SEED, type FaqDTO } from "@/lib/faqs-seed";

export type { FaqDTO } from "@/lib/faqs-seed";

export function toFaqDTO(doc: Record<string, unknown>): FaqDTO {
  return {
    _id: String(doc._id),
    question: String(doc.question || ""),
    answer: String(doc.answer || ""),
    category: String(doc.category || "General"),
    published: Boolean(doc.published),
    order: Number(doc.order || 0),
  };
}

/** Static seed as FaqDTO (works when MongoDB is unreachable on Vercel). */
export function getSeedFaqs(publishedOnly = true): FaqDTO[] {
  return FAQS_SEED.filter((f) => !publishedOnly || f.published).map(
    (f, i) => ({
      ...f,
      _id: `seed-faq-${i + 1}`,
    })
  );
}

export async function ensureFaqsSeeded() {
  await connectDB();
  const count = await FAQ.countDocuments();
  if (count === 0) {
    for (const faq of FAQS_SEED) {
      await FAQ.create(faq);
    }
    return { seeded: true, count: FAQS_SEED.length };
  }

  // If only the old 3 seed FAQs exist, replace with full set
  if (count <= 3) {
    await FAQ.deleteMany({});
    for (const faq of FAQS_SEED) {
      await FAQ.create(faq);
    }
    return { seeded: true, count: FAQS_SEED.length, upgraded: true };
  }

  return { seeded: false, count };
}

export async function getPublishedFaqs(): Promise<FaqDTO[]> {
  try {
    await connectDB();
    await ensureFaqsSeeded();
    const docs = await FAQ.find({ published: true }).sort({ order: 1 }).lean();
    if (!docs.length) return getSeedFaqs(true);
    return docs.map((d) => toFaqDTO(d as unknown as Record<string, unknown>));
  } catch (error) {
    console.error("getPublishedFaqs DB error — using seed fallback:", error);
    return getSeedFaqs(true);
  }
}

export async function getAllFaqsAdmin(): Promise<FaqDTO[]> {
  try {
    await connectDB();
    await ensureFaqsSeeded();
    const docs = await FAQ.find().sort({ order: 1, category: 1 }).lean();
    if (!docs.length) return getSeedFaqs(false);
    return docs.map((d) => toFaqDTO(d as unknown as Record<string, unknown>));
  } catch (error) {
    console.error("getAllFaqsAdmin DB error — using seed fallback:", error);
    return getSeedFaqs(false);
  }
}

export function groupFaqsByCategory(faqs: FaqDTO[]) {
  const map = new Map<string, FaqDTO[]>();
  for (const faq of faqs) {
    const list = map.get(faq.category) || [];
    list.push(faq);
    map.set(faq.category, list);
  }
  return Array.from(map.entries()).map(([category, questions]) => ({
    category,
    questions,
  }));
}
