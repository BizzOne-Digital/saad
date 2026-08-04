"use client";

import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState } from "react";

interface VideoSectionProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  videoUrl: string;
  videoTitle?: string;
  videoDescription?: string;
  thumbnailUrl?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export default function VideoSection({
  title = "See Our Work",
  titleHighlight = "In Action",
  description = "Watch how we transform homes with professional garage door installations and repairs",
  videoUrl,
  videoTitle = "Professional Garage Door Service",
  videoDescription = "Watch our expert team in action",
  thumbnailUrl = "/gallery-01.jpg",
  stats = [
    { value: "500+", label: "Successful Installations" },
    { value: "15+ Years", label: "Industry Experience" },
    { value: "100%", label: "Customer Satisfaction" },
  ],
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="section-padding bg-dark-gray">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {title} <span className="text-gradient-orange">{titleHighlight}</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden glass-effect border border-white/10 shadow-2xl">
            {!isPlaying ? (
              // Video Thumbnail with Play Button
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
                {/* Thumbnail Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${thumbnailUrl}')`,
                  }}
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                
                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label="Play video"
                >
                  <div className="w-24 h-24 rounded-full bg-orange/90 hover:bg-orange flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-2xl shadow-orange/50">
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </div>
                </button>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold mb-2">{videoTitle}</h3>
                  <p className="text-white/70">{videoDescription}</p>
                </div>
              </div>
            ) : (
              // Video Player
              <div className="relative aspect-video bg-black">
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  playsInline
                >
                  <source src={videoUrl} type="video/mp4" />
                  <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
                  Your browser does not support the video tag.
                </video>

                {/* Close Button */}
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 hover:bg-black flex items-center justify-center transition-all z-10"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Video Features/Stats */}
          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl glass-effect border border-white/10"
                >
                  <div className="text-3xl font-bold text-orange mb-2">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
