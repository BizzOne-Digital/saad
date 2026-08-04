import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRedirect extends Document {
  oldPath: string;
  newPath: string;
  redirectType: 301 | 302 | 307 | 308;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RedirectSchema = new Schema<IRedirect>(
  {
    oldPath: {
      type: String,
      required: true,
      unique: true,
    },
    newPath: {
      type: String,
      required: true,
    },
    redirectType: {
      type: Number,
      enum: [301, 302, 307, 308],
      default: 301,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

RedirectSchema.index({ oldPath: 1 });
RedirectSchema.index({ enabled: 1 });

const Redirect: Model<IRedirect> =
  mongoose.models.Redirect ||
  mongoose.model<IRedirect>("Redirect", RedirectSchema);

export default Redirect;
