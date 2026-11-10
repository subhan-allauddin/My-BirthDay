"use client";

import { ExternalLink, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { PROFILE } from "@/data/profile";

export default function FooterSection() {
  return (
    <footer className="relative border-t border-white/10 bg-[#03050D] py-12 text-white/60">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 sm:flex-row sm:items-center sm:px-10 lg:px-16">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-[11px] font-bold text-white">
              {PROFILE.initials}
            </span>
            <p className="text-base font-semibold text-white">
              {PROFILE.fullName}
            </p>
          </div>
          <p className="text-xs text-white/50 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-violet-400" />
            {PROFILE.location} • Born {PROFILE.birthDate.display}
          </p>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {PROFILE.fullName}. Built with{" "}
            <span className="font-medium text-violet-400">Next.js</span>,{" "}
            <span className="font-medium text-cyan-400">Prisma</span> &{" "}
            <span className="font-medium text-emerald-400">MongoDB</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/75 transition hover:border-violet-500/40 hover:bg-white/10 hover:text-white"
          >
            <Mail className="h-3.5 w-3.5 text-violet-400" />
            Email
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/75 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/75 transition hover:border-sky-500/40 hover:bg-white/10 hover:text-white"
          >
            <LinkedinIcon className="h-3.5 w-3.5 text-sky-400" />
            LinkedIn
          </a>
          <a
            href={PROFILE.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 px-3.5 py-2 text-xs font-medium text-violet-200 transition hover:bg-violet-500/20"
          >
            Portfolio
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
