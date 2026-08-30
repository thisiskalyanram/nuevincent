"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Film, Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, signIn, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    const res = await signIn(email, password);
    setIsSubmitting(false);

    if (res.success) {
      router.push("/admin");
    } else {
      setErrorMsg(res.error || "Invalid credentials. Please verify your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-cinema-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Login Box */}
      <div className="relative w-full max-w-md bg-cinema-900/90 border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-orange mx-auto flex items-center justify-center p-0.5 shadow-glow-purple">
            <div className="w-full h-full bg-cinema-950 rounded-[14px] flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
              NUEVINCENT ADMIN
            </h1>
            <p className="text-xs font-mono text-cinema-400 uppercase tracking-widest">
              SECURE PRODUCTION DESK
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@nuevincent.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-8 text-cinema-400 hover:text-white"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Authenticate & Enter
          </Button>

          {/* Development & Demo hint */}
          <div className="p-3.5 rounded-xl bg-cinema-850 border border-white/5 text-[11px] font-mono text-cinema-400 space-y-1">
            <p className="text-cinema-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-purple-light" />
              Firebase Auth Guard
            </p>
            <p>
              Once your Firebase project keys are configured in <code className="text-brand-orange-light">.env.local</code>, this uses live Firebase Authentication. In local demo mode, enter any admin email and password (&ge;6 chars) to preview.
            </p>
          </div>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs font-mono text-cinema-500 hover:text-cinema-300 transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
