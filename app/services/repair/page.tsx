import { getServiceBySlug } from "@/lib/services";
import ServiceDetailView from "@/components/services/ServiceDetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const SLUG = "repair";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug(SLUG);
  if (!service) return {};
  return {
    title: service.seo?.title || `${service.title} | Soro Garage Door Services`,
    description: service.seo?.description || service.description,
  };
}

export default async function RepairPage() {
  const service = await getServiceBySlug(SLUG);
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
