"use client";

import React, { useEffect } from "react";
import { X, Play } from "lucide-react";
import { getEmbedVideoUrl } from "@/lib/utils";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title: string;
}

export function VideoPlayerModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: VideoPlayerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { isEmbeddable, embedUrl, type } = getEmbedVideoUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl bg-cinema-900 border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-cinema-950">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-cinema-300 uppercase truncate max-w-md">
              PLAYING: {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-cinema-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          {isEmbeddable && (type === "youtube" || type === "vimeo") ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : isEmbeddable && type === "direct" ? (
            <video
              src={embedUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center p-8 text-cinema-400">
              <Play className="w-12 h-12 mx-auto mb-4 text-brand-purple opacity-70" />
              <p className="text-sm font-mono">Video stream ready. Connect your YouTube or Vimeo link in Admin.</p>
              {videoUrl && (
                <p className="text-xs text-cinema-500 mt-2 truncate max-w-md mx-auto">{videoUrl}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
