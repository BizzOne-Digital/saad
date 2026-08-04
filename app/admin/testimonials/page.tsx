"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    // Sample data
    setTestimonials([
      {
        id: 1,
        customerName: "Michael R.",
        city: "Toronto",
        rating: 5,
        reviewText: "Excellent service from start to finish. The team was professional, on time, and the new door looks amazing. Highly recommend!",
        source: "Google",
        featured: true,
        verified: true,
        date: new Date().toISOString(),
      },
      {
        id: 2,
        customerName: "Sarah L.",
        city: "Mississauga",
        rating: 5,
        reviewText: "Fast emergency repair when our spring broke. They came the same day and had us back up and running in no time. Great pricing too.",
        source: "Google",
        featured: true,
        verified: true,
        date: new Date().toISOString(),
      },
    ]);
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black">
      <AdminNav />

      <div className="lg:pl-72">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Testimonials</h1>
              <p className="text-white/60">Manage customer reviews and ratings</p>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Testimonial
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">Total Reviews</h3>
              <p className="text-3xl font-bold text-white">{testimonials.length}</p>
            </div>
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">Featured</h3>
              <p className="text-3xl font-bold text-white">
                {testimonials.filter((t) => t.featured).length}
              </p>
            </div>
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">Verified</h3>
              <p className="text-3xl font-bold text-white">
                {testimonials.filter((t) => t.verified).length}
              </p>
            </div>
            <div className="glass-effect rounded-xl border border-white/10 p-6">
              <h3 className="text-sm text-white/60 mb-2">Avg Rating</h3>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-white">5.0</p>
                <Star className="w-6 h-6 fill-orange text-orange" />
              </div>
            </div>
          </div>

          {/* Testimonials List */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl border border-white/10 p-6 hover:border-orange/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange font-bold text-lg">
                        {testimonial.customerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white">
                          {testimonial.customerName}
                        </h3>
                        {testimonial.verified && (
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-500 text-xs font-semibold rounded">
                            Verified
                          </span>
                        )}
                        {testimonial.featured && (
                          <span className="px-2 py-0.5 bg-orange/20 text-orange text-xs font-semibold rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-orange text-orange" />
                          ))}
                        </div>
                        <span className="text-sm text-white/60">•</span>
                        <span className="text-sm text-white/60">{testimonial.city}</span>
                        <span className="text-sm text-white/60">•</span>
                        <span className="text-sm text-white/60">{testimonial.source}</span>
                      </div>
                      <p className="text-white/80 leading-relaxed mb-3">
                        "{testimonial.reviewText}"
                      </p>
                      <p className="text-sm text-white/40">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <button className="flex-1 btn-outline py-2 flex items-center justify-center gap-2 text-sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors flex items-center gap-2 text-sm">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
