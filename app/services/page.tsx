"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  DoorClosed,
  Wrench,
  Settings,
  AlertTriangle,
  Building2,
  ArrowRight,
  Phone,
} from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import type { ServiceDTO } from "@/lib/service-types";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";
import { SERVICES_SEED } from "@/lib/services-seed";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DoorClosed,
  Wrench,
  Settings,
  AlertTriangle,
  Building2,
};

const seedServices: ServiceDTO[] = SERVICES_SEED.filter((s) => s.published).map(
  (s, i) => ({ ...s, _id: `seed-service-${i + 1}` })
);

export default function ServicesPage() {
  const { getSection } = usePageContent("services");
  const hero = getSection("hero");
  const [services, setServices] = useState<ServiceDTO[]>(seedServices);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        if (
          data.success &&
          Array.isArray(data.services) &&
          data.services.length
        ) {
          setServices(data.services);
        }
      })
      .catch(console.error);
  }, []);

  const heroBg =
    hero?.images?.find((i) => i.key === "background")?.url ||
    "/services-repair.jpg";

  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${heroBg}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        </div>

        <div className="container-custom relative z-10 px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            {hero?.fields?.eyebrow && (
              <p className="text-orange font-semibold uppercase tracking-widest text-sm mb-4">
                {hero.fields.eyebrow}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              {hero?.fields?.heading || (
                <>
                  Professional Garage Door{" "}
                  <span className="text-gradient-orange">Services</span>
                </>
              )}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mb-6 md:mb-8">
              {hero?.fields?.description ||
                "Complete installation, repair, and maintenance services across the Greater Toronto Area"}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
              <Link
                href="/contact"
                className="btn-primary text-base md:text-lg inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                Request Free Quote
              </Link>
              <a
                href="tel:+16472990283"
                className="btn-outline text-base md:text-lg inline-flex items-center justify-center"
              >
                Call: 647-299-0283
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon || "Wrench"] || Wrench;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl glass-effect border border-white/10 hover:border-orange/30 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{
                        backgroundImage: `url('${resolveCmsImageUrl(
                          service.image ||
                            service.heroImage ||
                            "/services-repair.jpg"
                        )}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    {service.urgent && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange text-white text-xs font-bold">
                        Emergency
                      </span>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-orange/10 border border-orange/30 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-orange" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-orange transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-white/70 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    {service.price && (
                      <p className="text-orange font-semibold mb-4">{service.price}</p>
                    )}
                    <ul className="space-y-2 mb-6">
                      {(service.includes?.length
                        ? service.includes
                        : service.benefits
                      )
                        .slice(0, 4)
                        .map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-white/60"
                          >
                            <div className="w-1.5 h-1.5 bg-orange rounded-full" />
                            {item}
                          </li>
                        ))}
                    </ul>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-orange font-semibold hover:gap-3 transition-all"
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
