"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";
import type { SectionDTO } from "@/lib/page-content-types";
import {
  primaryImageUrl,
  GALLERY_SEED,
  type GalleryProjectDTO,
} from "@/lib/gallery-seed";

type Props = { section?: SectionDTO };

const seedFeatured = GALLERY_SEED.filter((p) => p.published && p.featured)
  .slice(0, 6)
  .map((p) => ({
    title: p.title,
    city: p.city,
    image: primaryImageUrl(p),
  }));

export default function RecentProjects({ section }: Props) {
  const f = section?.fields || {};
  const [projects, setProjects] = useState(seedFeatured);

  useEffect(() => {
    fetch("/api/gallery?featured=1")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.projects?.length) {
          setProjects(
            (data.projects as GalleryProjectDTO[]).slice(0, 6).map((p) => ({
              title: p.title,
              city: p.city,
              image: primaryImageUrl(p),
            }))
          );
        }
      })
      .catch(console.error);
  }, []);

  const display =
    projects.length > 0
      ? projects
      : section?.items?.length
        ? section.items.map((item) => ({
            title: item.title || "Project",
            city: item.city || "GTA",
            image: item.image || "/gallery-01.jpg",
          }))
        : seedFeatured;

  return (
    <section className="section-padding bg-dark-gray relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {f.heading || (
              <>
                Recent <span className="text-gradient-orange">Projects</span>
              </>
            )}
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {f.description ||
              "Real installations from across the Greater Toronto Area"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {display.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-black border border-white/10 hover:border-orange/30 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 text-orange" />
                  {project.city}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-orange font-semibold hover:gap-3 transition-all"
          >
            View Full Gallery <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
