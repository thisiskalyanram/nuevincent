"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Sparkles, Send, Film, DollarSign, Clock, HelpCircle, Shield } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { submitEnquiry } from "@/lib/firestore-service";
import { SuccessScreen } from "./SuccessScreen";

const PROJECT_TYPES = [
  { value: "", label: "Select project type..." },
  { value: "Ad Film", label: "Ad Film / Commercial" },
  { value: "Brand Film", label: "Brand Film / Anthem" },
  { value: "Product Video", label: "Product Video / Showcase" },
  { value: "Short Film", label: "Short Film / Narrative" },
  { value: "Music Video", label: "Music Video / Visualizer" },
  { value: "Corporate Video", label: "Corporate Film / Profile" },
  { value: "Social Media Content", label: "Social Media Content / Reels" },
  { value: "Video Editing", label: "Post-Production: Video Editing" },
  { value: "Color Grading", label: "Post-Production: Color Grading" },
  { value: "Motion Graphics", label: "Motion Graphics & VFX" },
  { value: "Other", label: "Other Visual Media" },
];

const BUDGET_RANGES = [
  { value: "", label: "Select budget range..." },
  { value: "Under ₹25,000", label: "Under ₹25,000" },
  { value: "₹25,000 – ₹50,000", label: "₹25,000 – ₹50,000" },
  { value: "₹50,000 – ₹1,00,000", label: "₹50,000 – ₹1,00,000" },
  { value: "₹1,00,000 – ₹3,00,000", label: "₹1,00,000 – ₹3,00,000" },
  { value: "₹3,00,000+", label: "₹3,00,000+ (High-Impact Production)" },
  { value: "Not decided yet", label: "Not decided yet / Flexible" },
];

const TIMELINES = [
  { value: "", label: "Select expected timeline..." },
  { value: "ASAP", label: "ASAP (Immediate production)" },
  { value: "Within 1 month", label: "Within 1 month" },
  { value: "1–3 months", label: "1–3 months" },
  { value: "3–6 months", label: "3–6 months" },
  { value: "Flexible", label: "Flexible timeline" },
];

