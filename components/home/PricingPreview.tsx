"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DoorClosed, Settings, Wrench, Cog, CheckCircle } from "lucide-react";

const pricing = [
  {
    icon: DoorClosed,
    service: "Garage Door Installation",
    price: "$1,299",
    description: "Complete new door installation with professional setup",
  },
  {
    icon: Settings,
    service: "Garage Door Openers",
    price: "$600",
    description: "Opener installation with smart features included",
  },
  {
    icon: Wrench,
    service: "Spring Replacement",
    price: "$160",
    description: "High-cycle torsion spring replacement service",
  },
  {
    icon: Cog,
    service: "Garage Door Repairs",
    price: "$129",
    description: "Professional repair service for various issues",
  },
];

export default function PricingPreview() {
  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transparent <span className="text-gradient-orange">Pricing</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-2">
            Starting prices for our most popular services. Final pricing based on your specific needs.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto">
            Prices vary based on door size, selected products, site conditions, and required parts. Free on-site estimates available.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricing.map((item, index) => {
            const PriceIcon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="h-full p-6 rounded-2xl glass-effect border border-white/10 hover:border-orange/30 transition-all duration-300">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <PriceIcon className="w-6 h-6 text-orange" />
                  </div>

                  {/* Service Name */}
                  <h3 className="font-bold text-lg mb-2">{item.service}</h3>

                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-sm text-white/60">Starting at </span>
                    <span className="text-3xl font-bold text-orange">{item.price}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/70">{item.description}</p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange/0 to-orange/0 group-hover:from-orange/5 group-hover:to-orange/10 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-2xl glass-effect border border-orange/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-orange flex-shrink-0" />
              <span className="text-white/80">Free On-Site Estimates</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-orange flex-shrink-0" />
              <span className="text-white/80">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-orange flex-shrink-0" />
              <span className="text-white/80">Competitive Pricing</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/contact" className="btn-primary text-lg px-8 py-4">
            Get Your Free Estimate
          </Link>
          <p className="text-sm text-white/60 mt-4">
            All estimates include detailed breakdown and product options
          </p>
        </motion.div>
      </div>
    </section>
  );
}
