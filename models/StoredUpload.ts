import mongoose, { Schema, Document, Model } from "mongoose";
import {
  UPLOAD_FOLDERS,
  type UploadFolder,
} from "@/lib/upload/folders";

export type { UploadFolder };
export { UPLOAD_FOLDERS };

export interface IStoredUpload extends Document {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const StoredUploadSchema = new Schema<IStoredUpload>(
  {
    folder: {
      type: String,
      required: true,
      enum: UPLOAD_FOLDERS,
      index: true,
    },
    filename: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    data: {
      type: Buffer,
      required: true,
    },
  },
  { timestamps: true }
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

const StoredUpload: Model<IStoredUpload> =
  mongoose.models.StoredUpload ||
  mongoose.model<IStoredUpload>("StoredUpload", StoredUploadSchema);

export default StoredUpload;
