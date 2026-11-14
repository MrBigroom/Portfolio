"use client";

import { motion } from "framer-motion";
import { FlameMark } from "@/components/ui/Ornament";

type SectionLabelProps = {
  numeral: string;
  chapter: string;
  className?: string;
  sticky?: boolean;
};

export default function SectionLabel({
  numeral,
  chapter,
  className = "",
  sticky = true,
}: SectionLabelProps) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`select-none ${sticky ? "md:sticky md:top-32" : ""} ${className}`}
    >
      <div className="flex items-center gap-3">
        <FlameMark className="h-3.5 w-3.5 text-ember-400" />
        <span className="display text-xs tracking-[0.3em] text-ember-300">
          {numeral}
        </span>
        <span aria-hidden className="h-px w-8 bg-brass-500/50" />
      </div>
      <div className="engraved mt-3 text-bone-200">{chapter}</div>
    </motion.div>
  );
}
