"use client";

import { motion } from "framer-motion";
import { MessageSquare, MapPin, FileText, Wrench, CheckCircle } from "lucide-react";
import type { SectionDTO } from "@/lib/page-content-types";

const icons = [MessageSquare, MapPin, FileText, Wrench, CheckCircle];

const defaults = [
  {
    number: "01",
    title: "Request Estimate",
    description: "Call, text, or fill out our online form. Tell us what you need.",
  },
  {
    number: "02",
    title: "On-Site Assessment",
    description: "We visit your location for a thorough, no-obligation inspection.",
  },
  {
    number: "03",
    title: "Clear Quote",
    description: "Receive a detailed, transparent quote with no hidden fees.",
  },
  {
    number: "04",
    title: "Professional Work",
    description: "Expert installation or repair completed to the highest standards.",
  },
  {
    number: "05",
    title: "Final Walkthrough",
    description:
      "Complete safety test and demonstration. Your satisfaction guaranteed.",
  },
];

type Props = { section?: SectionDTO };

export default function ProcessSection({ section }: Props) {
  const f = section?.fields || {};
  const steps =
    section?.items?.length
      ? section.items.map((item, i) => ({
          icon: icons[i % icons.length],
          number: item.number || String(i + 1).padStart(2, "0"),
          title: item.title || defaults[i]?.title || "Step",
          description: item.description || defaults[i]?.description || "",
        }))
      : defaults.map((s, i) => ({ ...s, icon: icons[i] }));

  return (
    <section className="section-padding bg-dark-gray relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {f.heading || (
              <>
                Our Simple <span className="text-gradient-orange">5-Step Process</span>
              </>
            )}
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {f.description ||
              "From your first contact to final installation, we make it easy and stress-free."}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange to-orange/50 flex items-center justify-center shadow-lg shadow-orange/50">
                      <span className="text-3xl font-bold">{step.number}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-black border-2 border-orange flex items-center justify-center">
                      <StepIcon className="w-5 h-5 text-orange" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left p-6 rounded-2xl glass-effect border border-white/10">
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-white/70 text-lg">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-12 top-24 w-0.5 h-12 bg-gradient-to-b from-orange to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
