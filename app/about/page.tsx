"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, Target, Heart, Shield, Users } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const valueIcons = [Shield, Award, Heart, Users];

export default function AboutPage() {
  const { getSection } = usePageContent("about");
  const hero = getSection("hero");
  const story = getSection("story");
  const values = getSection("values");
  const cta = getSection("cta");

  const heroBg =
    hero?.images?.find((i) => i.key === "background")?.url ||
    "/interior-organized-garage.jpg";
  const storyImg =
    story?.images?.find((i) => i.key === "main")?.url || "/gallery-02.jpg";
  const ctaBg =
    cta?.images?.find((i) => i.key === "background")?.url || "/gallery-04.jpg";

  const valueItems =
    values?.items?.length
      ? values.items
      : [
          {
            title: "Safety First",
            description:
              "Garage doors involve high tension. We prioritize safe repairs and never recommend unsafe DIY spring or cable work.",
          },
          {
            title: "Honest Pricing",
            description:
              "Clear recommendations and transparent starting prices before work begins.",
          },
          {
            title: "Canadian-Made Quality",
            description:
              "We install premium doors built for Ontario weather and long-term reliability.",
          },
          {
            title: "Owner-Operated Care",
            description:
              "Personal attention from a local operator who stands behind the work.",
          },
        ];

  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${heroBg}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            {hero?.fields?.eyebrow && (
              <p className="text-orange font-semibold uppercase tracking-widest text-sm mb-4">
                {hero.fields.eyebrow}
              </p>
            )}
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {hero?.fields?.heading || (
                <>
                  About <span className="text-gradient-orange">Soro Garage Doors</span>
                </>
              )}
            </h1>
            <p className="text-2xl text-white/80 leading-relaxed">
              {hero?.fields?.description ||
                "Your trusted partner for professional garage door installation and repair across the Greater Toronto Area."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                {story?.fields?.heading || (
                  <>
                    Our <span className="text-gradient-orange">Story</span>
                  </>
                )}
              </h2>
              <div className="space-y-4 text-lg text-white/80 leading-relaxed">
                <p>
                  {story?.fields?.description ||
                    "Soro Garage Door Services proudly serves homeowners and businesses across the Greater Toronto Area with professional garage door solutions."}
                </p>
                {story?.fields?.paragraph2 && <p>{story.fields.paragraph2}</p>}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div
                className="aspect-[4/3] bg-cover bg-center"
                style={{ backgroundImage: `url('${storyImg}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-gray">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              {values?.fields?.heading || (
                <>
                  Our <span className="text-gradient-orange">Values</span>
                </>
              )}
            </h2>
            <p className="text-xl text-white/70">
              {values?.fields?.description ||
                "The principles that guide everything we do"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueItems.map((value, index) => {
              const ValueIcon = valueIcons[index % valueIcons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 rounded-2xl glass-effect border border-white/10 hover:border-orange/30 transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-orange/10 flex items-center justify-center">
                    <ValueIcon className="w-8 h-8 text-orange" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="w-16 h-16 text-orange mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="text-gradient-orange">Mission</span>
            </h2>
            <p className="text-2xl text-white/80 leading-relaxed mb-8">
              To provide the Greater Toronto Area with reliable, professional garage
              door services that prioritize safety, quality, and customer
              satisfaction.
            </p>
          </div>
        </div>
      </section>

      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${ctaBg}')` }}
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              {cta?.fields?.heading || "Ready to Work Together?"}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {cta?.fields?.description ||
                "Experience the Soro difference. Contact us today for a free, no-obligation estimate."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={cta?.fields?.ctaPrimaryLink || "/contact"}
                className="btn-primary text-lg px-8 py-4"
              >
                {cta?.fields?.ctaPrimary || "Request Free Estimate"}
              </Link>
              <a href="tel:+16472990283" className="btn-outline text-lg px-8 py-4">
                {cta?.fields?.ctaCall || "Call 647-299-0283"}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
