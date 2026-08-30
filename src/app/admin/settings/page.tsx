"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Server,
  Globe,
  Mail,
  Key,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { isFirebaseConfigured } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
          Studio System Settings
        </h1>
        <p className="text-xs font-mono text-cinema-400">
          BACKEND INTEGRATION, DOMAIN MAPPING & NOTIFICATION ENGINE
        </p>
      </div>

      {/* Backend & Firebase Status */}
      <div className="p-6 rounded-2xl bg-cinema-900 border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cinema-800 flex items-center justify-center text-brand-purple-light">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-heading font-bold text-white">
                Firebase Database & Auth Status
              </h2>
              <p className="text-xs font-mono text-cinema-400">Cloud Firestore & Firebase Authentication</p>
            </div>
          </div>

          <div>
            {isFirebaseConfigured ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> LIVE FIREBASE CONNECTED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
                <AlertCircle className="w-3.5 h-3.5" /> DEMO STORAGE MODE
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3 text-xs font-mono">
          <p className="text-cinema-300">
            {isFirebaseConfigured
              ? "Your website is currently communicating directly with your live Firebase project."
              : "Your website is currently operating in local storage / demo mode. To connect to your live Firebase project, create a .env.local file in your root project folder with your Firebase configuration."}
          </p>

          <div className="p-4 rounded-xl bg-cinema-850 border border-white/5 space-y-2 text-cinema-300">
            <div className="flex justify-between items-center text-cinema-400 pb-1 border-b border-white/5">
              <span>Required Environment Variables (.env.local)</span>
              <button
                onClick={() =>
                  handleCopy(
                    `NEXT_PUBLIC_FIREBASE_API_KEY=your_key\nNEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com\nNEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id\nNEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com\nNEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id\nNEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`,
                    "env"
                  )
                }
                className="text-brand-purple-light hover:text-white flex items-center gap-1"
              >
                {copiedKey === "env" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === "env" ? "Copied!" : "Copy Template"}</span>
              </button>
            </div>
            <pre className="text-[11px] text-brand-purple-light/90 overflow-x-auto p-2 bg-cinema-950 rounded-lg">
{`NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
ADMIN_NOTIFICATION_EMAIL=contact@nuevincent.com`}
            </pre>
          </div>
        </div>
      </div>

      {/* GoDaddy Custom Domain Setup Guide */}
      <div className="p-6 rounded-2xl bg-cinema-900 border border-white/10 space-y-6">
        <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
          <div className="w-10 h-10 rounded-xl bg-cinema-800 flex items-center justify-center text-brand-orange-light">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-heading font-bold text-white">
              GoDaddy Domain & DNS Instructions
            </h2>
            <p className="text-xs font-mono text-cinema-400">DNS RECORDS FOR YOUR GODADDY DOMAIN</p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-mono text-cinema-300 leading-relaxed">
          <p>
            When deploying to Firebase Hosting, Vercel, or your hosting provider, add the following DNS records in your GoDaddy DNS Management console:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border border-white/10 rounded-xl overflow-hidden">
              <thead className="bg-cinema-950 text-cinema-400">
                <tr>
                  <th className="p-3">TYPE</th>
                  <th className="p-3">NAME</th>
                  <th className="p-3">VALUE / TARGET</th>
                  <th className="p-3">TTL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-cinema-850">
                <tr>
                  <td className="p-3 text-brand-orange-light font-bold">A</td>
                  <td className="p-3">@</td>
                  <td className="p-3 text-white">199.36.158.100 (or provider IP)</td>
                  <td className="p-3 text-cinema-400">1 Hour / Default</td>
                </tr>
                <tr>
                  <td className="p-3 text-brand-purple-light font-bold">CNAME</td>
                  <td className="p-3">www</td>
                  <td className="p-3 text-white">@ (or hosting target)</td>
                  <td className="p-3 text-cinema-400">1 Hour / Default</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-cinema-400">
            For full step-by-step instructions with SSL verification, refer to <code className="text-brand-orange-light">DEPLOYMENT.md</code> in your project repository.
          </p>
        </div>
      </div>
    </div>
  );
}
