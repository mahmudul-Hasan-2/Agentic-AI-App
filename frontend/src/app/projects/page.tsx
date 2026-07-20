"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, FilterParams } from "@/lib/api";
import { Search, SlidersHorizontal, Loader2, DollarSign } from "lucide-react";
import ProjectSkeleton from "@/components/ProjectSkeleton";

export default function ExploreProjectsPage() {
  // ফিল্টার স্টেটসমূহ
  const [filters, setFilters] = useState<FilterParams>({
    search: "",
    category: "",
    minBudget: "",
    maxBudget: "",
    sortBy: "",
  });

  // TanStack Query: ফিল্টার স্টেট চেঞ্জ হলেই এটি অটোমেটিক রি-ফেচ করবে
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", filters],
    queryFn: () => fetchProjects(filters),
    placeholderData: (previousData) => previousData, // UI জিলিক মারা (flicker) বন্ধ রাখবে
  });

  // হ্যান্ডলার ফাংশন
  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#05070C] text-slate-100 px-6 py-10">
      {/* হেডার */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
          Explore Agentic Deployments
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Discover production-ready AI tools and custom software modules.
        </p>
      </div>

      {/* সার্চ ও ফিল্টার প্যানেল */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8 bg-[#0A0D14] border border-slate-800/60 p-4 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* সার্চ ইনপুট */}
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title, skills or details..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-600"
          />
        </div>

        {/* ক্যাটাগরি ফিল্টার */}
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 text-slate-300"
        >
          <option value="">All Categories</option>
          <option value="AI Agent">AI Agent</option>
          <option value="Web App">Web App</option>
          <option value="Automation">Automation</option>
        </select>

        {/* বাজেট ফিল্টার (মিনিমাম ও ম্যাক্সিমাম) */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min Budget"
            value={filters.minBudget}
            onChange={(e) => handleFilterChange("minBudget", e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-600"
          />
          <span className="text-slate-600 text-xs">to</span>
          <input
            type="number"
            placeholder="Max Budget"
            value={filters.maxBudget}
            onChange={(e) => handleFilterChange("maxBudget", e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-600"
          />
        </div>

        {/* সর্টিং ড্রপডাউন */}
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 text-slate-300"
        >
          <option value="">Sort By: Latest</option>
          <option value="budget_low">Budget: Low to High</option>
          <option value="budget_high">Budget: High to Low</option>
        </select>
      </div>

      {/* প্রজেক্ট লিস্টিং - ৪-কলাম বিশিষ্ট ডার্ক গ্রিড লেআউট */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <ProjectSkeleton />
        ) : isError ? (
          <div className="text-center py-20 text-red-400 text-sm">
            Something went wrong while fetching deployments.
          </div>
        ) : projects?.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-sm">
            No projects found matching the criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {projects?.map((project: any) => (
              <div
                key={project._id}
                className="group bg-[#0A0D14]/70 border border-slate-800/40 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 hover:bg-[#0E131F]/90 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.05)]"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/30 text-cyan-400">
                      {project.category || "General"}
                    </span>
                    <div className="flex items-center text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/30 px-2 py-0.5 rounded">
                      <DollarSign className="w-3 h-3 mr-0.5" />
                      {project.estimatedBudgetRange?.min || 0} -{" "}
                      {project.estimatedBudgetRange?.max || 0}
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {project.shortDescription || project.fullDescription}
                  </p>
                </div>

                {/* স্কিল ট্যাগসমূহ */}
                <div className="mt-4 pt-4 border-t border-slate-900">
                  <div className="flex flex-wrap gap-1">
                    {project.requiredSkills
                      ?.slice(0, 3)
                      .map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    {project.requiredSkills?.length > 3 && (
                      <span className="text-[10px] text-slate-500 font-mono self-center pl-1">
                        +{project.requiredSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
