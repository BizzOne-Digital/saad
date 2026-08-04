"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Trophy, Rocket } from "lucide-react";

interface VideoPlayerProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
}

export default function VideoPlayer({ 
  videoSrc, 
  title = "Our Work In Motion",
  subtitle = "Since day one, we've helped 500+ customers with their garage door needs. From installations to repairs, our team delivers premium work that feels even better.",
  description = "Professional garage door services across Greater Toronto Area",
  thumbnail = "/gallery-01.jpg"
}: VideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force play on mount
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log("Initial autoplay prevented:", error);
      });
    }

    // Auto-play when component is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(error => {
              console.log("Auto-play prevented:", error);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <section className="section-padding bg-black overflow-hidden">
      <div className="container-custom px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-orange/10 border border-orange/30 text-orange text-sm font-semibold uppercase tracking-wider mb-4">
                {title}
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {subtitle.split('.')[0]}.
              </h2>
              
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
                {subtitle.split('.').slice(1).join('.')}
              </p>
            </div>

            {/* Feature Items */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Award-Winning Service</h3>
                  <p className="text-white/60">Recognized quality and attention to detail in every project</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Fast & Reliable</h3>
                  <p className="text-white/60">Same-day service available across the Greater Toronto Area</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden glass-effect border border-white/10 shadow-2xl group">
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  autoPlay
                  preload="auto"
                  poster={thumbnail}
                  webkit-playsinline="true"
                >
                  <source src={videoSrc} type="video/mp4" />
                  <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                  Your browser does not support the video tag.
                </video>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-orange backdrop-blur-sm flex items-center justify-center transition-all z-10 group/btn"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  )}
                </button>

                {/* Orange accent border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange/30 transition-all duration-300 rounded-2xl pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
