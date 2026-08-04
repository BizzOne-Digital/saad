"use client";

import { motion } from "framer-motion";
import { Phone, MessageSquare, Clock, Shield, Wrench } from "lucide-react";
import Link from "next/link";
import type { SectionDTO } from "@/lib/page-content-types";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";

type Props = { section?: SectionDTO };

export default function HeroSection({ section }: Props) {
  const f = section?.fields || {};
  const bg = resolveCmsImageUrl(
    section?.images?.find((i) => i.key === "background")?.url || "/home-hero.png"
  );

  const heading =
    f.heading ||
    "Trusted Garage Door Repair & Installation Across the Greater Toronto Area";
  // Split for visual emphasis: put middle phrase in orange when possible
  const headingParts = heading.split(/(Repair & Installation)/i);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${bg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container-custom py-32 md:py-40">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5 }}
            className="mb-8"
          >
            <span className="text-orange font-bold text-sm uppercase tracking-widest">
              {f.eyebrow || "Serving the Greater Toronto Area"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            {headingParts.length > 1 ? (
              <>
                {headingParts[0]}
                <span className="text-orange">{headingParts[1]}</span>
                {headingParts[2]}
              </>
            ) : (
              heading
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.4 }}
            className="text-base md:text-lg text-white/80 mb-6 leading-relaxed"
          >
            {f.description ||
              "Professional garage door installation, repairs, spring replacement, opener installation, and same-day service with honest pricing and Canadian-made garage doors."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.5 }}
            className="mb-8 md:mb-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <div className="border-l border-white/20 pl-3">
                <div className="text-white font-bold text-lg">
                  {f.ratingValue || "5.0"}
                </div>
              </div>
              <div>
                <div className="text-white/90 font-semibold text-sm">
                  {f.ratingLabel || "Google Reviews"}
                </div>
                <div className="text-white/60 text-xs">
                  {f.ratingSubtext || "500+ Happy Customers"}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.7 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-6 md:mb-8"
          >
            <Link
              href={f.ctaPrimaryLink || "/contact"}
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-orange hover:bg-orange/90 text-white font-bold text-sm md:text-base rounded-lg transition-all hover:scale-105 shadow-lg shadow-orange/30"
            >
              {f.ctaPrimary || "REQUEST A FREE ESTIMATE →"}
            </Link>
            <a
              href="tel:+16472990283"
              className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white/30 hover:border-orange text-white font-semibold text-sm md:text-base rounded-lg transition-all hover:bg-white/5"
            >
              <Phone className="w-5 h-5" />
              {f.ctaCall || "CALL 647-299-0283"}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.8 }}
            className="mb-8 md:mb-12"
          >
            <a
              href="sms:+16472990283"
              className="inline-flex items-center justify-center gap-3 px-5 md:px-6 py-2.5 md:py-3 bg-transparent border-2 border-white/30 hover:border-orange text-white font-semibold text-sm md:text-base rounded-lg transition-all hover:bg-white/5"
            >
              <MessageSquare className="w-5 h-5" />
              {f.ctaText || "TEXT US"}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 6.0 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-orange" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  {f.badge1Title || "Same-Day"}
                </div>
                <div className="text-white/60 text-xs">
                  {f.badge1Subtitle || "Service Available"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-orange" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  {f.badge2Title || "Canadian-Made"}
                </div>
                <div className="text-white/60 text-xs">
                  {f.badge2Subtitle || "Garage Doors"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-orange" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  {f.badge3Title || "Professional"}
                </div>
                <div className="text-white/60 text-xs">
                  {f.badge3Subtitle || "Workmanship"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
