"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VideoPlayerModal } from "@/components/portfolio/VideoPlayerModal";

export function HeroSection() {
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const updateTimecode = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const frames = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, "0");
      setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
    };
    const interval = setInterval(updateTimecode, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Cinematic Backdrop Image / Video Frame */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop"
          alt="NUEVINCENT Cinematic Production Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-40 contrast-110"
        />
        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-cinema-950/70 to-cinema-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#050507_90%)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Cinematic Viewfinder Elements */}
      <div className="hidden lg:block absolute inset-10 pointer-events-none border border-white/10 rounded-3xl z-10">
        {/* Viewfinder crosshairs */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-brand-purple-light/60" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-brand-purple-light/60" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-brand-purple-light/60" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-brand-purple-light/60" />

        {/* Framing specs */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-white/50 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
          2.39:1 &bull; 4K DCI &bull; 24 FPS &bull; RAW
        </div>

        <div className="absolute bottom-4 left-6 flex items-center space-x-2 text-[10px] font-mono tracking-wider text-white/60">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-rec" />
          <span>REC</span>
          <span className="text-white/40">|</span>
          <span className="font-mono text-white/80">{timecode}</span>
        </div>

        <div className="absolute bottom-4 right-6 text-[10px] font-mono tracking-widest text-white/60">
          HYDERABAD &bull; STUDIO LAB
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Top Tagline */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-cinema-900/80 border border-brand-purple/30 backdrop-blur-md shadow-glow-purple">
          <Sparkles className="w-3.5 h-3.5 text-brand-orange-light shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white font-medium">
            CREATIVE VIDEO PRODUCTION & AD STUDIO
          </span>
        </div>

        {/* Massive Headline */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-white leading-[1.05]">
            NUEVINCENT
          </h1>
          <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-light tracking-wide text-cinema-200">
            <span className="text-white font-medium">Creative Visuals.</span>{" "}
            <span className="text-brand-purple-lighter">Stories.</span>{" "}
            <span className="text-brand-orange-light">Brands.</span>{" "}
            <span className="text-white font-medium">Films.</span>
          </p>
        </div>

        {/* Primary Statement */}
        <p className="text-sm sm:text-lg md:text-xl text-cinema-300 max-w-3xl mx-auto font-sans font-light leading-relaxed px-2 sm:px-0">
          We turn ideas, stories and brands into experiences that make an impact.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full max-w-md sm:max-w-none mx-auto">
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
            href="/portfolio"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto justify-center"
            icon={<Play className="w-3.5 h-3.5 fill-current" />}
          >
            View Our Work
          </Button>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 text-xs font-mono text-cinema-300 hover:text-white uppercase tracking-wider py-2.5 px-4 hover:bg-white/5 rounded-full transition-colors border border-white/5 sm:border-transparent"
          >
            <span className="w-6 h-6 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 text-brand-orange-light fill-brand-orange-light ml-0.5" />
            </span>
            <span>Watch Showreel</span>
          </button>
        </div>
      </div>

      {/* Showreel Lightbox */}
      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="NUEVINCENT Master Showreel 2026"
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
    </section>
  );
}
