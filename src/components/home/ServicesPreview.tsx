"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Film, Megaphone, Video, Sliders, Smartphone, Sparkles } from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";

const ICON_MAP: Record<string, React.ElementType> = {
  Film,
  Megaphone,
  Video,
  Sliders,
  Smartphone,
  Sparkles,
};

export function ServicesPreview() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8 gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-mono tracking-widest text-brand-purple-light uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-purple" />
            <span>OUR DISCIPLINES & EXPERTISE</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Crafting visuals that redefine standard expectations.
          </h2>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-brand-orange-light hover:text-white transition-colors group self-start md:self-auto py-1"
        >
          <span>Explore All Services</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {SERVICES_DATA.map((service) => {
          const Icon = ICON_MAP[service.icon] || Film;
          return (
            <div
              key={service.id}
              className="group relative bg-cinema-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between hover:border-brand-purple/50 hover:bg-cinema-850/80 transition-all duration-300 hover:shadow-cinema-hover hover:-translate-y-1"
            >
              {/* Header inside card */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-cinema-800 border border-white/10 flex items-center justify-center text-brand-purple-light group-hover:bg-brand-purple group-hover:text-white group-hover:border-brand-purple-light transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-cinema-500 group-hover:text-brand-orange-light font-bold transition-colors">
                    {service.number}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-brand-purple-lighter transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-orange-light/90 uppercase tracking-wider">
                    {service.subtitle}
                  </p>
                </div>

                <p className="text-sm text-cinema-300 leading-relaxed font-sans line-clamp-3">
                  {service.description}
                </p>

                {/* Sub features */}
                <div className="pt-2 space-y-1.5 border-t border-white/5">
                  {service.capabilities.slice(0, 3).map((cap, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-cinema-400">
                      <span className="w-1 h-1 rounded-full bg-brand-purple shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-6 mt-4 flex items-center justify-between border-t border-white/5">
                <Link
                  href={`/services#${service.id}`}
                  className="text-xs font-mono text-cinema-400 group-hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href={`/contact?type=${encodeURIComponent(service.title)}`}
                  className="text-[11px] font-mono px-3 py-1 rounded-full bg-cinema-800 text-brand-purple-light hover:bg-brand-purple hover:text-white transition-all"
                >
                  Book Service
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
