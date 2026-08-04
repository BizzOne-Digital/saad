"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Trash2, Loader2, ImageIcon } from "lucide-react";
import type { UploadFolder } from "@/lib/upload/folders";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";
import { adminFetch, ensureAdminSessionToken } from "@/lib/admin-client-auth";

type Props = {
  value?: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  label?: string;
  altHint?: string;
  className?: string;
};

const MAX_EDGE = 2000;
const JPEG_QUALITY = 0.8;

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    // Skip if already small enough and under ~1.5MB
    if (scale >= 1 && file.size < 1.5 * 1024 * 1024) {
      bitmap.close();
      return file;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const preferWebp = file.type === "image/webp";
    const mime = preferWebp ? "image/webp" : "image/jpeg";
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), mime, JPEG_QUALITY)
    );

    if (!blob || blob.size >= file.size) {
      return file;
    }

    const base = file.name.replace(/\.[^.]+$/, "");
    const ext = preferWebp ? ".webp" : ".jpg";
    return new File([blob], `${base}${ext}`, { type: mime });
  } catch {
    return file;
  }
}

export default function ImageUploadField({
  value,
  onChange,
  folder,
  label = "Image",
  altHint,
  className = "",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const preview = resolveCmsImageUrl(value, "");

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);

    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("adminSessionToken")
    ) {
      const ok = await ensureAdminSessionToken();
      if (!ok) {
        setError(
          "Please log out and log in again — upload session is missing."
        );
        return;
      }
    }

    setUploading(true);
    try {
      const prepared = await compressImage(file);
      const form = new FormData();
      form.append("file", prepared);
      form.append("folder", folder);
      if (altHint) form.append("alt", altHint);

      const res = await adminFetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (res.status === 401) {
          throw new Error(
            "Session expired. Log out and log in again, then retry upload."
          );
        }
        throw new Error(data.error || "Upload failed");
      }
      onChange(data.url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
      console.error("Image upload error:", msg);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs uppercase tracking-wide text-white/50">
          {label}
        </label>
      )}

      <div className="rounded-xl border border-white/10 overflow-hidden bg-black/30">
        <div className="relative aspect-video bg-white/5">
          {preview ? (
            <Image
              src={preview}
              alt={altHint || label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              unoptimized={preview.startsWith("/api/uploads/")}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 gap-2">
              <ImageIcon className="w-10 h-10" />
              <span className="text-xs">No image</span>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 text-white text-sm">
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading…
            </div>
          )}
        </div>

        <div className="p-3 flex flex-wrap gap-2">
          <label className="btn-outline text-sm py-2 px-3 cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {value ? "Replace" : "Upload"}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              disabled={uploading}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={uploading}
              className="px-3 py-2 rounded-lg bg-red-500/15 text-red-300 text-sm flex items-center gap-1 hover:bg-red-500/25"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          )}
        </div>

        {value && (
          <div className="px-3 pb-3">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70"
              placeholder="/api/uploads/..."
            />
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <p className="text-[11px] text-white/35">
        Stored in MongoDB · folder: {folder} · max ~4.5MB (auto-compressed)
      </p>
    </div>
  );
}
