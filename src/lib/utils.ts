import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "Recent";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatTimeAgo(dateString: string | undefined): string {
  if (!dateString) return "just now";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHours = Math.round(diffMin / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  } catch {
    return "Recently";
  }
}

export function getEmbedVideoUrl(url: string | undefined): { isEmbeddable: boolean; embedUrl: string; type: 'youtube' | 'vimeo' | 'direct' | 'unknown' } {
  if (!url) return { isEmbeddable: false, embedUrl: "", type: "unknown" };

  // YouTube
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      isEmbeddable: true,
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`,
      type: "youtube",
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      isEmbeddable: true,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&color=8b5cf6&title=0&byline=0&portrait=0`,
      type: "vimeo",
    };
  }

  // Direct MP4 / WebM video
  if (url.endsWith('.mp4') || url.endsWith('.webm')) {
    return {
      isEmbeddable: true,
      embedUrl: url,
      type: "direct",
    };
  }

  return {
    isEmbeddable: false,
    embedUrl: url,
    type: "unknown",
  };
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}
