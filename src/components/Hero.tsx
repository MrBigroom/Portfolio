"use client";

import { motion, type Variants } from "framer-motion";
import Darksign from "@/components/ui/Darksign";
import { Corner, SignMark } from "@/components/ui/Ornament";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const lineVariant: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
};

const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.35 } },
};

const meta = [
  { label: "Index", value: "001 / Portfolio" },
  { label: "Location", value: "Malaysia (UTC+8)" },
  { label: "Discipline", value: "Applied AI / Platform" },
  { label: "Status", value: "Open to AI Platform Engineer roles", live: true },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-12 pt-24 md:px-12 md:pb-10 md:pt-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 top-0 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(177,196,205,0.09),transparent_68%)]" />
        <div className="absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(134,146,156,0.07),transparent_70%)]" />
        <div className="absolute inset-x-6 top-24 h-px bg-gradient-to-r from-transparent via-steel-700/30 to-transparent md:inset-x-12" />
      </div>

      {/* The mark, and the only fire left on the page. */}
      <div className="pointer-events-none absolute right-[-6%] top-1/2 hidden h-[30rem] w-[30rem] -translate-y-1/2 opacity-95 md:block lg:right-[0%] lg:h-[32rem] lg:w-[32rem]">
        <Darksign className="h-full w-full" />
      </div>

      <Corner className="pointer-events-none absolute left-5 top-28 hidden h-11 w-11 opacity-35 md:left-8 md:block" />
      <Corner className="pointer-events-none absolute right-5 top-28 hidden h-11 w-11 opacity-35 [transform:scaleX(-1)] md:right-8 md:block" />
      <Corner className="pointer-events-none absolute bottom-6 left-5 hidden h-11 w-11 opacity-25 [transform:scaleY(-1)] md:left-8 md:block" />
      <Corner className="pointer-events-none absolute bottom-6 right-5 hidden h-11 w-11 opacity-25 [transform:scale(-1)] md:right-8 md:block" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative grid grid-cols-2 gap-x-6 gap-y-6 border-b border-steel-700/20 pb-6 md:grid-cols-4"
      >
        {meta.map((entry) => (
          <motion.div key={entry.label} variants={item}>
            <div className="engraved text-[9px] text-bone-300/70">
              {entry.label}
            </div>
            <div className="mt-2 text-sm text-bone-100 md:text-[0.95rem]">
              {entry.live ? (
                <span className="inline-flex items-start gap-2 text-ember-200">
                  <span className="mt-[0.45em] h-1.5 w-1.5 animate-pulse rounded-full bg-ember-400" />
                  {entry.value}
                </span>
              ) : (
                entry.value
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative mt-10 md:mt-10">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4"
        >
          <span className="display text-[10px] tracking-[0.3em] text-ember-300">
            I
          </span>
          <span aria-hidden className="h-px w-12 bg-steel-700/60" />
          <span className="engraved text-[10px] text-bone-200">
            Bear the Mark
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={headlineContainer}
          className="display mt-7 text-[11vw] leading-[0.94] text-bone-50 sm:text-[9vw] md:mt-8 lg:text-[5.7vw]"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={lineVariant} className="block">
              Software,
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              variants={lineVariant}
              className="display-italic ember-text block"
            >
              intelligence
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={lineVariant} className="block">
              &amp; the seams
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={lineVariant} className="block">
              between them.
            </motion.span>
          </span>
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-10 md:mt-6"
      >
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-bone-100 md:text-xl">
            I&rsquo;m <span className="text-ember-200">Chan Yu Xuan</span> — a
            final-year IT student, four months into building AI systems that
            actually ship: render orchestration for a livestreaming platform at{" "}
            <span className="text-steel-300">SNS Network</span>, local inference
            squeezed onto an 8 GB card, and the harnesses that keep the loop
            honest.
          </p>

          <a
            href="#work"
            className="group mt-7 inline-flex items-center gap-4 border border-steel-700/40 px-5 py-3 transition-colors duration-500 hover:border-ember-400/70 hover:bg-ember-400/[0.06]"
          >
            <SignMark className="h-3.5 w-3.5 text-ember-400 transition-transform duration-500 group-hover:scale-110" />
            <span className="engraved text-[10px] text-bone-200 transition-colors group-hover:text-ember-200">
              Kindle the flame
            </span>
            <span className="text-ember-300 transition-transform duration-500 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </motion.div>

      {/* On a phone the mark gets its own ground rather than sitting under
          the copy. */}
      <div className="relative mt-10 flex justify-center md:hidden">
        <div className="h-[15rem] w-[15rem]">
          <Darksign className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}