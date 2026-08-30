import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | NUEVINCENT",
  description: "Privacy policy and client data protection practices for NUEVINCENT creative studio.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono uppercase text-cinema-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>

      <div className="space-y-4 border-b border-white/10 pb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cinema-900 border border-white/10 text-xs font-mono text-brand-purple-light uppercase">
          <Shield className="w-3.5 h-3.5" />
          <span>DATA PROTECTION & CONFIDENTIALITY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-cinema-400">
          EFFECTIVE DATE: AUGUST 2026 &bull; NUEVINCENT STUDIO (HYDERABAD, INDIA)
        </p>
      </div>

      <div className="space-y-8 text-sm text-cinema-300 font-sans leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">1. Overview</h2>
          <p>
            NUEVINCENT (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;studio&rdquo;) respects your privacy and is committed to protecting the confidential information, project treatments, intellectual property, and personal data you share with us through our website and creative production workflows.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">2. Information We Collect</h2>
          <p>
            When submitting a project enquiry or commissioning production services, we collect:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-cinema-400">
            <li>Contact details: Name, company name, business email, and telephone/WhatsApp number.</li>
            <li>Project specifics: Creative brief, budget scope, location preferences, timeline targets, and reference media links.</li>
            <li>Technical metadata: Device and browser information necessary for secure transmission and abuse prevention.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">3. How We Use Your Data</h2>
          <p>
            Information collected is strictly utilized to:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-cinema-400">
            <li>Evaluate project viability, prepare accurate production quotes, and respond to your creative briefs.</li>
            <li>Coordinate shooting logistics, crew allocation, and post-production scheduling.</li>
            <li>Maintain client records and communicate deliverables during production.</li>
          </ul>
          <p className="text-white font-medium">
            We never sell, rent, or lease your personal information or project materials to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">4. Confidentiality & Non-Disclosure</h2>
          <p>
            Unreleased scripts, storyboards, product designs, raw footage, and brand strategies shared with NUEVINCENT are treated under strict confidentiality standards. Formal Non-Disclosure Agreements (NDAs) are executed prior to on-set production or post-production ingestion.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">5. Security & Storage</h2>
          <p>
            We implement industry-standard database encryption, Firebase security rules, and access control mechanisms to safeguard client submissions against unauthorized access, loss, or disclosure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">6. Contact Data Protection Desk</h2>
          <p>
            For inquiries regarding data privacy or to request deletion of your enquiry records, please reach out to:
          </p>
          <div className="p-4 rounded-xl bg-cinema-900 border border-white/10 font-mono text-xs text-white space-y-1">
            <p>NUEVINCENT Data Protection Officer</p>
            <p>Email: <a href="mailto:privacy@nuevincent.com" className="text-brand-purple-light hover:underline">privacy@nuevincent.com</a></p>
            <p>Location: Hyderabad, Telangana, India</p>
          </div>
        </section>
      </div>
    </div>
  );
}
