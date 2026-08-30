import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | NUEVINCENT",
  description: "Terms and conditions governing production engagements with NUEVINCENT creative studio.",
};

export default function TermsPage() {
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
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cinema-900 border border-white/10 text-xs font-mono text-brand-orange-light uppercase">
          <FileText className="w-3.5 h-3.5" />
          <span>PRODUCTION TERMS & ENGAGEMENT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
          Terms & Conditions
        </h1>
        <p className="text-xs font-mono text-cinema-400">
          LAST UPDATED: AUGUST 2026 &bull; NUEVINCENT STUDIO (HYDERABAD, INDIA)
        </p>
      </div>

      <div className="space-y-8 text-sm text-cinema-300 font-sans leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">1. Scope of Agreement</h2>
          <p>
            These terms govern the commissioning, execution, post-production, and delivery of creative video, commercial advertising, photography, and digital content services provided by NUEVINCENT.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">2. Production Estimates & Milestone Payments</h2>
          <p>
            All production estimates are valid for 30 calendar days. Standard production agreements operate on a structured milestone schedule (Pre-production advance, Principle Photography completion, and Final Master delivery release) as outlined in your formal Statement of Work (SOW).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">3. Revisions & Approvals</h2>
          <p>
            Unless explicitly specified in your custom agreement, post-production scopes include two rounds of consolidation review cuts (offline narrative cut and final online color/audio pass) prior to final master delivery.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">4. Intellectual Property & Commercial Usage</h2>
          <p>
            Upon settlement of final production invoices, full commercial broadcasting and distribution rights for the delivered master video files are transferred to the client in accordance with agreed licensing terms. NUEVINCENT retains standard portfolio showcase rights to display completed works in studio showreels.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-semibold text-white">5. Governing Jurisdiction</h2>
          <p>
            Any disputes arising from production engagements shall be governed under the legal jurisdiction of the courts of Hyderabad, Telangana, India.
          </p>
        </section>
      </div>
    </div>
  );
}
