"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { PortfolioProject } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: PortfolioProject;
  onPlayVideo?: (project: PortfolioProject) => void;
  priority?: boolean;
}

export function ProjectCard({
  project,
  onPlayVideo,
  priority = false,
}: ProjectCardProps) {
  const categoryVariantMap: Record<string, "purple" | "orange" | "cyan" | "neutral"> = {
    FILMS: "purple",
    ADVERTISING: "orange",
    BRANDS: "purple",
    PRODUCTS: "orange",
    "SOCIAL MEDIA": "cyan",
    "POST-PRODUCTION": "neutral",
  };

  return (
    <div className="group relative bg-cinema-900/80 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-brand-purple/40 hover:shadow-cinema-hover hover:-translate-y-1.5">
      {/* Visual Media Thumbnail with Aspect Framing */}
      <div className="relative aspect-video-cinema sm:aspect-cinema w-full overflow-hidden bg-cinema-950">
        <Image
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-cinema-950/30 to-transparent" />

        {/* Category & Status Badges */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
          <Badge variant={categoryVariantMap[project.category] || "purple"}>
            {project.category}
          </Badge>
          {project.featured && (
            <span className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-brand-orange text-white font-bold tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> FEATURED
            </span>
          )}
        </div>

        {/* Year and Duration */}
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 text-[11px] font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white/80 border border-white/10">
          <span>{project.year}</span>
          {project.duration && (
            <>
              <span className="text-white/30">|</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-orange-light" />
                {project.duration}
              </span>
            </>
          )}
        </div>

        {/* Hover / Touch Center Play Button */}
        {project.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-purple/90 text-white flex items-center justify-center shadow-glow-purple group-hover:scale-110 transition-all duration-300 border border-white/30 backdrop-blur-sm pointer-events-auto cursor-pointer">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onPlayVideo?.(project);
                }}
                className="w-full h-full flex items-center justify-center text-white"
                aria-label={`Play video for ${project.title}`}
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info Body */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex flex-col justify-between flex-1">
        <div className="space-y-1.5 sm:space-y-2">
          {project.client && (
            <p className="text-[11px] sm:text-xs font-mono tracking-widest text-brand-orange-light uppercase truncate">
              CLIENT // {project.client}
            </p>
          )}
          <Link href={`/portfolio/${project.slug}`} className="block group-hover:underline">
            <h3 className="text-lg sm:text-2xl font-heading font-bold text-white group-hover:text-brand-purple-lighter transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-cinema-300 line-clamp-2 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Services & Link */}
        <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 sm:gap-1.5 max-w-[65%]">
            {project.services.slice(0, 2).map((s, i) => (
              <span
                key={i}
                className="text-[9px] sm:text-[10px] font-mono text-cinema-400 bg-cinema-850 px-2 py-0.5 rounded border border-white/5 truncate max-w-[110px]"
              >
                {s}
              </span>
            ))}
            {project.services.length > 2 && (
              <span className="text-[9px] sm:text-[10px] font-mono text-cinema-500 self-center">
                +{project.services.length - 2}
              </span>
            )}
          </div>

          <Link
            href={`/portfolio/${project.slug}`}
            className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-cinema-300 group-hover:text-white flex items-center gap-1 transition-colors hover:text-brand-purple-light shrink-0"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
