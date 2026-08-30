import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "orange";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden text-xs sm:text-sm select-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-xs sm:text-sm gap-2",
    lg: "px-8 py-3.5 text-sm sm:text-base gap-2.5",
    xl: "px-10 py-4 text-base tracking-widest gap-3",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white shadow-glow-purple hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:brightness-110 border border-brand-purple-light/30 active:scale-95",
    orange:
      "bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white shadow-glow-orange hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:brightness-110 border border-brand-orange-light/30 active:scale-95",
    secondary:
      "bg-cinema-800 text-cinema-100 hover:bg-cinema-700 hover:text-white border border-white/10 hover:border-white/25 active:scale-95",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-brand-purple hover:bg-brand-purple/10 hover:shadow-glow-purple active:scale-95",
    ghost:
      "bg-transparent text-cinema-300 hover:text-white hover:bg-white/5 active:scale-95",
  };

  const content = (
    <>
      {isLoading && (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      )}
      {icon && iconPosition === "left" && !isLoading && (
        <span className="transition-transform duration-300 group-hover:-translate-x-1">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && !isLoading && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
}
