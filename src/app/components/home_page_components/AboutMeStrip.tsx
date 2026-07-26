"use client";

import { motion } from "framer-motion";

export default function AboutMeStrip() {
  return (
    <section className="w-full px-6 py-10 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-4xl"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 text-center shadow-2xl backdrop-blur-2xl sm:px-10 sm:py-12">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">
            About Me
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A little story behind this page
          </h2>

          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-base leading-8 text-white/65 sm:text-lg">
            <p>
              This section will be your personal space to introduce yourself in a
              simple and elegant way.
            </p>

            <p>
              You can write about your journey, your goals, your growth, or the
              reason this birthday website means something special to you.
            </p>

            <p className="text-white/80 italic">
              “Built to celebrate my birthday, my story, and the journey behind
              this year.”
            </p>
          </div>

          <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/55">
            You can replace this text later with your own words.
          </div>
        </div>
      </motion.div>
    </section>
  );
}