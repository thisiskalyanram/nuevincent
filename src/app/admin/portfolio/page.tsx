"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Film,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  ExternalLink,
  Save,
  Clock,
  Play,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  X,
} from "lucide-react";
import { PortfolioProject, ProjectCategory } from "@/types";
import {
  getPortfolioProjects,
  savePortfolioProject,
  deletePortfolioProject,
} from "@/lib/firestore-service";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { slugify } from "@/lib/utils";

const CATEGORY_OPTIONS = [
  { value: "FILMS", label: "Films (Short Films / Cinema)" },
  { value: "ADVERTISING", label: "Advertising (Commercials / Brand)" },
  { value: "BRANDS", label: "Brands (Brand Films / Campaigns)" },
  { value: "PRODUCTS", label: "Products (Product Commercials)" },
  { value: "SOCIAL MEDIA", label: "Social Media (Reels / YouTube)" },
  { value: "POST-PRODUCTION", label: "Post-Production (Color / VFX)" },
];

function PortfolioAdminContent() {
  const searchParams = useSearchParams();
  const shouldOpenNew = searchParams?.get("action") === "new";

  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State (Add or Edit)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<PortfolioProject | null>(null);

  // Form input strings for comma-separated items
  const [servicesInput, setServicesInput] = useState("");
  const [galleryUrlsInput, setGalleryUrlsInput] = useState("");
  const [creditsList, setCreditsList] = useState<{ role: string; name: string }[]>([]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getPortfolioProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (shouldOpenNew) {
      handleOpenCreate();
    }
  }, [shouldOpenNew]);

  const handleOpenCreate = () => {
    setEditingProject({
      title: "",
      slug: "",
      category: "FILMS",
      year: new Date().getFullYear().toString(),
      duration: "2m 30s",
      client: "",
      description: "",
      fullStory: "",
      thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      challenge: "",
      solution: "",
      featured: false,
    });
    setServicesInput("Cinematography, Direction, Color Grading");
    setGalleryUrlsInput(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop\nhttps://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=800&auto=format&fit=crop"
    );
    setCreditsList([
      { role: "Director", name: "Vincent K." },
      { role: "Director of Photography", name: "NUEVINCENT Team" },
      { role: "Lead Colorist", name: "Arjun Rao" },
    ]);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setServicesInput(project.services.join(", "));
    setGalleryUrlsInput((project.galleryUrls || []).join("\n"));
    setCreditsList(project.credits || []);
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject.title || !editingProject.thumbnailUrl) {
      alert("Please fill in project title and thumbnail URL.");
      return;
    }

    setIsSaving(true);
    try {
      const generatedSlug = editingProject.slug || slugify(editingProject.title);
      const services = servicesInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const galleryUrls = galleryUrlsInput
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean);

      const projectData: PortfolioProject = {
        id: editingProject.id,
        title: editingProject.title,
        slug: generatedSlug,
        category: (editingProject.category as any) || "FILMS",
        year: editingProject.year || new Date().getFullYear().toString(),
        duration: editingProject.duration || "",
        client: editingProject.client || "",
        thumbnailUrl: editingProject.thumbnailUrl,
        videoUrl: editingProject.videoUrl || "",
        description: editingProject.description || "",
        fullStory: editingProject.fullStory || "",
        challenge: editingProject.challenge || "",
        solution: editingProject.solution || "",
        services: services.length > 0 ? services : ["Film Production"],
        credits: creditsList.filter((c) => c.role.trim() && c.name.trim()),
        galleryUrls,
        featured: Boolean(editingProject.featured),
      };

      await savePortfolioProject(projectData);
      await fetchProjects();
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Save project error:", err);
      alert("Failed to save project.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete || !projectToDelete.id) return;
    try {
      await deletePortfolioProject(projectToDelete.id);
      await fetchProjects();
      setProjectToDelete(null);
    } catch (err) {
      console.error("Delete project error:", err);
    }
  };

  const addCreditRow = () => {
    setCreditsList([...creditsList, { role: "", name: "" }]);
  };

  const updateCreditRow = (index: number, field: "role" | "name", val: string) => {
    const next = [...creditsList];
    next[index][field] = val;
    setCreditsList(next);
  };

  const removeCreditRow = (index: number) => {
    setCreditsList(creditsList.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Portfolio Management
          </h1>
          <p className="text-xs font-mono text-cinema-400">
            ADD, EDIT, AND PUBLISH CINEMATIC WORKS & CREDITS
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          variant="primary"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          Add New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="p-16 text-center text-xs font-mono text-cinema-400">
          LOADING PORTFOLIO WORKS...
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-cinema-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-brand-purple/40 transition-all shadow-xl"
            >
              <div className="relative aspect-video-cinema bg-black overflow-hidden">
                <Image
                  src={project.thumbnailUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/70 text-brand-purple-light border border-brand-purple/40 uppercase">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-brand-orange text-white font-bold">
                      FEATURED
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-white/80">
                  {project.year}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  {project.client && (
                    <p className="text-[10px] font-mono text-brand-orange-light uppercase">
                      {project.client}
                    </p>
                  )}
                  <h3 className="text-lg font-heading font-bold text-white leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cinema-400 line-clamp-2 font-sans">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={`/portfolio/${project.slug}`}
                    target="_blank"
                    className="text-xs font-mono text-cinema-400 hover:text-white flex items-center gap-1"
                  >
                    <span>View Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-1.5 rounded-lg bg-cinema-800 text-cinema-300 hover:text-white hover:bg-brand-purple/30 transition-colors"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setProjectToDelete(project)}
                      className="p-1.5 rounded-lg bg-cinema-800 text-rose-400 hover:text-rose-200 hover:bg-rose-500/20 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-2xl bg-cinema-900 border border-white/10 space-y-4">
          <Film className="w-12 h-12 text-cinema-500 mx-auto" />
          <h3 className="text-lg font-heading font-bold text-white">No portfolio projects live yet</h3>
          <p className="text-xs text-cinema-400 max-w-sm mx-auto">
            Click below to create your first cinematic showcase piece.
          </p>
          <Button onClick={handleOpenCreate} variant="primary" size="sm">
            Add First Project
          </Button>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={editingProject.id ? `Edit Project: ${editingProject.title}` : "Add New Portfolio Project"}
          maxWidth="4xl"
        >
          <form onSubmit={handleSave} className="space-y-6 text-xs font-mono">
            {/* Row 1: Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Project Title"
                placeholder="e.g. Echoes of Silence"
                required
                value={editingProject.title || ""}
                onChange={(e) => {
                  const title = e.target.value;
                  setEditingProject((prev) => ({
                    ...prev,
                    title,
                    slug: prev.id ? prev.slug : slugify(title),
                  }));
                }}
              />

              <Select
                label="Discipline / Category"
                required
                options={CATEGORY_OPTIONS}
                value={editingProject.category || "FILMS"}
                onChange={(e) =>
                  setEditingProject((prev) => ({ ...prev, category: e.target.value as any }))
                }
              />
            </div>

            {/* Row 2: Slug & Client */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="URL Slug"
                placeholder="echoes-of-silence"
                required
                value={editingProject.slug || ""}
                onChange={(e) =>
                  setEditingProject((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                }
              />

              <Input
                label="Client / Brand"
                placeholder="e.g. Independent Cinema"
                value={editingProject.client || ""}
                onChange={(e) =>
                  setEditingProject((prev) => ({ ...prev, client: e.target.value }))
                }
              />

              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Year"
                  placeholder="2026"
                  value={editingProject.year || ""}
                  onChange={(e) =>
                    setEditingProject((prev) => ({ ...prev, year: e.target.value }))
                  }
                />
                <Input
                  label="Runtime"
                  placeholder="14m 20s"
                  value={editingProject.duration || ""}
                  onChange={(e) =>
                    setEditingProject((prev) => ({ ...prev, duration: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Row 3: Media URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Thumbnail Image URL"
                placeholder="https://images.unsplash.com/..."
                required
                value={editingProject.thumbnailUrl || ""}
                hint="High-res 16:9 or 2.39:1 image URL"
                onChange={(e) =>
                  setEditingProject((prev) => ({ ...prev, thumbnailUrl: e.target.value }))
                }
              />

              <Input
                label="Video URL (YouTube / Vimeo / MP4)"
                placeholder="https://www.youtube.com/watch?v=..."
                value={editingProject.videoUrl || ""}
                hint="YouTube, Vimeo, or direct MP4 stream"
                onChange={(e) =>
                  setEditingProject((prev) => ({ ...prev, videoUrl: e.target.value }))
                }
              />
            </div>

            {/* Row 4: Descriptions */}
            <Textarea
              label="Short Description (Appears on cards & search)"
              rows={2}
              required
              placeholder="Brief summary of the visual piece..."
              value={editingProject.description || ""}
              onChange={(e) =>
                setEditingProject((prev) => ({ ...prev, description: e.target.value }))
              }
            />

            <Textarea
              label="Full Narrative / Project Story (Detail Page)"
              rows={4}
              placeholder="In-depth story behind the production, camera choices, and creative direction..."
              value={editingProject.fullStory || ""}
              onChange={(e) =>
                setEditingProject((prev) => ({ ...prev, fullStory: e.target.value }))
              }
            />

            {/* Row 5: Services & Challenge/Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Services Rendered (Comma separated)"
                placeholder="Cinematography, Direction, Color Grading"
                value={servicesInput}
                onChange={(e) => setServicesInput(e.target.value)}
              />

              <div className="flex items-center space-x-3 pt-6">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProject.featured)}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...prev, featured: e.target.checked }))
                    }
                    className="w-4 h-4 rounded bg-cinema-850 border-white/20 text-brand-purple focus:ring-brand-purple"
                  />
                  <span className="text-white text-xs">Feature on Homepage</span>
                </label>
              </div>
            </div>

            {/* Row 6: Credits Table */}
            <div className="space-y-3 p-4 rounded-xl bg-cinema-850 border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase">Technical Crew Credits</span>
                <button
                  type="button"
                  onClick={addCreditRow}
                  className="text-brand-purple-light hover:text-white text-xs flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Credit</span>
                </button>
              </div>

              <div className="space-y-2">
                {creditsList.map((credit, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      placeholder="Role (e.g. Director)"
                      value={credit.role}
                      onChange={(e) => updateCreditRow(idx, "role", e.target.value)}
                      className="bg-cinema-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white w-1/3"
                    />
                    <input
                      placeholder="Name (e.g. Vincent K.)"
                      value={credit.name}
                      onChange={(e) => updateCreditRow(idx, "name", e.target.value)}
                      className="bg-cinema-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeCreditRow(idx)}
                      className="text-cinema-500 hover:text-rose-400 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 7: Behind the scenes Gallery URLs */}
            <Textarea
              label="Production Gallery URLs (One per line)"
              rows={3}
              placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
              value={galleryUrlsInput}
              onChange={(e) => setGalleryUrlsInput(e.target.value)}
            />

            {/* Submit Bar */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
              <Button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSaving}
                icon={<Save className="w-3.5 h-3.5" />}
              >
                Save Project
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <Modal
          isOpen={Boolean(projectToDelete)}
          onClose={() => setProjectToDelete(null)}
          title="Delete Portfolio Project"
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs font-mono text-center">
            <Trash2 className="w-10 h-10 text-rose-500 mx-auto" />
            <p className="text-sm text-white font-heading font-medium">
              Delete &ldquo;{projectToDelete.title}&rdquo;?
            </p>
            <p className="text-cinema-400 font-sans">
              This will remove the project from your public portfolio and database.
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <Button
                onClick={() => setProjectToDelete(null)}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                variant="primary"
                size="sm"
                className="bg-rose-600 hover:bg-rose-700"
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function AdminPortfolioPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs font-mono text-cinema-400">LOADING PORTFOLIO ADMIN...</div>}>
      <PortfolioAdminContent />
    </Suspense>
  );
}
