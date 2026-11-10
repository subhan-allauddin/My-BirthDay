"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Cake,
  ChevronDown,
  ChevronUp,
  Clock,
  Heart,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";
import InputWishModal from "./InputWishModal";
import { useBirthdayCountdown } from "@/lib/useBirthdayCountdown";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

type MilestoneTab = "15th" | "16th";

const INITIAL_VISIBLE_WISHES = 6;
const WISHES_PAGE_SIZE = 6;

function extractWishes(payload: unknown): Wish[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const obj = payload as { wishes?: unknown; data?: unknown };
    if (Array.isArray(obj.data)) return obj.data as Wish[];
    if (Array.isArray(obj.wishes)) return obj.wishes as Wish[];
  }
  return [];
}

async function fetchApprovedWishes(signal?: AbortSignal): Promise<Wish[]> {
  const res = await fetch("/api/wishes", {
    signal,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Status ${res.status}`);
  }

  const data = await res.json();
  return extractWishes(data);
}

function getWishMilestone(createdAt: string): MilestoneTab {
  const year = new Date(createdAt).getFullYear();
  return year >= 2027 ? "16th" : "15th";
}

export default function WishesSection() {
  const countdown = useBirthdayCountdown();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MilestoneTab>("15th");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_WISHES);

  const refreshWishes = useCallback(async () => {
    setRefreshing(true);
    setFetchError(null);
    try {
      const items = await fetchApprovedWishes();
      setWishes(items);
    } catch (error) {
      console.error("Error fetching wishes:", error);
      setFetchError("Could not load wishes right now.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchApprovedWishes(controller.signal)
      .then((items) => {
        setFetchError(null);
        setWishes(items);
      })
      .catch((error) => {
        if ((error as { name?: string })?.name === "AbortError") return;
        console.error("Error fetching wishes:", error);
        setFetchError("Could not load wishes right now.");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const handleRefresh = () => {
    void refreshWishes();
  };

  // Deduplicate exact repeated submissions while keeping all distinct wishes (newest first)
  const uniqueWishes = useMemo(() => {
    const seen = new Set<string>();
    return wishes.filter((wish) => {
      const key = `${wish.name.trim().toLowerCase()}::${wish.message
        .trim()
        .toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [wishes]);

  const wishes15th = useMemo(
    () => uniqueWishes.filter((w) => getWishMilestone(w.createdAt) === "15th"),
    [uniqueWishes]
  );

  const wishes16th = useMemo(
    () => uniqueWishes.filter((w) => getWishMilestone(w.createdAt) === "16th"),
    [uniqueWishes]
  );

  const activeWishes = activeTab === "15th" ? wishes15th : wishes16th;
  const displayedWishes = activeWishes.slice(0, visibleCount);
  const remainingCount = Math.max(activeWishes.length - displayedWishes.length, 0);
  const hasMore = remainingCount > 0;
  const isExpanded = visibleCount > INITIAL_VISIBLE_WISHES && activeWishes.length > INITIAL_VISIBLE_WISHES;

  const handleTabChange = (tab: MilestoneTab) => {
    setActiveTab(tab);
    setVisibleCount(INITIAL_VISIBLE_WISHES);
  };

  return (
    <section
      id="wishes"
      className="scroll-mt-24 relative w-full bg-[#050816] py-16 sm:py-20 text-white overflow-hidden"
    >
      <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-4 py-1.5 text-xs text-fuchsia-300 backdrop-blur-xl">
            <Heart className="h-3.5 w-3.5 text-pink-400" />
            15th Birthday Archive & 16th Upcoming
          </div>

          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Birthday Wishes
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-white/60 max-w-xl mx-auto">
            Heartfelt wishes from turning 15 on 28 July 2026 — and an upcoming
            wall ready for turning 16 on 28 July 2027.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition cursor-pointer"
            >
              <Send className="h-4 w-4" />
              Write a Wish
            </motion.button>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              aria-label="Refresh wishes"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          {/* Milestone Switcher Tabs */}
          <div className="mt-8 inline-flex flex-wrap justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => handleTabChange("15th")}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "15th"
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {activeTab === "15th" && (
                <motion.span
                  layoutId="wishes-milestone-pill"
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 shadow-md"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Cake className="h-3.5 w-3.5" />
                <span>15th Birthday (2026)</span>
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold tabular-nums">
                  {loading ? "…" : wishes15th.length}
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("16th")}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "16th"
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {activeTab === "16th" && (
                <motion.span
                  layoutId="wishes-milestone-pill"
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600/80 to-violet-600/80 shadow-md"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                <span>16th Birthday (2027)</span>
                <span className="rounded-full border border-cyan-300/30 bg-cyan-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                  {wishes16th.length > 0 ? wishes16th.length : "Soon"}
                </span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Coming Soon Banner visible on 15th Birthday view */}
        {activeTab === "15th" && !loading && !fetchError && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-violet-600/10 via-fuchsia-500/10 to-cyan-500/10 px-5 py-4 backdrop-blur-xl"
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/15 text-cyan-300 shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  16th Birthday Wishes • Coming Soon (28 July 2027)
                </p>
                <p className="mt-0.5 text-xs text-white/65">
                  Showing all{" "}
                  <span className="font-semibold text-violet-300">
                    {wishes15th.length} wishes
                  </span>{" "}
                  from turning 15.{" "}
                  {countdown
                    ? `${countdown.days} days left until turning 16!`
                    : "New milestone unlocking soon."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleTabChange("16th")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-500/15 px-3.5 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/25 transition shrink-0 cursor-pointer"
            >
              <Clock className="h-3.5 w-3.5" />
              Preview 16th Wall
            </button>
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-44 rounded-2xl border border-white/10 bg-white/[0.03] p-6 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-white/10" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-28 rounded bg-white/10" />
                    <div className="h-2.5 w-20 rounded bg-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="h-3 w-4/5 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : fetchError ? (
          <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <p className="text-sm text-white/70">{fetchError}</p>
            <button
              type="button"
              onClick={handleRefresh}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-violet-500/35 bg-violet-500/15 px-4 py-2 text-xs font-medium text-violet-200 hover:bg-violet-500/25 transition cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Try Again
            </button>
          </div>
        ) : activeTab === "16th" && wishes16th.length === 0 ? (
          <motion.div
            key="coming-soon-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto max-w-3xl rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-white/[0.05] to-cyan-500/[0.04] p-8 sm:p-10 text-center backdrop-blur-2xl shadow-2xl"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/15 text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <Cake className="h-7 w-7" />
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-200">
              Coming Soon • 28 July 2027
            </span>

            <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
              16th Birthday Wishes
            </h3>

            <p className="mt-2.5 text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
              This wall will unlock for Abdus Subhan&apos;s 16th birthday on{" "}
              <span className="text-cyan-300 font-semibold">28 July 2027</span>.
              In the meantime, enjoy all {wishes15th.length} memories from his
              15th birthday!
            </p>

            {countdown && (
              <div className="mt-6 grid grid-cols-4 gap-2.5 max-w-md mx-auto">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hrs", value: countdown.hours },
                  { label: "Min", value: countdown.minutes },
                  { label: "Sec", value: countdown.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="rounded-xl border border-white/10 bg-[#0B1020]/70 py-2.5 px-2"
                  >
                    <p className="text-lg sm:text-xl font-bold text-white tabular-nums">
                      {String(unit.value).padStart(2, "0")}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-white/50">
                      {unit.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleTabChange("15th")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-white/10 transition cursor-pointer"
              >
                <Heart className="h-4 w-4 text-pink-400" />
                View 15th Birthday Wishes ({wishes15th.length})
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:scale-[1.02] transition cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Write a Wish
              </button>
            </div>
          </motion.div>
        ) : activeWishes.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/60">
            No approved wishes yet. Be the first one to leave a birthday wish!
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {displayedWishes.map((wish, index) => (
                  <motion.div
                    layout
                    key={wish.id || index}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min((index % WISHES_PAGE_SIZE) * 0.05, 0.25),
                    }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl flex flex-col justify-between hover:border-violet-500/35 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold text-white shadow-md shrink-0">
                            {wish.name.trim().charAt(0).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-white truncate">
                              {wish.name}
                            </h4>
                            <p className="text-[11px] text-white/45">
                              {new Date(wish.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-300 shrink-0">
                          {activeTab === "15th" ? "15th B'day" : "16th B'day"}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-white/80 italic">
                        “{wish.message}”
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Show More / Show Less Controls */}
            {activeWishes.length > INITIAL_VISIBLE_WISHES && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <p className="text-xs text-white/50 tabular-nums">
                  Showing {displayedWishes.length} of {activeWishes.length}{" "}
                  wishes
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {hasMore && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setVisibleCount((prev) => prev + WISHES_PAGE_SIZE)
                      }
                      className="inline-flex items-center gap-2 rounded-2xl border border-violet-500/35 bg-violet-500/15 px-6 py-3 text-xs sm:text-sm font-semibold text-violet-200 hover:bg-violet-500/25 hover:text-white transition cursor-pointer"
                    >
                      <ChevronDown className="h-4 w-4" />
                      Show More Wishes ({remainingCount} left)
                    </motion.button>
                  )}

                  {isExpanded && (
                    <button
                      type="button"
                      onClick={() => setVisibleCount(INITIAL_VISIBLE_WISHES)}
                      className="inline-flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-xs sm:text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white transition cursor-pointer"
                    >
                      <ChevronUp className="h-4 w-4" />
                      Show Less
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <InputWishModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          void refreshWishes();
        }}
      />
    </section>
  );
}
