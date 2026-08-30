"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Film,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { cn } from "@/lib/utils";

const ADMIN_LINKS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { name: "Portfolio Projects", href: "/admin/portfolio", icon: Film },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Top Navbar for Admin */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-cinema-950 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-brand-purple" />
          <span className="font-heading font-bold text-white text-sm">NUEVINCENT ADMIN</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 text-cinema-300 hover:text-white rounded-lg"
          aria-label="Toggle admin sidebar"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-cinema-950 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 p-5",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link href="/admin" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-orange flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-cinema-950 rounded-[6px] flex items-center justify-center">
                  <Film className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="font-heading font-bold text-sm tracking-wider text-white">NUEVINCENT</h1>
                <span className="text-[10px] font-mono text-brand-purple-light uppercase">ADMIN PORTAL</span>
              </div>
            </Link>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-cinema-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {ADMIN_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200",
                    isActive
                      ? "bg-brand-purple/20 text-white border border-brand-purple/40 font-semibold"
                      : "text-cinema-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-brand-purple-light" : "text-cinema-400")} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="px-3 py-2 rounded-xl bg-cinema-900 border border-white/5">
            <p className="text-[11px] font-mono text-cinema-400 truncate">Logged in as:</p>
            <p className="text-xs font-medium text-white truncate">{user?.email || "Admin User"}</p>
            {user?.isDemo && (
              <span className="inline-block mt-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand-orange/20 text-brand-orange-light border border-brand-orange/30">
                Demo Auth Mode
              </span>
            )}
          </div>

          <div className="space-y-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-cinema-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                Live Website
              </span>
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs font-mono text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
