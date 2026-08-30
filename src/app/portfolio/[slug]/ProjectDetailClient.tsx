"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  Users,
  Image as ImageIcon,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { PortfolioProject } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { VideoPlayerModal } from "@/components/portfolio/VideoPlayerModal";
import { getEmbedVideoUrl } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: PortfolioProject;
  relatedProjects: PortfolioProject[];
}

export function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  const { isEmbeddable, embedUrl, type } = getEmbedVideoUrl(project.videoUrl);

  const categoryVariantMap: Record<string, "purple" | "orange" | "cyan" | "neutral"> = {
    FILMS: "purple",
    ADVERTISING: "orange",
    BRANDS: "purple",
    PRODUCTS: "orange",
    "SOCIAL MEDIA": "cyan",
    "POST-PRODUCTION": "neutral",
  };

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Back Navigation Bar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/portfolio"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cinema-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center space-x-2">
          <Badge variant={categoryVariantMap[project.category] || "purple"}>
            {project.category}
          </Badge>
          <span className="text-xs font-mono text-cinema-500">{project.year}</span>
        </div>
      </section>

      {/* Main Hero Header & Project Info */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="space-y-3">
          {project.client && (
            <p className="text-xs font-mono tracking-widest text-brand-orange-light uppercase">
              CLIENT // {project.client}
            </p>
          )}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-xl text-cinema-200 font-sans max-w-4xl leading-relaxed font-light">
            {project.description}
          </p>
        </div>
      </section>

      {/* Hero Media Player / Video Frame */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative aspect-video-cinema sm:aspect-cinema w-full rounded-3xl overflow-hidden bg-cinema-950 border border-white/15 shadow-2xl group">
          {isEmbeddable && (type === "youtube" || type === "vimeo") ? (
            <iframe
              src={embedUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <Image
                src={project.thumbnailUrl}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-950/80 via-transparent to-black/30" />

              {project.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="w-20 h-20 rounded-full bg-brand-purple/90 text-white flex items-center justify-center shadow-glow-purple hover:scale-110 hover:bg-brand-purple transition-all duration-300 border border-white/40 backdrop-blur-md group-hover:shadow-[0_0_50px_rgba(139,92,246,0.8)]"
                    aria-label="Play project video"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Technical Specs Footer */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-white/70 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 pointer-events-none hidden sm:flex">
            <span>FORMAT: 2.39:1 ANAMORPHIC DCI</span>
            <span>COLOR: ACEScc / DAVINCI RESOLVE</span>
            <span>AUDIO: 5.1 SURROUND</span>
          </div>
        </div>
      </section>

      {/* Project Breakdown, Narrative & Credits Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Narrative, Challenge, Solution */}
          <div className="lg:col-span-8 space-y-10">
            {/* Story */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-wide">
                Project Narrative & Vision
              </h2>
              <p className="text-sm sm:text-base text-cinema-300 leading-relaxed font-sans">
                {project.fullStory || project.description}
              </p>
            </div>

            {/* Challenge & Solution if present */}
            {(project.challenge || project.solution) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {project.challenge && (
                  <div className="p-6 rounded-2xl bg-cinema-900 border border-white/10 space-y-2">
                    <h3 className="text-xs font-mono text-brand-orange-light uppercase tracking-wider font-bold">
                      THE CREATIVE CHALLENGE
                    </h3>
                    <p className="text-xs sm:text-sm text-cinema-300 font-sans leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-6 rounded-2xl bg-cinema-900 border border-white/10 space-y-2">
                    <h3 className="text-xs font-mono text-brand-purple-light uppercase tracking-wider font-bold">
                      THE PRODUCTION EXECUTION
                    </h3>
                    <p className="text-xs sm:text-sm text-cinema-300 font-sans leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Behind the scenes Gallery */}
            {project.galleryUrls && project.galleryUrls.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-2 text-xs font-mono text-cinema-400 uppercase tracking-wider">
                  <ImageIcon className="w-4 h-4 text-brand-purple-light" />
                  <span>Production Gallery & Behind the Scenes</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {project.galleryUrls.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedGalleryImage(url)}
                      className="relative aspect-video-cinema rounded-xl overflow-hidden bg-cinema-900 border border-white/10 cursor-pointer group hover:border-brand-purple/50 transition-all"
                    >
                      <Image
                        src={url}
                        alt={`${project.title} Production Still ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] font-mono text-white bg-black/80 px-2.5 py-1 rounded-full border border-white/20">
                          View Frame
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Metadata & Technical Credits */}
          <div className="lg:col-span-4 space-y-6">
            {/* Metadata Card */}
            <div className="rounded-2xl bg-cinema-900 border border-white/10 p-6 space-y-6">
              <h3 className="text-xs font-mono text-brand-purple-light uppercase tracking-widest font-bold">
                PROJECT SPECIFICATIONS
              </h3>

              <div className="space-y-4 text-xs font-mono">
                {project.client && (
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-cinema-400">Client:</span>
                    <span className="text-white font-semibold">{project.client}</span>
                  </div>
                )}

                <div className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-cinema-400">Discipline:</span>
                  <span className="text-white font-semibold">{project.category}</span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-cinema-400">Year of Release:</span>
                  <span className="text-white">{project.year}</span>
                </div>

                {project.duration && (
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-cinema-400">Runtime:</span>
                    <span className="text-white">{project.duration}</span>
                  </div>
                )}
              </div>

              {/* Services Rendered */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-xs font-mono text-cinema-400 uppercase tracking-wider block">
                  Services Provided
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.services.map((s, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-cinema-850 text-cinema-200 border border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Credits */}
              {project.credits && project.credits.length > 0 && (
                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-white uppercase tracking-wider font-bold">
                    <Users className="w-3.5 h-3.5 text-brand-orange-light" />
                    <span>Crew & Technical Credits</span>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    {project.credits.map((c, i) => (
                      <div key={i} className="flex justify-between text-cinema-300">
                        <span className="text-cinema-500">{c.role}:</span>
                        <span className="text-cinema-200 text-right">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Project Action */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <Button
                  href={`/contact?type=${encodeURIComponent(project.category)}`}
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Commission Similar Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-brand-purple-light uppercase tracking-widest">
                MORE SELECTED WORK
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                Related Projects
              </h3>
            </div>
            <Link
              href="/portfolio"
              className="text-xs font-mono uppercase text-brand-orange-light hover:text-white flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.slug}
                href={`/portfolio/${rel.slug}`}
                className="group bg-cinema-900 rounded-2xl border border-white/10 overflow-hidden hover:border-brand-purple/40 transition-all"
              >
                <div className="relative aspect-video-cinema overflow-hidden">
                  <Image
                    src={rel.thumbnailUrl}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-1">
                  <span className="text-[10px] font-mono text-brand-orange-light uppercase">{rel.category}</span>
                  <h4 className="text-base font-heading font-bold text-white group-hover:text-brand-purple-light transition-colors">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Video Modal */}
      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={project.title}
        videoUrl={project.videoUrl}
      />

      {/* Gallery Lightbox */}
      {selectedGalleryImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
            <Image
              src={selectedGalleryImage}
              alt="Production Still Expanded"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
