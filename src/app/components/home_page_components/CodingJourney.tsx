"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Briefcase, Rocket, Sparkles, GraduationCap } from "lucide-react";

const journeySteps = [
  {
    year: "2022 - 2023",
    title: "Learning Web Developement From Utech Digital Education",
    description: "Covering HTML, CSS, Bootstrap 5, anf Firebase for deployment and I made a clone Daraz Website(Not Responsie).",
    icon: Code2,
    color: "from-cyan-500 to-blue-500",
  },
  {
    year: "2023 - 2024",
    title: "Front End Intern @ Computing Yard",
    description: "Learn ReactJs, Redux,  TailwindCss, Responsive Design and I made 2 clone e-commerce website and made Quiz Game and also Snake Game at InternShip.",
    icon: Briefcase,
    color: "from-violet-500 to-purple-500",
  },
  {
    year: "In 2025 - 2026",
    title: "My Break Time Year In which I learn Only and Focusing Higher Education School.",
    description: "Start Learing NextJs, React Native and Exploring Generative AI",
    icon: Terminal,
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    year: "2026 - Present",
    title: "Learning Prompt Engineering at BanoQabil 5.0 Session.",
    description: "Learning Python, Daily Practice Of Logic Building and DSA In Leetcode,Learned NoSQL and SQL DataBases and Prisma also Explore AI Enginnering and BackEnd Development.",
    icon: Rocket,
    color: "from-emerald-500 to-teal-500",
  },
];

export default function CodingJourney() {
  return (
    <section id="journey" className="relative w-full bg-[#050816] py-20 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-125 w-125 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            My Journey
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Coding Journey
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-lg mx-auto">
            From learning core fundamentals to working as an intern and building full-stack applications.
          </p>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-36 space-y-12">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                
                <div className={`absolute -left-4.25 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r ${step.color} text-white shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-4 w-4" />
                </div>

                
                <div className="hidden md:block absolute -left-36 top-2.5 text-xs font-bold text-violet-400 tracking-wider">
                  {step.year}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-violet-500/30 hover:bg-white/[0.07]">
                  <span className="md:hidden inline-block mb-2 text-xs font-bold text-violet-400">
                    {step.year}
                  </span>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}