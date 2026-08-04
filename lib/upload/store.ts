import { randomBytes } from "crypto";
import connectDB from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import {
  UPLOAD_FOLDERS,
  type UploadFolder,
} from "@/lib/upload/folders";

export type { UploadFolder };
export { UPLOAD_FOLDERS };

export const MAX_UPLOAD_BYTES = Math.floor(4.5 * 1024 * 1024); // 4.5MB Vercel-safe

const ALLOWED_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

export function parseUploadUrl(
  url: string
): { folder: UploadFolder; filename: string } | null {
  if (!url || typeof url !== "string") return null;
  const match = url.match(/^\/api\/uploads\/([^/]+)\/([^/]+)$/);
  if (!match) return null;
  const folder = match[1];
  const filename = match[2];
  if (!isUploadFolder(folder)) return null;
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return null;
  }
  return { folder, filename };
}

function sanitizeFilenameBase(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "image";
}

function extensionFor(file: File): string {
  const fromMime = ALLOWED_MIME[file.type];
  if (fromMime) return fromMime;
  const ext = file.name.includes(".")
    ? `.${file.name.split(".").pop()!.toLowerCase()}`
    : "";
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) {
    return ext === ".jpeg" ? ".jpg" : ext;
  }
  return ".jpg";
}

export type SaveUploadResult = {
  success: true;
  url: string;
  filename: string;
  folder: UploadFolder;
  size: number;
  mimeType: string;
  alt: string;
};

/**
 * Save an uploaded image into MongoDB (works on Vercel — no local disk).
 */
export async function saveFolderUpload(
  file: File,
  folder: UploadFolder,
  alt?: string
): Promise<SaveUploadResult> {
  if (!ALLOWED_MIME[file.type] && !file.type.startsWith("image/")) {
    throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed");
  }
  if (!ALLOWED_MIME[file.type]) {
    throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed");
  }
  if (file.size <= 0) {
    throw new Error("Empty file");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(
      `Image must be under ${(MAX_UPLOAD_BYTES / (1024 * 1024)).toFixed(1)}MB. Try compressing before upload.`
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = extensionFor(file);
  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}-${sanitizeFilenameBase(file.name)}${ext}`;

  await connectDB();
  await StoredUpload.create({
    folder,
    filename,
    mimeType: file.type,
    size: bytes.length,
    data: bytes,
  });

  return {
    success: true,
    url: `/api/uploads/${folder}/${filename}`,
    filename,
    folder,
    size: bytes.length,
    mimeType: file.type,
    alt: alt || file.name.replace(/\.[^.]+$/, ""),
  };
}

/**
 * Delete a Mongo-stored upload by its public URL.
 */
export async function deleteUploadByUrl(url: string): Promise<boolean> {
  const parsed = parseUploadUrl(url);
  if (!parsed) return false;
  await connectDB();
  const result = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });
  return result.deletedCount > 0;
}

export async function getStoredUpload(folder: UploadFolder, filename: string) {
  if (
    !isUploadFolder(folder) ||
    !filename ||
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\")
  ) {
    return null;
  }
  await connectDB();
  return StoredUpload.findOne({ folder, filename }).lean();
}
