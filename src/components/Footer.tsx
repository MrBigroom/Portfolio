import { Seal } from "@/components/ui/Ornament";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-brass-700/25 px-6 py-12 md:px-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-brass-700/15 pb-6">
        <p className="display-italic text-lg text-bone-200/80">
          As the fire fades, the ashen one rises.
        </p>
        <Seal className="h-10 w-10 opacity-60" />
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <span className="engraved block text-[8px] text-bone-300/60">©</span>
          <span className="mono mt-1.5 block text-xs text-bone-100">
            {year} Chan
          </span>
        </div>
        <div>
          <span className="engraved block text-[8px] text-bone-300/60">
            Built with
          </span>
          <span className="mono mt-1.5 block text-xs text-bone-100">
            Next.js · Tailwind · ☕
          </span>
        </div>
        <div>
          <span className="engraved block text-[8px] text-bone-300/60">
            Last linked
          </span>
          <span className="mono mt-1.5 block text-xs text-bone-100">
            {year}
          </span>
        </div>
        <div className="flex items-start justify-end gap-3">
          <div className="text-right">
            <span className="engraved block text-[8px] text-bone-300/60">
              The fire fades
            </span>
            <span className="display mt-1 block text-sm tracking-[0.3em] text-ember-300">
              ✦
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
