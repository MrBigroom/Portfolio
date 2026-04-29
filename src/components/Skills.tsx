"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/projects";

export default function Skills() {
  return (
    <section className="relative px-6 md:px-12 py-32 md:py-48 bg-ink-900 border-y border-bone-50/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <div className="mono text-xs uppercase tracking-[0.3em] text-bone-300 sticky top-32">
            <span className="block text-lime mb-2">§ 04</span>
            Toolkit
          </div>
        </div>
        <div className="md:col-span-9">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="display text-4xl md:text-6xl mb-16 leading-[1.05]"
          >
            What I reach for, <br />
            <span className="display-italic">and what I'm currently learning</span>.
          </motion.h2>

          <div className="space-y-12">
            {Object.entries(skills).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-8 border-b border-bone-50/10"
              >
                <div className="md:col-span-3">
                  <h3 className="display-italic text-2xl text-lime">{category}</h3>
                </div>
                <div className="md:col-span-9">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="text-xl md:text-2xl text-bone-100 hover:text-lime transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
