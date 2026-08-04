import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDoorStyleImage {
  url: string;
  alt: string;
}

export interface IDoorStyle extends Document {
  modelName: string;
  slug: string;
  description?: string;
  size: string;
  colour: string;
  windowStyle: string;
  material?: string;
  category: string[];
  images: IDoorStyleImage[];
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const DoorStyleImageSchema = new Schema<IDoorStyleImage>(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true, default: "" },
  },
  { _id: false }
);

const DoorStyleSchema = new Schema<IDoorStyle>(
  {
    modelName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    size: { type: String, default: "" },
    colour: { type: String, default: "" },
    windowStyle: { type: String, default: "" },
    material: { type: String, default: "" },
    category: { type: [String], default: [] },
    images: { type: [DoorStyleImageSchema], default: [] },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 99 },
  },
  { timestamps: true }
);

DoorStyleSchema.index({ published: 1, order: 1 });

const DoorStyle: Model<IDoorStyle> =
  mongoose.models.DoorStyle ||
  mongoose.model<IDoorStyle>("DoorStyle", DoorStyleSchema);

export default DoorStyle;
