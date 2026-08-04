"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Wrench,
  Star,
  HelpCircle,
  TrendingUp,
  Eye,
} from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check authentication
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
    }
  }, [router]);

  if (!mounted) return null;

  const stats = [
    {
      name: "Total Leads",
      value: "0",
      icon: MessageSquare,
      change: "+0%",
      changeType: "positive",
    },
    {
      name: "Active Services",
      value: "5",
      icon: Wrench,
      change: "+0%",
      changeType: "positive",
    },
    {
      name: "Testimonials",
      value: "2",
      icon: Star,
      change: "+0%",
      changeType: "neutral",
    },
    {
      name: "FAQs",
      value: "3",
      icon: HelpCircle,
      change: "+0%",
      changeType: "neutral",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "System ready",
      time: "Active now",
      icon: TrendingUp,
    },
    {
      id: 2,
      action: "5 Services configured",
      time: "Updated",
      icon: Eye,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <AdminNav />

      {/* Main Content */}
      <div className="lg:pl-72">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/60">
              Welcome back! Here's what's happening with your website.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-xl border border-white/10 p-6 hover:border-orange/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-orange/10 border border-orange/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-orange" />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === "positive"
                          ? "text-green-500"
                          : stat.changeType === "negative"
                          ? "text-red-500"
                          : "text-white/60"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-white/60">{stat.name}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="max-w-2xl">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-xl border border-white/10 p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <a
                  href="/admin/leads"
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <span className="text-sm font-medium text-white">
                    View Leads
                  </span>
                  <MessageSquare className="w-5 h-5 text-white/60 group-hover:text-orange transition-colors" />
                </a>
                <a
                  href="/admin/services"
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <span className="text-sm font-medium text-white">
                    Manage Services
                  </span>
                  <Wrench className="w-5 h-5 text-white/60 group-hover:text-orange transition-colors" />
                </a>
                <a
                  href="/admin/pages"
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <span className="text-sm font-medium text-white">
                    Manage Pages
                  </span>
                  <Eye className="w-5 h-5 text-white/60 group-hover:text-orange transition-colors" />
                </a>
                <a
                  href="/admin/settings"
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <span className="text-sm font-medium text-white">
                    Site Settings
                  </span>
                  <TrendingUp className="w-5 h-5 text-white/60 group-hover:text-orange transition-colors" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Website Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-orange transition-colors text-sm"
            >
              View Website →
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
