import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioProjects, getProjectBySlug } from "@/lib/firestore-service";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getPortfolioProjects();
  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug && (p.category === project.category || p.featured))
    .slice(0, 3);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />;
}
