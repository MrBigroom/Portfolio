"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 py-32 md:py-48 overflow-hidden"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] rounded-full bg-lime/5 blur-[120px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-magenta/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <div className="mono text-xs uppercase tracking-[0.3em] text-bone-300 mb-8">
          <span className="text-lime">§ 05</span> &mdash; Let's talk
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="display text-[12vw] md:text-[8vw] leading-[0.85] mb-12"
        >
          Got a project? <br />
          <span className="display-italic gradient-text">Let's build it.</span>
        </motion.h2>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          href="mailto:chanyuxuan21@gmail.com"
          className="inline-block display-italic text-3xl md:text-5xl text-lime hover:text-magenta transition-colors duration-500"
        >
          chanyuxuan21@gmail.com →
        </motion.a>

        {/* Social row */}
        <div className="mt-20 flex flex-wrap justify-center gap-6 md:gap-12 mono text-xs uppercase tracking-[0.3em]">
          <a href="https://github.com/MrBigroom" className="magnetic">GitHub ↗</a>
          <a href="https://linkedin.com/in/chan-yu-xuan-244a5a400" className="magnetic">LinkedIn ↗</a>
          <a href="mailto:chanyuxuan21@gmail.com" className="magnetic">Email ↗</a>
        </div>
      </motion.div>
    </section>
  );
}
