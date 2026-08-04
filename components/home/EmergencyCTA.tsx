"use client";

import { motion } from "framer-motion";
import { Phone, MessageSquare, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { SectionDTO } from "@/lib/page-content-types";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";

type Props = { section?: SectionDTO };

export default function EmergencyCTA({ section }: Props) {
  const f = section?.fields || {};
  const bg = resolveCmsImageUrl(
    section?.images?.find((i) => i.key === "background")?.url ||
      "/services-emergency.jpg"
  );

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${bg}')` }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange/20 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange/20 border-2 border-orange rounded-full mb-8"
          >
            <AlertCircle className="w-5 h-5 text-orange animate-pulse" />
            <span className="text-orange font-bold text-sm">
              {f.badge || "EMERGENCY SERVICE AVAILABLE"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            {f.heading || (
              <>
                Garage Door Stuck
                <br />
                <span className="text-gradient-orange">or Unsafe?</span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed"
          >
            {f.description ||
              "We provide same-day emergency garage door repair across the GTA. Don't wait—get your garage door fixed today."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <a
              href="tel:+16472990283"
              className="group relative bg-orange hover:bg-orange/90 text-white font-bold text-lg px-10 py-5 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-orange/50 flex items-center gap-3"
            >
              <Phone className="w-6 h-6" />
              {f.ctaCall || "Call Now: 647-299-0283"}
            </a>

            <a
              href="sms:+16472990283"
              className="group bg-white hover:bg-gray-100 text-black font-bold text-lg px-10 py-5 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <MessageSquare className="w-6 h-6" />
              {f.ctaText || "Text Us"}
            </a>

            <Link
              href={f.ctaEstimateLink || "/contact"}
              className="group border-2 border-white hover:bg-white hover:text-black text-white font-bold text-lg px-10 py-5 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              {f.ctaEstimate || "Request Free Estimate"}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange to-transparent" />
    </section>
  );
}
