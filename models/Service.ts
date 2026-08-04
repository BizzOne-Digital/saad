import mongoose, { Schema, Document, Model } from "mongoose";

export interface IServiceCard {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  features?: string[];
  badge?: string;
}

export interface IServiceWhyItem {
  title: string;
  description?: string;
}

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  benefits: string[];
  icon?: string;
  image?: string;
  imageAlt?: string;
  price?: string;
  featured: boolean;
  published: boolean;
  order: number;
  category: string;
  urgent: boolean;

  /** Detail page content */
  eyebrow?: string;
  heroImage?: string;
  heroImageAlt?: string;
  includesHeading?: string;
  includesDescription?: string;
  includes: string[];
  cardsHeading?: string;
  cardsDescription?: string;
  cards: IServiceCard[];
  whyHeading?: string;
  whyItems: IServiceWhyItem[];
  ctaHeading?: string;
  ctaDescription?: string;
  ctaPrimary?: string;
  ctaPrimaryLink?: string;
  ctaSecondary?: string;
  ctaSecondaryLink?: string;
  videoSrc?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoThumbnail?: string;
  phoneDisplay?: string;

  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const ServiceCardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    imageAlt: String,
    features: [String],
    badge: String,
  },
  { _id: false }
);

const ServiceWhySchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
  },
  { _id: false }
);

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, default: "" },
    benefits: { type: [String], default: [] },
    icon: { type: String, default: "Wrench" },
    image: String,
    imageAlt: String,
    price: String,
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    category: { type: String, default: "general" },
    urgent: { type: Boolean, default: false },

    eyebrow: String,
    heroImage: String,
    heroImageAlt: String,
    includesHeading: String,
    includesDescription: String,
    includes: { type: [String], default: [] },
    cardsHeading: String,
    cardsDescription: String,
    cards: { type: [ServiceCardSchema], default: [] },
    whyHeading: String,
    whyItems: { type: [ServiceWhySchema], default: [] },
    ctaHeading: String,
    ctaDescription: String,
    ctaPrimary: { type: String, default: "Request Free Quote" },
    ctaPrimaryLink: { type: String, default: "/contact" },
    ctaSecondary: { type: String, default: "Call 647-299-0283" },
    ctaSecondaryLink: { type: String, default: "tel:+16472990283" },
    videoSrc: String,
    videoTitle: String,
    videoDescription: String,
    videoThumbnail: String,
    phoneDisplay: { type: String, default: "647-299-0283" },

    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  { timestamps: true }
);

ServiceSchema.index({ published: 1, order: 1 });

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
