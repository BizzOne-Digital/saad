"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Quote, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Michael R.",
    city: "Toronto",
    rating: 5,
    text: "Excellent service from start to finish. The team was professional, on time, and the new door looks amazing. Highly recommend!",
    date: "2 weeks ago",
  },
  {
    name: "Sarah L.",
    city: "Mississauga",
    rating: 5,
    text: "Fast emergency repair when our spring broke. They came the same day and had us back up and running in no time. Great pricing too.",
    date: "1 month ago",
  },
  {
    name: "David K.",
    city: "Vaughan",
    rating: 5,
    text: "The owner personally oversaw our installation. Attention to detail was outstanding. Beautiful door, exactly what we wanted.",
    date: "3 weeks ago",
  },
  {
    name: "Jennifer M.",
    city: "Brampton",
    rating: 5,
    text: "Very impressed with the quality of the Canadian-made door and the professional installation. Would definitely use again.",
    date: "2 months ago",
  },
  {
    name: "Robert T.",
    city: "Markham",
    rating: 5,
    text: "Outstanding workmanship and customer service. The installation was quick and clean. Highly professional team!",
    date: "1 week ago",
  },
  {
    name: "Lisa W.",
    city: "Oakville",
    rating: 5,
    text: "Best garage door company in the GTA! Fair pricing, quality products, and excellent service. Very satisfied!",
    date: "3 months ago",
  },
];

export default function ReviewsPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="container-custom px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2 mb-4 md:mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 md:w-8 md:h-8 fill-orange text-orange" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            What Our <span className="text-gradient-orange">Customers Say</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Real reviews from real customers across the GTA
          </p>
        </motion.div>

        {/* Sliding Reviews Carousel */}
        <div className="relative mb-8 md:mb-12">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: `-${currentIndex * 100}%`,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="relative min-w-full p-6 md:p-8 lg:p-12 rounded-2xl glass-effect border border-white/10 hover:border-orange/30 transition-all duration-300 group"
                >
                  <div className="max-w-4xl mx-auto text-center">
                    {/* Quote Icon */}
                    <Quote className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-orange/20 mb-4 md:mb-6 mx-auto" />

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mb-4 md:mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 fill-orange text-orange" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 leading-relaxed font-light">
                      "{review.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="font-bold text-white text-base md:text-lg">{review.name}</div>
                      <div className="text-sm text-white/60">{review.city} • {review.date}</div>
                    </div>

                    {/* Orange accent line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 md:w-24 h-1 bg-gradient-to-r from-transparent via-orange to-transparent opacity-50" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-10 md:w-12 h-2.5 md:h-3 bg-orange"
                    : "w-2.5 md:w-3 h-2.5 md:h-3 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link href="/testimonials" className="btn-primary inline-flex items-center gap-2 text-sm md:text-base">
              Read More Reviews
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 text-sm md:text-base"
            >
              <Star className="w-4 h-4 md:w-5 md:h-5" />
              Leave a Google Review
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
