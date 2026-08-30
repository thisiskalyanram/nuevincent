"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [user, loading, isLoginPage, router]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-cinema-950">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-950 flex items-center justify-center font-mono text-xs text-cinema-400 space-x-2">
        <div className="w-4 h-4 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <span>AUTHENTICATING SECURE DESK...</span>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-cinema-950 text-cinema-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
