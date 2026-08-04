"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 35px,
            rgba(245, 130, 32, 0.5) 35px,
            rgba(245, 130, 32, 0.5) 36px
          )`
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Number */}
          <div className="text-[200px] md:text-[300px] font-bold leading-none text-gradient-orange mb-8">
            404
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Page Not Found
          </h1>
          <p className="text-xl text-white/70 mb-12">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="btn-primary flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
            <button onClick={() => window.history.back()} className="btn-outline flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/60 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link href="/services" className="text-white/70 hover:text-orange transition-colors">
                Services
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/gallery" className="text-white/70 hover:text-orange transition-colors">
                Gallery
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/contact" className="text-white/70 hover:text-orange transition-colors">
                Contact
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/faq" className="text-white/70 hover:text-orange transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
