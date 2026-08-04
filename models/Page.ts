import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPageSeo {
  title?: string;
  description?: string;
  ogImage?: string;
}

export interface IPage extends Document {
  slug: string;
  name: string;
  path: string;
  icon: string;
  published: boolean;
  order: number;
  seo: IPageSeo;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<IPage>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
    icon: { type: String, default: "📄" },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    seo: {
      title: String,
      description: String,
      ogImage: String,
    },
  },
  { timestamps: true }
);

const Page: Model<IPage> =
  mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);

export default Page;
