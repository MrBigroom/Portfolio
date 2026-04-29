"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative px-6 md:px-12 py-32 md:py-48">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Section label */}
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mono text-xs uppercase tracking-[0.3em] text-bone-300 sticky top-32"
          >
            <span className="block text-lime mb-2">§ 02</span>
            About
          </motion.div>
        </div>

        {/* Content */}
        <div className="md:col-span-9">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="display text-4xl md:text-6xl leading-[1.05]">
              I build at the intersection of <span className="display-italic text-lime">full-stack engineering</span> and <span className="display-italic text-magenta">applied AI</span>.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg leading-relaxed text-bone-100">
              <p>
                My work usually involves shipping a real product end-to-end, from designing
                the database, writing the backend, building the interface, and then
                threading machine learning or LLMs through it where they actually add
                value, not just for the demo.
              </p>
              <p>
                Recent work spans a finance app with a Python ML microservice for
                transaction categorization, a Flutter app with on-device pose detection,
                and an LLM-powered Discord bot built on Gemini. I care about clean
                architecture, honest evaluation and the boring parts that make a system
                actually work.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-bone-50/10">
              {[
                { num: "5+", label: "Shipped projects" },
                { num: "6", label: "Languages" },
                { num: "∞", label: "Open tabs" },
                { num: "2026", label: "Graduating" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="display text-5xl md:text-6xl gradient-text mb-2">
                    {stat.num}
                  </div>
                  <div className="mono text-[10px] uppercase tracking-[0.2em] text-bone-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
