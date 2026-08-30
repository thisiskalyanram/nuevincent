"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowUpRight, Film } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BrandStatement() {
  return (
    <section className="relative py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cinema-950 via-cinema-900 to-cinema-950 overflow-hidden border-t border-white/10">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cinema-850 border border-white/10 text-cinema-300 text-[10px] sm:text-xs font-mono tracking-widest uppercase">
          <Film className="w-3.5 h-3.5 text-brand-purple-light shrink-0" />
          <span>OUR CREATIVE MANIFESTO</span>
        </div>

        <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
          &ldquo;WE DON&rsquo;T JUST MAKE VIDEOS. <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light via-white to-brand-orange-light">
            WE CREATE EXPERIENCES.
          </span>&rdquo;
        </h2>

        <p className="text-sm sm:text-lg md:text-xl text-cinema-200 font-sans max-w-3xl mx-auto leading-relaxed font-light px-2">
          NUEVINCENT is a creative media and visual production studio focused on filmmaking, advertising, branded content, and post-production. Our goal is to transform ideas into powerful visual stories that leave lasting impressions.
        </p>

        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="/about"
            variant="secondary"
            size="md"
            className="w-full sm:w-auto justify-center"
            icon={<ArrowUpRight className="w-4 h-4" />}
          >
            Learn More About Studio
          </Button>
        </div>
      </div>
    </section>
  );
}
