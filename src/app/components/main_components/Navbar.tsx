"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Menu, X } from "lucide-react";
import { PROFILE } from "@/data/profile";

const NAV_LINKS = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Coding Journey", id: "journey" },
  { name: "Projects", id: "projects" },
  { name: "Wishes", id: "wishes" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateActiveOnScroll = () => {
      setScrolled(window.scrollY > 24);

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;
      if (atBottom) {
        setActiveId(NAV_LINKS[NAV_LINKS.length - 1].id);
        return;
      }

      const offset = 160;
      let current = NAV_LINKS[0].id;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = link.id;
        }
      }
      setActiveId(current);
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveOnScroll();
        ticking = false;
      });
    };

    updateActiveOnScroll();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveId(id);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050816]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          : "bg-[#050816]/55 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo & Name */}
        <button
          type="button"
          onClick={(e) => handleScroll(e, "home")}
          className="flex items-center gap-3 cursor-pointer text-left group"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25 shrink-0"
          >
            <span className="text-xs font-bold tracking-wider text-white">
              {PROFILE.initials}
            </span>
          </motion.div>

          <div className="min-w-0">
            <span className="block text-xs sm:text-sm font-semibold text-white truncate">
              {PROFILE.fullName}
            </span>
            <span className="hidden sm:block text-[11px] text-white/45 truncate">
              {PROFILE.birthDate.dayMonth} • Karachi
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] px-2 py-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-xl transition-colors ${
                  isActive ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-white/10 border border-white/10"
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          <motion.a
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            href={PROFILE.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl border border-violet-500/35 bg-violet-500/15 text-violet-200 hover:bg-violet-500/25 transition"
          >
            Portfolio
            <ExternalLink className="h-3.5 w-3.5" />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10 transition"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#050816]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-5 py-4 flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleScroll(e, link.id)}
                    className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-violet-500/15 text-white border border-violet-500/25"
                        : "text-white/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <a
                href={PROFILE.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border border-violet-500/35 bg-violet-500/15 text-violet-200"
              >
                Visit Full Portfolio
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
