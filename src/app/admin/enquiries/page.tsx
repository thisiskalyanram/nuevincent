"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Inbox,
  Search,
  Filter,
  Trash2,
  Eye,
  ExternalLink,
  Download,
  CheckCircle,
  RefreshCw,
  Clock,
  Send,
  Phone,
  Mail,
  AlertTriangle,
} from "lucide-react";
import { ProjectEnquiry, EnquiryStatus } from "@/types";
import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "@/lib/firestore-service";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDate, formatTimeAgo } from "@/lib/utils";

const STATUS_OPTIONS: { label: string; value: EnquiryStatus | "ALL" }[] = [
  { label: "All Enquiries", value: "ALL" },
  { label: "New", value: "NEW" },
  { label: "Contacted", value: "CONTACTED" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ProjectEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Selected enquiry for detail modal
  const [activeEnquiry, setActiveEnquiry] = useState<ProjectEnquiry | null>(null);

  // Delete modal state
  const [enquiryToDelete, setEnquiryToDelete] = useState<ProjectEnquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      if (activeEnquiry && activeEnquiry.id === id) {
        setActiveEnquiry({ ...activeEnquiry, status: newStatus });
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async () => {
    if (!enquiryToDelete || !enquiryToDelete.id) return;
    setIsDeleting(true);
    try {
      await deleteEnquiry(enquiryToDelete.id);
      setEnquiries((prev) => prev.filter((e) => e.id !== enquiryToDelete.id));
      if (activeEnquiry?.id === enquiryToDelete.id) {
        setActiveEnquiry(null);
      }
      setEnquiryToDelete(null);
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportCSV = () => {
    if (!enquiries.length) return;
    const headers = [
      "ID",
      "Full Name",
      "Company",
      "Email",
      "Phone",
      "Project Type",
      "Budget",
      "Timeline",
      "Location",
      "Status",
      "Created At",
      "Description",
    ];

    const rows = filteredEnquiries.map((e) => [
      e.id || "",
      `"${e.fullName || ""}"`,
      `"${e.company || ""}"`,
      `"${e.email || ""}"`,
      `"${e.phone || ""}"`,
      `"${e.projectType || ""}"`,
      `"${e.budgetRange || ""}"`,
      `"${e.timeline || ""}"`,
      `"${e.location || ""}"`,
      e.status,
      e.createdAt,
      `"${(e.description || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nuevincent_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries
      .filter((e) => {
        const matchStatus = selectedStatus === "ALL" || e.status === selectedStatus;
        const q = searchQuery.toLowerCase();
        const matchSearch =
          !q ||
          e.fullName?.toLowerCase().includes(q) ||
          e.company?.toLowerCase().includes(q) ||
          e.email?.toLowerCase().includes(q) ||
          e.phone?.toLowerCase().includes(q) ||
          e.projectType?.toLowerCase().includes(q) ||
          e.description?.toLowerCase().includes(q);
        return matchStatus && matchSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime() || 0;
        const dateB = new Date(b.createdAt).getTime() || 0;
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [enquiries, selectedStatus, searchQuery, sortOrder]);

  const statusVariantMap: Record<string, "warning" | "purple" | "cyan" | "success" | "neutral"> = {
    NEW: "warning",
    CONTACTED: "purple",
    IN_PROGRESS: "cyan",
    COMPLETED: "success",
    CANCELLED: "neutral",
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Client Enquiries & Briefs
          </h1>
          <p className="text-xs font-mono text-cinema-400">
            MANAGE & TRACK INCOMING PRODUCTION REQUESTS
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            onClick={fetchEnquiries}
            variant="secondary"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-cinema-900 border border-white/10 space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {STATUS_OPTIONS.map((opt) => {
              const isSelected = selectedStatus === opt.value;
              const count =
                opt.value === "ALL"
                  ? enquiries.length
                  : enquiries.filter((e) => e.status === opt.value).length;
              return (
                <button
                  key={opt.value}
                  onClick={() => setSelectedStatus(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-brand-purple text-white shadow-glow-purple font-bold"
                      : "text-cinema-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className="ml-1.5 opacity-70 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center space-x-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-cinema-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search enquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cinema-850 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-cinema-500 focus:outline-none focus:border-brand-purple"
              />
            </div>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="bg-cinema-850 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-cinema-300 focus:outline-none focus:border-brand-purple"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-2xl bg-cinema-900 border border-white/10 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 text-center text-xs font-mono text-cinema-400">
            LOADING PRODUCTION BRIEFS...
          </div>
        ) : filteredEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 bg-cinema-950/60 text-cinema-400">
                  <th className="py-3.5 px-4 font-semibold">CLIENT & BRAND</th>
                  <th className="py-3.5 px-4 font-semibold">PROJECT TYPE</th>
                  <th className="py-3.5 px-4 font-semibold">BUDGET & TIMELINE</th>
                  <th className="py-3.5 px-4 font-semibold">STATUS</th>
                  <th className="py-3.5 px-4 font-semibold">SUBMITTED</th>
                  <th className="py-3.5 px-4 font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEnquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    {/* Client & Brand */}
                    <td className="py-4 px-4">
                      <p className="text-white font-medium text-sm">{item.fullName}</p>
                      <div className="flex items-center space-x-2 text-[11px] text-cinema-400 mt-0.5">
                        <span>{item.email}</span>
                        {item.company && (
                          <>
                            <span>&bull;</span>
                            <span className="text-brand-orange-light">{item.company}</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Project Type */}
                    <td className="py-4 px-4">
                      <span className="text-brand-purple-light font-semibold block">
                        {item.projectType}
                      </span>
                      <span className="text-[10px] text-cinema-500 truncate max-w-xs block">
                        {item.location || "Hyderabad"}
                      </span>
                    </td>

                    {/* Budget & Timeline */}
                    <td className="py-4 px-4">
                      <p className="text-white">{item.budgetRange || "Flexible"}</p>
                      <p className="text-[10px] text-cinema-400">{item.timeline || "Flexible"}</p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item.id!, e.target.value as EnquiryStatus)
                        }
                        className="bg-cinema-850 border border-white/10 text-[11px] font-mono rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-brand-purple cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-cinema-400">
                      <p>{formatDate(item.createdAt)}</p>
                      <p className="text-[10px] text-cinema-500">{formatTimeAgo(item.createdAt)}</p>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => setActiveEnquiry(item)}
                        className="p-1.5 rounded-lg bg-cinema-800 text-cinema-300 hover:text-white hover:bg-brand-purple/30 transition-colors"
                        title="View Full Brief"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEnquiryToDelete(item)}
                        className="p-1.5 rounded-lg bg-cinema-800 text-rose-400 hover:text-rose-200 hover:bg-rose-500/20 transition-colors"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center space-y-3">
            <Inbox className="w-10 h-10 text-cinema-500 mx-auto" />
            <p className="text-sm font-heading font-medium text-white">No enquiries match your criteria</p>
            <p className="text-xs font-mono text-cinema-400">
              Try adjusting your search query or status filter.
            </p>
          </div>
        )}
      </div>

      {/* Full Enquiry Modal */}
      {activeEnquiry && (
        <Modal
          isOpen={Boolean(activeEnquiry)}
          onClose={() => setActiveEnquiry(null)}
          title={`Enquiry Brief: ${activeEnquiry.fullName}`}
          maxWidth="xl"
        >
          <div className="space-y-5 text-xs font-mono">
            {/* Status Header inside Modal */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-cinema-850 border border-white/10">
              <span className="text-cinema-400">Current Status:</span>
              <select
                value={activeEnquiry.status}
                onChange={(e) =>
                  handleStatusChange(activeEnquiry.id!, e.target.value as EnquiryStatus)
                }
                className="bg-cinema-900 border border-white/10 text-xs font-mono rounded-lg px-3 py-1 text-brand-purple-light font-bold focus:outline-none"
              >
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            {/* Client Details Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-cinema-850 border border-white/10">
              <div>
                <span className="text-cinema-400 block">Full Name:</span>
                <span className="text-white font-semibold text-sm">{activeEnquiry.fullName}</span>
              </div>
              <div>
                <span className="text-cinema-400 block">Company / Brand:</span>
                <span className="text-white font-semibold text-sm">{activeEnquiry.company || "None specified"}</span>
              </div>
              <div>
                <span className="text-cinema-400 block">Direct Email:</span>
                <a
                  href={`mailto:${activeEnquiry.email}`}
                  className="text-brand-purple-light underline flex items-center gap-1 mt-0.5"
                >
                  <Mail className="w-3 h-3" />
                  <span>{activeEnquiry.email}</span>
                </a>
              </div>
              <div>
                <span className="text-cinema-400 block">Phone / WhatsApp:</span>
                <a
                  href={`tel:${activeEnquiry.phone}`}
                  className="text-brand-orange-light underline flex items-center gap-1 mt-0.5"
                >
                  <Phone className="w-3 h-3" />
                  <span>{activeEnquiry.phone}</span>
                </a>
              </div>
            </div>

            {/* Scope Parameters */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-cinema-850 border border-white/5">
                <span className="text-cinema-400 block">Discipline:</span>
                <span className="text-white font-bold">{activeEnquiry.projectType}</span>
              </div>
              <div className="p-3 rounded-xl bg-cinema-850 border border-white/5">
                <span className="text-cinema-400 block">Budget:</span>
                <span className="text-brand-orange-light font-bold">{activeEnquiry.budgetRange || "Flexible"}</span>
              </div>
              <div className="p-3 rounded-xl bg-cinema-850 border border-white/5">
                <span className="text-cinema-400 block">Target Timeline:</span>
                <span className="text-white">{activeEnquiry.timeline || "Flexible"}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-cinema-400 block font-bold">PROJECT BRIEF & NARRATIVE:</span>
              <div className="p-4 rounded-xl bg-cinema-850 border border-white/5 text-cinema-200 font-sans text-sm leading-relaxed whitespace-pre-wrap">
                {activeEnquiry.description}
              </div>
            </div>

            {/* Reference */}
            {activeEnquiry.inspirationLink && (
              <div className="p-3 rounded-xl bg-cinema-850 border border-white/5 flex items-center justify-between">
                <span className="text-cinema-400">Inspiration / Moodboard:</span>
                <a
                  href={activeEnquiry.inspirationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-purple-light underline flex items-center gap-1"
                >
                  <span>Open Reference</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setEnquiryToDelete(activeEnquiry);
                }}
                className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={`mailto:${activeEnquiry.email}?subject=RE: NUEVINCENT Project Enquiry - ${activeEnquiry.projectType}`}
                  className="px-4 py-2 rounded-xl bg-brand-purple text-white text-xs font-mono uppercase hover:bg-brand-purple-dark transition-colors inline-flex items-center gap-1.5 shadow-glow-purple"
                >
                  <Send className="w-3 h-3" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {enquiryToDelete && (
        <Modal
          isOpen={Boolean(enquiryToDelete)}
          onClose={() => setEnquiryToDelete(null)}
          title="Confirm Deletion"
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs font-mono text-center">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
            <p className="text-sm text-white font-heading font-medium">
              Delete enquiry from &ldquo;{enquiryToDelete.fullName}&rdquo;?
            </p>
            <p className="text-cinema-400 font-sans">
              This will permanently remove this project brief from your CRM database.
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <Button
                onClick={() => setEnquiryToDelete(null)}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                variant="primary"
                size="sm"
                className="bg-rose-600 hover:bg-rose-700"
                isLoading={isDeleting}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
