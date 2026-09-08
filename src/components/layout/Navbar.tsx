"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "WORK", href: "/portfolio" },
  { name: "SERVICES", href: "/services" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-cinema-950/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
            : "bg-transparent py-4 sm:py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group focus:outline-none"
            aria-label="NUEVINCENT Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cinema-900/90 border border-white/10 p-1 flex items-center justify-center group-hover:border-brand-purple/50 group-hover:shadow-glow-purple transition-all duration-300">
              <Image
                src="/logo-icon.png"
                alt="NUEVINCENT Logo"
                width={40}
                height={40}
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-wider text-white group-hover:text-brand-purple-light transition-colors">
                NUEVINCENT
              </span>
              <span className="text-[9px] font-mono tracking-widest text-cinema-400 uppercase -mt-1 hidden sm:block">
                STUDIO &bull; AD &bull; CINEMA
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-cinema-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200",
                    isActive
                      ? "bg-brand-purple/20 text-white border border-brand-purple/40 shadow-sm"
                      : "text-cinema-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-cinema-900/80 border border-white/10 text-cinema-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-cinema-950/98 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn">
          <div>
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3"
              >
                <div className="relative w-9 h-9 rounded-xl bg-cinema-900 border border-white/10 p-1 flex items-center justify-center">
                  <Image
                    src="/logo-icon.png"
                    alt="NUEVINCENT Logo"
                    width={36}
                    height={36}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-base text-white tracking-wider">
                    NUEVINCENT
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-cinema-400 uppercase">
                    CREATIVE STUDIO
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-cinema-900 border border-white/10 text-cinema-400 hover:text-white active:scale-95 transition-all"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav List */}
            <div className="flex flex-col space-y-2 py-6">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-xl font-heading font-bold tracking-wide transition-all flex items-center justify-between py-3.5 px-4 rounded-xl",
                      isActive
                        ? "bg-brand-purple/15 text-white border border-brand-purple/30 shadow-glow-purple"
                        : "text-cinema-200 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-cinema-500">0{idx + 1}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Drawer Actions */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-glow-purple"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Start a Project
            </Button>

            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <a
                href="mailto:contact@nuevincent.com"
                className="py-2.5 px-3 rounded-lg bg-cinema-900 border border-white/10 text-cinema-300 hover:text-white truncate"
              >
                contact@nuevincent.com
              </a>
              <a
                href="tel:+919876543210"
                className="py-2.5 px-3 rounded-lg bg-cinema-900 border border-white/10 text-cinema-300 hover:text-white"
              >
                +91 98765 43210
              </a>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-cinema-500 pt-2 border-t border-white/5">
              <span>HYDERABAD, INDIA</span>
              <span>CINEMA // 2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
