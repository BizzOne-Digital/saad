"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  Loader2,
  X,
  RefreshCw,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import {
  GALLERY_CATEGORIES,
  primaryImageUrl,
  type GalleryProjectDTO,
  type GalleryImageDTO,
} from "@/lib/gallery-seed";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";

const emptyProject = (): Partial<GalleryProjectDTO> => ({
  title: "",
  slug: "",
  city: "",
  description: "",
  category: ["installations"],
  images: [],
  featured: false,
  published: true,
  order: 99,
});

export default function AdminGalleryPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<GalleryProjectDTO[]>([]);
  const [editing, setEditing] = useState<Partial<GalleryProjectDTO> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gallery?all=1", { cache: "no-store" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to load");
      setProjects(data.projects);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery");
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
    loadProjects();
  }, [router, loadProjects]);

  const totalImages = useMemo(
    () =>
      projects.reduce(
        (sum, p) =>
          sum +
          (p.images?.length || 0) +
          (p.beforeImage ? 1 : 0) +
          (p.afterImage ? 1 : 0),
        0
      ),
    [projects]
  );

  const openNew = () => {
    setEditing(emptyProject());
    setIsNew(true);
    setMessage(null);
    setError(null);
  };

  const openEdit = (project: GalleryProjectDTO) => {
    setEditing(JSON.parse(JSON.stringify(project)));
    setIsNew(false);
    setMessage(null);
    setError(null);
  };

  const handleSave = async () => {
    if (!editing?.title?.trim() || !editing?.city?.trim()) {
      setError("Title and city are required");
      return;
    }
    if (!editing.images?.length && !editing.afterImage) {
      setError("Add at least one image");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...editing,
        slug:
          editing.slug ||
          editing.title!
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
      };
      const res = await fetch(
        isNew ? "/api/gallery" : `/api/gallery/${editing._id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Save failed");
      setMessage(`Saved “${data.project.title}” — live on /gallery`);
      setEditing(null);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete project “${title}”?`)) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMessage("Project deleted");
      if (editing?._id === id) setEditing(null);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const reseed = async () => {
    if (!confirm("Wipe gallery and reload default projects with images?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/gallery?reseed=1", { method: "PUT" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setEditing(null);
      await loadProjects();
      setMessage(`Reseeded ${data.count} gallery projects`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reseed failed");
      setLoading(false);
    }
  };

  const toggleCategory = (cat: string) => {
    if (!editing) return;
    const current = editing.category || [];
    const next = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    setEditing({ ...editing, category: next.length ? next : [cat] });
  };

  const updateImage = (index: number, patch: Partial<GalleryImageDTO>) => {
    if (!editing?.images) return;
    const images = [...editing.images];
    images[index] = { ...images[index], ...patch };
    setEditing({ ...editing, images });
  };

  const removeImage = (index: number) => {
    if (!editing?.images) return;
    setEditing({
      ...editing,
      images: editing.images.filter((_, i) => i !== index),
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black">
      <AdminNav />

      <div className="lg:pl-72">
        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Gallery</h1>
              <p className="text-white/60">
                Manage all project photos — saved in MongoDB
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={reseed} className="btn-outline flex items-center gap-2 text-sm">
                <RefreshCw className="w-4 h-4" />
                Reseed
              </button>
              <a
                href="/gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 text-sm"
              >
                <Eye className="w-4 h-4" />
                Preview
              </a>
              <button onClick={openNew} className="btn-primary flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Project
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
              <h3 className="text-sm text-white/60 mb-2">Total Projects</h3>
              <p className="text-3xl font-bold text-white">{projects.length}</p>
            </div>
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">Featured</h3>
              <p className="text-3xl font-bold text-white">
                {projects.filter((p) => p.featured).length}
              </p>
            </div>
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">Total Images</h3>
              <p className="text-3xl font-bold text-white">{totalImages}</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-white/50">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading from database…
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const img = primaryImageUrl(project);
                return (
                  <div
                    key={project._id}
                    className="glass-effect rounded-xl border border-white/10 overflow-hidden hover:border-orange/30 transition-all"
                  >
                    <div className="aspect-video relative bg-white/5">
                      {img ? (
                        <Image
                          src={resolveCmsImageUrl(img)}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized={img.startsWith("/api/uploads/")}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-white/20" />
                        </div>
                      )}
                      {project.featured && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-orange rounded-full text-xs font-bold">
                          Featured
                        </div>
                      )}
                      {!project.published && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-500/90 text-black rounded-full text-xs font-bold">
                          Draft
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-1">{project.title}</h3>
                      <p className="text-sm text-white/50 mb-2">
                        {project.city} · {(project.images || []).length} image(s)
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {(project.category || []).map((c) => (
                          <span
                            key={c}
                            className="px-2 py-0.5 text-[10px] rounded bg-white/5 text-white/60"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(project)}
                          className="flex-1 btn-outline py-2 text-sm flex items-center justify-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(project._id!, project.title)
                          }
                          className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 bg-dark-gray p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {isNew ? "Add Gallery Project" : "Edit Gallery Project"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title">
                  <input
                    className="field"
                    value={editing.title || ""}
                    onChange={(e) => {
                      const title = e.target.value;
                      setEditing({
                        ...editing,
                        title,
                        ...(isNew
                          ? {
                              slug: title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-|-$/g, ""),
                            }
                          : {}),
                      });
                    }}
                  />
                </Field>
                <Field label="City">
                  <input
                    className="field"
                    value={editing.city || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, city: e.target.value })
                    }
                  />
                </Field>
              </div>

              <Field label="Slug">
                <input
                  className="field"
                  value={editing.slug || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, slug: e.target.value })
                  }
                />
              </Field>

              <Field label="Description">
                <textarea
                  className="field"
                  rows={3}
                  value={editing.description || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                />
              </Field>

              <div>
                <label className="block text-xs uppercase tracking-wide text-white/50 mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {GALLERY_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        (editing.category || []).includes(cat)
                          ? "bg-orange text-white"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Order">
                  <input
                    type="number"
                    className="field"
                    value={editing.order ?? 0}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        order: Number(e.target.value),
                      })
                    }
                  />
                </Field>
                <label className="flex items-center gap-2 text-sm text-white/80 pt-6">
                  <input
                    type="checkbox"
                    checked={!!editing.featured}
                    onChange={(e) =>
                      setEditing({ ...editing, featured: e.target.checked })
                    }
                  />
                  Featured (homepage)
                </label>
                <label className="flex items-center gap-2 text-sm text-white/80 pt-6">
                  <input
                    type="checkbox"
                    checked={!!editing.published}
                    onChange={(e) =>
                      setEditing({ ...editing, published: e.target.checked })
                    }
                  />
                  Published
                </label>
              </div>

              {/* Images */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white">Project Images</h3>
                </div>

                <ImageUploadField
                  label="Add / upload new image"
                  folder="gallery"
                  value=""
                  altHint={editing.title || "Gallery project"}
                  onChange={(url) => {
                    if (!url) return;
                    setEditing({
                      ...editing,
                      images: [
                        ...(editing.images || []),
                        {
                          url,
                          alt: editing.title || "Gallery image",
                          type: "main",
                        },
                      ],
                    });
                    setMessage("Image uploaded — click Save to store project");
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {(editing.images || []).map((img, index) => (
                    <div
                      key={`${img.url}-${index}`}
                      className="rounded-xl border border-white/10 overflow-hidden bg-black/30"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={resolveCmsImageUrl(img.url)}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="300px"
                          unoptimized={img.url.startsWith("/api/uploads/")}
                        />
                      </div>
                      <div className="p-3 space-y-2">
                        <input
                          className="field text-sm"
                          value={img.alt}
                          onChange={(e) =>
                            updateImage(index, { alt: e.target.value })
                          }
                          placeholder="Alt text"
                        />
                        <input
                          className="field text-sm"
                          value={img.url}
                          onChange={(e) =>
                            updateImage(index, { url: e.target.value })
                          }
                          placeholder="Image URL"
                        />
                        <div className="flex gap-2">
                          <select
                            className="field text-sm flex-1"
                            value={img.type}
                            onChange={(e) =>
                              updateImage(index, {
                                type: e.target.value as GalleryImageDTO["type"],
                              })
                            }
                          >
                            <option value="main">Main</option>
                            <option value="before">Before</option>
                            <option value="after">After</option>
                          </select>
                          <button
                            onClick={() => removeImage(index)}
                            className="px-3 py-2 bg-red-500/20 text-red-300 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <ImageUploadField
                          label="Replace"
                          folder="gallery"
                          value={img.url}
                          altHint={img.alt}
                          onChange={(url) =>
                            updateImage(index, {
                              url,
                              alt: img.alt,
                            })
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {(editing.images || []).length === 0 && (
                  <p className="text-sm text-white/40 text-center py-6">
                    No images yet — upload at least one
                  </p>
                )}
              </div>

              {/* Before / After optional */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <ImageUploadField
                  label="Before image (optional)"
                  folder="gallery"
                  value={editing.beforeImage?.url || ""}
                  altHint="Before"
                  onChange={(url) =>
                    setEditing({
                      ...editing,
                      beforeImage: url
                        ? {
                            url,
                            alt: editing.beforeImage?.alt || "Before",
                            type: "before",
                          }
                        : undefined,
                    })
                  }
                />
                <ImageUploadField
                  label="After image (optional)"
                  folder="gallery"
                  value={editing.afterImage?.url || ""}
                  altHint="After"
                  onChange={(url) =>
                    setEditing({
                      ...editing,
                      afterImage: url
                        ? {
                            url,
                            alt: editing.afterImage?.alt || "After",
                            type: "after",
                          }
                        : undefined,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 btn-outline py-3"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
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
        </div>
      )}

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
      <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
