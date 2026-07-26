"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CalendarDays, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import InputWishModal from "./InputWishModal";
import { triggerConfetti } from "@/lib/confetti";

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
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWishClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" });

    setIsModalOpen(true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="absolute -right-24 top-24 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.15),transparent_35%),radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_30%)]" />
      </div>

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[72px_72px] opacity-20" />

      {/* Main Container */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-16 sm:px-8 sm:py-20 lg:px-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
          
          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm text-white/80 shadow-lg backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-400" />
              Celebration Page • 28 July
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl min-h-[90px] sm:min-h-[140px] lg:min-h-[160px]">
              <Typewriter
                titles={["Abdus Subhan Allauddin", "Front End Developer"]}
                prefixText="I am "
                typeSpeed={90}
                backSpeed={80}
                backDelay={1000}
                loop={true}
              />
            </h1>

            <p className="mt-4 sm:mt-5 max-w-xl text-sm leading-6 text-white/70 sm:text-lg sm:leading-7">
              A personal space to celebrate my journey, achievements, growth, and
              the moments that make this birthday special.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#wishes"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(124,58,237,0.35)] transition hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(124,58,237,0.45)] cursor-pointer"
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
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 cursor-pointer"
              >
                View Wishes
              </a>
            </div>

            {/* Feature Cards Grid */}
            <div className="mt-8 sm:mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4 backdrop-blur-xl">
                <CalendarDays className="h-5 w-5 text-cyan-400" />
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/60">Birthday Date</p>
                <p className="mt-0.5 sm:mt-1 text-base sm:text-lg font-semibold">28 July</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4 backdrop-blur-xl">
                <Sparkles className="h-5 w-5 text-violet-400" />
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/60">Theme</p>
                <p className="mt-0.5 sm:mt-1 text-base sm:text-lg font-semibold">Dark Premium</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4 backdrop-blur-xl">
                <Heart className="h-5 w-5 text-pink-400" />
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/60">Purpose</p>
                <p className="mt-0.5 sm:mt-1 text-base sm:text-lg font-semibold">Celebrate Me</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -inset-4 sm:-inset-6 rounded-3xl sm:rounded-4xl bg-gradient-to-r from-violet-600/20 via-cyan-500/10 to-fuchsia-600/20 blur-2xl" />

            <div className="relative rounded-3xl sm:rounded-4xl border border-white/10 bg-white/5 p-3 sm:p-5 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B1020]/80 p-4 sm:p-6">
                
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs sm:text-sm text-white/60">Special Day</p>
                    <h2 className="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-semibold">
                      Birthday Celebration
                    </h2>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2 text-right shrink-0">
                    <p className="text-[10px] sm:text-xs text-white/50">Countdown</p>
                    <p className="text-sm sm:text-lg font-bold text-violet-300">Soon</p>
                  </div>
                </div>

                {/* Grid Metrics */}
                <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-3.5 sm:p-5">
                    <p className="text-xs sm:text-sm text-white/55">Wishes</p>
                    <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold">∞</p>
                    <p className="mt-1 text-xs sm:text-sm text-white/50">
                      Community & friends
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-3.5 sm:p-5">
                    <p className="text-xs sm:text-sm text-white/55">Projects</p>
                    <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold">5+</p>
                    <p className="mt-1 text-xs sm:text-sm text-white/50">
                      Web apps developed
                    </p>
                  </div>
                </div>

                {/* Tech Stack Box */}
                <div className="mt-3 sm:mt-4 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20 p-4 sm:p-5">
                  <p className="text-xs sm:text-sm text-white/60">Message</p>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-base leading-5 sm:leading-7 text-white/90">
                    “A modern celebration page built with Next.js App Router, Prisma,
                    MongoDB, and Tailwind CSS.”
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badges (Adjusted visibility for extra-small viewports) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:block absolute -left-4 top-12 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs sm:text-sm backdrop-blur-xl"
            >
              ✨ Premium UI
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:block absolute -bottom-5 right-8 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs sm:text-sm backdrop-blur-xl"
            >
              🎉 Celebrate Me
            </motion.div>
          </motion.div>

        </div>
      </div>

      <InputWishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}