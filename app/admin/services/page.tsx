"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Loader2,
  X,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import Image from "next/image";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { ServiceDTO } from "@/lib/service-types";
import type { ServiceCardDTO as IServiceCard } from "@/lib/service-types";

const emptyService = (): Partial<ServiceDTO> => ({
  title: "",
  slug: "",
  description: "",
  content: "",
  benefits: [],
  icon: "Wrench",
  image: "",
  imageAlt: "",
  price: "",
  featured: false,
  published: true,
  order: 99,
  category: "general",
  urgent: false,
  eyebrow: "",
  heroImage: "",
  heroImageAlt: "",
  includesHeading: "What's Included",
  includesDescription: "",
  includes: [],
  cardsHeading: "",
  cardsDescription: "",
  cards: [],
  whyHeading: "",
  whyItems: [],
  ctaHeading: "",
  ctaDescription: "",
  ctaPrimary: "Request Free Quote",
  ctaPrimaryLink: "/contact",
  ctaSecondary: "Call 647-299-0283",
  ctaSecondaryLink: "tel:+16472990283",
  videoSrc: "",
  videoTitle: "",
  videoDescription: "",
  videoThumbnail: "",
  phoneDisplay: "647-299-0283",
  seo: { title: "", description: "" },
});

export default function AdminServicesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [editing, setEditing] = useState<Partial<ServiceDTO> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"basic" | "detail" | "cards" | "seo">("basic");

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/services?all=1", { cache: "no-store" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to load");
      setServices(data.services);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem("adminAuth")) {
      router.push("/admin/login");
      return;
    }
    loadServices();
  }, [router, loadServices]);

  const openEdit = (service: ServiceDTO) => {
    setEditing(JSON.parse(JSON.stringify(service)));
    setIsNew(false);
    setTab("basic");
    setMessage(null);
    setError(null);
  };

  const openNew = () => {
    setEditing(emptyService());
    setIsNew(true);
    setTab("basic");
  };

  const updateField = <K extends keyof ServiceDTO>(key: K, value: ServiceDTO[K]) => {
    setEditing((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = async () => {
    if (!editing?.title || !editing?.slug) {
      setError("Title and slug are required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const url = isNew
        ? "/api/services"
        : `/api/services/${editing.slug}`;
      // If renaming while editing, use original slug from services list match by _id
      let saveUrl = url;
      if (!isNew && editing._id) {
        const original = services.find((s) => s._id === editing._id);
        saveUrl = `/api/services/${original?.slug || editing.slug}`;
      }

      const res = await fetch(saveUrl, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Save failed");

      setMessage(`Saved “${data.service.title}” — live on /services/${data.service.slug}`);
      setEditing(data.service);
      setIsNew(false);
      await loadServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete “${title}”? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/services/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMessage("Service deleted");
      if (editing?.slug === slug) setEditing(null);
      await loadServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const reseed = async () => {
    if (!confirm("Wipe all services and reload defaults (with full detail pages)?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/services?reseed=1", { method: "PUT" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setEditing(null);
      await loadServices();
      setMessage("Services reseeded with detail page content");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reseed failed");
      setLoading(false);
    }
  };

  const listToLines = (arr: string[] | undefined) => (arr || []).join("\n");
  const linesToList = (text: string) =>
    text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black">
      <AdminNav />

      <div className="lg:pl-72">
        {!editing ? (
          <div className="p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Services</h1>
                <p className="text-white/60">
                  Edit listing + each service detail page (stored in MongoDB)
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={reseed}
                  className="btn-outline flex items-center gap-2 text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reseed
                </button>
                <button
                  onClick={openNew}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Service
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
                {message}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="glass-effect rounded-xl border border-white/10 p-6">
                <h3 className="text-sm text-white/60 mb-2">Total Services</h3>
                <p className="text-3xl font-bold text-white">{services.length}</p>
              </div>
              <div className="glass-effect rounded-xl border border-white/10 p-6">
                <h3 className="text-sm text-white/60 mb-2">Published</h3>
                <p className="text-3xl font-bold text-white">
                  {services.filter((s) => s.published).length}
                </p>
              </div>
              <div className="glass-effect rounded-xl border border-white/10 p-6">
                <h3 className="text-sm text-white/60 mb-2">Featured</h3>
                <p className="text-3xl font-bold text-white">
                  {services.filter((s) => s.featured).length}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center gap-2 text-white/50 py-12 justify-center">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading from database…
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div
                    key={service._id || service.slug}
                    className="glass-effect rounded-xl border border-white/10 p-6 hover:border-orange/30 transition-all"
                  >
                    <div className="flex gap-4 mb-4">
                      <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-white/5 shrink-0">
                        {(service.image || service.heroImage) && (
                          <Image
                            src={service.image || service.heroImage || ""}
                            alt={service.imageAlt || service.title}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1 truncate">
                          {service.title}
                        </h3>
                        <p className="text-sm text-white/60 line-clamp-2 mb-2">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="text-orange font-semibold">
                            {service.price || "No price"}
                          </span>
                          <span className="px-2 py-0.5 bg-white/10 rounded">
                            /services/{service.slug}
                          </span>
                          {service.featured && (
                            <span className="px-2 py-0.5 bg-orange/20 text-orange rounded">
                              Featured
                            </span>
                          )}
                          {service.published ? (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded">
                              Published
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">
                              Draft
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-white/10">
                      <button
                        onClick={() => openEdit(service)}
                        className="flex-1 btn-outline py-2 flex items-center justify-center gap-2 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Detail Page
                      </button>
                      <a
                        href={`/services/${service.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 btn-outline flex items-center gap-2 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(service.slug, service.title)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 lg:p-8 max-w-5xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditing(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {isNew ? "New Service" : editing.title}
                  </h1>
                  <p className="text-sm text-white/50">
                    Detail page: /services/{editing.slug || "…"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {!isNew && editing.slug && (
                  <a
                    href={`/services/${editing.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </a>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saving ? "Saving…" : "Save to Database"}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
                {message}
              </div>
            )}

            <div className="flex gap-2 mb-6 flex-wrap">
              {(
                [
                  ["basic", "Basic / Listing"],
                  ["detail", "Detail Page"],
                  ["cards", "Cards & Why"],
                  ["seo", "SEO"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    tab === key
                      ? "bg-orange text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === "basic" && (
              <div className="space-y-4 glass-effect rounded-xl border border-white/10 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Title">
                    <input
                      className="field"
                      value={editing.title || ""}
                      onChange={(e) => {
                        updateField("title", e.target.value);
                        if (isNew) {
                          updateField(
                            "slug",
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/^-|-$/g, "")
                          );
                        }
                      }}
                    />
                  </Field>
                  <Field label="Slug (URL)">
                    <input
                      className="field"
                      value={editing.slug || ""}
                      onChange={(e) => updateField("slug", e.target.value)}
                    />
                  </Field>
                </div>
                <Field label="Short description (listing + hero)">
                  <textarea
                    className="field"
                    rows={3}
                    value={editing.description || ""}
                    onChange={(e) => updateField("description", e.target.value)}
                  />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Price">
                    <input
                      className="field"
                      value={editing.price || ""}
                      onChange={(e) => updateField("price", e.target.value)}
                    />
                  </Field>
                  <Field label="Icon (DoorClosed, Wrench, Settings, AlertTriangle, Building2)">
                    <input
                      className="field"
                      value={editing.icon || ""}
                      onChange={(e) => updateField("icon", e.target.value)}
                    />
                  </Field>
                  <Field label="Order">
                    <input
                      type="number"
                      className="field"
                      value={editing.order ?? 0}
                      onChange={(e) =>
                        updateField("order", Number(e.target.value))
                      }
                    />
                  </Field>
                </div>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm text-white/80">
                    <input
                      type="checkbox"
                      checked={!!editing.published}
                      onChange={(e) => updateField("published", e.target.checked)}
                    />
                    Published
                  </label>
                  <label className="flex items-center gap-2 text-sm text-white/80">
                    <input
                      type="checkbox"
                      checked={!!editing.featured}
                      onChange={(e) => updateField("featured", e.target.checked)}
                    />
                    Featured (homepage)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-white/80">
                    <input
                      type="checkbox"
                      checked={!!editing.urgent}
                      onChange={(e) => updateField("urgent", e.target.checked)}
                    />
                    Urgent badge
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImageUploadField
                    label="Listing image"
                    folder="products"
                    value={editing.image || ""}
                    altHint={editing.title || "Service listing"}
                    onChange={(url) => {
                      updateField("image", url);
                      if (url && !editing.heroImage) updateField("heroImage", url);
                    }}
                  />
                  <ImageUploadField
                    label="Hero image (detail page)"
                    folder="products"
                    value={editing.heroImage || ""}
                    altHint={editing.title || "Service hero"}
                    onChange={(url) => updateField("heroImage", url)}
                  />
                </div>
              </div>
            )}

            {tab === "detail" && (
              <div className="space-y-4 glass-effect rounded-xl border border-white/10 p-6">
                <Field label="Eyebrow (badge above H1)">
                  <input
                    className="field"
                    value={editing.eyebrow || ""}
                    onChange={(e) => updateField("eyebrow", e.target.value)}
                  />
                </Field>
                <Field label="Includes section heading">
                  <input
                    className="field"
                    value={editing.includesHeading || ""}
                    onChange={(e) =>
                      updateField("includesHeading", e.target.value)
                    }
                  />
                </Field>
                <Field label="Includes section description">
                  <input
                    className="field"
                    value={editing.includesDescription || ""}
                    onChange={(e) =>
                      updateField("includesDescription", e.target.value)
                    }
                  />
                </Field>
                <Field label="Includes list (one per line)">
                  <textarea
                    className="field font-mono text-sm"
                    rows={8}
                    value={listToLines(editing.includes)}
                    onChange={(e) =>
                      updateField("includes", linesToList(e.target.value))
                    }
                  />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="CTA heading">
                    <input
                      className="field"
                      value={editing.ctaHeading || ""}
                      onChange={(e) => updateField("ctaHeading", e.target.value)}
                    />
                  </Field>
                  <Field label="Phone display">
                    <input
                      className="field"
                      value={editing.phoneDisplay || ""}
                      onChange={(e) =>
                        updateField("phoneDisplay", e.target.value)
                      }
                    />
                  </Field>
                </div>
                <Field label="CTA description">
                  <textarea
                    className="field"
                    rows={2}
                    value={editing.ctaDescription || ""}
                    onChange={(e) =>
                      updateField("ctaDescription", e.target.value)
                    }
                  />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Primary CTA text">
                    <input
                      className="field"
                      value={editing.ctaPrimary || ""}
                      onChange={(e) => updateField("ctaPrimary", e.target.value)}
                    />
                  </Field>
                  <Field label="Primary CTA link">
                    <input
                      className="field"
                      value={editing.ctaPrimaryLink || ""}
                      onChange={(e) =>
                        updateField("ctaPrimaryLink", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Secondary CTA text">
                    <input
                      className="field"
                      value={editing.ctaSecondary || ""}
                      onChange={(e) =>
                        updateField("ctaSecondary", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Secondary CTA link">
                    <input
                      className="field"
                      value={editing.ctaSecondaryLink || ""}
                      onChange={(e) =>
                        updateField("ctaSecondaryLink", e.target.value)
                      }
                    />
                  </Field>
                </div>
                <Field label="Video src (optional)">
                  <input
                    className="field"
                    value={editing.videoSrc || ""}
                    onChange={(e) => updateField("videoSrc", e.target.value)}
                  />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Video title">
                    <input
                      className="field"
                      value={editing.videoTitle || ""}
                      onChange={(e) => updateField("videoTitle", e.target.value)}
                    />
                  </Field>
                  <Field label="Video description">
                    <input
                      className="field"
                      value={editing.videoDescription || ""}
                      onChange={(e) =>
                        updateField("videoDescription", e.target.value)
                      }
                    />
                  </Field>
                </div>
              </div>
            )}

            {tab === "cards" && (
              <div className="space-y-6">
                <div className="glass-effect rounded-xl border border-white/10 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-white">Detail Cards</h2>
                    <button
                      className="btn-outline text-sm py-2 px-3 flex items-center gap-1"
                      onClick={() =>
                        updateField("cards", [
                          ...(editing.cards || []),
                          {
                            title: "New card",
                            description: "",
                            image: "",
                            features: [],
                          },
                        ])
                      }
                    >
                      <Plus className="w-4 h-4" /> Add Card
                    </button>
                  </div>
                  <Field label="Cards heading">
                    <input
                      className="field"
                      value={editing.cardsHeading || ""}
                      onChange={(e) =>
                        updateField("cardsHeading", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Cards description">
                    <input
                      className="field"
                      value={editing.cardsDescription || ""}
                      onChange={(e) =>
                        updateField("cardsDescription", e.target.value)
                      }
                    />
                  </Field>
                  {(editing.cards || []).map((card, index) => (
                    <CardEditor
                      key={index}
                      card={card}
                      onChange={(next) => {
                        const cards = [...(editing.cards || [])];
                        cards[index] = next;
                        updateField("cards", cards);
                      }}
                      onRemove={() => {
                        updateField(
                          "cards",
                          (editing.cards || []).filter((_, i) => i !== index)
                        );
                      }}
                    />
                  ))}
                </div>

                <div className="glass-effect rounded-xl border border-white/10 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-white">Why Choose Items</h2>
                    <button
                      className="btn-outline text-sm py-2 px-3 flex items-center gap-1"
                      onClick={() =>
                        updateField("whyItems", [
                          ...(editing.whyItems || []),
                          { title: "New point", description: "" },
                        ])
                      }
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                  <Field label="Why section heading">
                    <input
                      className="field"
                      value={editing.whyHeading || ""}
                      onChange={(e) => updateField("whyHeading", e.target.value)}
                    />
                  </Field>
                  {(editing.whyItems || []).map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-black/30 border border-white/10 space-y-2"
                    >
                      <div className="flex justify-between">
                        <span className="text-xs text-white/40">#{index + 1}</span>
                        <button
                          onClick={() =>
                            updateField(
                              "whyItems",
                              (editing.whyItems || []).filter((_, i) => i !== index)
                            )
                          }
                        >
                          <X className="w-4 h-4 text-red-300" />
                        </button>
                      </div>
                      <input
                        className="field"
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) => {
                          const whyItems = [...(editing.whyItems || [])];
                          whyItems[index] = { ...item, title: e.target.value };
                          updateField("whyItems", whyItems);
                        }}
                      />
                      <input
                        className="field"
                        placeholder="Description"
                        value={item.description || ""}
                        onChange={(e) => {
                          const whyItems = [...(editing.whyItems || [])];
                          whyItems[index] = {
                            ...item,
                            description: e.target.value,
                          };
                          updateField("whyItems", whyItems);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "seo" && (
              <div className="space-y-4 glass-effect rounded-xl border border-white/10 p-6">
                <Field label="SEO title">
                  <input
                    className="field"
                    value={editing.seo?.title || ""}
                    onChange={(e) =>
                      updateField("seo", {
                        ...(editing.seo || {}),
                        title: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field label="SEO description">
                  <textarea
                    className="field"
                    rows={3}
                    value={editing.seo?.description || ""}
                    onChange={(e) =>
                      updateField("seo", {
                        ...(editing.seo || {}),
                        description: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field label="Long content / notes">
                  <textarea
                    className="field"
                    rows={4}
                    value={editing.content || ""}
                    onChange={(e) => updateField("content", e.target.value)}
                  />
                </Field>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary flex items-center gap-2 px-8"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Save Service to Database
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .field {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: white;
        }
        .field:focus {
          outline: none;
          border-color: rgba(245, 130, 32, 0.5);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

function CardEditor({
  card,
  onChange,
  onRemove,
}: {
  card: IServiceCard;
  onChange: (c: IServiceCard) => void;
  onRemove: () => void;
}) {
  return (
    <div className="p-4 rounded-lg bg-black/30 border border-white/10 space-y-2">
      <div className="flex justify-between">
        <span className="text-xs text-orange/80">Card</span>
        <button onClick={onRemove}>
          <X className="w-4 h-4 text-red-300" />
        </button>
      </div>
      <input
        className="field"
        placeholder="Title"
        value={card.title}
        onChange={(e) => onChange({ ...card, title: e.target.value })}
      />
      <textarea
        className="field"
        rows={2}
        placeholder="Description"
        value={card.description || ""}
        onChange={(e) => onChange({ ...card, description: e.target.value })}
      />
      <input
        className="field"
        placeholder="Badge (optional)"
        value={card.badge || ""}
        onChange={(e) => onChange({ ...card, badge: e.target.value })}
      />
      <ImageUploadField
        label="Card image"
        folder="products"
        value={card.image || ""}
        altHint={card.title}
        onChange={(url) => onChange({ ...card, image: url })}
      />
      <input
        className="field"
        placeholder="Features (comma separated)"
        value={(card.features || []).join(", ")}
        onChange={(e) =>
          onChange({
            ...card,
            features: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
      />
    </div>
  );
}
