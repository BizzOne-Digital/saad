/**
 * Safe CMS / storefront image URL resolver.
 * - Mongo uploads: /api/uploads/{folder}/{filename}
 * - Legacy disk paths /uploads/... are broken on Vercel → fall back
 * - Static public assets (/gallery-01.jpg, /images/...) pass through
 */

const DEFAULT_FALLBACK = "/gallery-01.jpg";

export function resolveCmsImageUrl(
  url: string | null | undefined,
  fallback: string = DEFAULT_FALLBACK
): string {
  if (!url || typeof url !== "string" || !url.trim()) {
    return fallback;
  }

  const trimmed = url.trim();

  // MongoDB-backed uploads (Vercel-safe)
  if (trimmed.startsWith("/api/uploads/")) {
    // Block traversal in path segments
    if (trimmed.includes("..")) return fallback;
    return trimmed;
  }

  // Legacy local-disk uploads — do not use on Vercel
  if (
    trimmed.startsWith("/uploads/") ||
    trimmed.startsWith("uploads/") ||
    trimmed.includes("/public/uploads/")
  ) {
    return fallback;
  }

  // Absolute http(s) URLs (optional remote assets)
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // Blob / data URLs (preview only — shouldn't be persisted)
  if (trimmed.startsWith("blob:") || trimmed.startsWith("data:")) {
    return trimmed;
  }

  // Normal static paths
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/${trimmed}`;
}

export function isMongoUploadUrl(url: string | null | undefined): boolean {
  return Boolean(url && url.startsWith("/api/uploads/"));
}
