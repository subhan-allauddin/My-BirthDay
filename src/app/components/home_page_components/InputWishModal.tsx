"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  X,
  Send,
  User,
  MessageSquareQuote,
} from "lucide-react";
import toast from "react-hot-toast";
import { triggerConfetti } from "@/lib/confetti";

export default function InputWishModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsSubmitted(false);
    setError(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 60) {
      setError("Please enter your name (2–60 characters).");
      return;
    }

    if (trimmedMessage.length < 3 || trimmedMessage.length > 500) {
      setError("Please write a wish between 3 and 500 characters.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, message: trimmedMessage }),
      });

      const payload = await res.json().catch(() => null);

      if (res.ok) {
        toast.success(
          "Your wish has been submitted! It will appear on the wall after approval.",
          { duration: 5000 }
        );

        triggerConfetti();
        setIsSubmitted(true);
        setName("");
        setMessage("");
        window.dispatchEvent(new CustomEvent("wish-submitted"));

        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        closeTimerRef.current = setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        const msg =
          payload?.error || "Failed to submit wish. Please try again.";
        setError(msg);
        toast.error(msg);
      }
    } catch {
      const msg = "Network error. Please check your connection and try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wish-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-violet-500/25 bg-[#0B1020]/95 p-6 text-white shadow-[0_0_50px_rgba(124,58,237,0.28)] backdrop-blur-2xl sm:p-8"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-600/20 blur-3xl" />

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1 text-xs text-violet-300">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                Spread the love
              </div>
              <h2
                id="wish-modal-title"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Leave a Wish
              </h2>
              <p className="mt-1 text-xs text-white/60">
                Your wish is saved in MongoDB and published once approved.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                  <Heart className="h-8 w-8 fill-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Wish Received!
                </h3>
                <p className="mt-1.5 text-xs text-white/65 max-w-xs">
                  Thank you for celebrating with Abdus Subhan! It will appear on
                  the wishes wall right after review.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-xl border border-red-500/35 bg-red-500/10 p-3 text-xs text-red-300">
                    {error}
                  </div>
                )}

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <label
                      htmlFor="wish-name"
                      className="flex items-center gap-1.5 font-medium text-white/80"
                    >
                      <User className="h-3.5 w-3.5 text-violet-400" />
                      Your Name
                    </label>
                    <span className="text-[11px] text-white/40 tabular-nums">
                      {name.length}/60
                    </span>
                  </div>
                  <input
                    id="wish-name"
                    type="text"
                    required
                    maxLength={60}
                    placeholder="e.g. Hamza Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <label
                      htmlFor="wish-message"
                      className="flex items-center gap-1.5 font-medium text-white/80"
                    >
                      <MessageSquareQuote className="h-3.5 w-3.5 text-violet-400" />
                      Your Wish / Message
                    </label>
                    <span className="text-[11px] text-white/40 tabular-nums">
                      {message.length}/500
                    </span>
                  </div>
                  <textarea
                    id="wish-message"
                    required
                    rows={4}
                    maxLength={500}
                    placeholder="Write your heartfelt birthday wish here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-1/3 rounded-2xl border border-white/10 bg-white/5 py-3 text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-2/3 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-xs font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,0.35)] transition hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Send Wish
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
