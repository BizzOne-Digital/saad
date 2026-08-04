"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLeadsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Check authentication
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    // In production, fetch from API
    // For now, show sample data
    setLeads([
      {
        id: 1,
        name: "John Smith",
        email: "john@example.com",
        phone: "416-555-0123",
        message: "I need a new garage door installed. Can you provide a quote?",
        createdAt: new Date().toISOString(),
        status: "new",
      },
    ]);
  }, [router]);

  if (!mounted) return null;

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      setLeads(leads.filter((lead) => lead.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <AdminNav />

      {/* Main Content */}
      <div className="lg:pl-72">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Leads</h1>
            <p className="text-white/60">
              Manage contact form submissions and inquiries
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">Total Leads</h3>
              <p className="text-3xl font-bold text-white">{leads.length}</p>
            </div>
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">New</h3>
              <p className="text-3xl font-bold text-white">
                {leads.filter((l) => l.status === "new").length}
              </p>
            </div>
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">This Month</h3>
              <p className="text-3xl font-bold text-white">{leads.length}</p>
            </div>
          </div>

          {/* Leads List */}
          <div className="glass-effect rounded-xl border border-white/10">
            {leads.length === 0 ? (
              <div className="p-12 text-center">
                <Mail className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  No leads yet
                </h3>
                <p className="text-white/60">
                  Contact form submissions will appear here
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Message
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {leads.map((lead, index) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-white/5"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center">
                              <span className="text-orange font-bold">
                                {lead.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">
                                {lead.name}
                              </p>
                              {lead.status === "new" && (
                                <span className="text-xs text-orange">New</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-white/80">
                              <Mail className="w-4 h-4" />
                              {lead.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/80">
                              <Phone className="w-4 h-4" />
                              {lead.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-white/80 line-clamp-2 max-w-md">
                            {lead.message}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Calendar className="w-4 h-4" />
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="View details"
                            >
                              <Eye className="w-4 h-4 text-white/60" />
                            </button>
                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-dark-gray rounded-2xl border border-white/10 p-8"
          >
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">
              Lead Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Name
                </label>
                <p className="text-white">{selectedLead.name}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white/60 mb-2">
                    Email
                  </label>
                  <p className="text-white">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/60 mb-2">
                    Phone
                  </label>
                  <p className="text-white">{selectedLead.phone}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Message
                </label>
                <p className="text-white leading-relaxed">
                  {selectedLead.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Submitted
                </label>
                <p className="text-white">
                  {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="btn-primary flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="btn-outline flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
