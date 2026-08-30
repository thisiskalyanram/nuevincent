"use client";

import React from "react";
import Link from "next/link";
import { Clapperboard, Sparkles } from "lucide-react";

const CATEGORIES = [
  { name: "FILMS", href: "/portfolio?category=FILMS", tag: "CINEMA" },
  { name: "ADS", href: "/portfolio?category=ADVERTISING", tag: "COMMERCIALS" },
  { name: "VISUALS", href: "/services#visual-storytelling", tag: "NARRATIVE" },
  { name: "BRANDS", href: "/portfolio?category=BRANDS", tag: "CAMPAIGNS" },
  { name: "CONTENT", href: "/services#content-creation", tag: "DIGITAL" },
  { name: "POST-PRODUCTION", href: "/services#post-production", tag: "COLOR & VFX" },
];

export function CategoryTicker() {
  return (
    <section className="relative bg-cinema-900/90 border-y border-white/10 py-6 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-brand-purple-light">
          <Clapperboard className="w-3.5 h-3.5" />
          <span>WHAT WE CREATE</span>
        </div>
        <span className="text-[11px] font-mono text-cinema-400">DISCIPLINES // 06</span>
      </div>

      {/* Infinite scrolling Marquee */}
      <div className="flex w-full overflow-hidden whitespace-nowrap">
        <div className="flex items-center space-x-8 animate-marquee shrink-0">
          {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center space-x-3 group px-4 py-2 rounded-xl hover:bg-white/5 transition-all"
            >
              <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-wider text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple-light group-hover:to-brand-orange-light transition-all">
                {item.name}
              </span>
              <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-cinema-800 text-cinema-300 border border-white/10 group-hover:border-brand-purple/40">
                {item.tag}
              </span>
              <span className="text-cinema-600 text-sm font-mono">&bull;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
