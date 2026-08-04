"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Phone,
  Ruler,
  Palette,
  LayoutGrid,
  Tag,
} from "lucide-react";
import {
  DOOR_STYLES_SEED,
  primaryDoorStyleImage,
  type DoorStyleDTO,
} from "@/lib/door-styles-seed";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";

const seedStyles: DoorStyleDTO[] = DOOR_STYLES_SEED.filter((s) => s.published).map(
  (s, i) => ({ ...s, _id: `seed-door-style-${i + 1}` })
);

const filterOptions = [
  { id: "all", label: "All Styles" },
  { id: "steel", label: "Steel" },
  { id: "aluminum", label: "Aluminum" },
  { id: "fiberglass", label: "Fiberglass" },
  { id: "modern", label: "Modern" },
  { id: "traditional", label: "Traditional" },
  { id: "carriage", label: "Carriage" },
  { id: "glass", label: "Glass" },
];

export default function DoorTypesPage() {
  const [styles, setStyles] = useState<DoorStyleDTO[]>(seedStyles);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<DoorStyleDTO | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const getStyleFromUrl = useCallback(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    const styleSlug = params.get("style");
    if (!styleSlug) return null;
    const style = styles.find((s) => s.slug === styleSlug);
    if (!style) return null;
    const parsedIndex = Number(params.get("photo") ?? "0");
    const safeIndex = Number.isNaN(parsedIndex) ? 0 : Math.max(0, parsedIndex);
    return { style, safeIndex };
  }, [styles]);

  useEffect(() => {
    fetch("/api/door-styles")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.styles) && data.styles.length) {
          setStyles(data.styles);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return styles;
    return styles.filter((s) => (s.category || []).includes(activeCategory));
  }, [styles, activeCategory]);

  const photos = selected?.images?.length
    ? selected.images
    : selected
      ? [{ url: primaryDoorStyleImage(selected), alt: selected.modelName }]
      : [];

  const openStyle = (
    style: DoorStyleDTO,
    nextIndex = 0,
    pushHistory = true
  ) => {
    setSelected(style);
    setPhotoIndex(nextIndex);

    if (pushHistory && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("style", style.slug);
      params.set("photo", String(nextIndex));
      const nextUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState(null, "", nextUrl);
    }
  };

  const closeLightbox = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("style")) {
        window.history.back();
        return;
      }
    }
    setSelected(null);
    setPhotoIndex(0);
  };

  const prevPhoto = useCallback(() => {
    setPhotoIndex((i) => {
      const nextIndex = photos.length ? (i - 1 + photos.length) % photos.length : 0;
      if (selected && typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        params.set("style", selected.slug);
        params.set("photo", String(nextIndex));
        const nextUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", nextUrl);
      }
      return nextIndex;
    });
  }, [photos.length, selected]);

  const nextPhoto = useCallback(() => {
    setPhotoIndex((i) => {
      const nextIndex = photos.length ? (i + 1) % photos.length : 0;
      if (selected && typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        params.set("style", selected.slug);
        params.set("photo", String(nextIndex));
        const nextUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", nextUrl);
      }
      return nextIndex;
    });
  }, [photos.length, selected]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromUrl = () => {
      const state = getStyleFromUrl();
      if (!state) {
        setSelected(null);
        setPhotoIndex(0);
        return;
      }
      openStyle(state.style, state.safeIndex, false);
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [getStyleFromUrl]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, prevPhoto, nextPhoto]);

  return (
    <div className="min-h-screen pt-24">
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/gallery-01.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        </div>
        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Garage Door <span className="text-gradient-orange">Styles</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              Browse door models with photo galleries. Click any style to view
              size, colour, window options, and more photos.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-dark-gray border-b border-white/10">
        <div className="container-custom px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filterOptions.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-orange text-white shadow-lg shadow-orange/40"
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
              Loading door styles…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-white/50">
              No door styles in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((style, index) => {
                const image = resolveCmsImageUrl(primaryDoorStyleImage(style));
                return (
                  <motion.button
                    key={style._id || style.slug}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => openStyle(style)}
                    className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-orange/40 transition-all"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('${image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {style.modelName}
                        </h3>
                        <p className="text-xs text-white/70">
                          {(style.images?.length || 1)} photos · Click to view gallery
                        </p>
                      </div>
                    </div>
                    <div className="p-4 space-y-2 text-sm text-white/70">
                      {style.colour && (
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4 text-orange shrink-0" />
                          <span>{style.colour}</span>
                        </div>
                      )}
                      {style.size && (
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-orange shrink-0" />
                          <span>{style.size}</span>
                        </div>
                      )}
                      {style.windowStyle && (
                        <div className="flex items-center gap-2">
                          <LayoutGrid className="w-4 h-4 text-orange shrink-0" />
                          <span className="line-clamp-1">{style.windowStyle}</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-white/60 mb-6">
              Need help choosing the right door for your home?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Request Free Estimate
              </Link>
              <a href="tel:+16472990283" className="btn-outline inline-flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call 647-299-0283
              </a>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-20"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-orange text-white z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevPhoto();
                  }}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-orange text-white z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPhoto();
                  }}
                  aria-label="Next photo"
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
                className="aspect-[16/10] rounded-2xl bg-cover bg-center mb-5 border border-white/10"
                style={{
                  backgroundImage: `url('${resolveCmsImageUrl(
                    photos[photoIndex]?.url
                  )}')`,
                }}
              />

              <div className="text-center mb-4">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {selected.modelName}
                </h3>
                {selected.description && (
                  <p className="text-white/65 max-w-2xl mx-auto mb-4">
                    {selected.description}
                  </p>
                )}
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  {selected.modelName && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      <Tag className="w-3.5 h-3.5 text-orange" />
                      {selected.modelName}
                    </span>
                  )}
                  {selected.size && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      <Ruler className="w-3.5 h-3.5 text-orange" />
                      {selected.size}
                    </span>
                  )}
                  {selected.colour && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      <Palette className="w-3.5 h-3.5 text-orange" />
                      {selected.colour}
                    </span>
                  )}
                  {selected.windowStyle && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      <LayoutGrid className="w-3.5 h-3.5 text-orange" />
                      {selected.windowStyle}
                    </span>
                  )}
                  {selected.material && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      {selected.material}
                    </span>
                  )}
                </div>
                {photos.length > 1 && (
                  <p className="text-white/40 text-xs mt-3">
                    Photo {photoIndex + 1} of {photos.length} · Use arrows or keyboard
                  </p>
                )}
              </div>

              {photos.length > 1 && (
                <div className="flex justify-center gap-2 flex-wrap">
                  {photos.map((img, i) => (
                    <button
                      key={`${img.url}-${i}`}
                      onClick={() => setPhotoIndex(i)}
                      className={`w-16 h-12 rounded-lg bg-cover bg-center border-2 ${
                        i === photoIndex ? "border-orange" : "border-white/20"
                      }`}
                      style={{
                        backgroundImage: `url('${resolveCmsImageUrl(img.url)}')`,
                      }}
                      aria-label={`View photo ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <Link
                  href="/contact"
                  className="btn-primary"
                  onClick={closeLightbox}
                >
                  Request Quote for This Style
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
