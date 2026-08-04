import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISectionImage {
  key: string;
  url: string;
  alt: string;
}

export interface ISectionItem {
  id?: string;
  title?: string;
  description?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  features?: string[];
  cta?: string;
  link?: string;
  number?: string;
  city?: string;
  extra?: Record<string, string>;
}

export interface IPageSection extends Document {
  pageSlug: string;
  key: string;
  title: string;
  order: number;
  published: boolean;
  /** Editable text fields: eyebrow, heading, description, ctaPrimary, etc. */
  fields: Map<string, string> | Record<string, string>;
  images: ISectionImage[];
  /** Repeatable cards/steps/list items within the section */
  items: ISectionItem[];
  createdAt: Date;
  updatedAt: Date;
}

const SectionImageSchema = new Schema<ISectionImage>(
  {
    key: { type: String, required: true },
    url: { type: String, required: true },
    alt: { type: String, default: "" },
  },
  { _id: false }
);

const SectionItemSchema = new Schema(
  {
    id: String,
    title: String,
    description: String,
    text: String,
    image: String,
    imageAlt: String,
    features: [String],
    cta: String,
    link: String,
    number: String,
    city: String,
    extra: { type: Map, of: String },
  },
  { _id: true }
);

const PageSectionSchema = new Schema<IPageSection>(
  {
    pageSlug: { type: String, required: true, index: true },
    key: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    fields: { type: Map, of: String, default: {} },
    images: { type: [SectionImageSchema], default: [] },
    items: { type: [SectionItemSchema], default: [] },
  },
  { timestamps: true }
);

PageSectionSchema.index({ pageSlug: 1, key: 1 }, { unique: true });
PageSectionSchema.index({ pageSlug: 1, order: 1 });

const PageSection: Model<IPageSection> =
  mongoose.models.PageSection ||
  mongoose.model<IPageSection>("PageSection", PageSectionSchema);

export default PageSection;

/** Normalize Map/Object fields to a plain object for JSON/API */
export function fieldsToObject(
  fields: Map<string, string> | Record<string, string> | undefined
): Record<string, string> {
  if (!fields) return {};
  if (fields instanceof Map) {
    return Object.fromEntries(fields.entries());
  }
  return { ...fields };
}
