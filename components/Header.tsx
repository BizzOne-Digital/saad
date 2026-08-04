"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageSquare, MapPin, Clock } from "lucide-react";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Door Types", href: "/door-types" },
  { name: "Gallery", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show header on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 4.5 }}
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-lg shadow-lg shadow-orange/10"
            : "bg-transparent"
        }`}
      >
        {/* Top Info Bar - Always Visible */}
        <div className="bg-black/90 backdrop-blur-sm border-b border-white/10">
          <div className="container-custom px-4">
            <div className="flex items-center justify-between py-1.5 text-xs md:text-sm">
              <div className="flex items-center gap-3 md:gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                  <span className="hidden md:inline">Serving the Greater Toronto Area, Ontario</span>
                  <span className="md:hidden">GTA, Ontario</span>
                </div>
                <div className="hidden lg:flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
                  <span className="text-orange font-semibold">Same-Day Service Available</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 md:gap-6 text-white/70">
                <a
                  href="tel:+16472990283"
                  className="flex items-center gap-2 hover:text-orange transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-orange" />
                  <span className="font-semibold text-white">647-299-0283</span>
                </a>
                <a
                  href="sms:+16472990283"
                  className="hidden sm:flex items-center gap-2 hover:text-orange transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-orange" />
                  <span>Text Us</span>
                </a>
                <div className="hidden md:flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-orange" />
                  <span>Mon - Sun: 8 AM - 8 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation — fixed height; logo can look larger without growing the bar */}
        <div className="container-custom px-4">
          <nav className="flex items-center justify-between h-16 md:h-[4.5rem] py-0">
            {/* Logo fills the bar (slight overflow so it reads larger) */}
            <Link href="/" className="relative z-10 shrink-0 flex items-center -my-1">
              <Image
                src="/logo.png"
                alt="Soro Garage Door Services"
                width={320}
                height={100}
                className="h-[88px] md:h-[100px] w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors hover:text-orange group ${
                    pathname === item.href ? "text-orange" : "text-white"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-orange transition-all duration-300 ${
                      pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange hover:bg-orange/90 text-white font-bold text-xs rounded-lg transition-all hover:scale-105 shadow-lg shadow-orange/30 uppercase"
              >
                Request a Free Estimate →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-orange transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden bg-black"
          >
            <div className="flex flex-col h-full pt-24 pb-6 px-6 overflow-y-auto">
              <nav className="flex-1 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-4 text-lg font-medium rounded-lg transition-all ${
                      pathname === item.href
                        ? "bg-orange text-white"
                        : "text-white/90 hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full btn-primary text-center"
                >
                  Request a Free Estimate
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+16472990283"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-sm font-medium">Call Now</span>
                  </a>
                  <a
                    href="sms:+16472990283"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm font-medium">Text Us</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