const HEAR_SOURCES = [
  { value: "", label: "Select how you found us..." },
  { value: "Instagram", label: "Instagram (@nuevincent)" },
  { value: "YouTube", label: "YouTube Showreels" },
  { value: "Referral / Word of Mouth", label: "Referral / Industry Peer" },
  { value: "Google Search", label: "Google / Search Engine" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Other", label: "Other" },
];

export function MultiStepEnquiry() {
  const searchParams = useSearchParams();
  const initialType = searchParams?.get("type") || "";

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    projectType: initialType,
    location: "Hyderabad, India",
    description: "",
    budgetRange: "",
    timeline: "",
    source: "",
    inspirationLink: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialType && !formData.projectType) {
      setFormData((prev) => ({ ...prev, projectType: initialType }));
    }
  }, [initialType, formData.projectType]);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (formData.phone.trim().length < 7) {
        newErrors.phone = "Please enter a valid contact number";
      }
    }

    if (step === 2) {
      if (!formData.projectType) newErrors.projectType = "Please select a project type";
      if (!formData.description.trim() || formData.description.trim().length < 10) {
        newErrors.description = "Please provide a brief description (at least 10 characters)";
      }
    }

    if (step === 3) {
      if (!formData.budgetRange) newErrors.budgetRange = "Please select a budget range";
      if (!formData.timeline) newErrors.timeline = "Please select your preferred timeline";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Submit to Firestore / local service
      const id = await submitEnquiry({
        fullName: formData.fullName.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        location: formData.location.trim(),
        description: formData.description.trim(),
        inspirationLink: formData.inspirationLink.trim(),
        source: formData.source,
      });

      // 2. Trigger server notification route
      try {
        await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, enquiryId: id }),
        });
      } catch (notifyErr) {
        console.warn("Notification route dispatch notice:", notifyErr);
      }

      setSubmittedRefId(id);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("There was an issue submitting your enquiry. Please check your inputs and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      company: "",
      email: "",
      phone: "",
      projectType: "",
      location: "Hyderabad, India",
      description: "",
      budgetRange: "",
      timeline: "",
      source: "",
      inspirationLink: "",
    });
    setCurrentStep(1);
    setSubmittedRefId(null);
  };

  if (submittedRefId) {
    return (
      <SuccessScreen
        referenceId={submittedRefId}
        clientName={formData.fullName}
        onReset={handleReset}
      />
    );
  }

  const steps = [
    { num: 1, label: "ABOUT YOU" },
    { num: 2, label: "YOUR PROJECT" },
    { num: 3, label: "BUDGET & TIMELINE" },
    { num: 4, label: "INSPIRATION" },
    { num: 5, label: "REVIEW & SUBMIT" },
  ];

  return (
    <div className="relative rounded-2xl sm:rounded-3xl bg-cinema-900/90 border border-white/10 p-5 sm:p-8 md:p-12 shadow-2xl backdrop-blur-xl max-w-3xl mx-auto overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Viewfinder crosshairs */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-3 h-3 border-t border-l border-white/20" />
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-3 h-3 border-t border-r border-white/20" />
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-3 h-3 border-b border-l border-white/20" />
      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-3 h-3 border-b border-r border-white/20" />

      {/* Progress Bar & Indicators */}
      <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-brand-purple-light font-bold">
            STEP 0{currentStep} // 05
          </span>
          <span className="text-cinema-400 uppercase tracking-widest text-[11px] sm:text-xs">
            {steps[currentStep - 1].label}
          </span>
        </div>

        {/* Multi-step progress capsules */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {steps.map((s) => {
            const isCompleted = s.num < currentStep;
            const isCurrent = s.num === currentStep;
            return (
              <div
                key={s.num}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-400"
                    : isCurrent
                    ? "bg-gradient-to-r from-brand-purple to-brand-orange shadow-glow-purple"
                    : "bg-cinema-800"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: ABOUT YOU */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Tell us about you or your brand.
              </h3>
              <p className="text-xs sm:text-sm text-cinema-300">
                Let&rsquo;s start with your primary contact details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="e.g. Vincent Croft"
                required
                value={formData.fullName}
                error={errors.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />

              <Input
                label="Company / Brand (Optional)"
                placeholder="e.g. Horizon Labs"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Work Email"
                type="email"
                placeholder="name@brand.com"
                required
                value={formData.email}
                error={errors.email}
                onChange={(e) => updateField("email", e.target.value)}
              />

              <Input
                label="Phone / WhatsApp Number"
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={formData.phone}
                error={errors.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* STEP 2: YOUR PROJECT */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                What are we creating together?
              </h3>
              <p className="text-xs sm:text-sm text-cinema-300">
                Choose the discipline and outline your core project vision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Project Type"
                required
                options={PROJECT_TYPES}
                value={formData.projectType}
                error={errors.projectType}
                onChange={(e) => updateField("projectType", e.target.value)}
              />

              <Input
                label="Shoot / Project Location"
                placeholder="e.g. Hyderabad, Mumbai, Remote"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
            </div>

            <Textarea
              label="Project Description & Creative Brief"
              rows={4}
              required
              placeholder="Tell us about the narrative, the product, tone of voice, goals, target audience, and key deliverables..."
              value={formData.description}
              error={errors.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>
        )}

        {/* STEP 3: BUDGET & TIMELINE */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Budget parameters & production schedule.
              </h3>
              <p className="text-xs sm:text-sm text-cinema-300">
                This helps us recommend the optimal camera package, crew size, and post pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Estimated Budget Range"
                required
                options={BUDGET_RANGES}
                value={formData.budgetRange}
                error={errors.budgetRange}
                onChange={(e) => updateField("budgetRange", e.target.value)}
              />

              <Select
                label="Target Timeline / Deadline"
                required
                options={TIMELINES}
                value={formData.timeline}
                error={errors.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
              />
            </div>

            <div className="p-4 rounded-xl bg-cinema-850/80 border border-white/10 text-xs text-cinema-300 space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-brand-purple" />
                Transparent Production Estimates
              </p>
              <p>
                We customize our technical packages (lighting, lenses, DaVinci Resolve color suites) to deliver maximum cinematic value within your budget parameters.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: INSPIRATION & REFERENCES */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Inspiration, links & references.
              </h3>
              <p className="text-xs sm:text-sm text-cinema-300">
                Share visual moodboards, YouTube/Vimeo references, or Drive folders if available.
              </p>
            </div>

            <Input
              label="Reference / Inspiration Link (Optional)"
              type="url"
              placeholder="https://vimeo.com/... or Google Drive link"
              value={formData.inspirationLink}
              hint="You can provide links to existing videos, moodboards, or script treatments."
              onChange={(e) => updateField("inspirationLink", e.target.value)}
            />

            <Select
              label="How did you hear about NUEVINCENT?"
              options={HEAR_SOURCES}
              value={formData.source}
              onChange={(e) => updateField("source", e.target.value)}
            />
          </div>
        )}

        {/* STEP 5: REVIEW & SUBMIT */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Review your production brief.
              </h3>
              <p className="text-xs sm:text-sm text-cinema-300">
                Confirm your parameters before submitting to our creative production desk.
              </p>
            </div>

            <div className="rounded-2xl bg-cinema-850 border border-white/10 p-5 space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-cinema-400">Client / Brand:</span>
                <span className="text-white font-bold">{formData.fullName} {formData.company ? `(${formData.company})` : ""}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-cinema-400">Contact:</span>
                <span className="text-white">{formData.email} &bull; {formData.phone}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-cinema-400">Discipline / Type:</span>
                <span className="text-brand-purple-light font-bold">{formData.projectType}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-cinema-400">Budget Range:</span>
                <span className="text-brand-orange-light font-bold">{formData.budgetRange}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-cinema-400">Timeline:</span>
                <span className="text-white">{formData.timeline}</span>
              </div>
              <div className="space-y-1 pt-1">
                <span className="text-cinema-400 block">Brief Summary:</span>
                <p className="text-cinema-200 font-sans text-xs bg-cinema-900/60 p-3 rounded-lg border border-white/5 leading-relaxed">
                  {formData.description}
                </p>
              </div>
              {formData.inspirationLink && (
                <div className="flex justify-between pt-1">
                  <span className="text-cinema-400">Reference:</span>
                  <span className="text-brand-purple-light truncate max-w-xs">{formData.inspirationLink}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3 sm:gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center space-x-1.5 sm:space-x-2 text-xs font-mono uppercase text-cinema-300 hover:text-white px-3 sm:px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors border border-white/5 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <Button
              type="button"
              onClick={handleNext}
              variant="primary"
              size="md"
              className="shadow-glow-purple ml-auto"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              variant="orange"
              size="lg"
              className="shadow-glow-orange ml-auto text-xs sm:text-sm"
              isLoading={isSubmitting}
              icon={<Send className="w-4 h-4" />}
            >
              Submit Brief
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
