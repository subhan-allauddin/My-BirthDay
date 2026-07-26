"use client";

import { motion } from "framer-motion";
import {
  Code2,
  GraduationCap,
  Trophy,
  Sparkles,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Coding Journey",
    description: "Building skills step by step through real projects and practice.",
  },
  {
    icon: GraduationCap,
    title: "Learning Growth",
    description: "Improving every day with consistency, focus, and curiosity.",
  },
  {
    icon: Trophy,
    title: "Favorite Achievement",
    description: "A milestone that shows progress and effort turned into results.",
  },
  {
    icon: Sparkles,
    title: "Dream Goal",
    description: "A future vision that keeps the journey exciting and meaningful.",
  },
];

export default function HighlightCards() {
  return (
    <section className="w-full px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">
            Highlights
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A few moments that matter
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            This section can show your journey, progress, and personal milestones in a clean modern grid.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group rounded-[1.7rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-[0_0_24px_rgba(255,255,255,0.04)]">
                  <Icon className="h-6 w-6 text-violet-300 transition group-hover:text-cyan-300" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/60">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}