import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/data/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | NUEVINCENT",
    };
  }

  return {
    title: `${project.title} | NUEVINCENT Work`,
    description: project.description,
    openGraph: {
      title: `${project.title} - NUEVINCENT Production`,
      description: project.description,
      images: [{ url: project.thumbnailUrl }],
    },
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.slug, project.category, 3);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />;
}
