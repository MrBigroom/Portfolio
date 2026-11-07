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
              I build and operate the systems that put <span className="display-italic text-magenta">models</span> in front of <span className="display-italic text-lime">real users</span>.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg leading-relaxed text-bone-100">
              <p>
                Since July I've been the engineer behind one component of a livestream-commerce
                platform at SNS Network — the creator studio, the viewer, and the orchestration
                layer that turns a script into a rendered stream across seven GPU services. That
                means serving and selecting models, per-stage state and retries, and enough test
                coverage to change a pipeline stage without dreading Friday.
              </p>
              <p>
                Outside that, the work is mostly about the seams: an agent orchestration harness
                that coordinates coding models through artifacts instead of chat, a RAG booking
                agent running entirely on my laptop with no inbound ports, and a 124 GB model
                library served off one 8 GB card. I care about failure modes, honest evaluation,
                and the boring parts that let a system survive contact with users.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-bone-50/10">
              {[
                { num: "7", label: "GPU services orchestrated" },
                { num: "3,650", label: "Tests in that platform" },
                { num: "124 GB", label: "Of models served locally" },
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
