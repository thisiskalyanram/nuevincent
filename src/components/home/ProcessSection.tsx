"use client";

import React from "react";
import { Compass, Lightbulb, Clapperboard, Sparkles, Send } from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "DISCOVER",
    title: "Understanding Vision & Brand",
    description: "We dive deep into the idea, target audience, brand DNA, emotional intent, and primary business objectives to map out the strategic foundation.",
    icon: Compass,
    accent: "purple",
  },
  {
    step: "02",
    name: "CONCEPT",
    title: "Storyboarding & Creative Direction",
    description: "Developing treatments, cinematic scripts, visual lookbooks, shot lists, tone references, and production timelines.",
    icon: Lightbulb,
    accent: "orange",
  },
  {
    step: "03",
    name: "PRODUCE",
    title: "Cinematic On-Set Execution",
    description: "Directing the shoot with high-end cinema packages, precision lighting, gimbal camera choreography, and experienced crew management.",
    icon: Clapperboard,
    accent: "purple",
  },
  {
    step: "04",
    name: "POST-PRODUCTION",
    title: "Editorial, Color & Sound",
    description: "Editing narrative flow, ACES color grading in DaVinci Resolve, dynamic foley and sound design, custom score integration, and VFX polish.",
    icon: Sparkles,
    accent: "orange",
  },
  {
    step: "05",
    name: "DELIVER",
    title: "Multi-Platform Master Delivery",
    description: "Exporting broadcast-grade DCI masters and optimized platform-specific cuts (16:9, 9:16, 1:1) ready for release and distribution.",
    icon: Send,
    accent: "purple",
  },
];

export function ProcessSection() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-20">
        <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-mono tracking-widest text-brand-purple-light uppercase">
          <span className="w-2 h-2 rounded-full bg-brand-purple shrink-0" />
          <span>OUR CREATIVE METHODOLOGY</span>
        </div>
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
          A disciplined 5-step process from script to screen.
        </h2>
        <p className="text-xs sm:text-base text-cinema-300 font-sans px-2">
          Every frame we shoot and cut is guided by rigorous creative precision and transparent collaboration.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative z-10">
        {PROCESS_STEPS.map((item, idx) => {
          const Icon = item.icon;
          const isOrange = item.accent === "orange";
          return (
            <div
              key={item.step}
              className="relative bg-cinema-900/70 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between group hover:border-brand-purple/40 hover:bg-cinema-850/80 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Step indicator */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-heading font-extrabold text-cinema-600 group-hover:text-white transition-colors">
                    {item.step}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                      isOrange
                        ? "bg-brand-orange/10 text-brand-orange-light border-brand-orange/30 group-hover:bg-brand-orange group-hover:text-white"
                        : "bg-brand-purple/10 text-brand-purple-light border-brand-purple/30 group-hover:bg-brand-purple group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-mono tracking-widest text-brand-purple-lighter uppercase font-bold">
                    {item.name}
                  </h3>
                  <h4 className="text-base font-heading font-semibold text-white">
                    {item.title}
                  </h4>
                </div>

                <p className="text-xs text-cinema-300 leading-relaxed font-sans pt-2 border-t border-white/5">
                  {item.description}
                </p>
              </div>

              {/* Step connector arrow on desktop */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-cinema-600 text-xs font-mono">
                  &rarr;
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
