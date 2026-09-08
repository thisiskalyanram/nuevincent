import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProjects } from "@/data/projects";
import { PortfolioClient } from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio & Works | NUEVINCENT",
  description: "Browse selected films, brand advertisements, commercials, product videos, and post-production grades by NUEVINCENT.",
};

export default function PortfolioPage() {
  const initialProjects = getAllProjects();

  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center font-mono text-xs text-cinema-400">LOADING PORTFOLIO...</div>}>
      <PortfolioClient initialProjects={initialProjects} />
    </Suspense>
  );
}
