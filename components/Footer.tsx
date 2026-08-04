"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Phone, Mail, MapPin, Clock, ChevronRight, 
  Shield, Award, FileText, Facebook, Instagram 
} from "lucide-react";

export default function Footer() {
  const services = [
    { name: "Garage Door Installation", href: "/services/installation" },
    { name: "Garage Door Repair", href: "/services/repair" },
    { name: "Garage Door Opener Installation", href: "/services/opener" },
    { name: "Emergency 24/7 Garage Door Service", href: "/services/emergency" },
    { name: "Commercial Garage Door Repair", href: "/services/commercial" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
    { name: "Service Areas", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="relative bg-black">
      {/* Orange top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-orange to-transparent" />

      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <Image
              src="/logo.png"
              alt="Soro Garage Door Services"
              width={320}
              height={110}
              className="mb-6 h-24 md:h-28 w-auto"
            />
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Soro Garage Door Services proudly serves homeowners and businesses across the Greater Toronto Area. We specialize in installation, repairs, spring replacement, opener installation, and same-day emergency service.
            </p>

            {/* Trust Badges */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Same-Day Service Available</div>
                  <div className="text-white/60 text-xs">Fast response when you need it most</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Canadian-Made Garage Doors</div>
                  <div className="text-white/60 text-xs">High quality. Built for Canadian weather.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange/10 border border-orange/30 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Professional Workmanship</div>
                  <div className="text-white/60 text-xs">Skilled technicians. Quality you can trust</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="text-orange font-semibold text-sm mb-3">FOLLOW US</div>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-orange hover:bg-orange/10 flex items-center justify-center transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-orange hover:bg-orange/10 flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-orange hover:bg-orange/10 flex items-center justify-center transition-all"
                  aria-label="Google"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-orange hover:bg-orange/10 flex items-center justify-center transition-all"
                  aria-label="Yelp"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.271,16.718v2.003l0.066,2.054c0.006,0.188,0.183,0.297,0.354,0.214l2.26-1.082c0.171-0.082,0.195-0.304,0.048-0.446l-1.946-1.883c-0.147-0.142-0.387-0.11-0.487,0.065L12.271,16.718z"/>
                    <path d="M9.396,14.726c0.043,0.186,0.229,0.28,0.412,0.204l2.38-0.991c0.183-0.076,0.246-0.304,0.127-0.46l-1.552-2.03c-0.119-0.156-0.351-0.15-0.46,0.013l-1.04,1.556C9.155,13.181,9.353,13.54,9.396,14.726z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-orange font-bold text-lg mb-6">OUR SERVICES</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-white/70 hover:text-orange transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-orange font-bold text-lg mb-6">QUICK LINKS</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-orange transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-orange font-bold text-lg mb-6">CONTACT US</h3>
            <div className="space-y-6">
              <div>
                <a href="tel:+16472990283" className="flex items-start gap-3 group">
                  <Phone className="w-5 h-5 text-orange flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-bold text-xl group-hover:text-orange transition-colors">
                      647-299-0283
                    </div>
                    <div className="text-white/60 text-sm">Call Us</div>
                  </div>
                </a>
              </div>

              <div>
                <a href="sms:+16472990283" className="flex items-start gap-3 group">
                  <svg className="w-5 h-5 text-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <div>
                    <div className="text-white font-bold text-xl group-hover:text-orange transition-colors">
                      647-299-0283
                    </div>
                    <div className="text-white/60 text-sm">Text Us</div>
                  </div>
                </a>
              </div>

              <div>
                <a href="mailto:info@sorogaragedoors.ca" className="flex items-start gap-3 group">
                  <Mail className="w-5 h-5 text-orange flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold text-sm group-hover:text-orange transition-colors break-all">
                      info@sorogaragedoors.ca
                    </div>
                    <div className="text-white/60 text-sm">Send us an Email</div>
                  </div>
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white font-semibold text-sm">
                    Serving the Greater Toronto Area
                  </div>
                  <div className="text-white/60 text-sm">Ontario, Canada</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white font-semibold text-sm">
                    Mon – Sun: 8:00 AM – 8:00 PM
                  </div>
                  <div className="text-white/60 text-sm">We're Open 7 Days a Week</div>
                </div>
              </div>

              <Link href="/contact" className="btn-primary w-full flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                REQUEST A FREE ESTIMATE
              </Link>
            </div>
          </div>
        </div>

        {/* Emergency Service Banner */}
        <div className="border-y border-white/10 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Need Immediate Assistance */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange/10 border border-orange flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-orange" />
              </div>
              <div>
                <div className="text-white font-bold text-lg mb-1">NEED IMMEDIATE ASSISTANCE?</div>
                <div className="text-white/60 text-sm mb-3">
                  We offer same-day emergency service throughout the Greater Toronto Area.
                </div>
                <a href="tel:+16472990283" className="inline-flex items-center gap-2 text-orange font-bold hover:gap-3 transition-all">
                  CALL 647-299-0283 →
                </a>
              </div>
            </div>

            {/* Fully Insured */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange/10 border border-orange flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-orange" />
              </div>
              <div>
                <div className="text-white font-bold text-lg mb-1">FULLY INSURED</div>
                <div className="text-white font-bold text-lg mb-1">& LICENSED</div>
                <div className="text-white/60 text-sm">
                  Your property is in safe hands.
                </div>
              </div>
            </div>

            {/* Satisfaction Guaranteed */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange/10 border border-orange flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-orange" />
              </div>
              <div>
                <div className="text-white font-bold text-lg mb-1">SATISFACTION</div>
                <div className="text-white font-bold text-lg mb-1">GUARANTEED</div>
                <div className="text-white/60 text-sm">
                  We stand behind our workmanship.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <div>
              © {new Date().getFullYear()} Soro Garage Door Services. All Rights Reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-orange transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="#" className="hover:text-orange transition-colors">
                Terms of Service
              </Link>
              <span>|</span>
              <Link href="#" className="hover:text-orange transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 24/7 Emergency Service Sticky Button */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-40">
        <Link
          href="tel:+16472990283"
          className="flex items-center gap-3 px-6 py-4 bg-orange hover:bg-orange/90 rounded-full shadow-2xl shadow-orange/50 transition-all hover:scale-105 group"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-white font-bold text-sm">24/7 EMERGENCY SERVICE</div>
            <div className="text-white/90 text-xs">Garage door problems don't wait. Neither do we.</div>
          </div>
          <div className="px-4 py-2 bg-black/30 rounded-lg">
            <div className="text-white font-bold">CALL NOW</div>
          </div>
        </Link>
      </div>
    </footer>
  );
}
