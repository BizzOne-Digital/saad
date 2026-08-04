"use client";

import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";

const reviews = [
  { name: "Michael R.", city: "Toronto", rating: 5, text: "Excellent service from start to finish. The team was professional, on time, and the new door looks amazing. Installation was clean and they explained everything. Highly recommend!", date: "2 weeks ago", featured: true },
  { name: "Sarah L.", city: "Mississauga", rating: 5, text: "Fast emergency repair when our spring broke. They came the same day and had us back up and running in no time. Great pricing too and very honest about what needed to be done.", date: "1 month ago", featured: true },
  { name: "David K.", city: "Vaughan", rating: 5, text: "The owner personally oversaw our installation. Attention to detail was outstanding. Beautiful door, exactly what we wanted. The Canadian-made quality is evident.", date: "3 weeks ago", featured: true },
  { name: "Jennifer M.", city: "Brampton", rating: 5, text: "Very impressed with the quality of the Canadian-made door and the professional installation. Would definitely use again for our rental properties.", date: "2 months ago", featured: false },
  { name: "Robert T.", city: "Markham", rating: 5, text: "Quick response for our garage door opener issue. Technician was knowledgeable and fixed it properly the first time. Fair pricing and excellent workmanship.", date: "3 weeks ago", featured: false },
  { name: "Lisa W.", city: "Richmond Hill", rating: 5, text: "We needed a full door replacement and Soro delivered beyond expectations. The new insulated door makes such a difference in our garage temperature. Professional from quote to completion.", date: "1 month ago", featured: false },
  { name: "James P.", city: "Oakville", rating: 5, text: "Emergency service on a Sunday when our door wouldn't close. They came within hours and diagnosed the broken cable immediately. Repaired same day. True professionals.", date: "2 weeks ago", featured: false },
  { name: "Amanda C.", city: "North York", rating: 5, text: "Replaced both our garage doors with beautiful modern doors. The installation crew was respectful, clean, and thorough. Love the new look!", date: "1 month ago", featured: false },
  { name: "Tom H.", city: "Etobicoke", rating: 5, text: "Best garage door company we've used. Honest recommendations, transparent pricing, quality work. They truly care about customer satisfaction.", date: "3 weeks ago", featured: false },
];

export default function TestimonialsPage() {
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-gray to-black" />
        
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-10 h-10 fill-orange text-orange" />
              ))}
            </div>
            <div className="text-5xl font-bold text-orange mb-4">{averageRating.toFixed(1)}/5.0</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Customer <span className="text-gradient-orange">Reviews</span>
            </h1>
            <p className="text-2xl text-white/80">
              Real feedback from real customers across the Greater Toronto Area
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Featured Reviews</h2>
            <p className="text-white/70">Highlighted customer experiences</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {reviews.filter(r => r.featured).map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-orange/10 to-orange/5 border-2 border-orange/30"
              >
                <Quote className="w-10 h-10 text-orange/30 mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange text-orange" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 leading-relaxed text-lg">"{review.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-sm text-white/60">{review.city}</div>
                  </div>
                  <div className="text-sm text-white/50">{review.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Reviews */}
      <section className="section-padding bg-dark-gray">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">All Reviews</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-2xl glass-effect border border-white/10 hover:border-orange/30 transition-all"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange text-orange" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-bold text-white">{review.name}</span>
                    <span className="text-white/60"> • {review.city}</span>
                  </div>
                  <span className="text-white/50">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Share Your <span className="text-gradient-orange">Experience</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              We'd love to hear about your experience with Soro Garage Door Services
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <Star className="w-5 h-5" />
                Leave a Google Review
                <ExternalLink className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
                Read More on Google
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
