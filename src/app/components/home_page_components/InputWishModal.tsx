"use client";

import { useState } from "react";
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
  const [isSubmitted, setIsSubmitted] = useState(false); // Ye zaroori tha
  const [error, setError] = useState<string | null>(null); // Ye bhi zaroori tha

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Puraane errors clear karne ke liye

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (res.ok) {
        // Success Toast
        toast.success(
          "Your wish is going to pending! ⏳ It will be visible after review.",
          {
            duration: 5000,
            style: {
              background: "#333",
              color: "#fff",
              border: "1px solid #a855f7",
            },
            icon: "💌",
          },
        );

        setIsSubmitted(true); // Success screen dikhane ke liye
        
        // Form clear karein
        setName("");
        setMessage("");

        // 2 second baad modal khud band ho jayega taake user success animation dekh sake
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 2000);

      } else {
        setError("Failed to submit wish. Please try again.");
        toast.error("Failed to submit wish. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please check your connection.");
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.2rem] border border-violet-500/20 bg-[#0B1020]/95 p-6 text-white shadow-[0_0_50px_rgba(124,58,237,0.25)] backdrop-blur-2xl sm:p-8"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-600/20 blur-3xl" />

            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 text-xs text-violet-300">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                Spread the love
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Leave a Wish
              </h2>
              <p className="mt-1 text-xs text-white/60">
                Your message will be saved and displayed on the wall.
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
                  Wish Saved!
                </h3>
                <p className="mt-1 text-xs text-white/60">
                  Thank you! Your wish will be visible after review. ✨
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                    {error}
                  </div>
                )}

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-white/80">
                    <User className="h-3.5 w-3.5 text-violet-400" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-white/80">
                    <MessageSquareQuote className="h-3.5 w-3.5 text-violet-400" />
                    Your Wish / Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your heartfelt wish here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-violet-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/3 rounded-2xl border border-white/10 bg-white/5 py-3 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-2/3 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-xs font-medium text-white shadow-[0_0_25px_rgba(124,58,237,0.35)] transition hover:scale-[1.02] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Saving..."
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Publish Wish
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