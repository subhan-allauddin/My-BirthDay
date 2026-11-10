"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CalendarDays,
  MapPin,
  GraduationCap,
  PartyPopper,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import InputWishModal from "./InputWishModal";
import { triggerConfetti } from "@/lib/confetti";
import { PROFILE } from "@/data/profile";
import { useBirthdayCountdown } from "@/lib/useBirthdayCountdown";

type TypewriterProps = {
  titles: readonly string[];
  prefixText?: string;
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
};

export function Typewriter({
  titles,
  prefixText = "",
  typeSpeed = 65,
  backSpeed = 40,
  backDelay = 1200,
  loop = true,
}: TypewriterProps) {
  const el = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: [...titles],
      typeSpeed,
      backSpeed,
      backDelay,
      loop,
    });

    return () => {
      typed.destroy();
    };
  }, [titles, typeSpeed, backSpeed, backDelay, loop]);

  return (
    <span>
      {prefixText}
      <span
        ref={el}
        className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent"
      />
    </span>
  );
}

export default function HeroSection() {
  const countdown = useBirthdayCountdown();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishCount, setWishCount] = useState<number | null>(null);
  const [wishCountFailed, setWishCountFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCount() {
      try {
        const res = await fetch("/api/wishes", { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to load wishes: ${res.status}`);
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : [];
        setWishCount(
          typeof json?.total === "number" ? json.total : list.length
        );
      } catch (error) {
        if ((error as { name?: string })?.name !== "AbortError") {
          console.error("Error loading approved wish count:", error);
          setWishCountFailed(true);
        }
      }
    }

    loadCount();
    return () => controller.abort();
  }, []);

  const handleWishClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#050816] text-white pt-16"
    >
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute -right-24 top-24 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.15),transparent_38%),radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_32%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={triggerConfetti}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm text-violet-200 shadow-lg backdrop-blur-xl cursor-pointer hover:bg-violet-500/20 transition"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-300" />
              <span>
                Born {PROFILE.birthDate.display} • Tap to Celebrate
              </span>
            </motion.button>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl min-h-[5.5rem] sm:min-h-[8rem] lg:min-h-[9.5rem]">
              <Typewriter
                titles={PROFILE.roles}
                prefixText="I am "
                typeSpeed={75}
                backSpeed={45}
                backDelay={1200}
                loop={true}
              />
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-lg sm:leading-7">
              {PROFILE.bio}
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                href="#wishes"
                onClick={handleWishClick}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.38)] transition hover:shadow-[0_0_42px_rgba(124,58,237,0.55)] cursor-pointer"
              >
                Leave a Birthday Wish
                <ArrowRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/10 cursor-pointer"
              >
                Explore Real Projects
              </motion.a>
            </div>

            {/* Real Info Cards */}
            <div className="mt-9 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
              >
                <CalendarDays className="h-5 w-5 text-cyan-400" />
                <p className="mt-2.5 text-xs text-white/55">Birth Date</p>
                <p className="mt-0.5 text-sm sm:text-base font-semibold text-white">
                  {PROFILE.birthDate.display}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
              >
                <MapPin className="h-5 w-5 text-violet-400" />
                <p className="mt-2.5 text-xs text-white/55">Location</p>
                <p className="mt-0.5 text-sm sm:text-base font-semibold text-white">
                  Karachi, Pakistan
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
              >
                <GraduationCap className="h-5 w-5 text-pink-400" />
                <p className="mt-2.5 text-xs text-white/55">Education</p>
                <p className="mt-0.5 text-sm sm:text-base font-semibold text-white">
                  CIPS • {PROFILE.education.shortGrade}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-[2rem] bg-gradient-to-r from-violet-600/20 via-cyan-500/15 to-fuchsia-600/20 blur-2xl" />

            <div className="relative rounded-3xl sm:rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 sm:p-5 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-2xl sm:rounded-[1.5rem] border border-white/10 bg-[#0B1020]/90 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs sm:text-sm text-white/55">
                      {countdown
                        ? `Turning ${countdown.turningAge} Milestone`
                        : "Special Day"}
                    </p>
                    <h2 className="mt-0.5 text-lg sm:text-2xl font-bold text-white">
                      {PROFILE.shortName}&apos;s Birthday
                    </h2>
                  </div>

                  <div className="rounded-2xl border border-violet-400/25 bg-violet-500/10 px-3.5 py-2 text-right shrink-0">
                    <p className="text-[10px] sm:text-xs text-white/55">
                      Next Birthday
                    </p>
                    <p className="text-sm sm:text-lg font-bold text-violet-300 tabular-nums">
                      {countdown ? `${countdown.days}d left` : PROFILE.birthDate.dayMonth}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-white/55">
                      Approved Wishes
                    </p>
                    <p className="mt-1.5 text-2xl sm:text-3xl font-bold text-white tabular-nums">
                      {wishCount !== null ? wishCount : wishCountFailed ? "—" : "…"}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      {wishCountFailed
                        ? "Could not connect to wishes"
                        : wishCount !== null
                          ? "Synced with MongoDB"
                          : "Loading from MongoDB"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-white/55">
                      Projects Shipped
                    </p>
                    <p className="mt-1.5 text-2xl sm:text-3xl font-bold text-white">
                      {PROFILE.stats.projectsCompleted}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      {PROFILE.stats.clientSatisfaction} satisfaction
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-white/60">Personal Motto</p>
                    <button
                      type="button"
                      onClick={triggerConfetti}
                      className="inline-flex items-center gap-1 text-xs font-medium text-violet-300 hover:text-white transition cursor-pointer"
                    >
                      <PartyPopper className="h-3.5 w-3.5" />
                      Confetti
                    </button>
                  </div>
                  <p className="mt-1.5 text-sm sm:text-base leading-6 text-white/90 italic">
                    “{PROFILE.tagline}”
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex items-center gap-2 absolute -left-5 top-10 rounded-2xl border border-white/15 bg-[#0B1020]/90 px-4 py-2.5 text-xs font-medium text-white shadow-xl backdrop-blur-xl will-change-transform"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Ranked #1 @ Utech Digital
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex items-center gap-2 absolute -bottom-4 right-6 rounded-2xl border border-white/15 bg-[#0B1020]/90 px-4 py-2.5 text-xs font-medium text-white shadow-xl backdrop-blur-xl will-change-transform"
            >
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
              Ex-Intern @ Computing Yard
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
