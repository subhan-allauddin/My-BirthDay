"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CalendarDays, Heart, FolderGit2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import InputWishModal from "./InputWishModal"; // Modal component import

type TypewriterProps = {
  titles: string[];
  prefixText?: string;
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
};

export function Typewriter({
  titles,
  prefixText = "",
  typeSpeed = 60,
  backSpeed = 40,
  backDelay = 1000,
  loop = true,
}: TypewriterProps) {
  const el = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: titles,
      typeSpeed: typeSpeed,
      backSpeed: backSpeed,
      backDelay: backDelay,
      loop: loop,
    });

    return () => {
      typed.destroy();
    };
  }, [titles, typeSpeed, backSpeed, backDelay, loop]);

  return (
    <span>
      {prefixText}
      <span ref={el} className="text-violet-300" />
    </span>
  );
}

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWishClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // 1. Smooth scroll to the wishes section
    document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" });

    // 2. Open the wish input modal
    setIsModalOpen(true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.15),transparent_35%),radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_30%)]" />
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[72px_72px] opacity-20" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 shadow-lg backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-violet-400" />
              Celebration Page • 28 July
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl min-h-[120px] sm:min-h-[160px]">
              <Typewriter
                titles={["Abdus Subhan Allauddin", "Front End Developer"]}
                prefixText="I am "
                typeSpeed={90}
                backSpeed={80}
                backDelay={1000}
                loop={true}
              />
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              A personal space to celebrate my journey, achievements, growth, and
              the moments that make this birthday special.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#wishes"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(124,58,237,0.35)] transition hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(124,58,237,0.45)] cursor-pointer"
                onClick={handleWishClick}
              >
                Leave a Wish
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#wishes"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 cursor-pointer"
              >
                View Wishes
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <CalendarDays className="h-5 w-5 text-cyan-400" />
                <p className="mt-3 text-sm text-white/60">Birthday Date</p>
                <p className="mt-1 text-lg font-semibold">28 July</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <Sparkles className="h-5 w-5 text-violet-400" />
                <p className="mt-3 text-sm text-white/60">Theme</p>
                <p className="mt-1 text-lg font-semibold">Dark Premium</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <Heart className="h-5 w-5 text-pink-400" />
                <p className="mt-3 text-sm text-white/60">Purpose</p>
                <p className="mt-1 text-lg font-semibold">Celebrate Me</p>
              </div>
            </div>
          </motion.div>

          {/* Right visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -inset-6 rounded-4xl bg-gradient-to-r from-violet-600/20 via-cyan-500/10 to-fuchsia-600/20 blur-2xl" />

            <div className="relative rounded-4xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-3xl border border-white/10 bg-[#0B1020]/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">Special Day</p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      Birthday Celebration
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-right">
                    <p className="text-xs text-white/50">Countdown</p>
                    <p className="text-lg font-bold text-violet-300">Soon</p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-5">
                    <p className="text-sm text-white/55">Wishes</p>
                    <p className="mt-2 text-3xl font-bold">∞</p>
                    <p className="mt-1 text-sm text-white/50">
                      Community & friends
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-5">
                    <p className="text-sm text-white/55">Projects</p>
                    <p className="mt-2 text-3xl font-bold">5+</p>
                    <p className="mt-1 text-sm text-white/50">
                      Web apps developed
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20 p-5">
                  <p className="text-sm text-white/60">Message</p>
                  <p className="mt-2 text-base leading-7 text-white/90">
                    “A modern celebration page built with Next.js App Router, Prisma,
                    MongoDB, and Tailwind CSS.”
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-12 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm backdrop-blur-xl"
            >
              ✨ Premium UI
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 right-8 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm backdrop-blur-xl"
            >
              🎉 Celebrate Me
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Input Wish Modal Popup */}
      <InputWishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}