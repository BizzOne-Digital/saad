"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  DoorClosed,
  Wrench,
  Zap,
  Settings,
  Cog,
  Shield,
  AlertTriangle,
  Building2,
} from "lucide-react";
import type { SectionDTO } from "@/lib/page-content-types";
import type { ServiceDTO } from "@/lib/service-types";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";
import { SERVICES_SEED } from "@/lib/services-seed";

const icons = [
  DoorClosed,
  Wrench,
  Zap,
  Settings,
  Cog,
  Shield,
  AlertTriangle,
  Building2,
];

const iconByName: Record<string, (typeof icons)[number]> = {
  DoorClosed,
  Wrench,
  Settings,
  AlertTriangle,
  Building2,
  Zap,
  Cog,
  Shield,
};

type Props = { section?: SectionDTO };

const seedServices: ServiceDTO[] = SERVICES_SEED.filter((s) => s.published).map(
  (s, i) => ({ ...s, _id: `seed-service-${i + 1}` })
);

export default function ServicesShowcase({ section }: Props) {
  const f = section?.fields || {};
  const [dbServices, setDbServices] = useState<ServiceDTO[]>(() => {
    const featured = seedServices.filter((s) => s.featured);
    return featured.length ? featured : seedServices;
  });

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        if (
          data.success &&
          Array.isArray(data.services) &&
          data.services.length
        ) {
          const featured = (data.services as ServiceDTO[]).filter(
            (s) => s.featured
          );
          setDbServices(featured.length ? featured : data.services);
        }
      })
      .catch(console.error);
  }, []);

  const fromSection = section?.items?.length
    ? section.items.map((item, i) => ({
        title: item.title || "Service",
        description: item.description || "",
        features: item.features || [],
        image: item.image || "/services-repair.jpg",
        link: item.link || "/contact",
        icon: icons[i % icons.length],
      }))
    : null;

  const fromDb = dbServices.length
    ? dbServices.map((s, i) => ({
        title: s.title,
        description: s.description,
        features: (s.includes?.length ? s.includes : s.benefits).slice(0, 3),
          image: resolveCmsImageUrl(
            s.image || s.heroImage || "/services-repair.jpg"
          ),
          link: `/services/${s.slug}`,
          icon: iconByName[s.icon || ""] || icons[i % icons.length],
        }))
      : null;

  const services =
    fromDb ||
    fromSection ||
    [
      {
        title: "New Garage Door Installation",
        description:
          "Premium Canadian-made garage doors with professional installation.",
        features: ["2-inch insulation", "Tempered glass windows", "10-year warranty"],
        image: "/services-installation.jpg",
        link: "/services/installation",
        icon: DoorClosed,
      },
    ];

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange/5 to-transparent" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {f.heading || (
              <>
                Complete Garage Door{" "}
                <span className="text-gradient-orange">Solutions</span>
              </>
            )}
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {f.description ||
              "From new installations to emergency repairs, we provide comprehensive garage door services across the GTA."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl glass-effect hover:shadow-2xl hover:shadow-orange/20 transition-all duration-500"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                </div>

                <div className="relative p-8">
                  <div className="w-16 h-16 rounded-xl bg-orange/10 border border-orange/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange transition-all duration-300">
                    <ServiceIcon className="w-8 h-8 text-orange group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-white/60"
                      >
                        <div className="w-1.5 h-1.5 bg-orange rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 text-orange font-semibold hover:gap-4 transition-all"
                  >
                    View Service Details
                    <span className="text-xl">→</span>
                  </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/services" className="btn-primary text-lg px-8 py-4">
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
