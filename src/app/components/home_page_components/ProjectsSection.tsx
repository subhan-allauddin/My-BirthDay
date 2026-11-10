"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  FolderGit2,
  Sparkles,
  Star,
} from "lucide-react";
import { GithubIcon } from "@/app/components/main_components/BrandIcons";
import { PROJECTS, type ProjectItem } from "@/data/profile";

type FilterOption = "All" | "Featured" | ProjectItem["category"];

const FILTERS: FilterOption[] = [
  "All",
  "Featured",
  "Web Apps",
  "Games & UI",
  "AI & CV",
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  const visibleProjects = PROJECTS.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Featured") return Boolean(project.featured);
    return project.category === activeFilter;
  });

  return (
    <section
      id="projects"
      className="scroll-mt-24 relative w-full bg-[#050816] py-16 sm:py-20 text-white overflow-hidden"
    >
      <div className="pointer-events-none absolute right-10 top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-10 bottom-10 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            Real Portfolio & CV Work
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-white/60 max-w-lg mx-auto">
            Live deployed web apps, interactive browser games, and upcoming AI
            projects I&apos;ve built.
          </p>

          {/* Filter Pills */}
          <div className="mt-7 inline-flex flex-wrap justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-xl">
            {FILTERS.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`relative rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    active ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="projects-filter-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 shadow-md"
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-2xl transition-colors hover:border-violet-500/40 hover:bg-white/[0.07]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/25 bg-violet-500/10 text-violet-300">
                      <FolderGit2 className="h-5 w-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
                          <Star className="h-3 w-3 fill-amber-300" />
                          Featured
                        </span>
                      )}
                      {project.status && (
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            project.status === "Live"
                              ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                              : project.status === "In Progress"
                                ? "border border-cyan-400/30 bg-cyan-500/10 text-cyan-300"
                                : "border border-white/15 bg-white/5 text-white/70"
                          }`}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/70">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-violet-200/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {(project.github || project.demo) && (
                    <div className="flex items-center gap-2.5">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                          Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/35 bg-violet-500/15 px-3 py-1.5 text-xs font-medium text-violet-200 transition hover:bg-violet-500/25 hover:text-white"
                        >
                          Live Demo
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
