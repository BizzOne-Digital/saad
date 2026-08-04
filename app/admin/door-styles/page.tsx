"use client";

import { useCallback, useEffect, useState } from "react";
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
} from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  DOOR_STYLE_CATEGORIES,
  primaryDoorStyleImage,
  type DoorStyleDTO,
  type DoorStyleImageDTO,
} from "@/lib/door-styles-seed";
import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";

const emptyStyle = (): Partial<DoorStyleDTO> => ({
  modelName: "",
  slug: "",
  description: "",
  size: "",
  colour: "",
  windowStyle: "",
  material: "",
  category: ["steel"],
  images: [],
  featured: false,
  published: true,
  order: 99,
});

export default function AdminDoorStylesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [styles, setStyles] = useState<DoorStyleDTO[]>([]);
  const [editing, setEditing] = useState<Partial<DoorStyleDTO> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadStyles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/door-styles?all=1", { cache: "no-store" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to load");
      setStyles(data.styles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load door styles");
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
    loadStyles();
  }, [router, loadStyles]);

  const openNew = () => {
    setEditing(emptyStyle());
    setIsNew(true);
    setMessage(null);
    setError(null);
  };

  const openEdit = (style: DoorStyleDTO) => {
    setEditing(JSON.parse(JSON.stringify(style)));
    setIsNew(false);
    setMessage(null);
    setError(null);
  };

  const handleSave = async () => {
    if (!editing?.modelName?.trim()) {
      setError("Model name is required");
      return;
    }
    if (!editing.images?.length) {
      setError("Add at least one photo");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...editing,
        slug:
          editing.slug ||
          editing.modelName!
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
      };
      const res = await fetch(
        isNew ? "/api/door-styles" : `/api/door-styles/${editing._id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Save failed");
      setMessage("Door style saved");
      setEditing(null);
      await loadStyles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this door style?")) return;
    try {
      const res = await fetch(`/api/door-styles/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Delete failed");
      setMessage("Deleted");
      await loadStyles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const reseed = async () => {
    if (!confirm("Wipe and reseed all door styles from defaults?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/door-styles?reseed=1", { method: "PUT" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Reseed failed");
      setMessage(data.message);
      setEditing(null);
      await loadStyles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reseed failed");
    } finally {
      setLoading(false);
    }
  };

  const updateImage = (index: number, patch: Partial<DoorStyleImageDTO>) => {
    if (!editing) return;
    const images = [...(editing.images || [])];
    images[index] = { ...images[index], ...patch };
    setEditing({ ...editing, images });
  };

  const removeImage = (index: number) => {
    if (!editing) return;
    setEditing({
      ...editing,
      images: (editing.images || []).filter((_, i) => i !== index),
    });
  };

  const toggleCategory = (cat: string) => {
    if (!editing) return;
    const current = editing.category || [];
    setEditing({
      ...editing,
      category: current.includes(cat)
        ? current.filter((c) => c !== cat)
        : [...current, cat],
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white flex">
      <AdminNav />
      <main className="flex-1 lg:ml-72 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Door Styles</h1>
            <p className="text-white/50 text-sm mt-1">
              Multi-photo model galleries with size, colour & window details
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={reseed} className="btn-outline flex items-center gap-2 text-sm">
              <RefreshCw className="w-4 h-4" /> Reseed
            </button>
            <a href="/door-types" target="_blank" className="btn-outline flex items-center gap-2 text-sm">
              <Eye className="w-4 h-4" /> View Page
            </a>
            <button onClick={openNew} className="btn-primary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" /> Add Door Style
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/15 border border-green-500/30 text-green-300 text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-white/50 py-16">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading…
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {styles.map((style) => (
              <div
                key={style._id}
                className="rounded-xl border border-white/10 overflow-hidden bg-white/5"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={resolveCmsImageUrl(primaryDoorStyleImage(style))}
                    alt={style.modelName}
                    fill
                    className="object-cover"
                    sizes="400px"
                    unoptimized={primaryDoorStyleImage(style).startsWith("/api/uploads/")}
                  />
                  <div className="absolute top-2 right-2 text-xs bg-black/70 px-2 py-1 rounded">
                    {style.images?.length || 0} photos
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-bold">{style.modelName}</h3>
                  <p className="text-xs text-white/50">
                    {style.colour || "—"} · {style.size || "—"}
                  </p>
                  <p className="text-xs text-white/40">{style.windowStyle || "No windows specified"}</p>
                  <div className="flex gap-2 pt-3">
                    <button
                      onClick={() => openEdit(style)}
                      className="btn-outline text-xs py-2 px-3 flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(style._id)}
                      className="px-3 py-2 rounded-lg bg-red-500/15 text-red-300 text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {editing && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-3xl bg-dark-gray border border-white/10 rounded-2xl p-6 my-8 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {isNew ? "New Door Style" : "Edit Door Style"}
                </h2>
                <button onClick={() => setEditing(null)}>
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <Field label="Model name *">
                <input
                  className="field"
                  value={editing.modelName || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, modelName: e.target.value })
                  }
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Size">
                  <input
                    className="field"
                    placeholder='e.g. 16′ × 7′'
                    value={editing.size || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, size: e.target.value })
                    }
                  />
                </Field>
                <Field label="Colour">
                  <input
                    className="field"
                    placeholder="e.g. Black / White / Brown"
                    value={editing.colour || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, colour: e.target.value })
                    }
                  />
                </Field>
                <Field label="Window style">
                  <input
                    className="field"
                    placeholder="e.g. Full-view glass / Top row windows"
                    value={editing.windowStyle || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, windowStyle: e.target.value })
                    }
                  />
                </Field>
                <Field label="Material">
                  <input
                    className="field"
                    placeholder="e.g. Insulated Steel"
                    value={editing.material || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, material: e.target.value })
                    }
                  />
                </Field>
              </div>

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
                  {DOOR_STYLE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs capitalize ${
                        (editing.category || []).includes(cat)
                          ? "bg-orange text-white"
                          : "bg-white/5 text-white/60"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(editing.featured)}
                    onChange={(e) =>
                      setEditing({ ...editing, featured: e.target.checked })
                    }
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editing.published !== false}
                    onChange={(e) =>
                      setEditing({ ...editing, published: e.target.checked })
                    }
                  />
                  Published
                </label>
                <Field label="Order">
                  <input
                    type="number"
                    className="field w-24"
                    value={editing.order ?? 99}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        order: Number(e.target.value) || 0,
                      })
                    }
                  />
                </Field>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-4">
                <h3 className="font-bold">Photo Gallery</h3>
                <ImageUploadField
                  label="Add photo"
                  folder="products"
                  value=""
                  altHint={editing.modelName || "Door style"}
                  onChange={(url) => {
                    if (!url) return;
                    setEditing({
                      ...editing,
                      images: [
                        ...(editing.images || []),
                        {
                          url,
                          alt: editing.modelName || "Door style photo",
                        },
                      ],
                    });
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <ImageUploadField
                          label="Replace"
                          folder="products"
                          value={img.url}
                          altHint={img.alt}
                          onChange={(url) =>
                            updateImage(index, { url, alt: img.alt })
                          }
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="px-3 py-2 bg-red-500/20 text-red-300 rounded-lg text-xs"
                        >
                          Remove photo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setEditing(null)} className="btn-outline">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary flex items-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
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
      </main>
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
