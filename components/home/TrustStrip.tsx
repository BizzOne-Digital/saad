"use client";

import { motion } from "framer-motion";
import { Award, Clock, CheckCircle, Shield, Wrench, Star } from "lucide-react";
import type { SectionDTO } from "@/lib/page-content-types";

const icons = [CheckCircle, Clock, Award, Wrench, Shield, Star];

const defaults = [
  "Free On-Site Estimates",
  "Same-Day Service Available",
  "Canadian-Made Doors",
  "Professional Workmanship",
  "10-Year Panel Warranty",
  "Owner-Operated Service",
];

type Props = { section?: SectionDTO };

export default function TrustStrip({ section }: Props) {
  const features =
    section?.items?.length
      ? section.items.map((item, i) => ({
          icon: icons[i % icons.length],
          text: item.text || item.title || defaults[i] || "Feature",
        }))
      : defaults.map((text, i) => ({ icon: icons[i], text }));

  return (
    <section className="relative py-12 bg-dark-gray border-y border-orange/20">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center">
                  <FeatureIcon className="w-7 h-7 text-orange" />
                </div>
                <p className="text-sm font-medium text-white/90">{feature.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
