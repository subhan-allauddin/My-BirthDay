"use client";

import { motion } from "framer-motion";
import { ExternalLink,  FolderGit2, Sparkles } from "lucide-react";

const projects = [
   {
    title: "Music E-Commerce Web",
    description:
      "Responsive music store interface replica with sleek modern audio component design and 100% mobile compatibility.",
    tags: ["Next.js","React.js", "JavaScript", "CSS3", "Acerternity UI", "HTML"],
    github: "https://github.com/subhan-allauddin/Next-Project-One",
    demo: "https://next-project-one-ten.vercel.app",
  },
    {
    title: "Electrolysis Template",
    description:
      "This is my school project This template show the concept of elctrolysis.",
    tags: ["Next.js", "Prisma", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/subhan-allauddin/my-birthday",
    demo: "https://electrolysis.vercel.app",
  },
   {
    title: "Snake Game",
    description:
      "A Simple Snake.",
    tags: ["HTML5", "CSS3", "Vanilla Js"],
    github: "https://github.com/subhan-allauddin/Snake-games",
    demo: "https://snake-games-xi.vercel.app",
  },
    {
    title: "Daraz App Clone",
    description:
      "Full e-commerce user interface replica featuring product listings, responsive grid layouts, and cart UI interaction. This is my First E-commerce Website Clone.",
    tags: ["HTML5, CSS3, BootsTrap5, JavaScript"],
    github: "https://github.com/subhan-allauddin",
    demo: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full bg-[#050816] py-20 text-white overflow-hidden">
      <div className="pointer-events-none absolute right-10 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-10 bottom-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            My Work
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-md mx-auto">
            A showcase of web applications and interactive projects I have developed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur-2xl transition-all hover:border-violet-500/40 hover:bg-white/[0.07]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                    <FolderGit2 className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/60 transition hover:text-white"
                    >
                    </a>
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/60 transition hover:text-white"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {project.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-violet-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}