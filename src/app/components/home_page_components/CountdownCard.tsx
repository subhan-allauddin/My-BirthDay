"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const difference = Math.max(target - now, 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function CountdownCard({
  targetDate = "2026-07-28T00:00:00",
}: {
  targetDate?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Component client (browser) par load hotay hi hydration complete karega
    setMounted(true);
    setTimeLeft(getTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="w-full px-6 py-8 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-5xl rounded-4xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-2xl sm:p-6"
      >
        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0B1020]/80 p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.14),transparent_30%)]" />
          <div className="relative">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm tracking-[0.25em] text-white/50 uppercase">
                  Countdown
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Birthday is coming
                </h2>
              </div>

              <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-right shadow-[0_0_24px_rgba(124,58,237,0.18)]">
                <p className="text-xs text-white/50">Target Date</p>
                <p className="text-sm font-medium text-violet-200">28 July</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {items.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5 text-center shadow-[0_0_20px_rgba(255,255,255,0.04)] backdrop-blur-xl"
                >
                  <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {mounted
                      ? String(item.value).padStart(2, "0")
                      : "--"}
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-[0.2em] text-white/55">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-sm text-white/70">
              The celebration starts when this timer hits zero.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}