"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  DoorClosed,
  Wrench,
  Settings,
  AlertTriangle,
  Building2,
  CheckCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import type { ServiceDTO } from "@/lib/service-types";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DoorClosed,
  Wrench,
  Settings,
  AlertTriangle,
  Building2,
};

type Props = { service: ServiceDTO };

export default function ServiceDetailView({ service }: Props) {
  const Icon = iconMap[service.icon || "Wrench"] || Wrench;
  const hero = resolveCmsImageUrl(
    service.heroImage || service.image || "/services-repair.jpg"
  );
  const phone = service.phoneDisplay || "647-299-0283";
  const tel = `tel:+1${phone.replace(/\D/g, "")}`;

  const includes = service.includes?.length
    ? service.includes
    : service.benefits || [];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${hero}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-orange/30 mb-6">
              <Icon className="w-5 h-5 text-orange" />
              <span className="text-sm font-semibold text-orange">
                {service.eyebrow || service.category || "Professional Service"}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed">
              {service.description}
            </p>
            {service.price && (
              <p className="text-orange font-semibold text-lg mb-8">{service.price}</p>
            )}

            <div className="flex flex-wrap gap-4">
              <Link
                href={service.ctaPrimaryLink || "/contact"}
                className="btn-primary text-lg inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {service.ctaPrimary || "Get Free Quote"}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={tel} className="btn-outline text-lg">
                Call Now: {phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Includes */}
      {includes.length > 0 && (
        <section className="section-padding bg-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {service.includesHeading || "What's Included"}
              </h2>
              {service.includesDescription && (
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  {service.includesDescription}
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {includes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-xl glass-effect border border-white/10 hover:border-orange/30 transition-all group"
                >
                  <CheckCircle className="w-8 h-8 text-orange mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-lg text-white/90">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cards / styles */}
      {service.cards?.length > 0 && (
        <section className="section-padding bg-dark-gray">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {service.cardsHeading || "More Details"}
              </h2>
              {service.cardsDescription && (
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  {service.cardsDescription}
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl glass-effect hover:shadow-2xl hover:shadow-orange/20 transition-all duration-500"
                >
                  {card.image && (
                    <div className="relative h-56 overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                        style={{
                          backgroundImage: `url('${resolveCmsImageUrl(card.image)}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      {card.badge && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange text-white text-xs font-bold">
                          {card.badge}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-orange transition-colors">
                      {card.title}
                    </h3>
                    {card.description && (
                      <p className="text-white/70 mb-6 leading-relaxed">
                        {card.description}
                      </p>
                    )}
                    {card.features && card.features.length > 0 && (
                      <ul className="space-y-2">
                        {card.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-white/80"
                          >
                            <div className="w-1.5 h-1.5 bg-orange rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video */}
      {service.videoSrc && (
        <VideoPlayer
          videoSrc={service.videoSrc}
          title={service.videoTitle || service.title}
          subtitle={service.videoDescription}
        />
      )}

      {/* Why choose */}
      {service.whyItems?.length > 0 && (
        <section className="section-padding bg-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {service.whyHeading || "Why Choose Us"}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.whyItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl glass-effect border border-white/10 hover:border-orange/30 transition-all"
                >
                  <div className="w-16 h-16 rounded-xl bg-orange/10 border border-orange/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-orange" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-white/70 text-sm">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-orange/10 to-black relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {service.ctaHeading || `Ready for ${service.title}?`}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {service.ctaDescription ||
                "Get a free on-site estimate. Professional service across the GTA."}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={service.ctaPrimaryLink || "/contact"}
                className="btn-primary text-lg inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {service.ctaPrimary || "Request Free Quote"}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={service.ctaSecondaryLink || tel}
                className="btn-outline text-lg"
              >
                {service.ctaSecondary || `Call ${phone}`}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
