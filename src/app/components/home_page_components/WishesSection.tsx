"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare, Sparkles, Send } from "lucide-react";
import InputWishModal from "./InputWishModal";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Live Wishes Fetch function
const fetchWishes = async () => {
  try {
    setLoading(true);
    const res = await fetch("/api/wishes");
    if (res.ok) {
      const data = await res.json();
      console.log("API Response from /api/wishes:", data); // Check in Browser Console (F12)
      
      if (Array.isArray(data)) {
        setWishes(data);
      } else if (Array.isArray(data.wishes)) {
        setWishes(data.wishes);
      } else if (Array.isArray(data.data)) {
        // Kuch APIs response { data: [...] } format mein bhejti hain
        setWishes(data.data);
      } else {
        setWishes([]);
      }
    } else {
      setWishes([]);
    }
  } catch (error) {
    console.error("Error fetching wishes:", error);
    setWishes([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchWishes();
  }, []);

  return (
    <section id="wishes" className="relative w-full bg-[#050816] py-20 text-white overflow-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-1.5 text-xs text-fuchsia-300 backdrop-blur-xl">
            <Heart className="h-3.5 w-3.5 text-pink-400" />
            Warm Messages
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Birthday Wishes
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-md mx-auto">
            Messages and warm wishes left by friends, family, and colleagues.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.02] cursor-pointer"
          >
            <Send className="h-4 w-4" />
            Write a Wish
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-12 text-white/50">
            No wishes yet. Be the first one to leave a wish!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl flex flex-col justify-between hover:border-violet-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold text-white shadow-md">
                      {wish.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{wish.name}</h4>
                      <p className="text-[11px] text-white/40">
                        {new Date(wish.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-white/80 italic">
                    “{wish.message}”
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <InputWishModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchWishes(); 
        }}
      />
    </section>
  );
}