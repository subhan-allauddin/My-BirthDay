"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, MessageSquare, Calendar, Eye } from "lucide-react";
import { useState } from "react";
import InputWishModal from "../../../pages/InputWishModal";

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

export default function WishesSection() {
  // Demo login state - replace with your Auth session check
  const [isLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#050816] text-white">
      {/* ==========================================
          WISHES PREVIEW SECTION
         ========================================== */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
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

          <div className="flex flex-col items-start gap-2 sm:items-end">
            {/* Trigger Button inside your section */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(124,58,237,0.3)] transition hover:scale-[1.02]"
      >
        Write a Wish
      </button>

      {/* Input Wish Modal */}
      <InputWishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitWish={(newWish) => {
          console.log("New Wish Received:", newWish);
          // Insert database call or state update here
        }}
      />

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
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-violet-600/10 blur-2xl" />

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/20 font-semibold text-violet-200">
                      {wish.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {wish.name}
                      </h3>
                      <p className="text-xs text-white/40">{wish.time}</p>
                    </div>
                  </div>
                  <Heart className="h-4 w-4 text-pink-400/70" />
                </div>

                <p className="text-sm font-normal italic leading-relaxed text-white/80">
                  “{wish.message}”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 border-t border-white/5 pt-4 text-xs text-white/40">
                <Sparkles className="h-3 w-3 text-violet-400" />
                Verified Friend Wish
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ==========================================
          CELEBRATION STATS SECTION
         ========================================== */}
      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="rounded-[2.2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/2 p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-[#0B1020]/60 p-5 backdrop-blur-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
                <MessageSquare className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                128+
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
                Wishes Received
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020]/60 p-5 backdrop-blur-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                24+
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
                Memories Added
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020]/60 p-5 backdrop-blur-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300">
                <Calendar className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                20+
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
                Years Celebrated
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020]/60 p-5 backdrop-blur-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                <Eye className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                1.4K
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
                Visitors Today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          CALL TO ACTION SECTION
         ========================================== */}
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-violet-500/20 bg-gradient-to-b from-violet-950/40 via-[#0B1020] to-[#050816] p-10 text-center shadow-[0_0_60px_rgba(124,58,237,0.15)] backdrop-blur-3xl sm:p-16"
        >
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

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
      </div>
    </section>
  );
}