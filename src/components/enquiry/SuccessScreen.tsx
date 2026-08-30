"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Film, ArrowRight, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";

interface SuccessScreenProps {
  referenceId: string;
  clientName: string;
  onReset: () => void;
}

export function SuccessScreen({ referenceId, clientName, onReset }: SuccessScreenProps) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#8B5CF6", "#F97316", "#A855F7", "#FB923C"],
      });
    } catch {
      // safe fallback if confetti fails
    }
  }, []);

  return (
    <div className="relative rounded-3xl bg-cinema-900 border border-brand-purple/40 p-8 sm:p-12 md:p-16 text-center max-w-2xl mx-auto shadow-2xl overflow-hidden animate-scaleUp">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-orange/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Crosshairs */}
      <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-white/30" />
      <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-white/30" />
      <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-white/30" />
      <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-white/30" />

      <div className="relative z-10 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-purple/20 border border-brand-purple/40 mx-auto flex items-center justify-center text-brand-purple-light shadow-glow-purple">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-cinema-800 text-[11px] font-mono text-brand-purple-light uppercase">
            <Sparkles className="w-3 h-3 text-brand-orange-light" />
            <span>CONFIRMATION // REF: #{referenceId.substring(0, 10)}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            PROJECT RECEIVED.
          </h2>
          <p className="text-base text-cinema-200 font-sans max-w-md mx-auto">
            Thank you, <span className="text-white font-semibold">{clientName || "creative partner"}</span>. Your project enquiry has been securely logged into our production system.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-cinema-850 border border-white/10 text-left text-xs font-mono text-cinema-300 space-y-1.5 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-cinema-500">Status:</span>
            <span className="text-emerald-400 font-bold">QUEUED FOR CREATIVE REVIEW</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cinema-500">Response Window:</span>
            <span className="text-white">Within 24 Business Hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cinema-500">Studio Desk:</span>
            <span className="text-brand-purple-light">Hyderabad, India</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            Back to Home
          </Button>
          <Button href="/portfolio" variant="outline" size="md">
            View Our Work
          </Button>
          <button
            onClick={onReset}
            className="text-xs font-mono text-cinema-400 hover:text-white py-2 px-3 transition-colors"
          >
            Submit another brief
          </button>
        </div>
      </div>
    </div>
  );
}
