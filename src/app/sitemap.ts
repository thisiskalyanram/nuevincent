import { MetadataRoute } from "next";
import { INITIAL_PROJECTS } from "@/lib/sample-projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nuevincent.com";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = INITIAL_PROJECTS.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
