import { PortfolioProject, ProjectCategory } from "@/types";

/**
 * ==============================================================================
 * NUEVINCENT STUDIO - CENTRALIZED PORTFOLIO & PROJECT DATA
 * ==============================================================================
 * 
 * To edit or add projects:
 * 1. Modify the fields below (title, slug, category, year, thumbnailUrl, videoUrl, etc.)
 * 2. Thumbnails can use local images (e.g. '/images/projects/my-thumb.jpg') or CDN URLs (Unsplash/YouTube/Pexels).
 * 3. Video URLs support YouTube (standard/short), Vimeo, or direct .mp4/.webm links.
 * 4. Set `featured: true` to display the project in the homepage Hero / Selected Work section.
 */

export const PROJECTS: PortfolioProject[] = [
  {
    id: "proj-1",
    title: "Echoes of Silence",
    slug: "echoes-of-silence",
    category: "FILMS",
    year: "2025",
    duration: "14m 20s",
    client: "Independent Cinema Initiative",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "An evocative narrative short film exploring memory, forgotten heritage, and intimate human connection captured in 2.39:1 anamorphic format.",
    fullStory: "Shot over 9 chilly winter mornings across historic Deccan architecture and rugged landscapes, 'Echoes of Silence' is an exploration of silence as a narrative device. Using natural low-light cinematography and custom Kodak 5219 film emulation LUTs, the film captures poetic melancholy through lingering portraits and atmospheric sound design.",
    services: ["Cinematography", "Direction", "Color Grading", "Sound Design", "Original Score"],
    credits: [
      { role: "Director", name: "NUEVINCENT Creative Team" },
      { role: "Director of Photography", name: "Vincent K." },
      { role: "Lead Colorist", name: "Arjun Rao" },
      { role: "Sound Designer & Foley", name: "Siddharth Verma" },
      { role: "Editor", name: "NUEVINCENT Post Lab" }
    ],
    challenge: "Capturing authentic natural dawn lighting with minimal artificial fixtures while maintaining deep shadow detail on large format digital sensors.",
    solution: "Leveraged ultra-fast T1.5 prime lenses and custom atmospheric haze techniques to capture authentic diffused morning light, followed by 16-bit DaVinci Resolve color timing.",
    galleryUrls: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    createdAt: "2025-11-12T10:00:00Z"
  },
  {
    id: "proj-2",
    title: "Aura Velocity // Electric Future",
    slug: "aura-velocity",
    category: "ADVERTISING",
    year: "2025",
    duration: "1m 15s",
    client: "NextGen Mobility",
    thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    description: "High-octane commercial film combining precision tracking vehicle cinematography with kinetic motion graphics and electric audio design.",
    fullStory: "Designed for a global launch campaign, Aura Velocity showcases the raw dynamism of next-generation performance mobility. We orchestrated high-speed pursuit tracking on closed airport runways utilizing Russian arm gimbals and robotic arm camera rigs, paired with neon night aesthetic reflections.",
    services: ["Commercial Production", "Precision Drone Cinematography", "CGI Integration", "VFX Compositing"],
    credits: [
      { role: "Creative Director", name: "NUEVINCENT Studio" },
      { role: "Camera Car Operator", name: "Marcus Reynolds" },
      { role: "VFX Supervisor", name: "Elena Rostova" },
      { role: "Colorist", name: "Vincent K." }
    ],
    challenge: "Synchronizing rapid high-speed car maneuvers with moving camera cranes during a 45-minute magic hour twilight window.",
    solution: "Pre-visualized the entire sequence in 3D animatics, enabling the crew to execute 8 flawless high-speed passes within the optimal lighting window.",
    galleryUrls: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    createdAt: "2025-10-05T14:30:00Z"
  },
  {
    id: "proj-3",
    title: "Lumina: Chronograph Essence",
    slug: "lumina-chronograph",
    category: "PRODUCTS",
    year: "2025",
    duration: "45s",
    client: "Lumina Haute Horlogerie",
    thumbnailUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    description: "Macro-level product film highlighting the mechanical poetry, bevelled edges, and jewel mechanics of luxury timepieces.",
    fullStory: "Shot in our studio with probe macro lenses, motorized micro-sliders, and precision fiber-optic lighting, this commercial accentuates the intricate tactile craftsmanship of luxury horology. Every tick and sweep is reinforced with custom acoustic foley recorded in an anechoic chamber.",
    services: ["Macro Cinematography", "Studio Lighting Design", "Post-Production", "Motion Graphics"],
    credits: [
      { role: "Lighting Director", name: "David Chen" },
      { role: "Macro Specialist", name: "Vincent K." },
      { role: "Post Production", name: "NUEVINCENT Lab" }
    ],
    challenge: "Eliminating micro-dust particles and managing extreme depth-of-field reflections on sapphire crystal glass.",
    solution: "Utilized cleanroom filtered air containment and motorized focus stacking passes blended in post-production.",
    galleryUrls: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    createdAt: "2025-09-18T09:15:00Z"
  },
  {
    id: "proj-4",
    title: "Nocturne: Neon Reverie",
    slug: "nocturne-neon-reverie",
    category: "BRANDS",
    year: "2025",
    duration: "2m 10s",
    client: "Urban Streetwear Co.",
    thumbnailUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "A gritty, hyper-stylized brand film celebrating underground youth culture, streetwear aesthetics, and raw kinetic energy.",
    fullStory: "A blend of 16mm analog film grain, mixed frame rates (6fps step-printing to 120fps ultra-slow-mo), and hyper-saturated dual-tone lighting. The film establishes a distinct cultural resonance that elevated the brand's direct-to-consumer global drops.",
    services: ["Concept & Storyboarding", "Direction", "16mm Film Processing", "Color Grading"],
    credits: [
      { role: "Director", name: "Vincent K." },
      { role: "Stylist & Art Director", name: "Zara Sheikh" },
      { role: "Soundtrack Production", name: "Kavya Audio" }
    ],
    challenge: "Integrating analog film texture with modern digital vertical content formats without losing resolution.",
    solution: "Mastered in 4K DCI master format with calibrated optical scans of authentic 16mm Kodak Vision3 film stock.",
    galleryUrls: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false,
    createdAt: "2025-08-10T16:00:00Z"
  },
  {
    id: "proj-5",
    title: "Pulse of Hyderabad: Creators",
    slug: "pulse-of-hyderabad",
    category: "SOCIAL MEDIA",
    year: "2025",
    duration: "1m 00s",
    client: "City Culture Collective",
    thumbnailUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    description: "A fast-paced, vertical-first social media docu-series spotlighting culinary artists, indie musicians, and visual creators across Hyderabad.",
    fullStory: "Created specifically for 9:16 high-engagement social platforms, this series achieved over 4.8 million organic impressions. Utilizing snappy whip-pans, rhythmic sound matches, and vibrant color palettes, each episode packs maximum storytelling into 60 seconds.",
    services: ["Social Media Production", "Rapid Turnaround Post", "Vertical Cinematography", "Motion Design"],
    credits: [
      { role: "Producer", name: "NUEVINCENT Social Unit" },
      { role: "Mobile Rig Operator", name: "Rahul Varma" },
      { role: "Editor", name: "Ananya Roy" }
    ],
    challenge: "Delivering episodic high-fidelity visual pieces within 48-hour turnarounds per city creator.",
    solution: "Standardized on-set proxy pipelines and modular motion design graphics packages in Adobe After Effects.",
    galleryUrls: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false,
    createdAt: "2025-07-22T11:45:00Z"
  },
  {
    id: "proj-6",
    title: "Prism Chroma: Grade Showreel",
    slug: "prism-chroma-showreel",
    category: "POST-PRODUCTION",
    year: "2025",
    duration: "1m 45s",
    client: "NUEVINCENT Post Lab",
    thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "A masterclass showreel displaying before-and-after color grading transformations, skin tone calibration, and cinematic contrast curves.",
    fullStory: "Demonstrating the technical finesse of NUEVINCENT's dedicated post-production suite. Features split-screen slider breakdowns showing raw Log camera footage transformed into lush, filmic finished grades with film halation, grain synthesis, and balanced color density.",
    services: ["Color Grading", "Film Emulation", "Beauty Retouching", "ACES Color Pipeline"],
    credits: [
      { role: "Senior Colorist", name: "Vincent K." },
      { role: "Post Producer", name: "NUEVINCENT Studio" }
    ],
    challenge: "Maintaining strict color accuracy across multi-camera setups including ARRI, RED, Sony Venice, and Blackmagic cameras.",
    solution: "Implemented an end-to-end ACES (Academy Color Encoding System) workflow with calibrated Flanders Scientific reference OLED monitors.",
    galleryUrls: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    createdAt: "2025-06-15T18:00:00Z"
  }
];

/**
 * Helper functions to query project data synchronously across server & client components
 */
export function getAllProjects(category?: ProjectCategory): PortfolioProject[] {
  if (category && category !== "ALL") {
    return PROJECTS.filter(
      (p) => p.category.toUpperCase() === category.toUpperCase()
    );
  }
  return PROJECTS;
}

export function getFeaturedProjects(): PortfolioProject[] {
  const featured = PROJECTS.filter((p) => p.featured);
  return featured.length > 0 ? featured : PROJECTS.slice(0, 4);
}

export function getProjectBySlug(slug: string): PortfolioProject | null {
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export function getRelatedProjects(currentSlug: string, category?: string, limit: number = 3): PortfolioProject[] {
  return PROJECTS
    .filter((p) => p.slug !== currentSlug && (!category || p.category === category || p.featured))
    .slice(0, limit);
}
