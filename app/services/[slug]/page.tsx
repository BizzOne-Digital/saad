import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, getPublishedServices } from "@/lib/services";
import ServiceDetailView from "@/components/services/ServiceDetailView";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  try {
    const services = await getPublishedServices();
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [
      { slug: "installation" },
      { slug: "repair" },
      { slug: "opener" },
      { slug: "emergency" },
      { slug: "commercial" },
    ];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const service = await getServiceBySlug(params.slug);
    if (!service) return { title: "Service Not Found" };
    return {
      title: service.seo?.title || `${service.title} | Soro Garage Door Services`,
      description: service.seo?.description || service.description,
      openGraph: service.heroImage || service.image
        ? { images: [{ url: service.heroImage || service.image! }] }
        : undefined,
    };
  } catch {
    return {};
  }
}

export default async function ServiceSlugPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
