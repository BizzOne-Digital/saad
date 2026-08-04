import { getPageBySlug } from "@/lib/page-content";
import HomePageContent from "@/components/home/HomePageContent";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug("home");
    if (!page?.seo) return {};
    return {
      title: page.seo.title,
      description: page.seo.description,
      openGraph: page.seo.ogImage
        ? { images: [{ url: page.seo.ogImage }] }
        : undefined,
    };
  } catch {
    return {};
  }
}

export default async function HomePage() {
  let page = null;
  try {
    page = await getPageBySlug("home");
  } catch (error) {
    console.error("Failed to load home page content from DB:", error);
  }

  return <HomePageContent page={page} />;
}
