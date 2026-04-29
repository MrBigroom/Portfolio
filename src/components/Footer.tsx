export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-6 md:px-12 py-12 border-t border-bone-50/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mono text-[10px] uppercase tracking-[0.3em] text-bone-300">
        <div>
          <span className="block text-bone-300/60 mb-1">©</span>
          <span className="text-bone-50">{year} Chan</span>
        </div>
        <div>
          <span className="block text-bone-300/60 mb-1">Built with</span>
          <span className="text-bone-50">Next.js, Tailwind, ☕</span>
        </div>
        <div>
          <span className="block text-bone-300/60 mb-1">Last updated</span>
          <span className="text-bone-50">{year}</span>
        </div>
        <div className="text-right">
          <span className="block text-bone-300/60 mb-1">EOF</span>
          <span className="text-lime">●</span>
        </div>
      </div>
    </footer>
  );
}
