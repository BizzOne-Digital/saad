"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle } from "lucide-react";
import type { SectionDTO } from "@/lib/page-content-types";

const defaultCities = [
  "Toronto",
  "Mississauga",
  "Brampton",
  "Vaughan",
  "Markham",
  "Richmond Hill",
  "Oakville",
  "Burlington",
  "Milton",
  "Etobicoke",
  "North York",
  "Scarborough",
  "Ajax",
  "Pickering",
  "Whitby",
];

type Props = { section?: SectionDTO };

export default function ServiceAreas({ section }: Props) {
  const f = section?.fields || {};
  const cities =
    section?.items?.length
      ? section.items.map((item) => item.text || item.title || "").filter(Boolean)
      : defaultCities;

  return (
    <section className="section-padding bg-dark-gray relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(245, 130, 32, 0.3) 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange/30 rounded-full mb-6">
            <MapPin className="w-5 h-5 text-orange" />
            <span className="text-orange font-semibold">Proudly Serving the GTA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {f.heading || (
              <>
                Greater Toronto Area{" "}
                <span className="text-gradient-orange">Coverage</span>
              </>
            )}
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {f.description ||
              "Professional garage door service throughout Toronto and surrounding communities"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cities.map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="flex items-center gap-2 p-3 rounded-lg glass-effect border border-white/10 hover:border-orange/30 transition-all duration-300 group"
              >
                <CheckCircle className="w-4 h-4 text-orange flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium group-hover:text-orange transition-colors">
                  {city}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
