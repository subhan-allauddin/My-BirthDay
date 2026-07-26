"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, MessageSquare, Calendar, Eye } from "lucide-react";
import { useState } from "react";

// Mock Data for Wishes (Pass your real database props or context here)
const LATEST_WISHES = [
  {
    id: "1",
    name: "Ahmadi Khan",
    message: "Happy Birthday Abdus Subhan! Wishing you huge success in your Front End journey!",
    time: "2 hours ago",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    message: "May this year bring endless opportunities and joyful memories. Keep shining brother!",
    time: "5 hours ago",
  },
  {
    id: "3",
    name: "Hamza Malik",
    message: "Happy Birthday boss! Great job on building this amazing celebration UI platform.",
    time: "1 day ago",
  },
];

export default function WishesAndFooterSections() {
  // Demo login state - replace with your Auth session check (e.g., NextAuth or Clerk)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-[#050816] text-white">

      {/* ==========================================
          7) WISHES PREVIEW SECTION
         ========================================== */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              Community Messages
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Wishes
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Heartfelt messages from friends, family, and awesome supporters.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <a
              href="#write-wish"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(124,58,237,0.3)] transition hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(124,58,237,0.45)]"
            >
              <Heart className="h-4 w-4 fill-white/20" />
              Write a Wish
            </a>
            {!isLoggedIn && (
              <p className="text-xs text-white/40">
                🔒 Login required to leave a verified wish.
              </p>
            )}
          </div>
        </div>

        {/* Wishes Card Stack */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LATEST_WISHES.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="relative flex flex-col justify-between rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]"
            >
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-violet-600/10 blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/20 font-semibold text-violet-200">
                      {wish.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{wish.name}</h3>
                      <p className="text-xs text-white/40">{wish.time}</p>
                    </div>
                  </div>
                  <Heart className="h-4 w-4 text-pink-400/70" />
                </div>

                <p className="text-sm leading-relaxed text-white/80 font-normal italic">
                  “{wish.message}”
                </p>
              </div>

              <div className="mt-6 border-t border-white/5 pt-4 text-xs text-white/40 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-violet-400" />
                Verified Friend Wish
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==========================================
          8) CELEBRATION STATS SECTION
         ========================================== */}
      <section className="relative mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="rounded-[2.2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/2 p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            
            <div className="rounded-2xl border border-white/10 bg-[#0B1020]/60 p-5 backdrop-blur-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
                <MessageSquare className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">128+</p>
              <p className="mt-1 text-xs text-white/50 uppercase tracking-widest">Wishes Received</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020]/60 p-5 backdrop-blur-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">24+</p>
              <p className="mt-1 text-xs text-white/50 uppercase tracking-widest">Memories Added</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020]/60 p-5 backdrop-blur-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300">
                <Calendar className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">20+</p>
              <p className="mt-1 text-xs text-white/50 uppercase tracking-widest">Years Celebrated</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020]/60 p-5 backdrop-blur-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                <Eye className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">1.4K</p>
              <p className="mt-1 text-xs text-white/50 uppercase tracking-widest">Visitors Today</p>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          9) CALL TO ACTION SECTION
         ========================================== */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-violet-500/20 bg-gradient-to-b from-violet-950/40 via-[#0B1020] to-[#050816] p-10 text-center shadow-[0_0_60px_rgba(124,58,237,0.15)] backdrop-blur-3xl sm:p-16"
        >
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-48 w-96 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Celebrate this moment with me
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              Leave a wish, explore memories, or join the celebration.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#write-wish"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-sm font-medium text-white shadow-[0_0_35px_rgba(124,58,237,0.4)] transition hover:scale-[1.02] sm:w-auto"
              >
                <Heart className="h-4 w-4" />
                Send Wish
              </a>
              <a
                href="#memories"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/10 sm:w-auto"
              >
                Open Gallery
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          10) FOOTER
         ========================================== */}
      <footer className="relative border-t border-white/10 bg-[#03050D] py-10 text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:px-10 lg:px-16">
          
          <div>
            <p className="text-base font-semibold text-white">Abdus Subhan Allauddin</p>
            <p className="mt-1 text-xs text-white/40">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="text-center text-xs text-white/40">
            Built with <span className="text-violet-400 font-medium">Next.js</span>,{" "}
            <span className="text-cyan-400 font-medium">Prisma</span> &{" "}
            <span className="text-emerald-400 font-medium">MongoDB</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/70 transition hover:border-white/20 hover:text-white"
            >
             
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/70 transition hover:border-white/20 hover:text-white"
            >
              
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
