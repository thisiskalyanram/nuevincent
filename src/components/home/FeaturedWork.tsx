"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clapperboard } from "lucide-react";
import { PortfolioProject } from "@/types";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { VideoPlayerModal } from "@/components/portfolio/VideoPlayerModal";
import { Button } from "@/components/ui/Button";

interface FeaturedWorkProps {
  projects: PortfolioProject[];
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const [selectedVideoProject, setSelectedVideoProject] = useState<PortfolioProject | null>(null);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8 gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-mono tracking-widest text-brand-orange-light uppercase">
            <Clapperboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>SELECTED PORTFOLIO</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Cinematic work crafted for modern audiences.
          </h2>
        </div>
        <Button
          href="/portfolio"
          variant="outline"
          size="md"
          className="w-full sm:w-auto justify-center self-start md:self-auto"
          icon={<ArrowUpRight className="w-4 h-4" />}
        >
          View Full Portfolio
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayProjects.map((project, idx) => (
          <ProjectCard
            key={project.id || project.slug}
            project={project}
            priority={idx < 2}
            onPlayVideo={(p) => setSelectedVideoProject(p)}
          />
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideoProject && (
        <VideoPlayerModal
          isOpen={Boolean(selectedVideoProject)}
          onClose={() => setSelectedVideoProject(null)}
          title={selectedVideoProject.title}
          videoUrl={selectedVideoProject.videoUrl}
        />
      )}
    </section>
  );
}
