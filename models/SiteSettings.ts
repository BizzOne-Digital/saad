import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  businessName: string;
  phone: string;
  smsNumber: string;
  publicEmail: string;
  businessEmail: string;
  serviceArea: string;
  hours: {
    days: string;
    time: string;
  };
  address?: string;
  logo?: string;
  favicon?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  googleReviewUrl?: string;
  googlePlaceId?: string;
  emergencyServiceEnabled: boolean;
  seoDefaults: {
    title: string;
    description: string;
    ogImage?: string;
  };
  analytics: {
    gaId?: string;
    gscVerification?: string;
  };
  smtp: {
    notificationEmail: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: {
      type: String,
      required: true,
      default: "Soro Garage Door Services",
    },
    phone: {
      type: String,
      required: true,
      default: "647-299-0283",
    },
    smsNumber: {
      type: String,
      required: true,
      default: "647-299-0283",
    },
    publicEmail: {
      type: String,
      required: true,
      default: "info@sorogaragedoors.ca",
    },
    businessEmail: {
      type: String,
      required: true,
      default: "info@sorogaragedoors.ca",
    },
    serviceArea: {
      type: String,
      default: "Greater Toronto Area",
    },
    hours: {
      days: {
        type: String,
        default: "Monday–Sunday",
      },
      time: {
        type: String,
        default: "8:00 AM–8:00 PM",
      },
    },
    address: String,
    logo: String,
    favicon: String,
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
      youtube: String,
    },
    googleReviewUrl: String,
    googlePlaceId: String,
    emergencyServiceEnabled: {
      type: Boolean,
      default: true,
    },
    seoDefaults: {
      title: {
        type: String,
        default: "Soro Garage Door Services | GTA Repair & Installation",
      },
      description: {
        type: String,
        default: "Professional garage door repair and installation across the Greater Toronto Area. Same-day service available.",
      },
      ogImage: String,
    },
    analytics: {
      gaId: String,
      gscVerification: String,
    },
    smtp: {
      notificationEmail: {
        type: String,
        default: "info@sorogaragedoors.ca",
      },
    },
  },
  {
    timestamps: true,
  }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
