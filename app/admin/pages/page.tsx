"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Image as ImageIcon,
  Trash2,
  Save,
  Eye,
  ChevronRight,
  Plus,
  RefreshCw,
  Loader2,
} from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import Image from "next/image";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";

type SectionImage = { key: string; url: string; alt: string };
type SectionItem = {
  id?: string;
  title?: string;
  description?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  features?: string[];
  cta?: string;
  link?: string;
  number?: string;
  city?: string;
};

type Section = {
  key: string;
  title: string;
  order: number;
  published: boolean;
  fields: Record<string, string>;
  images: SectionImage[];
  items: SectionItem[];
};

type WebsitePage = {
  slug: string;
  name: string;
  path: string;
  icon: string;
  published: boolean;
  order: number;
  seo: { title?: string; description?: string; ogImage?: string };
  sections: Section[];
};

export default function AdminPagesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<WebsitePage[]>([]);
  const [selectedPage, setSelectedPage] = useState<WebsitePage | null>(null);
  const [activeSectionKey, setActiveSectionKey] = useState<string | null>(null);
  const [draftFields, setDraftFields] = useState<Record<string, string>>({});
  const [draftImages, setDraftImages] = useState<SectionImage[]>([]);
  const [draftItems, setDraftItems] = useState<SectionItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeSection =
    selectedPage?.sections.find((s) => s.key === activeSectionKey) || null;

  const loadPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pages", { cache: "no-store" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to load pages");

      setPages(data.pages);
      if (data.pages.length > 0) {
        const first = data.pages[0] as WebsitePage;
        setSelectedPage(first);
        setActiveSectionKey(first.sections[0]?.key || null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load pages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }
    loadPages();
  }, [router, loadPages]);

  useEffect(() => {
    if (!activeSection) {
      setDraftFields({});
      setDraftImages([]);
      setDraftItems([]);
      return;
    }
    setDraftFields({ ...activeSection.fields });
    setDraftImages([...(activeSection.images || [])]);
    setDraftItems(
      (activeSection.items || []).map((item) => ({
        ...item,
        features: item.features ? [...item.features] : [],
      }))
    );
  }, [activeSectionKey, selectedPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectPage = (page: WebsitePage) => {
    setSelectedPage(page);
    setActiveSectionKey(page.sections[0]?.key || null);
    setMessage(null);
  };

  const handleSaveSection = async () => {
    if (!selectedPage || !activeSection) return;
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch(
        `/api/pages/${selectedPage.slug}/sections/${activeSection.key}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: draftFields,
            images: draftImages,
            items: draftItems,
          }),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Save failed");

      // Refresh local state
      const updatedSections = selectedPage.sections.map((s) =>
        s.key === activeSection.key
          ? {
              ...s,
              fields: data.section.fields,
              images: data.section.images,
              items: data.section.items,
            }
          : s
      );
      const updatedPage = { ...selectedPage, sections: updatedSections };
      setSelectedPage(updatedPage);
      setPages((prev) =>
        prev.map((p) => (p.slug === updatedPage.slug ? updatedPage : p))
      );
      setMessage(`Saved “${activeSection.title}” to database`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save section");
    } finally {
      setSaving(false);
    }
  };

  const updateImageMeta = (
    key: string,
    patch: Partial<SectionImage>
  ) => {
    setDraftImages((prev) =>
      prev.map((img) => (img.key === key ? { ...img, ...patch } : img))
    );
  };

  const removeImage = (key: string) => {
    setDraftImages((prev) => prev.filter((img) => img.key !== key));
  };

  const updateItem = (index: number, patch: Partial<SectionItem>) => {
    setDraftItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  const addItem = () => {
    setDraftItems((prev) => [
      ...prev,
      {
        id: `item_${Date.now()}`,
        title: "New item",
        description: "",
        text: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    setDraftItems((prev) => prev.filter((_, i) => i !== index));
  };

  const reseedPages = async () => {
    if (
      !confirm(
        "This will wipe and re-seed ALL page sections from defaults. Continue?"
      )
    ) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seed-pages?wipe=true", {
        method: "POST",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      await loadPages();
      setMessage("Pages re-seeded from defaults");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reseed failed");
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black">
      <AdminNav />

      <div className="lg:pl-72">
        <div className="flex h-screen">
          {/* Pages list */}
          <div className="w-72 border-r border-white/10 bg-dark-gray/50 overflow-y-auto shrink-0">
            <div className="p-5 border-b border-white/10">
              <h2 className="text-lg font-bold text-white mb-1">Website Pages</h2>
              <p className="text-xs text-white/50 mb-3">
                Section content & images stored in MongoDB
              </p>
              <div className="flex gap-2">
                <button
                  onClick={loadPages}
                  className="flex-1 text-xs py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reload
                </button>
                <button
                  onClick={reseedPages}
                  className="flex-1 text-xs py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                >
                  Reseed
                </button>
              </div>
            </div>

            <div className="p-3 space-y-1.5">
              {loading && pages.length === 0 ? (
                <div className="p-6 text-center text-white/40 text-sm flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading from database…
                </div>
              ) : (
                pages.map((page) => (
                  <button
                    key={page.slug}
                    onClick={() => selectPage(page)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-lg transition-all ${
                      selectedPage?.slug === page.slug
                        ? "bg-orange text-white shadow-lg shadow-orange/20"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-xl">{page.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{page.name}</div>
                        <div className="text-[11px] opacity-70">
                          {page.path} · {page.sections.length} sections
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Sections list */}
          {selectedPage && (
            <div className="w-56 border-r border-white/10 bg-black/40 overflow-y-auto shrink-0">
              <div className="p-4 border-b border-white/10">
                <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
                  Sections
                </div>
                <div className="font-semibold text-white text-sm">
                  {selectedPage.name}
                </div>
              </div>
              <div className="p-2 space-y-1">
                {selectedPage.sections
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <button
                      key={section.key}
                      onClick={() => setActiveSectionKey(section.key)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                        activeSectionKey === section.key
                          ? "bg-orange/20 text-orange border border-orange/40"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="font-medium">{section.title}</div>
                      <div className="text-[10px] opacity-60 mt-0.5">
                        {Object.keys(section.fields || {}).length} fields ·{" "}
                        {(section.images || []).length} images ·{" "}
                        {(section.items || []).length} items
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Editor */}
          <div className="flex-1 overflow-y-auto">
            {error && (
              <div className="m-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="m-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
                {message}
              </div>
            )}

            {activeSection && selectedPage ? (
              <div className="p-6 lg:p-8 max-w-4xl">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                      {activeSection.title}
                    </h1>
                    <p className="text-white/50 text-sm">
                      {selectedPage.name} → section key:{" "}
                      <code className="text-orange/80">{activeSection.key}</code>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={selectedPage.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center gap-2 text-sm py-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </a>
                    <button
                      onClick={handleSaveSection}
                      disabled={saving}
                      className="btn-primary flex items-center gap-2 text-sm py-2"
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {saving ? "Saving…" : "Save Section"}
                    </button>
                  </div>
                </div>

                {/* Text fields */}
                <div className="glass-effect rounded-xl border border-white/10 p-6 mb-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange" />
                    Text Content
                  </h2>

                  {Object.keys(draftFields).length === 0 ? (
                    <p className="text-white/40 text-sm">
                      No text fields in this section.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(draftFields).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
                            {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                          </label>
                          {value.length > 80 || key.includes("description") || key.includes("paragraph") ? (
                            <textarea
                              value={value}
                              onChange={(e) =>
                                setDraftFields((prev) => ({
                                  ...prev,
                                  [key]: e.target.value,
                                }))
                              }
                              rows={3}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-orange/50"
                            />
                          ) : (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) =>
                                setDraftFields((prev) => ({
                                  ...prev,
                                  [key]: e.target.value,
                                }))
                              }
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-orange/50"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Images */}
                <div className="glass-effect rounded-xl border border-white/10 p-6 mb-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-orange" />
                    Section Images
                  </h2>

                  <ImageUploadField
                    label="Upload new section image"
                    folder="pages"
                    value=""
                    altHint={activeSection?.title || selectedPage?.name}
                    onChange={(url) => {
                      if (!url) return;
                      const key = `image_${Date.now()}`;
                      setDraftImages((prev) => [
                        ...prev,
                        {
                          key,
                          url,
                          alt: activeSection?.title || "Section image",
                        },
                      ]);
                      setMessage(
                        "Image uploaded — click Save Section to store in database"
                      );
                    }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {draftImages.map((image) => (
                      <div
                        key={image.key}
                        className="rounded-xl border border-white/10 overflow-hidden bg-white/5"
                      >
                        <div className="relative aspect-video bg-black/40">
                          {image.url ? (
                            <Image
                              src={resolveCmsImageUrl(image.url)}
                              alt={image.alt || image.key}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 40vw"
                              unoptimized={image.url.startsWith("/api/uploads/")}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="text-[10px] text-orange/80 uppercase tracking-wide">
                            key: {image.key}
                          </div>
                          <ImageUploadField
                            label="Replace image"
                            folder="pages"
                            value={image.url}
                            altHint={image.alt}
                            onChange={(url) =>
                              updateImageMeta(image.key, {
                                url,
                                alt: image.alt,
                              })
                            }
                          />
                          <input
                            type="text"
                            value={image.alt}
                            onChange={(e) =>
                              updateImageMeta(image.key, { alt: e.target.value })
                            }
                            placeholder="Alt text"
                            className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-sm text-white"
                          />
                          <button
                            onClick={() => removeImage(image.key)}
                            className="px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {draftImages.length === 0 && (
                      <div className="col-span-full text-center py-8 text-white/40 text-sm">
                        No images in this section
                      </div>
                    )}
                  </div>
                </div>

                {/* Items (cards / list) */}
                <div className="glass-effect rounded-xl border border-white/10 p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">
                      Section Items / Cards
                    </h2>
                    <button
                      onClick={addItem}
                      className="btn-outline text-sm py-2 px-4 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>

                  {draftItems.length === 0 ? (
                    <p className="text-white/40 text-sm">
                      No list items in this section.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {draftItems.map((item, index) => (
                        <div
                          key={item.id || index}
                          className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-white/40">
                              Item #{index + 1}
                            </span>
                            <button
                              onClick={() => removeItem(index)}
                              className="text-red-300 hover:text-red-200 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              value={item.title || ""}
                              onChange={(e) =>
                                updateItem(index, { title: e.target.value })
                              }
                              placeholder="Title"
                              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white"
                            />
                            <input
                              value={item.city || ""}
                              onChange={(e) =>
                                updateItem(index, { city: e.target.value })
                              }
                              placeholder="City"
                              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white"
                            />
                            <input
                              value={item.number || ""}
                              onChange={(e) =>
                                updateItem(index, { number: e.target.value })
                              }
                              placeholder="Number (e.g. 01)"
                              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white"
                            />
                            <input
                              value={item.link || ""}
                              onChange={(e) =>
                                updateItem(index, { link: e.target.value })
                              }
                              placeholder="Link"
                              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white"
                            />
                          </div>
                          <textarea
                            value={item.description || item.text || ""}
                            onChange={(e) =>
                              updateItem(index, {
                                description: e.target.value,
                                text: e.target.value,
                              })
                            }
                            placeholder="Description / text"
                            rows={2}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white"
                          />
                          <input
                            value={(item.features || []).join(", ")}
                            onChange={(e) =>
                              updateItem(index, {
                                features: e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean),
                              })
                            }
                            placeholder="Features (comma separated)"
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white"
                          />
                          <ImageUploadField
                            label="Item image"
                            folder="pages"
                            value={item.image || ""}
                            altHint={item.imageAlt || item.title}
                            onChange={(url) =>
                              updateItem(index, {
                                image: url,
                                imageAlt: item.imageAlt || item.title,
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end pb-12">
                  <button
                    onClick={handleSaveSection}
                    disabled={saving}
                    className="btn-primary flex items-center gap-2 px-8"
                  >
                    {saving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    {saving ? "Saving to MongoDB…" : "Save Section to Database"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Select a page & section
                  </h3>
                  <p className="text-white/60">
                    Edit text, images, and cards — then save to MongoDB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
