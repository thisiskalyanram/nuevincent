"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Clock,
  CheckCircle2,
  AlertCircle,
  Film,
  Plus,
  ArrowUpRight,
  TrendingUp,
  ExternalLink,
  Eye,
} from "lucide-react";
import { ProjectEnquiry, PortfolioProject } from "@/types";
import { getEnquiries, getPortfolioProjects } from "@/lib/firestore-service";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDate, formatTimeAgo } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<ProjectEnquiry[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<ProjectEnquiry | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [enqData, projData] = await Promise.all([
          getEnquiries(),
          getPortfolioProjects(),
        ]);
        setEnquiries(enqData);
        setProjects(projData);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === "NEW").length;
  const contactedEnquiries = enquiries.filter((e) => e.status === "CONTACTED").length;
  const inProgressEnquiries = enquiries.filter((e) => e.status === "IN_PROGRESS").length;
  const completedEnquiries = enquiries.filter((e) => e.status === "COMPLETED").length;

  const statusVariantMap: Record<string, "warning" | "purple" | "cyan" | "success" | "neutral"> = {
    NEW: "warning",
    CONTACTED: "purple",
    IN_PROGRESS: "cyan",
    COMPLETED: "success",
    CANCELLED: "neutral",
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Production Desk Dashboard
          </h1>
          <p className="text-xs font-mono text-cinema-400">
            OVERVIEW &bull; NUEVINCENT CREATIVE STUDIO CRM
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            href="/admin/portfolio?action=new"
            variant="primary"
            size="sm"
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Project
          </Button>
          <Button
            href="/admin/enquiries"
            variant="secondary"
            size="sm"
            icon={<Inbox className="w-3.5 h-3.5" />}
          >
            View All Enquiries
          </Button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total */}
        <div className="p-5 rounded-2xl bg-cinema-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-cinema-400">
            <span className="text-xs font-mono uppercase">Total Enquiries</span>
            <Inbox className="w-4 h-4 text-brand-purple-light" />
          </div>
          <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
            {totalEnquiries}
          </p>
          <p className="text-[11px] font-mono text-cinema-500">All-time submissions</p>
        </div>

        {/* New */}
        <div className="p-5 rounded-2xl bg-cinema-900 border border-brand-orange/30 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-brand-orange-light">
            <span className="text-xs font-mono uppercase font-bold">New Submissions</span>
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          </div>
          <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
            {newEnquiries}
          </p>
          <p className="text-[11px] font-mono text-brand-orange-light">Requires review</p>
        </div>

        {/* Contacted */}
        <div className="p-5 rounded-2xl bg-cinema-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-cinema-400">
            <span className="text-xs font-mono uppercase">Contacted</span>
            <Clock className="w-4 h-4 text-brand-purple" />
          </div>
          <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
            {contactedEnquiries}
          </p>
          <p className="text-[11px] font-mono text-cinema-500">In discussion</p>
        </div>

        {/* In Progress */}
        <div className="p-5 rounded-2xl bg-cinema-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-cinema-400">
            <span className="text-xs font-mono uppercase">In Production</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
            {inProgressEnquiries}
          </p>
          <p className="text-[11px] font-mono text-cinema-500">Active contracts</p>
        </div>

        {/* Completed */}
        <div className="p-5 rounded-2xl bg-cinema-900 border border-white/10 space-y-2 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-cinema-400">
            <span className="text-xs font-mono uppercase">Delivered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
            {completedEnquiries}
          </p>
          <p className="text-[11px] font-mono text-cinema-500">Completed projects</p>
        </div>
      </div>

      {/* Grid: Recent Enquiries & Portfolio Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries Table */}
        <div className="lg:col-span-8 rounded-2xl bg-cinema-900 border border-white/10 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-heading font-bold text-white">Latest Project Enquiries</h2>
              <p className="text-xs font-mono text-cinema-400">Recent client briefs submitted</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-mono text-brand-purple-light hover:text-white uppercase tracking-wider flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-cinema-400">
              LOADING ENQUIRIES...
            </div>
          ) : enquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-cinema-400 pb-2">
                    <th className="pb-3 font-semibold">CLIENT</th>
                    <th className="pb-3 font-semibold">PROJECT TYPE</th>
                    <th className="pb-3 font-semibold">BUDGET</th>
                    <th className="pb-3 font-semibold">STATUS</th>
                    <th className="pb-3 font-semibold">SUBMITTED</th>
                    <th className="pb-3 font-semibold text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {enquiries.slice(0, 5).map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 pr-3">
                        <p className="text-white font-medium">{item.fullName}</p>
                        {item.company && (
                          <p className="text-[11px] text-cinema-400">{item.company}</p>
                        )}
                      </td>
                      <td className="py-3.5 pr-3 text-cinema-200">
                        {item.projectType}
                      </td>
                      <td className="py-3.5 pr-3 text-cinema-300">
                        {item.budgetRange || "Flexible"}
                      </td>
                      <td className="py-3.5 pr-3">
                        <Badge variant={statusVariantMap[item.status] || "neutral"}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 pr-3 text-cinema-400">
                        {formatTimeAgo(item.createdAt)}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => setSelectedEnquiry(item)}
                          className="p-1.5 rounded-lg bg-cinema-800 text-cinema-300 hover:text-white hover:bg-brand-purple/30 transition-colors"
                          title="View Full Brief"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-xs font-mono text-cinema-400 border border-dashed border-white/10 rounded-xl">
              No project enquiries logged yet.
            </div>
          )}
        </div>

        {/* Right: Portfolio Quick Status */}
        <div className="lg:col-span-4 rounded-2xl bg-cinema-900 border border-white/10 p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-heading font-bold text-white">Portfolio Works</h2>
                <p className="text-xs font-mono text-cinema-400">{projects.length} Projects Live</p>
              </div>
              <Link
                href="/admin/portfolio"
                className="text-xs font-mono text-brand-orange-light hover:text-white uppercase tracking-wider flex items-center gap-1"
              >
                <span>Edit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 4).map((p) => (
                <div
                  key={p.slug}
                  className="p-3 rounded-xl bg-cinema-850 border border-white/5 flex items-center justify-between text-xs font-mono"
                >
                  <div className="truncate max-w-[180px]">
                    <p className="text-white font-medium truncate">{p.title}</p>
                    <p className="text-[10px] text-brand-purple-light uppercase">{p.category}</p>
                  </div>
                  <span className="text-cinema-400">{p.year}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Button
              href="/admin/portfolio?action=new"
              variant="outline"
              size="sm"
              className="w-full"
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add New Project
            </Button>
          </div>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={Boolean(selectedEnquiry)}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry Brief: ${selectedEnquiry.fullName}`}
          maxWidth="xl"
        >
          <div className="space-y-5 text-xs font-mono">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-cinema-850 border border-white/10">
              <div>
                <span className="text-cinema-400 block">Client Name:</span>
                <span className="text-white font-semibold text-sm">{selectedEnquiry.fullName}</span>
              </div>
              <div>
                <span className="text-cinema-400 block">Company / Brand:</span>
                <span className="text-white font-semibold text-sm">{selectedEnquiry.company || "N/A"}</span>
              </div>
              <div>
                <span className="text-cinema-400 block">Email:</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-brand-purple-light underline">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-cinema-400 block">Phone / WhatsApp:</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-brand-orange-light underline">
                  {selectedEnquiry.phone}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-cinema-850 border border-white/5">
                <span className="text-cinema-400 block">Type:</span>
                <span className="text-white font-bold">{selectedEnquiry.projectType}</span>
              </div>
              <div className="p-3 rounded-xl bg-cinema-850 border border-white/5">
                <span className="text-cinema-400 block">Budget:</span>
                <span className="text-brand-orange-light font-bold">{selectedEnquiry.budgetRange || "Flexible"}</span>
              </div>
              <div className="p-3 rounded-xl bg-cinema-850 border border-white/5">
                <span className="text-cinema-400 block">Timeline:</span>
                <span className="text-white">{selectedEnquiry.timeline || "Flexible"}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-cinema-400 block font-bold">PROJECT DESCRIPTION:</span>
              <div className="p-4 rounded-xl bg-cinema-850 border border-white/5 text-cinema-200 font-sans text-sm leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.description}
              </div>
            </div>

            {selectedEnquiry.inspirationLink && (
              <div className="p-3 rounded-xl bg-cinema-850 border border-white/5 flex items-center justify-between">
                <span className="text-cinema-400">Inspiration / Moodboard Link:</span>
                <a
                  href={selectedEnquiry.inspirationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-purple-light underline flex items-center gap-1"
                >
                  <span>Open Reference</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-white/10">
              <Button href="/admin/enquiries" variant="primary" size="sm">
                Open in Full CRM &rarr;
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
