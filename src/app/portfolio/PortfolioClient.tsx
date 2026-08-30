"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Film, Sparkles, Filter, RefreshCcw } from "lucide-react";
import { PortfolioProject, ProjectCategory } from "@/types";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { VideoPlayerModal } from "@/components/portfolio/VideoPlayerModal";
import { Button } from "@/components/ui/Button";

const CATEGORIES: ProjectCategory[] = [
  "ALL",
  "FILMS",
  "ADVERTISING",
  "BRANDS",
  "PRODUCTS",
  "SOCIAL MEDIA",
  "POST-PRODUCTION",
];

interface PortfolioClientProps {
  initialProjects: PortfolioProject[];
}

export function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCat = (searchParams?.get("category")?.toUpperCase() as ProjectCategory) || "ALL";
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(
    CATEGORIES.includes(initialCat) ? initialCat : "ALL"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoProject, setSelectedVideoProject] = useState<PortfolioProject | null>(null);

  const handleCategorySelect = (cat: ProjectCategory) => {
    setSelectedCategory(cat);
    if (cat === "ALL") {
      router.push("/portfolio", { scroll: false });
    } else {
      router.push(`/portfolio?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
  };

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchCat =
        selectedCategory === "ALL" ||
        p.category.toUpperCase() === selectedCategory.toUpperCase();
      const matchSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="pt-28 pb-20 space-y-12">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cinema-900 border border-brand-purple/30 text-xs font-mono tracking-widest uppercase text-brand-purple-light">
          <Film className="w-3.5 h-3.5" />
          <span>PRODUCTION PORTFOLIO</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight uppercase">
          SELECTED CINEMATIC <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light via-white to-brand-orange-light">
            STORIES & FILMS.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-cinema-300 font-sans max-w-2xl mx-auto leading-relaxed">
          Explore our body of work across narrative cinema, commercial brand advertising, high-precision product films, and post-production color suites.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-cinema-900/80 border border-white/10 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? "bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white shadow-glow-purple border border-brand-purple-light/40 font-bold"
                      : "text-cinema-300 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-cinema-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search work, tags, clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cinema-850 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-cinema-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cinema-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-cinema-400 px-2">
          <span>
            SHOWING {filteredProjects.length} PROJECT{filteredProjects.length !== 1 ? "S" : ""}
          </span>
          {selectedCategory !== "ALL" && (
            <span className="text-brand-purple-light">FILTERED BY // {selectedCategory}</span>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id || project.slug}
                project={project}
                priority={idx < 3}
                onPlayVideo={(p) => setSelectedVideoProject(p)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-3xl bg-cinema-900/60 border border-white/10 p-12 text-center max-w-lg mx-auto space-y-4 my-12">
            <div className="w-14 h-14 rounded-2xl bg-cinema-800 border border-white/10 flex items-center justify-center text-cinema-400 mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white">No projects found</h3>
            <p className="text-xs text-cinema-300 font-sans">
              No projects matching &ldquo;{searchQuery || selectedCategory}&rdquo; were found. Try choosing a different category or search term.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
                router.push("/portfolio");
              }}
              variant="outline"
              size="sm"
              icon={<RefreshCcw className="w-3.5 h-3.5" />}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Video Modal */}
      {selectedVideoProject && (
        <VideoPlayerModal
          isOpen={Boolean(selectedVideoProject)}
          onClose={() => setSelectedVideoProject(null)}
          title={selectedVideoProject.title}
          videoUrl={selectedVideoProject.videoUrl}
        />
      )}
    </div>
  );
}
