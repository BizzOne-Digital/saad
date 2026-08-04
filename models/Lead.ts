import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  fullName: string;
  phone: string;
  email: string;
  serviceAddress: string;
  city: string;
  postalCode: string;
  serviceRequired: string;
  propertyType: "residential" | "commercial";
  preferredContact: "phone" | "email" | "text";
  preferredDate?: Date;
  urgency: "routine" | "urgent" | "emergency";
  message?: string;
  status: "new" | "contacted" | "estimate_scheduled" | "quoted" | "won" | "lost" | "completed";
  notes?: string;
  isSpam: boolean;
  source: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    serviceAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    serviceRequired: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["residential", "commercial"],
      default: "residential",
    },
    preferredContact: {
      type: String,
      enum: ["phone", "email", "text"],
      default: "phone",
    },
    preferredDate: Date,
    urgency: {
      type: String,
      enum: ["routine", "urgent", "emergency"],
      default: "routine",
    },
    message: String,
    status: {
      type: String,
      enum: ["new", "contacted", "estimate_scheduled", "quoted", "won", "lost", "completed"],
      default: "new",
    },
    notes: String,
    isSpam: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      default: "website",
    },
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ email: 1 });
LeadSchema.index({ phone: 1 });

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
