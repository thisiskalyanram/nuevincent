import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Film,
  Megaphone,
  Video,
  Sliders,
  Smartphone,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  PackageCheck,
  Cpu,
} from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Services & Disciplines | NUEVINCENT",
  description: "Comprehensive creative video production, advertising films, commercial shooting, post-production color grading and content creation services.",
};

const ICON_MAP: Record<string, React.ElementType> = {
  Film,
  Megaphone,
  Video,
  Sliders,
  Smartphone,
  Sparkles,
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20 space-y-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cinema-900 border border-brand-purple/30 text-xs font-mono tracking-widest uppercase text-brand-purple-light">
          <Film className="w-3.5 h-3.5" />
          <span>PRODUCTION & CREATIVE SUITE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight uppercase">
          OUR DISCIPLINES & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light via-white to-brand-orange-light">
            CREATIVE SERVICES.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-cinema-200 font-sans max-w-3xl mx-auto leading-relaxed font-light">
          From full-scale cinematic film production and high-impact brand advertising to master DaVinci Resolve color grading and rapid digital content universes.
        </p>
      </section>

      {/* Services Detailed Breakdown */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {SERVICES_DATA.map((service, index) => {
          const Icon = ICON_MAP[service.icon] || Film;
          const isEven = index % 2 === 0;

          return (
            <div
              id={service.id}
              key={service.id}
              className="scroll-mt-32 rounded-3xl bg-cinema-900/80 border border-white/10 p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl hover:border-brand-purple/40 transition-all duration-300"
            >
              {/* Background ambient corner glow */}
              <div
                className={`absolute top-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none ${
                  isEven ? "right-0 bg-brand-purple/10" : "left-0 bg-brand-orange/10"
                }`}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                {/* Left column: Overview & Title */}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-cinema-800 border border-white/10 flex items-center justify-center text-brand-purple-light">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-brand-orange-light font-bold">
                          DISCIPLINE // {service.number}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-xs font-mono uppercase tracking-wider text-cinema-400">
                      {service.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-cinema-300 leading-relaxed font-sans">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                    <Button
                      href={`/contact?type=${encodeURIComponent(service.title)}`}
                      variant="primary"
                      size="md"
                      icon={<ArrowUpRight className="w-4 h-4" />}
                    >
                      Book {service.title}
                    </Button>
                    <Button
                      href="/portfolio"
                      variant="secondary"
                      size="md"
                    >
                      View Projects
                    </Button>
                  </div>
                </div>

                {/* Right column: Scope, Deliverables & Tech */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-cinema-850/60 p-6 sm:p-8 rounded-2xl border border-white/5">
                  {/* Capabilities */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-mono text-white font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple-light" />
                      <span>Core Scope & Capabilities</span>
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-cinema-300">
                      {service.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-1.5 shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-mono text-white font-bold uppercase tracking-wider">
                      <PackageCheck className="w-4 h-4 text-brand-orange-light" />
                      <span>Production Deliverables</span>
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-cinema-300">
                      {service.deliverables.map((del, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech & Hardware if present */}
                  {service.gearAndTech && (
                    <div className="sm:col-span-2 pt-4 border-t border-white/5 space-y-2">
                      <div className="flex items-center space-x-2 text-xs font-mono text-cinema-400 uppercase tracking-wider">
                        <Cpu className="w-3.5 h-3.5 text-brand-purple-light" />
                        <span>Technical Rigging & Standards</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {service.gearAndTech.map((gear, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono px-3 py-1 rounded-full bg-cinema-800 text-cinema-300 border border-white/10"
                          >
                            {gear}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Action CTA */}
      <CTASection />
    </div>
  );
}
