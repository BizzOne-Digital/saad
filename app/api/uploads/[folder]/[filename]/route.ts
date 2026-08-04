import { NextRequest, NextResponse } from "next/server";
import {
  getStoredUpload,
  isUploadFolder,
} from "@/lib/upload/store";
import type { UploadFolder } from "@/lib/upload/folders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/uploads/[folder]/[filename]
 * Streams image bytes from MongoDB with long-lived cache headers.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { folder: string; filename: string } }
) {
  try {
    const { folder, filename } = params;

    if (
      !folder ||
      !filename ||
      folder.includes("..") ||
      filename.includes("..") ||
      folder.includes("/") ||
      filename.includes("/") ||
      folder.includes("\\") ||
      filename.includes("\\")
    ) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    if (!isUploadFolder(folder)) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    const doc = await getStoredUpload(folder as UploadFolder, filename);
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const raw = doc.data as unknown;
    let body: Buffer;
    if (Buffer.isBuffer(raw)) {
      body = raw;
    } else if (
      raw &&
      typeof raw === "object" &&
      Buffer.isBuffer((raw as { buffer?: unknown }).buffer)
    ) {
      body = (raw as { buffer: Buffer }).buffer;
    } else {
      body = Buffer.from(raw as ArrayBuffer);
    }

    return new NextResponse(new Uint8Array(body), {
      status: 200,
      headers: {
        "Content-Type": doc.mimeType || "application/octet-stream",
        "Content-Length": String(body.length),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("GET upload error:", error);
    return NextResponse.json({ error: "Failed to load image" }, { status: 500 });
  }
}
