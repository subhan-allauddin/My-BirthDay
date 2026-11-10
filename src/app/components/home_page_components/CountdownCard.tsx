"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Cake, CalendarDays, PartyPopper, Sparkles } from "lucide-react";
import { useBirthdayCountdown } from "@/lib/useBirthdayCountdown";
import { triggerConfetti } from "@/lib/confetti";
import { PROFILE } from "@/data/profile";

function AnimatedDigit({ value, label }: { value: number | null; label: string }) {
  const formatted = value === null ? "--" : String(value).padStart(2, "0");

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl group hover:border-violet-500/35 transition-colors"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative h-10 sm:h-14 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white tabular-nums"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/55">
        {label}
      </div>
    </motion.div>
  );
}

export default function CountdownCard() {
  const countdown = useBirthdayCountdown();

  const items = [
    { label: "Days", value: countdown ? countdown.days : null },
    { label: "Hours", value: countdown ? countdown.hours : null },
    { label: "Minutes", value: countdown ? countdown.minutes : null },
    { label: "Seconds", value: countdown ? countdown.seconds : null },
  ];

  return (
    <section className="w-full px-4 sm:px-6 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-5xl rounded-3xl sm:rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 sm:p-5 shadow-2xl backdrop-blur-2xl"
      >
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[1.5rem] border border-white/10 bg-[#0B1020]/90 p-5 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.2),transparent_40%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.16),transparent_35%)]" />

          <div className="relative">
            {countdown?.isBirthdayToday && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-fuchsia-500/35 bg-gradient-to-r from-violet-600/25 via-fuchsia-500/20 to-cyan-500/20 px-4 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <PartyPopper className="h-5 w-5 text-fuchsia-300 shrink-0" />
                  <p className="text-sm font-medium text-white">
                    It&apos;s Birthday Day! Celebrating turning{" "}
                    <span className="font-bold text-fuchsia-300">
                      {countdown.currentAge}
                    </span>{" "}
                    today ({PROFILE.birthDate.dayMonth})!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={triggerConfetti}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition cursor-pointer shrink-0"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Pop Confetti
                </button>
              </motion.div>
            )}

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.22em] text-violet-300/80 uppercase">
                  <Cake className="h-3.5 w-3.5 text-violet-400" />
                  Birthday Countdown
                </p>
                <h2 className="mt-1.5 text-xl font-bold text-white sm:text-3xl">
                  {countdown
                    ? `Turning ${countdown.turningAge} on ${countdown.formattedTargetDate}`
                    : `Next Celebration • ${PROFILE.birthDate.dayMonth}`}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-white/60">
                  Born on {PROFILE.birthDate.display} •{" "}
                  {countdown
                    ? `Currently ${countdown.currentAge} years old`
                    : "Karachi, Pakistan"}
                </p>
              </div>

              <div className="self-start sm:self-auto flex items-center gap-2.5 rounded-2xl border border-violet-400/25 bg-violet-500/10 px-4 py-2.5 shadow-[0_0_24px_rgba(124,58,237,0.18)]">
                <CalendarDays className="h-4 w-4 text-violet-300 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-white/55">
                    Target Date
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-violet-200">
                    {countdown ? countdown.formattedTargetDate : PROFILE.birthDate.dayMonth}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {items.map((item) => (
                <AnimatedDigit
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>

            {/* Smooth Year Milestone Progress */}
            <div className="mt-5 sm:mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 sm:px-5">
              <div className="flex items-center justify-between text-xs text-white/65 mb-2">
                <span>Journey toward next birthday</span>
                <span className="font-mono font-medium text-violet-300 tabular-nums">
                  {countdown ? `${countdown.yearProgressPercent}%` : "--%"}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: countdown ? `${countdown.yearProgressPercent}%` : "0%",
                  }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
