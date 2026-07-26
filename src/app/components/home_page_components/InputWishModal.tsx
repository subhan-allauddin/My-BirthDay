"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, Send, User, MessageSquareQuote } from "lucide-react";

interface InputWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWishCreated?: (newWish: any) => void;
}

export default function InputWishModal({
  isOpen,
  onClose,
  onWishCreated,
}: InputWishModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to post wish");
      }

      setIsSubmitted(true);

      // Trigger callback to update the UI immediately
      if (onWishCreated) {
        onWishCreated(resData.data);
      }

      // Reset form and close modal
      setTimeout(() => {
        setName("");
        setMessage("");
        setIsSubmitted(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  Wish Saved to Database!
                </h3>
                <p className="mt-1 text-xs text-white/60">
                  Thank you for bringing joy to this celebration! ✨
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