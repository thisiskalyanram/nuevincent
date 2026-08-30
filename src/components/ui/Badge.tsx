import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "orange" | "neutral" | "success" | "warning" | "cyan";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "purple",
  size = "sm",
  className,
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-mono uppercase tracking-wider rounded-full font-semibold border";

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
  };

  const variantStyles = {
    purple: "bg-brand-purple/10 text-brand-purple-light border-brand-purple/30",
    orange: "bg-brand-orange/10 text-brand-orange-light border-brand-orange/30",
    neutral: "bg-cinema-800 text-cinema-300 border-white/10",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  };

  return (
    <span className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}>
      {children}
    </span>
  );
}
