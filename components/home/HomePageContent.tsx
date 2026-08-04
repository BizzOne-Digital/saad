"use client";

import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import VideoPlayer from "@/components/VideoPlayer";
import PremiumProduct from "@/components/home/PremiumProduct";
import BeforeAfter from "@/components/home/BeforeAfter";
import WhyChoose from "@/components/home/WhyChoose";
import ProcessSection from "@/components/home/ProcessSection";
import RecentProjects from "@/components/home/RecentProjects";
import ReviewsPreview from "@/components/home/ReviewsPreview";
import ServiceAreas from "@/components/home/ServiceAreas";
import EmergencyCTA from "@/components/home/EmergencyCTA";
import type { PageDTO, SectionDTO } from "@/lib/page-content-types";

function sectionMap(page: PageDTO | null): Record<string, SectionDTO> {
  const map: Record<string, SectionDTO> = {};
  page?.sections.forEach((s) => {
    map[s.key] = s;
  });
  return map;
}

export default function HomePageContent({ page }: { page: PageDTO | null }) {
  const s = sectionMap(page);
  const video = s.video;

  return (
    <div className="min-h-screen">
      <HeroSection section={s.hero} />
      <TrustStrip section={s.trust_strip} />
      <ServicesShowcase section={s.services} />
      <VideoPlayer
        videoSrc={video?.fields?.videoSrc || "/videos/garage-work.mp4"}
        title={video?.fields?.heading || "Our Work In Motion"}
        subtitle={
          video?.fields?.description ||
          "Since day one, we've helped customers across the GTA with installations and repairs. Our team delivers premium workmanship you can trust."
        }
      />
      <PremiumProduct section={s.premium_product} />
      <BeforeAfter section={s.before_after} />
      <WhyChoose section={s.why_choose} />
      <ProcessSection section={s.process} />
      <RecentProjects section={s.recent_projects} />
      <ReviewsPreview />
      <ServiceAreas section={s.service_areas} />
      <EmergencyCTA section={s.emergency_cta} />
    </div>
  );
}
