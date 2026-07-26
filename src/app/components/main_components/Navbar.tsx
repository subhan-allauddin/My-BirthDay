"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleOpenNewPage = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const navLinks = [
    { name: "Home", id: "" },
    { name: "Coding Journey", id: "journey" },
    { name: "Projects", id: "projects" },
    { name: "Wishes", id: "wishes" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#050816]/70 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo & Name */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-8 h-8 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20 shrink-0"
          >
            <span className="text-sm font-bold text-white">ASA</span>
          </motion.div>

          {/* Name now remains visible on mobile */}
          <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">
            Abdus Subhan Allauddin
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={i}
              href="#"
              onClick={(e) =>
                link.id
                  ? handleScroll(e, link.id)
                  : window.scrollTo({ top: 0, behavior: "smooth" })
              }
              whileHover={{ y: -2 }}
              className="relative text-sm text-white/70 hover:text-white transition"
            >
              {link.name}

              {/* Animated underline */}
              <motion.span
                layoutId="underline"
                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-violet-500 group-hover:w-full transition-all duration-300"
              />
            </motion.a>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleOpenNewPage("https://portfolio-weld-mu-79.vercel.app")
            }
            className="text-sm px-4 py-2 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition"
          >
            Portfolio
          </motion.button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[2px] bg-white"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-[2px] bg-white"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[2px] bg-white"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pb-6 flex flex-col gap-5 bg-[#050816]/95 backdrop-blur-lg border-t border-white/10"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={i}
                whileHover={{ x: 5 }}
                href="#"
                onClick={(e) =>
                  link.id
                    ? handleScroll(e, link.id)
                    : window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="text-white/80 text-sm mt-4"
              >
                {link.name}
              </motion.a>
            ))}

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                handleOpenNewPage(
                  "https://portfolio-weld-mu-79.vercel.app"
                )
              }
              className="text-sm px-4 py-2 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300"
            >
              Portfolio
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}