"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CinematicIntro() {
  const [showIntro, setShowIntro] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if intro has already been shown this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    if (!hasSeenIntro) {
      setShowIntro(true);
      // Lock scroll
      document.body.style.overflow = "hidden";
      
      // Show intro for 4.5 seconds
      const timer = setTimeout(() => {
        setShowIntro(false);
        document.body.style.overflow = "unset";
        sessionStorage.setItem("hasSeenIntro", "true");
      }, 4500);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    }
  }, []);

  if (!showIntro) return null;

  if (prefersReducedMotion) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <Image
              src="/logo.png"
              alt="Soro Garage Door Services"
              width={300}
              height={150}
              className="mx-auto mb-8"
              priority
            />
            <p className="text-xl text-white/90">
              Built for Safety. Designed to Last.
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      >
        {/* Garage Door Panels */}
        <div className="absolute inset-0 flex flex-col">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0 }}
              animate={{ y: "-100vh" }}
              transition={{
                duration: 1.5,
                delay: 2 + i * 0.08,
                ease: [0.645, 0.045, 0.355, 1],
              }}
              className="flex-1 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border-b border-neutral-700/50 relative"
              style={{
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Panel detail lines */}
              <div className="h-full flex items-center px-8">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
              </div>
              
              {/* Panel shadow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
            </motion.div>
          ))}
        </div>

        {/* Orange glow from underneath */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange via-orange/50 to-transparent blur-3xl"
        />

        {/* Logo and tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Image
              src="/logo.png"
              alt="Soro Garage Door Services"
              width={400}
              height={200}
              className="mx-auto mb-12 drop-shadow-2xl w-64 md:w-96 h-auto"
              priority
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="relative"
          >
            <p className="text-2xl md:text-3xl text-white/90 font-light tracking-wide text-center">
              Built for Safety. Designed to Last.
            </p>
            {/* Orange underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-orange to-transparent mt-4"
            />
          </motion.div>
        </motion.div>

        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
