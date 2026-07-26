import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md "
      style={{
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo and Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
            <span className="text-sm font-semibold text-slate-900">ASA</span>
          </div>
          <span className="text-sm font-medium text-white hidden sm:inline">
             Abdus Subhan Allauddin
          </span>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/memories"
            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            Memories
          </Link>
          <Link
            href="/wishes"
            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            Wishes
          </Link>
          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded-md border border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40 transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}