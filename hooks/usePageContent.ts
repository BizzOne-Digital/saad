"use client";

import { useEffect, useState } from "react";
import type { PageDTO, SectionDTO } from "@/lib/page-content-types";

export function usePageContent(slug: string) {
  const [page, setPage] = useState<PageDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/pages/${slug}`, { cache: "no-store" });
        const data = await res.json();
        if (!cancelled && data.success) {
          setPage(data.page);
        }
      } catch (error) {
        console.error(`Failed to load page content for ${slug}:`, error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const getSection = (key: string): SectionDTO | undefined =>
    page?.sections.find((s) => s.key === key);

  return { page, loading, getSection };
}
