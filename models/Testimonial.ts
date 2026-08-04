import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  customerName: string;
  rating: number;
  reviewText: string;
  city?: string;
  source: string;
  sourceUrl?: string;
  date: Date;
  featured: boolean;
  published: boolean;
  order: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    customerName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: true,
    },
    city: String,
    source: {
      type: String,
      default: "Google",
    },
    sourceUrl: String,
    date: {
      type: Date,
      default: Date.now,
    },
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
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

TestimonialSchema.index({ published: 1, order: 1 });
TestimonialSchema.index({ featured: 1 });

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
