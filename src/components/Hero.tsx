"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen px-6 md:px-12 pt-32 md:pt-40 pb-20 flex flex-col justify-between overflow-hidden">
      {/* Backdrop atmosphere */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-magenta/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-lime/5 blur-[100px]" />
      </div>

      {/* Top metadata strip */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mono text-[10px] uppercase tracking-[0.2em] text-bone-300"
      >
        <motion.div variants={item}>
          <span className="block text-bone-300/60">Index</span>
          <span className="text-bone-50">001 / Portfolio</span>
        </motion.div>
        <motion.div variants={item}>
          <span className="block text-bone-300/60">Location</span>
          <span className="text-bone-50">Malaysia (UTC+8)</span>
        </motion.div>
        <motion.div variants={item}>
          <span className="block text-bone-300/60">Discipline</span>
          <span className="text-bone-50">Full-stack / AI</span>
        </motion.div>
        <motion.div variants={item}>
          <span className="block text-bone-300/60">Status</span>
          <span className="text-lime">● Open to internships</span>
        </motion.div>
      </motion.div>

      {/* Main headline */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-20 md:mt-32"
      >
        <motion.div variants={item} className="mono text-xs uppercase tracking-[0.3em] text-bone-300 mb-6">
          — A portfolio
        </motion.div>

        <h1 className="display text-[14vw] md:text-[10vw] leading-[0.85] font-light">
          <motion.span variants={item} className="block">
            Software,
          </motion.span>
          <motion.span variants={item} className="block">
            <span className="display-italic gradient-text font-normal">intelligence</span>
          </motion.span>
          <motion.span variants={item} className="block">
            &amp; the seams
          </motion.span>
          <motion.span variants={item} className="block">
            between them.
          </motion.span>
        </h1>
      </motion.div>

      {/* Footer of hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
      >
        <div className="md:col-span-7">
          <p className="text-lg md:text-xl text-bone-100 max-w-2xl leading-relaxed">
            I'm <span className="text-lime">Chan Yu Xuan</span> - a Bachelor of IT student at Quest
            International University, building full-stack apps that integrate machine
            learning, computer vision and LLMs into actually-useful products.
          </p>
        </div>
        <div className="md:col-span-3 md:col-start-10">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 mono text-xs uppercase tracking-[0.2em] border-b border-bone-50 pb-1"
          >
            <span>Browse work</span>
            <span className="transition-transform group-hover:translate-y-1">↓</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
