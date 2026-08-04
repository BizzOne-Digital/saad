"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin } from "lucide-react";
import type { SectionDTO } from "@/lib/page-content-types";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";

type Props = { section?: SectionDTO };

export default function BeforeAfter({ section }: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const f = section?.fields || {};
  const before = resolveCmsImageUrl(
    section?.images?.find((i) => i.key === "before")?.url || "/before-old-door.jpg"
  );
  const after = resolveCmsImageUrl(
    section?.images?.find((i) => i.key === "after")?.url || "/after-new-door.jpg"
  );

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX: number;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {f.heading || (
              <>
                Complete <span className="text-gradient-orange">Transformations</span>
              </>
            )}
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {f.description ||
              "See the dramatic difference a new garage door makes. Real projects from across the GTA."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-orange/20 border border-white/10">
            <div
              className="relative aspect-[16/10] select-none cursor-ew-resize"
              onMouseMove={handleMove}
              onTouchMove={handleMove}
            >
              <div className="absolute inset-0">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${after}')` }}
                />
                <div className="absolute top-4 right-4 bg-orange px-4 py-2 rounded-full font-bold text-sm">
                  AFTER
                </div>
              </div>

              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${before}')` }}
                />
                <div className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-full font-bold text-sm">
                  BEFORE
                </div>
              </div>

              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-1 h-6 bg-orange rounded-full" />
                    <div className="w-1 h-6 bg-orange rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-gray p-6 border-t border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {f.projectTitle || "Full Door Replacement"}
                  </h3>
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="w-4 h-4 text-orange" />
                    <span>{f.projectCity || "Greater Toronto Area"}</span>
                  </div>
                </div>
                <div className="text-white/80">
                  <p className="text-sm mb-1">
                    {f.projectDescription ||
                      "Worn door replaced with a modern insulated sectional door."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-white/60 mt-6"
          >
            Drag the slider or tap to compare • Images managed from the admin panel
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
