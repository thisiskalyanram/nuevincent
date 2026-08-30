import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Film, Eye, Sparkles, Target, Compass, Award, Clapperboard, Sliders, ArrowUpRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "About Us | NUEVINCENT Creative Studio",
  description: "NUEVINCENT is a creative media and visual production studio focused on filmmaking, advertising, branded content and post-production.",
};

const PILLARS = [
  {
    icon: Eye,
    title: "WHO WE ARE",
    tagline: "Filmmakers, storytellers, visual architects.",
    description: "NUEVINCENT is an independent creative media and video production studio rooted in Hyderabad, India. We operate at the intersection of cinematic filmmaking, high-impact brand advertising, and meticulous post-production engineering.",
  },
  {
    icon: Target,
    title: "WHAT WE BELIEVE",
    tagline: "Emotion precedes attention.",
    description: "In an era of endless scrolling and disposable digital noise, true impact requires depth, narrative rhythm, and uncompromising visual polish. We believe every brand, film, and idea possesses an authentic visual pulse that deserves cinematic reverence.",
  },
  {
    icon: Clapperboard,
    title: "WHAT WE CREATE",
    tagline: "Stories engineered for longevity.",
    description: "From narrative short films and festival-bound independent cinema to global product launch commercials, dynamic social media universes, and master DaVinci Resolve color grades, our work spans the entire visual spectrum.",
  },
];

const STUDIO_SPECS = [
  { label: "Cinema Capture", detail: "Large format 4K/6K Digital Cinema & Anamorphic primes" },
  { label: "Post-Production Lab", detail: "DaVinci Resolve Studio & 10-bit Reference OLED Monitoring" },
  { label: "Audio Suite", detail: "5.1 Surround Mixing, Foley Recording & Sound Design" },
  { label: "On-Set Lighting", detail: "Full Aputure / ARRI wireless LED fixture package & Haze" },
  { label: "Aerial & Tracking", detail: "FPV Cinema Drones, Ronin 2 Rigs & High-speed Gimbal Car" },
  { label: "Distribution Ready", detail: "DCI Cinema DCPs, Broadcast Rec.709 & Social 9:16 Packages" },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 space-y-24">
      {/* Hero Intro */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cinema-900 border border-brand-purple/30 text-xs font-mono tracking-widest uppercase text-brand-purple-light">
          <Film className="w-3.5 h-3.5" />
          <span>ABOUT NUEVINCENT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight uppercase">
          WE DON&rsquo;T JUST MAKE VIDEOS. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light via-white to-brand-orange-light">
            WE CREATE EXPERIENCES.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-cinema-200 font-sans max-w-3xl mx-auto leading-relaxed font-light">
          NUEVINCENT is a creative media and visual production studio focused on filmmaking, advertising, branded content, and post-production. Our goal is to transform ideas into powerful visual stories.
        </p>
      </section>

      {/* Cinematic Studio Visual */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative aspect-video-cinema sm:aspect-cinema w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop"
            alt="NUEVINCENT Film Production Studio Behind the Scenes"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-cinema-950/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-white/80 gap-2 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div>
              <span className="text-brand-orange-light font-bold">NUEVINCENT LAB //</span> HYDERABAD PRODUCTION BASE
            </div>
            <div className="text-cinema-400">
              CRAFT &bull; VISION &bull; DISCIPLINE &bull; RESULTS
            </div>
          </div>
        </div>
      </section>

      {/* Pillars: Who We Are, What We Believe, What We Create */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-cinema-900/70 border border-white/10 rounded-2xl p-8 space-y-4 hover:border-brand-purple/40 hover:bg-cinema-850/80 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-cinema-800 border border-white/10 flex items-center justify-center text-brand-purple-light">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-heading font-bold text-white tracking-wide">
                  {pillar.title}
                </h2>
                <p className="text-xs font-mono text-brand-orange-light uppercase tracking-wider">
                  {pillar.tagline}
                </p>
                <p className="text-sm text-cinema-300 leading-relaxed font-sans pt-2 border-t border-white/5">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Production Infrastructure & Capabilities */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-cinema-900 border border-white/10 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-brand-purple-light uppercase tracking-widest">
              INFRASTRUCTURE & TECHNICAL RIGS
            </span>
            <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white">
              Engineered for cinema-grade fidelity.
            </h3>
            <p className="text-sm text-cinema-300">
              We own and deploy cutting-edge camera rigs, calibrated monitoring systems, and post-production workstations to guarantee consistent, uncompromising quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {STUDIO_SPECS.map((spec, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-cinema-850 border border-white/5 space-y-1.5 hover:border-brand-purple/30 transition-all"
              >
                <div className="flex items-center space-x-2 text-xs font-mono text-brand-orange-light uppercase font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-purple" />
                  <span>{spec.label}</span>
                </div>
                <p className="text-sm text-cinema-200 font-sans">{spec.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
