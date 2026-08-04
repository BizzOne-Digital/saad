"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  HelpCircle,
  ChevronDown,
  Save,
  Loader2,
  X,
  RefreshCw,
  Search,
} from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import { FAQ_CATEGORIES, type FaqDTO } from "@/lib/faqs-seed";

const emptyFaq = (): Partial<FaqDTO> => ({
  question: "",
  answer: "",
  category: "Installation",
  published: true,
  order: 99,
});

export default function AdminFAQsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [faqs, setFaqs] = useState<FaqDTO[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<FaqDTO> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const loadFaqs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/faqs?all=1", { cache: "no-store" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to load FAQs");
      setFaqs(data.faqs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load FAQs");
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
    loadFaqs();
  }, [router, loadFaqs]);

  const categories = useMemo(() => {
    const set = new Set<string>([
      ...FAQ_CATEGORIES,
      ...faqs.map((f) => f.category),
    ]);
    return Array.from(set).sort();
  }, [faqs]);

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchCat =
        filterCategory === "all" || faq.category === filterCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [faqs, filterCategory, search]);

  const openNew = () => {
    setEditing(emptyFaq());
    setIsNew(true);
    setMessage(null);
    setError(null);
  };

  const openEdit = (faq: FaqDTO) => {
    setEditing({ ...faq });
    setIsNew(false);
    setMessage(null);
    setError(null);
  };

  const handleSave = async () => {
    if (!editing?.question?.trim() || !editing?.answer?.trim()) {
      setError("Question and answer are required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(
        isNew ? "/api/faqs" : `/api/faqs/${editing._id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Save failed");
      setMessage(`Saved FAQ — live on /faq`);
      setEditing(null);
      await loadFaqs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Delete this FAQ?\n\n${question}`)) return;
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMessage("FAQ deleted");
      if (editing?._id === id) setEditing(null);
      await loadFaqs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const reseed = async () => {
    if (!confirm("Wipe all FAQs and reload the default set?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/faqs?reseed=1", { method: "PUT" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setEditing(null);
      await loadFaqs();
      setMessage(`Reseeded ${data.count} FAQs`);
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
        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">FAQs</h1>
              <p className="text-white/60">
                Edit questions shown on the public /faq page (MongoDB)
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
              <a
                href="/faq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 text-sm"
              >
                Preview
              </a>
              <button
                onClick={openNew}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add FAQ
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
              <h3 className="text-sm text-white/60 mb-2">Total FAQs</h3>
              <p className="text-3xl font-bold text-white">{faqs.length}</p>
            </div>
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">Published</h3>
              <p className="text-3xl font-bold text-white">
                {faqs.filter((f) => f.published).length}
              </p>
            </div>
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">Categories</h3>
              <p className="text-3xl font-bold text-white">
                {Array.from(new Set(faqs.map((f) => f.category))).length}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search FAQs…"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-white/50">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading from database…
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((faq) => (
                <div
                  key={faq._id}
                  className="glass-effect rounded-xl border border-white/10 overflow-hidden hover:border-orange/30 transition-all"
                >
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === faq._id ? null : faq._id!)
                    }
                    className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-orange" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-white/5 text-white/60 text-xs rounded">
                            {faq.category}
                          </span>
                          <span className="px-2 py-0.5 bg-white/5 text-white/40 text-xs rounded">
                            #{faq.order}
                          </span>
                          {faq.published ? (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
                              Published
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded">
                              Draft
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-white">
                          {faq.question}
                        </h3>
                        {expandedId === faq._id && (
                          <p className="text-white/70 leading-relaxed mt-3 text-sm">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-white/60 transition-transform flex-shrink-0 ${
                        expandedId === faq._id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedId === faq._id && (
                    <div className="px-5 pb-5 flex items-center gap-2">
                      <button
                        onClick={() => openEdit(faq)}
                        className="flex-1 btn-outline py-2 flex items-center justify-center gap-2 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq._id!, faq.question)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center gap-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-12 text-white/40">
                  No FAQs match your filters
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-dark-gray p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {isNew ? "Add FAQ" : "Edit FAQ"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                  Question
                </label>
                <input
                  value={editing.question || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, question: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                  placeholder="Enter the question"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                  Answer
                </label>
                <textarea
                  rows={6}
                  value={editing.answer || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, answer: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                  placeholder="Enter the answer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                    Category
                  </label>
                  <input
                    list="faq-categories"
                    value={editing.category || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                  <datalist id="faq-categories">
                    {categories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                    Order
                  </label>
                  <input
                    type="number"
                    value={editing.order ?? 0}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        order: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={!!editing.published}
                  onChange={(e) =>
                    setEditing({ ...editing, published: e.target.checked })
                  }
                />
                Published on /faq
              </label>
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
    </div>
  );
}
