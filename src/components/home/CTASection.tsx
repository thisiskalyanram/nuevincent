"use client";

import React from "react";
import { ArrowUpRight, Sparkles, Film, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Boxed cinematic call to action banner */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cinema-900 via-cinema-850 to-cinema-950 border border-brand-purple/30 p-6 sm:p-12 lg:p-16 overflow-hidden text-center shadow-2xl">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Viewfinder crosshairs */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-3 sm:w-3.5 h-3 sm:h-3.5 border-t border-l border-white/30" />
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-3 sm:w-3.5 h-3 sm:h-3.5 border-t border-r border-white/30" />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-3 sm:w-3.5 h-3 sm:h-3.5 border-b border-l border-white/30" />
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-3 sm:w-3.5 h-3 sm:h-3.5 border-b border-r border-white/30" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cinema-800/80 border border-white/10 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-brand-orange-light">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>LET&rsquo;S COLLABORATE</span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
              HAVE AN IDEA?
            </h2>
            <p className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-heading font-light text-brand-purple-lighter">
              LET&rsquo;S BRING IT TO LIFE.
            </p>
          </div>

          <p className="text-xs sm:text-base text-cinema-300 max-w-xl mx-auto font-sans leading-relaxed px-2">
            Whether it&rsquo;s an independent short film, high-octane brand commercial, or full post-production color suite, we&rsquo;re ready to create something extraordinary.
          </p>

          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto justify-center shadow-glow-purple"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Start a Project
            </Button>
            <Button
              href="mailto:contact@nuevincent.com"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto justify-center"
              icon={<Mail className="w-4 h-4" />}
            >
              Email Us Directly
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
