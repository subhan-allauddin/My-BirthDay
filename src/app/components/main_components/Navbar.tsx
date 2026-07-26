"use client";

export default function Navbar() {
  const handleOpenNewPage = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#050816]/70 border-b border-white/10 backdrop-blur-md"
      style={{
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo and Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <span className="text-sm font-bold text-white">ASA</span>
          </div>
          <span className="text-sm font-medium text-white hidden sm:inline">
            Abdus Subhan Allauddin
          </span>
        </div>

        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            Home
          </a>

          <a
            href="#journey"
            onClick={(e) => handleScroll(e, "journey")}
            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            Coding Journey
          </a>

          <a
            href="#projects"
            onClick={(e) => handleScroll(e, "projects")}
            className="text-sm text-white/70 hover:text-white transition-colors duration-200 hidden md:inline"
          >
            Projects
          </a>

          <a
            href="#wishes"
            onClick={(e) => handleScroll(e, "wishes")}
            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            Wishes
          </a>

          <button
            type="button"
            onClick={() =>
              handleOpenNewPage("https://portfolio-weld-mu-79.vercel.app")
            }
            className="text-sm px-4 py-2 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-200 cursor-pointer"
          >
            Portfolio
          </button>
        </div>
      </div>
    </nav>
  );
}