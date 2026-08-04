import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMediaAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  type: "before" | "after" | "main";
}

export interface IGalleryProject extends Document {
  title: string;
  slug: string;
  city: string;
  description?: string;
  category: string[];
  images: IMediaAsset[];
  beforeImage?: IMediaAsset;
  afterImage?: IMediaAsset;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  width: Number,
  height: Number,
  type: {
    type: String,
    enum: ["before", "after", "main"],
    default: "main",
  },
});

const GalleryProjectSchema = new Schema<IGalleryProject>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: String,
    category: [String],
    images: [MediaAssetSchema],
    beforeImage: MediaAssetSchema,
    afterImage: MediaAssetSchema,
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

GalleryProjectSchema.index({ published: 1, order: 1 });
GalleryProjectSchema.index({ slug: 1 });

const GalleryProject: Model<IGalleryProject> =
  mongoose.models.GalleryProject ||
  mongoose.model<IGalleryProject>("GalleryProject", GalleryProjectSchema);

export default GalleryProject;
