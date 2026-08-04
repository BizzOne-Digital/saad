"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, MessageSquare, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

export default function ContactPage() {
  const { getSection } = usePageContent("contact");
  const hero = getSection("hero");
  const info = getSection("contact_info");
  const formIntro = getSection("form_intro");

  const heroBg =
    hero?.images?.find((i) => i.key === "background")?.url || "/contact-hero.jpg";
  const phone = info?.fields?.phone || "647-299-0283";
  const email = info?.fields?.email || "info@sorogaragedoors.ca";
  const serviceArea = info?.fields?.serviceArea || "Greater Toronto Area, Ontario";
  const hours = info?.fields?.hours || "Monday–Sunday, 8:00 AM–8:00 PM";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceAddress: "",
    city: "",
    postalCode: "",
    serviceRequired: "",
    propertyType: "residential",
    preferredContact: "phone",
    preferredDate: "",
    urgency: "routine",
    message: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Submitting form with data:', formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          serviceAddress: "",
          city: "",
          postalCode: "",
          serviceRequired: "",
          propertyType: "residential",
          preferredContact: "phone",
          preferredDate: "",
          urgency: "routine",
          message: "",
          consent: false,
        });
      } else {
        console.error('Form submission failed:', data);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-black">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center p-12">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Request Received!</h2>
          <p className="text-xl text-white/70 mb-8">
            Thank you for contacting Soro Garage Door Services. We'll review your request and get back to you within 24 hours.
          </p>
          <p className="text-white/60 mb-8">
            For urgent matters, please call us directly at <a href="tel:+16472990283" className="text-orange font-bold">647-299-0283</a>
          </p>
          <button onClick={() => setSubmitStatus("idle")} className="btn-primary">
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  if (submitStatus === "error") {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-black">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center p-12">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Submission Failed</h2>
          <p className="text-xl text-white/70 mb-8">
            We encountered an error processing your request. Please try again or contact us directly.
          </p>
          <div className="space-y-4">
            <a href="tel:+16472990283" className="btn-primary inline-flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call 647-299-0283
            </a>
            <button onClick={() => setSubmitStatus("idle")} className="btn-secondary ml-4">
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${heroBg}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            {hero?.fields?.eyebrow && (
              <p className="text-orange font-semibold uppercase tracking-widest text-sm mb-4">
                {hero.fields.eyebrow}
              </p>
            )}
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {hero?.fields?.heading || (
                <>
                  Get Your Free <span className="text-gradient-orange">Estimate</span>
                </>
              )}
            </h1>
            <p className="text-2xl text-white/80 max-w-3xl">
              {hero?.fields?.description ||
                "Contact us today for professional garage door service across the Greater Toronto Area"}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-3xl font-bold mb-8">
                  {info?.fields?.heading || "Contact Information"}
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4 p-6 rounded-xl glass-effect border border-white/10">
                    <Phone className="w-6 h-6 text-orange flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold mb-1">Phone</div>
                      <a href={`tel:+1${phone.replace(/\D/g, "")}`} className="text-white/70 hover:text-orange transition-colors">
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-xl glass-effect border border-white/10">
                    <MessageSquare className="w-6 h-6 text-orange flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold mb-1">Text Message</div>
                      <a href={`sms:+1${phone.replace(/\D/g, "")}`} className="text-white/70 hover:text-orange transition-colors">
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-xl glass-effect border border-white/10">
                    <Mail className="w-6 h-6 text-orange flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold mb-1">Email</div>
                      <a href={`mailto:${email}`} className="text-white/70 hover:text-orange transition-colors break-all">
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-xl glass-effect border border-white/10">
                    <MapPin className="w-6 h-6 text-orange flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold mb-1">Service Area</div>
                      <div className="text-white/70">{serviceArea}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-xl glass-effect border border-white/10">
                    <Clock className="w-6 h-6 text-orange flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold mb-1">Hours</div>
                      <div className="text-white/70">{hours}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-orange/10 border border-orange/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-orange flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-orange mb-2">Same-Day Service Available</div>
                      <p className="text-sm text-white/70">
                        {info?.fields?.note ||
                          "For emergency garage door repairs, call or text us immediately for same-day service based on availability."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                <div className="p-8 rounded-2xl glass-effect border border-white/10">
                  <h2 className="text-3xl font-bold mb-2">
                    {formIntro?.fields?.heading || "Request a Free Estimate"}
                  </h2>
                  <p className="text-white/70 mb-8">
                    {formIntro?.fields?.description ||
                      "Fill out the form below and we'll get back to you within 24 hours"}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Service Address *</label>
                      <input
                        type="text"
                        required
                        value={formData.serviceAddress}
                        onChange={(e) => setFormData({ ...formData, serviceAddress: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">City *</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Postal Code *</label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Service Required *</label>
                      <select
                        required
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors text-white appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23F58220' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem',
                        }}
                      >
                        <option value="" className="bg-gray-900 text-white">Select a service...</option>
                        <option value="installation" className="bg-gray-900 text-white">New Garage Door Installation</option>
                        <option value="replacement" className="bg-gray-900 text-white">Garage Door Replacement</option>
                        <option value="repair" className="bg-gray-900 text-white">Garage Door Repair</option>
                        <option value="spring" className="bg-gray-900 text-white">Spring Replacement</option>
                        <option value="opener" className="bg-gray-900 text-white">Opener Installation/Repair</option>
                        <option value="maintenance" className="bg-gray-900 text-white">Maintenance/Tune-Up</option>
                        <option value="emergency" className="bg-gray-900 text-white">Emergency Service</option>
                        <option value="other" className="bg-gray-900 text-white">Other</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Property Type *</label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors text-white appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23F58220' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem',
                          }}
                        >
                          <option value="residential" className="bg-gray-900 text-white">Residential</option>
                          <option value="commercial" className="bg-gray-900 text-white">Commercial</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Preferred Contact Method</label>
                        <select
                          value={formData.preferredContact}
                          onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors text-white appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23F58220' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem',
                          }}
                        >
                          <option value="phone" className="bg-gray-900 text-white">Phone</option>
                          <option value="email" className="bg-gray-900 text-white">Email</option>
                          <option value="text" className="bg-gray-900 text-white">Text Message</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Urgency Level</label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors text-white appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23F58220' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem',
                        }}
                      >
                        <option value="routine" className="bg-gray-900 text-white">Routine (No rush)</option>
                        <option value="urgent" className="bg-gray-900 text-white">Urgent (Within a few days)</option>
                        <option value="emergency" className="bg-gray-900 text-white">Emergency (Same day)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Additional Details</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange focus:outline-none transition-colors resize-none"
                        placeholder="Please provide any additional details about your project or service needs..."
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent-checkbox"
                        required
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-orange checked:border-orange focus:ring-2 focus:ring-orange focus:ring-offset-0 cursor-pointer"
                      />
                      <label htmlFor="consent-checkbox" className="text-sm text-white/70 cursor-pointer">
                        I consent to being contacted by Soro Garage Door Services regarding my service request *
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>

                    <p className="text-sm text-white/50 text-center">
                      For immediate emergency service, please call <a href="tel:+16472990283" className="text-orange font-bold">647-299-0283</a>
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
