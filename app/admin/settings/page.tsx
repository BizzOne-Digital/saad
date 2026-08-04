"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, Building2, Phone, Mail, Clock, MapPin } from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    businessName: "Soro Garage Door Services",
    phone: "647-299-0283",
    smsNumber: "647-299-0283",
    publicEmail: "info@sorogaragedoors.ca",
    businessEmail: "info@sorogaragedoors.ca",
    serviceArea: "Greater Toronto Area",
    address: "Greater Toronto Area, Ontario, Canada",
    hoursFrom: "8:00 AM",
    hoursTo: "8:00 PM",
    hoursDays: "Monday–Sunday",
    emergencyServiceEnabled: true,
    seoTitle: "Soro Garage Door Services | Professional Repair & Installation - GTA",
    seoDescription: "Trusted garage door repair and installation across the Greater Toronto Area. Same-day service available.",
    facebookUrl: "",
    instagramUrl: "",
    googleUrl: "",
    yelpUrl: "",
  });

  useEffect(() => {
    setMounted(true);
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
    }
  }, [router]);

  if (!mounted) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black">
      <AdminNav />

      <div className="lg:pl-72">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-white/60">Manage your website configuration</p>
          </div>

          <form onSubmit={handleSave} className="max-w-4xl space-y-8">
            {/* Business Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-orange/10 border border-orange/30 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-orange" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Business Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) =>
                      setSettings({ ...settings, businessName: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) =>
                        setSettings({ ...settings, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      SMS Number
                    </label>
                    <input
                      type="tel"
                      value={settings.smsNumber}
                      onChange={(e) =>
                        setSettings({ ...settings, smsNumber: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Public Email
                    </label>
                    <input
                      type="email"
                      value={settings.publicEmail}
                      onChange={(e) =>
                        setSettings({ ...settings, publicEmail: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={settings.businessEmail}
                      onChange={(e) =>
                        setSettings({ ...settings, businessEmail: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Service Area
                  </label>
                  <input
                    type="text"
                    value={settings.serviceArea}
                    onChange={(e) =>
                      setSettings({ ...settings, serviceArea: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) =>
                      setSettings({ ...settings, address: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-orange/10 border border-orange/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange" />
                </div>
                <h2 className="text-xl font-bold text-white">Business Hours</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Operating Days
                  </label>
                  <input
                    type="text"
                    value={settings.hoursDays}
                    onChange={(e) =>
                      setSettings({ ...settings, hoursDays: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Opening Time
                    </label>
                    <input
                      type="text"
                      value={settings.hoursFrom}
                      onChange={(e) =>
                        setSettings({ ...settings, hoursFrom: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Closing Time
                    </label>
                    <input
                      type="text"
                      value={settings.hoursTo}
                      onChange={(e) =>
                        setSettings({ ...settings, hoursTo: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="emergency"
                    checked={settings.emergencyServiceEnabled}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        emergencyServiceEnabled: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-orange focus:ring-orange focus:ring-offset-0"
                  />
                  <label htmlFor="emergency" className="text-white cursor-pointer">
                    Enable 24/7 Emergency Service Display
                  </label>
                </div>
              </div>
            </motion.div>

            {/* SEO Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-xl border border-white/10 p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">SEO Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={settings.seoTitle}
                    onChange={(e) =>
                      setSettings({ ...settings, seoTitle: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    Recommended: 50-60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={settings.seoDescription}
                    onChange={(e) =>
                      setSettings({ ...settings, seoDescription: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors resize-none"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    Recommended: 150-160 characters
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-xl border border-white/10 p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Social Media</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={settings.facebookUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, facebookUrl: e.target.value })
                    }
                    placeholder="https://facebook.com/your-page"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settings.instagramUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, instagramUrl: e.target.value })
                    }
                    placeholder="https://instagram.com/your-profile"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Google Business URL
                  </label>
                  <input
                    type="url"
                    value={settings.googleUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, googleUrl: e.target.value })
                    }
                    placeholder="https://g.page/your-business"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Yelp URL
                  </label>
                  <input
                    type="url"
                    value={settings.yelpUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, yelpUrl: e.target.value })
                    }
                    placeholder="https://yelp.com/biz/your-business"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-orange focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary py-3 px-8 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>

              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-500 font-medium"
                >
                  ✓ Settings saved successfully
                </motion.span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
