"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, LaptopMinimalCheck , Award } from "lucide-react";

export default function AboutMe() {
  return (
    <section id="about" className="relative w-full bg-[#050816] py-20 text-white overflow-hidden">
      <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
      
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            My Story
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Behind The Code
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-md mx-auto">
            A little story behind my journey and why this page was built.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl relative"
        >
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-white/80">
            <p>
              My coding journey started with guidance from my elder brother, who introduced me to web development through <span className="text-violet-300 font-semibold">Utech Digital Education</span>. Starting from the basics of HTML, CSS, and JavaScript , I built my foundation through interactive projects like games and calculators.
            </p>

            <p>
              Over time, my passion grew into building real-world dynamic web applications. I achieved <span className="text-violet-300 font-semibold">Rank #1 in Frontend Web Development with React</span> and gained hands-on experience as a <span className="text-violet-300 font-semibold">Front End Development Intern at Computing Yard</span>, solving hydration errors, and building 100% mobile-responsive interfaces.
            </p>

            <p className="text-white/90">
              I wanted a truly modern, full-stack website in my portfolio to showcase what I can do today. That’s why I built this celebration app using <span className="text-violet-300 font-semibold">Next.js (App Router), Prisma, MongoDB, and Tailwind CSS</span>—a space to combine clean code, UI design, and real-time interaction.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <Code2 className="h-6 w-6 text-cyan-400" />
              <div>
                <p className="text-xs text-white/50">Tech Stack</p>
                <p className="text-sm font-semibold text-white">MERN Stack Developer</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <Award className="h-6 w-6 text-violet-400" />
              <div>
                <p className="text-xs text-white/50">Certification</p>
                <p className="text-sm font-semibold text-white">Ranked #1 React Dev</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <LaptopMinimalCheck  className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-xs text-white/50">Experience</p>
                <p className="text-sm font-semibold text-white">Ex-Intern @ Computing Yard</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}