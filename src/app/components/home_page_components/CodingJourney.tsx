"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Code2,
  GraduationCap,
  MapPin,
  Rocket,
  Sparkles,
} from "lucide-react";
import { JOURNEY_STEPS, type JourneyItem } from "@/data/profile";

function getStepIcon(step: JourneyItem) {
  if (step.type === "Experience") return Briefcase;
  if (step.type === "Education") return GraduationCap;
  if (step.status === "In Progress") return Rocket;
  return Code2;
}

export default function CodingJourney() {
  return (
    <section
      id="journey"
      className="scroll-mt-24 relative w-full bg-[#050816] py-16 sm:py-20 text-white overflow-hidden"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            Experience, Training & Education
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            My Journey
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-white/60 max-w-lg mx-auto">
            Verified milestones across frontend internships, React training,
            Generative AI courses, and academic education.
          </p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-44 space-y-8 sm:space-y-10">
          {JOURNEY_STEPS.map((step, index) => {
            const Icon = getStepIcon(step);
            return (
              <motion.div
                key={`${step.period}-${step.title}`}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-8 md:pl-12 group"
              >
                <div
                  className={`absolute -left-[18px] top-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r ${step.color} text-white shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="hidden md:block absolute -left-44 top-2.5 w-36 text-right pr-3 text-xs font-semibold text-violet-300 tracking-wide">
                  {step.period}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/35 hover:bg-white/[0.07]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="md:hidden inline-block text-xs font-semibold text-violet-300">
                      {step.period}
                    </span>

                    <div className="flex flex-wrap items-center gap-2 ml-auto md:ml-0">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/75">
                        {step.type}
                      </span>
                      {step.status && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            step.status === "Ranked #1"
                              ? "border border-amber-400/35 bg-amber-500/15 text-amber-300"
                              : step.status === "In Progress"
                                ? "border border-emerald-400/35 bg-emerald-500/15 text-emerald-300"
                                : "border border-violet-400/30 bg-violet-500/15 text-violet-200"
                          }`}
                        >
                          {step.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-white/60">
                    <span className="font-medium text-white/85">
                      {step.organization}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-violet-400" />
                      {step.location}
                    </span>
                  </p>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/75">
                    {step.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {step.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-violet-200/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
