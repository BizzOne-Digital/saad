"use client";

import { motion } from "framer-motion";
import { DollarSign, UserCheck, Clock, Wrench, Building, Phone } from "lucide-react";
import type { SectionDTO } from "@/lib/page-content-types";

const icons = [DollarSign, UserCheck, Clock, Wrench, Building, Phone];

const defaults = [
  {
    title: "Honest, Transparent Pricing",
    description:
      "No hidden fees. Clear quotes before we start. Fair pricing for quality work you can trust.",
  },
  {
    title: "Owner-Operated Service",
    description:
      "Direct communication with the owner. Personal attention to every detail of your project.",
  },
  {
    title: "Fast Response Times",
    description:
      "Same-day service available. We understand garage door emergencies can't wait.",
  },
  {
    title: "Professional Workmanship",
    description:
      "Skilled technicians with years of experience. Every job done right the first time.",
  },
  {
    title: "Residential & Commercial",
    description:
      "Serving homeowners, property managers, and businesses across the Greater Toronto Area.",
  },
  {
    title: "Always Available",
    description:
      "Monday to Sunday, 8 AM to 8 PM. Call, text, or email—we're here when you need us.",
  },
];

type Props = { section?: SectionDTO };

export default function WhyChoose({ section }: Props) {
  const f = section?.fields || {};
  const reasons =
    section?.items?.length
      ? section.items.map((item, i) => ({
          icon: icons[i % icons.length],
          title: item.title || defaults[i]?.title || "Reason",
          description: item.description || defaults[i]?.description || "",
        }))
      : defaults.map((r, i) => ({ ...r, icon: icons[i] }));

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(245, 130, 32, 0.5) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {f.heading || (
              <>
                Why Choose <span className="text-gradient-orange">Soro Garage Doors</span>
              </>
            )}
          </h2>
          <p className="text-xl text-white/70">
            {f.description ||
              "Experience the difference of working with a dedicated, local garage door specialist."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const ReasonIcon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="h-full p-8 rounded-2xl glass-effect border border-white/10 hover:border-orange/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-orange/10 border border-orange/30 flex items-center justify-center mb-6 group-hover:bg-orange transition-colors">
                    <ReasonIcon className="w-7 h-7 text-orange group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                  <p className="text-white/70 leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
