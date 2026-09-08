import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryTicker } from "@/components/home/CategoryTicker";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { BrandStatement } from "@/components/home/BrandStatement";
import { CTASection } from "@/components/home/CTASection";
import { getAllProjects } from "@/data/projects";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Category Marquee Ticker */}
      <CategoryTicker />

      {/* 3. Featured Work Showcase */}
      <FeaturedWork projects={projects} />

      {/* 4. Core Services Preview */}
      <ServicesPreview />

      {/* 5. 5-Step Creative Workflow */}
      <ProcessSection />

      {/* 6. Brand Manifesto & Philosophy */}
      <BrandStatement />

      {/* 7. Action CTA */}
      <CTASection />
    </div>
  );
}
