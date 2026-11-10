"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Code2,
  LaptopMinimalCheck,
  Award,
  ExternalLink,
  Mail,
  GraduationCap,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
} from "@/app/components/main_components/BrandIcons";
import { PROFILE } from "@/data/profile";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="scroll-mt-24 relative w-full bg-[#050816] py-14 sm:py-20 text-white overflow-hidden"
    >
      <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-violet-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1.5 text-xs text-violet-300 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            About Me
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Behind The Code
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-white/60 max-w-lg mx-auto">
            {PROFILE.fullName} — {PROFILE.role} based in {PROFILE.location}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl sm:rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-2xl"
        >
          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-[17px] leading-relaxed text-white/80">
            <p>
              Born on{" "}
              <span className="text-violet-300 font-semibold">
                {PROFILE.birthDate.display}
              </span>{" "}
              and studying in{" "}
              <span className="text-white font-semibold">
                {PROFILE.education.grade} at {PROFILE.education.school}
              </span>
              , I started my web development journey at{" "}
              <span className="text-violet-300 font-semibold">
                Utech Digital Education
              </span>{" "}
              in 2024, where I earned{" "}
              <span className="text-cyan-300 font-semibold">
                Rank #1 in Frontend Web Development with React
              </span>
              .
            </p>

            <p>
              From June to September 2024, I worked as a{" "}
              <span className="text-violet-300 font-semibold">
                Frontend Developer Intern at Computing Yard
              </span>{" "}
              in Karachi—shipping 3+ mobile-compatible responsive pages, debugging
              10+ critical frontend issues (including hydration errors and API
              fetch failures), and integrating REST APIs into Next.js & NoSQL
              applications.
            </p>

            <p className="text-white/90">
              Currently, I am expanding into AI engineering through{" "}
              <span className="text-emerald-300 font-semibold">
                Bano Qabil (Alkhidmat Foundation)
              </span>
              —building LLM applications, RAG pipelines, and AI agents using
              JavaScript, Python, Prisma, and MongoDB.
            </p>
          </div>

          {/* Verified Links */}
          <div className="mt-7 flex flex-wrap gap-3 pt-6 border-t border-white/10">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs sm:text-sm font-medium text-sky-300 transition hover:bg-sky-500/20 hover:border-sky-500/50"
            >
              <LinkedinIcon className="h-4 w-4 text-sky-400" />
              LinkedIn
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-white/20 hover:border-white/30"
            >
              <GithubIcon className="h-4 w-4 text-white" />
              GitHub
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>

            <a
              href={PROFILE.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs sm:text-sm font-medium text-violet-200 transition hover:bg-violet-500/20"
            >
              <Code2 className="h-4 w-4 text-violet-400" />
              Live Portfolio
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs sm:text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
            >
              <Mail className="h-4 w-4 text-emerald-400" />
              {PROFILE.email}
            </a>
          </div>

          {/* Real Credential Highlights */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
              <Code2 className="h-5 w-5 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[11px] text-white/50">Core Stack</p>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Next.js, React & MongoDB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
              <Award className="h-5 w-5 text-violet-400 shrink-0" />
              <div>
                <p className="text-[11px] text-white/50">Recognition</p>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Ranked #1 @ Utech Digital
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
              <LaptopMinimalCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[11px] text-white/50">Experience</p>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Intern @ Computing Yard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
              <GraduationCap className="h-5 w-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-[11px] text-white/50">Education</p>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  CIPS • {PROFILE.education.grade}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
