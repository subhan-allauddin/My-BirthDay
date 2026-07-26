"use client";

import { motion } from "framer-motion";
import { Camera, Heart, Star, Gift } from "lucide-react";

const memories = [
  {
    title: "Childhood",
    label: "Early moments",
    image: "/memories/childhood.jpg", // replace later
    icon: Heart,
  },
  {
    title: "Friends",
    label: "Good times",
    image: "/memories/friends.jpg", // replace later
    icon: Camera,
  },
  {
    title: "Achievement",
    label: "Proud moment",
    image: "/memories/achievement.jpg", // replace later
    icon: Star,
  },
  {
    title: "Birthday",
    label: "Special day",
    image: "/memories/birthday.jpg", // replace later
    icon: Gift,
  },
];

export default function MemoriesPreview() {
  return (
    <section id="memories" className="w-full px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">
            Memories
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Moments worth remembering
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            A small gallery preview that feels personal, warm, and premium.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {memories.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/25" />

                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white/85 backdrop-blur-md">
                    <Icon className="h-3.5 w-3.5 text-violet-300" />
                    {item.label}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">
                      A small memory card for your gallery preview.
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}