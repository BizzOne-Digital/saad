"use client";

import { usePathname } from "next/navigation";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CinematicIntro from "@/components/CinematicIntro";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <meta name="theme-color" content="#F58220" />
        <meta name="description" content="Professional garage door installation, repairs, spring replacement, and opener installation serving the Greater Toronto Area. Same-day service available with honest pricing and Canadian-made garage doors." />
      </head>
      <body className="antialiased">
        {!isAdminRoute && <CinematicIntro />}
        {!isAdminRoute && <Header />}
        <main>{children}</main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}

export default LayoutContent;
