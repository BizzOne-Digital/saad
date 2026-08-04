"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Award, Shield, Thermometer } from "lucide-react";
import type { SectionDTO } from "@/lib/page-content-types";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";

type Props = { section?: SectionDTO };

export default function PremiumProduct({ section }: Props) {
  const f = section?.fields || {};
  const img = resolveCmsImageUrl(
    section?.images?.find((i) => i.key === "main")?.url || "/gallery-01.jpg"
  );

  const features = [
    {
      icon: Thermometer,
      title: f.feature1Title || "Superior Insulation",
      text:
        f.feature1Text ||
        "2-inch polyurethane foam core provides exceptional R-value for energy savings.",
    },
    {
      icon: Shield,
      title: f.feature2Title || "Real Tempered Glass",
      text:
        f.feature2Text ||
        "Authentic tempered glass windows, not acrylic. Durable, scratch-resistant, and stunning.",
    },
    {
      icon: Award,
      title: f.feature3Title || "Canadian-Made Construction",
      text:
        f.feature3Text ||
        "Built to withstand harsh Canadian winters. Quality materials, expert craftsmanship.",
    },
    {
      icon: CheckCircle,
      title: f.feature4Title || "10-Year Panel Warranty",
      text:
        f.feature4Text ||
        "Comprehensive manufacturer warranty on all door panels for peace of mind.",
    },
  ];

  return (
    <section className="section-padding bg-dark-gray relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 35px,
            rgba(245, 130, 32, 0.5) 35px,
            rgba(245, 130, 32, 0.5) 36px
          )`,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange/30 rounded-full mb-6">
              <Award className="w-4 h-4 text-orange" />
              <span className="text-orange font-semibold text-sm">
                {f.badge || "Premium Quality"}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {f.heading || (
                <>
                  2-Inch Polyurethane
                  <br />
                  <span className="text-gradient-orange">Insulated Doors</span>
                </>
              )}
            </h2>

            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              {f.description ||
                "Experience superior energy efficiency, noise reduction, and durability with our premium Canadian-made garage doors."}
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-white/10 hover:border-orange/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-orange" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href={f.ctaLink || "/contact"} className="btn-primary">
              {f.ctaText || "Get Your Free Estimate"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-orange/20">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{ backgroundImage: `url('${img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-orange/30">
                <div className="text-3xl font-bold text-orange mb-1">R-16</div>
                <div className="text-sm text-white/70">Insulation Value</div>
              </div>
              <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-orange/30">
                <div className="text-3xl font-bold text-orange mb-1">10 Yr</div>
                <div className="text-sm text-white/70">Panel Warranty</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-orange/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
