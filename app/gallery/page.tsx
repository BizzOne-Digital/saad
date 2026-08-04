"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import {
  primaryImageUrl,
  GALLERY_SEED,
  type GalleryProjectDTO,
} from "@/lib/gallery-seed";

const filterCategories = [
  { id: "all", label: "All Projects" },
  { id: "installations", label: "Installations" },
  { id: "repairs", label: "Repairs" },
  { id: "modern", label: "Modern Doors" },
  { id: "traditional", label: "Traditional" },
  { id: "commercial", label: "Commercial" },
  { id: "before-after", label: "Before & After" },
  { id: "openers", label: "Openers" },
];

const seedProjects: GalleryProjectDTO[] = GALLERY_SEED.filter(
  (p) => p.published
).map((p, i) => ({ ...p, _id: `seed-gallery-${i + 1}` }));

export default function GalleryPage() {
  const { getSection } = usePageContent("gallery");
  const hero = getSection("hero");
  const [projects, setProjects] = useState<GalleryProjectDTO[]>(seedProjects);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<GalleryProjectDTO | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getProjectFromUrl = useCallback(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    const projectSlug = params.get("project");
    if (!projectSlug) return null;
    const project = projects.find((p) => p.slug === projectSlug);
    if (!project) return null;
    const parsedIndex = Number(params.get("image") ?? "0");
    const imageIndex = Number.isNaN(parsedIndex) ? 0 : Math.max(0, parsedIndex);
    return { project, imageIndex };
  }, [projects]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (
          data.success &&
          Array.isArray(data.projects) &&
          data.projects.length
        ) {
          setProjects(data.projects);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const heroBg =
    hero?.images?.find((i) => i.key === "background")?.url ||
    primaryImageUrl(projects[0] || { images: [] }) ||
    "/gallery-01.jpg";

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) =>
      (p.category || []).includes(activeCategory)
    );
  }, [projects, activeCategory]);

  const openLightbox = (
    project: GalleryProjectDTO,
    imageIndex = 0,
    pushHistory = true
  ) => {
    setSelectedProject(project);
    setLightboxIndex(imageIndex);
    setLightboxOpen(true);

    if (pushHistory && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("project", project.slug);
      params.set("image", String(imageIndex));
      const nextUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState(null, "", nextUrl);
    }
  };

  const closeLightbox = useCallback(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("project")) {
      window.history.back();
      return;
    }
    setLightboxOpen(false);
    setSelectedProject(null);
    setLightboxIndex(0);
  }, []);

  const lightboxImages = useMemo(() => {
    if (!selectedProject) return [];
    const imgs = [...(selectedProject.images || [])];
    if (selectedProject.beforeImage) imgs.unshift(selectedProject.beforeImage);
    if (
      selectedProject.afterImage &&
      !imgs.some((i) => i.url === selectedProject.afterImage?.url)
    ) {
      imgs.push(selectedProject.afterImage);
    }
    return imgs.length
      ? imgs
      : [{ url: primaryImageUrl(selectedProject), alt: selectedProject.title, type: "main" as const }];
  }, [selectedProject]);

  const prevLightbox = () => {
    setLightboxIndex((i) => {
      const nextIndex = lightboxImages.length
        ? (i - 1 + lightboxImages.length) % lightboxImages.length
        : 0;

      if (selectedProject && typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        params.set("project", selectedProject.slug);
        params.set("image", String(nextIndex));
        const nextUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", nextUrl);
      }

      return nextIndex;
    });
  };

  const nextLightbox = () => {
    setLightboxIndex((i) => {
      const nextIndex = lightboxImages.length ? (i + 1) % lightboxImages.length : 0;

      if (selectedProject && typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        params.set("project", selectedProject.slug);
        params.set("image", String(nextIndex));
        const nextUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", nextUrl);
      }

      return nextIndex;
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromUrl = () => {
      const state = getProjectFromUrl();
      if (!state) {
        setLightboxOpen(false);
        setSelectedProject(null);
        setLightboxIndex(0);
        return;
      }
      openLightbox(state.project, state.imageIndex, false);
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [getProjectFromUrl]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        setLightboxIndex((i) => {
          const len = (() => {
            if (!selectedProject) return 0;
            const imgs = [...(selectedProject.images || [])];
            if (selectedProject.beforeImage) imgs.unshift(selectedProject.beforeImage);
            if (
              selectedProject.afterImage &&
              !imgs.some((x) => x.url === selectedProject.afterImage?.url)
            ) {
              imgs.push(selectedProject.afterImage);
            }
            return Math.max(imgs.length, 1);
          })();
          return len ? (i - 1 + len) % len : 0;
        });
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) => {
          const len = (() => {
            if (!selectedProject) return 0;
            const imgs = [...(selectedProject.images || [])];
            if (selectedProject.beforeImage) imgs.unshift(selectedProject.beforeImage);
            if (
              selectedProject.afterImage &&
              !imgs.some((x) => x.url === selectedProject.afterImage?.url)
            ) {
              imgs.push(selectedProject.afterImage);
            }
            return Math.max(imgs.length, 1);
          })();
          return len ? (i + 1) % len : 0;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, selectedProject, closeLightbox]);
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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {hero?.fields?.heading || (
                <>
                  Project <span className="text-gradient-orange">Gallery</span>
                </>
              )}
            </h1>
            <p className="text-2xl text-white/80 max-w-3xl">
              {hero?.fields?.description ||
                "Real garage door installations and repairs from across the Greater Toronto Area"}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-dark-gray border-b border-white/10">
        <div className="container-custom px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-orange text-white shadow-lg shadow-orange/50"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-custom">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-white/50">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading gallery…
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 text-white/50">
              No projects in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => {
                const image = primaryImageUrl(project);
                return (
                  <motion.div
                    key={project._id || project.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer"
                    onClick={() => openLightbox(project)}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('${image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <div className="flex items-center gap-2 text-white/80">
                        <MapPin className="w-4 h-4 text-orange" />
                        <span className="text-sm">{project.city}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {lightboxOpen && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-20"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {lightboxImages.length > 1 && (
            <>
              <button
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-orange text-white z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightbox();
                }}
                aria-label="Previous"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-orange text-white z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightbox();
                }}
                aria-label="Next"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}

          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="aspect-[16/10] rounded-2xl bg-cover bg-center mb-6 border border-white/10"
              style={{
                backgroundImage: `url('${lightboxImages[lightboxIndex]?.url}')`,
              }}
            />
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
              <p className="text-white/70 flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-orange" />
                {selectedProject.city}
              </p>
              {selectedProject.description && (
                <p className="text-white/60 mt-3 max-w-2xl mx-auto">
                  {selectedProject.description}
                </p>
              )}
              {lightboxImages.length > 1 && (
                <p className="text-white/40 text-xs mt-2">
                  Photo {lightboxIndex + 1} of {lightboxImages.length}
                </p>
              )}
            </div>
            {lightboxImages.length > 1 && (
              <div className="flex justify-center gap-2 flex-wrap">
                {lightboxImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className={`w-16 h-12 rounded-lg bg-cover bg-center border-2 ${
                      i === lightboxIndex
                        ? "border-orange"
                        : "border-white/20"
                    }`}
                    style={{ backgroundImage: `url('${img.url}')` }}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
