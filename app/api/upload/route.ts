import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  isUploadFolder,
  saveFolderUpload,
  MAX_UPLOAD_BYTES,
} from "@/lib/upload/store";
import type { UploadFolder } from "@/lib/upload/folders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/upload
 * multipart/form-data: file, folder?, alt?
 * Stores image bytes in MongoDB (Vercel-safe). Returns /api/uploads/{folder}/{filename}
 */
export async function POST(req: NextRequest) {
  try {
    const session = getAdminSessionFromRequest(req);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Please log in again to upload images.",
        },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const folderRaw = String(formData.get("folder") || "misc");
    const alt = (formData.get("alt") as string) || undefined;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (!isUploadFolder(folderRaw)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid folder. Use "pages", "products", "gallery", or "misc".',
        },
        { status: 400 }
      );
    }

    const result = await saveFolderUpload(
      file,
      folderRaw as UploadFolder,
      alt
    );

    return NextResponse.json({
      success: true,
      url: result.url,
      filename: result.filename,
      folder: result.folder,
      size: result.size,
      mimeType: result.mimeType,
      alt: result.alt,
      maxBytes: MAX_UPLOAD_BYTES,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}
