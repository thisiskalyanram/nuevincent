import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Sparkles, Film, Clock, MessageSquare } from "lucide-react";
import { MultiStepEnquiry } from "@/components/enquiry/MultiStepEnquiry";

export const metadata: Metadata = {
  title: "Start a Project | NUEVINCENT Enquiry",
  description: "Commission your film, brand commercial, product video, or post-production suite with NUEVINCENT studio.",
};

const FAQ_ITEMS = [
  {
    q: "How does NUEVINCENT structure project budgets and estimates?",
    a: "We customize technical equipment (camera, optics, lighting grid, crew depth, DaVinci Resolve color suites) directly to your project scope and platform requirements. We provide itemized transparent production plans.",
  },
  {
    q: "What is your typical turnaround timeline?",
    a: "Commercials and social campaigns typically range from 1 to 3 weeks from pre-production to final master delivery. Narrative short films and bespoke brand films take 3 to 6 weeks depending on scale.",
  },
  {
    q: "Do you take projects outside Hyderabad or internationally?",
    a: "Yes. Our production teams travel across India and internationally for on-location shoots, and our post-production color grading lab operates seamlessly with remote clients worldwide via frame.io and secure cloud streams.",
  },
  {
    q: "What deliverables are provided upon project completion?",
    a: "We deliver full-resolution master files (ProRes 4444 / DCI 4K), web/broadcast compliant Rec.709 cuts, 9:16 vertical cuts for social media, and archived raw asset packages if requested.",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 space-y-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cinema-900 border border-brand-purple/30 text-xs font-mono tracking-widest uppercase text-brand-purple-light">
          <Film className="w-3.5 h-3.5" />
          <span>PRODUCTION BRIEF & ENQUIRY</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight uppercase">
          LET&rsquo;S CREATE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light via-white to-brand-orange-light">
            SOMETHING EXTRAORDINARY.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-cinema-200 font-sans max-w-2xl mx-auto leading-relaxed font-light">
          Tell us about your project and we&rsquo;ll get back to you with creative direction and an initial estimate.
        </p>
      </section>

      {/* Main Form Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Suspense fallback={<div className="text-center font-mono text-xs text-cinema-400 py-12">LOADING PRODUCTION ENGINE...</div>}>
          <MultiStepEnquiry />
        </Suspense>
      </section>

      {/* Studio Contact Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-cinema-900 border border-white/10 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-cinema-800 mx-auto flex items-center justify-center text-brand-purple-light">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-mono text-cinema-400 uppercase tracking-widest">EMAIL INQUIRIES</h3>
            <p className="text-sm font-semibold text-white">
              <a href="mailto:contact@nuevincent.com" className="hover:text-brand-purple-light transition-colors">
                contact@nuevincent.com
              </a>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cinema-900 border border-white/10 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-cinema-800 mx-auto flex items-center justify-center text-brand-orange-light">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-mono text-cinema-400 uppercase tracking-widest">DIRECT PHONE & WHATSAPP</h3>
            <p className="text-sm font-semibold text-white">
              <a href="tel:+919876543210" className="hover:text-brand-orange-light transition-colors">
                +91 (040) 800-FILM
              </a>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cinema-900 border border-white/10 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-cinema-800 mx-auto flex items-center justify-center text-brand-purple-light">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-mono text-cinema-400 uppercase tracking-widest">STUDIO BASE</h3>
            <p className="text-sm font-semibold text-white">Hyderabad, Telangana, India</p>
          </div>
        </div>
      </section>

      {/* Production FAQs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 pt-8 border-t border-white/10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-brand-purple-light uppercase tracking-widest">
            CLIENT FAQS
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-cinema-900/60 border border-white/10 space-y-2 hover:border-brand-purple/30 transition-colors"
            >
              <h3 className="text-base font-heading font-semibold text-white flex items-center gap-2">
                <span className="text-brand-orange-light font-mono text-xs">Q{idx + 1}.</span>
                <span>{item.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-cinema-300 font-sans leading-relaxed pl-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
