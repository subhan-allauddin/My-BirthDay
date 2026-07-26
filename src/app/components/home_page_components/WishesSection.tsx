"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, MessageSquare, Calendar, Eye } from "lucide-react";
import InputWishModal from "../../../pages/InputWishModal";

interface WishItem {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function WishesSection() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch initial wishes from backend API
  const fetchWishes = async () => {
    try {
      const response = await fetch("/api/wishes");
      const data = await response.json();
      if (data.success) {
        setWishes(data.data);
      }
    } catch (error) {
      console.error("Error fetching wishes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
              Heartfelt messages from friends, family, and supporters.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(124,58,237,0.3)] transition hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(124,58,237,0.45)]"
          >
            <Heart className="h-4 w-4 fill-white/20" />
            Write a Wish
          </button>
        </div>

        {/* Wishes Grid */}
        {loading ? (
          <div className="text-center py-12 text-white/50">Loading wishes...</div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-12 text-white/40 border border-dashed border-white/10 rounded-2xl">
            No wishes yet. Be the first to leave one! ✨
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="relative flex flex-col justify-between rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]"
              >
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-violet-600/10 blur-2xl" />

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/20 font-semibold text-violet-200">
                        {wish.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {wish.name}
                        </h3>
                        <p className="text-xs text-white/40">
                          {formatDate(wish.createdAt)}
                        </p>
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
                  Verified Wish
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ==========================================
          STATS SECTION
         ========================================== */}
      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="rounded-[2.2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/2 p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-[#0B1020]/60 p-5 backdrop-blur-xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
                <MessageSquare className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {wishes.length}
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

      {/* Input Wish Modal Component */}
      <InputWishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onWishCreated={(newWish) => {
          setWishes((prev) => [newWish, ...prev]);
        }}
      />
    </section>
  );
}