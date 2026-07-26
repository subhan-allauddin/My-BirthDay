export default function FooterSection() {
  return (
    <footer className="relative border-t border-white/10 bg-[#03050D] py-10 text-white/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:px-10 lg:px-16">
        <div>
          <p className="text-base font-semibold text-white">
            Abdus Subhan Allauddin
          </p>
          <p className="mt-1 text-xs text-white/40">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="text-center text-xs text-white/40">
          Built with{" "}
          <span className="font-medium text-violet-400">Next.js</span>,{" "}
          <span className="font-medium text-cyan-400">Prisma</span> &{" "}
          <span className="font-medium text-emerald-400">MongoDB</span>
        </div>
      </div>
    </footer>
  );
}