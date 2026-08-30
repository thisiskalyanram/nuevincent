"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, ArrowUpRight, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Lock } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return null;
  }

  return (
    <footer className="relative bg-cinema-950 border-t border-white/10 pt-16 pb-12 overflow-hidden text-cinema-300">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-orange flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-cinema-950 rounded-[6px] flex items-center justify-center">
                  <Film className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                NUEVINCENT
              </span>
            </Link>
            <p className="text-sm text-cinema-300 max-w-sm leading-relaxed">
              We turn ideas, stories, brands and concepts into cinematic experiences and visuals that make an impact.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cinema-900 border border-white/10 flex items-center justify-center text-cinema-300 hover:text-white hover:border-brand-purple hover:bg-brand-purple/10 transition-all"
                aria-label="NUEVINCENT on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cinema-900 border border-white/10 flex items-center justify-center text-cinema-300 hover:text-white hover:border-brand-orange hover:bg-brand-orange/10 transition-all"
                aria-label="NUEVINCENT on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cinema-900 border border-white/10 flex items-center justify-center text-cinema-300 hover:text-white hover:border-brand-purple hover:bg-brand-purple/10 transition-all"
                aria-label="NUEVINCENT on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Featured Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1 text-brand-purple-light font-medium">
                  Start a Project <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              Disciplines
            </h4>
            <ul className="space-y-2 text-sm text-cinema-400">
              <li>
                <Link href="/services#film-production" className="hover:text-cinema-200 transition-colors">
                  Film Production
                </Link>
              </li>
              <li>
                <Link href="/services#advertising" className="hover:text-cinema-200 transition-colors">
                  Advertising & Commercials
                </Link>
              </li>
              <li>
                <Link href="/services#video-production" className="hover:text-cinema-200 transition-colors">
                  Video Production
                </Link>
              </li>
              <li>
                <Link href="/services#post-production" className="hover:text-cinema-200 transition-colors">
                  Post-Production & Color
                </Link>
              </li>
              <li>
                <Link href="/services#content-creation" className="hover:text-cinema-200 transition-colors">
                  Content Creation & Reels
                </Link>
              </li>
              <li>
                <Link href="/services#visual-storytelling" className="hover:text-cinema-200 transition-colors">
                  Visual Storytelling
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              Location & Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-purple shrink-0" />
                <a href="mailto:contact@nuevincent.com" className="hover:text-white transition-colors">
                  contact@nuevincent.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 (040) 800-FILM
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-cinema-400 gap-4">
          <p>© 2026 NUEVINCENT. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-cinema-500 hover:text-cinema-300 transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
