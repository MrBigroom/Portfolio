"use client";

import { motion } from "framer-motion";
import {
  fitStrategies,
  labHardware,
  labIntro,
  labMeasured,
  models,
} from "@/data/models";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8 },
};

export default function InferenceLab() {
  return (
    <section
      id="lab"
      className="relative px-6 md:px-12 py-32 md:py-48 bg-ink-900 border-y border-bone-50/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Section label */}
        <div className="md:col-span-3">
          <div className="mono text-xs uppercase tracking-[0.3em] text-bone-300 sticky top-32">
            <span className="block text-lime mb-2">§ 04</span>
            {labIntro.eyebrow}
          </div>
        </div>

        <div className="md:col-span-9">
          <motion.h2
            {...fade}
            className="display text-4xl md:text-6xl leading-[1.05] mb-8"
          >
            {labIntro.headline} <br />
            <span className="display-italic gradient-text">
              {labIntro.headlineItalic}
            </span>
          </motion.h2>

          <motion.p
            {...fade}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl leading-relaxed text-bone-100 max-w-3xl mb-16 md:mb-20"
          >
            {labIntro.lead}
          </motion.p>

          {/* Fit strategies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bone-50/10 mb-16 md:mb-20">
            {fitStrategies.map((s, i) => (
              <motion.div
                key={s.title}
                {...fade}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-ink-900 p-6 md:p-8"
              >
                <div className="mono text-[10px] uppercase tracking-[0.25em] text-lime mb-4">
                  0{i + 1}
                </div>
                <h3 className="display-italic text-2xl mb-4">{s.title}</h3>
                <p className="text-sm leading-relaxed text-bone-200">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Model table */}
          <motion.div {...fade} className="mb-16 md:mb-20">
            <div className="mono text-[10px] uppercase tracking-[0.25em] text-bone-300 mb-6">
              On disk
            </div>

            {/* Header — desktop only */}
            <div className="hidden lg:grid grid-cols-12 gap-4 pb-3 border-b border-bone-50/20 mono text-[10px] uppercase tracking-[0.2em] text-bone-300">
              <div className="col-span-4">Model</div>
              <div className="col-span-2">Task</div>
              <div className="col-span-2">Quant</div>
              <div className="col-span-1">Size</div>
              <div className="col-span-3">How it fits</div>
            </div>

            {models.map((m) => (
              <div
                key={m.name}
                className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 gap-y-1 py-4 md:py-5 border-b border-bone-50/10 lg:items-baseline"
              >
                <div className="md:col-span-4">
                  <span className="lg:hidden mono text-[10px] uppercase tracking-[0.2em] text-bone-300/60 block mb-1">
                    Model
                  </span>
                  <span className="text-base md:text-lg text-bone-50">
                    {m.name}
                  </span>
                </div>

                <div className="md:col-span-2">
                  <span className="lg:hidden mono text-[10px] uppercase tracking-[0.2em] text-bone-300/60">
                    Task{" "}
                  </span>
                  <span className="mono text-xs text-bone-200">{m.task}</span>
                </div>

                <div className="md:col-span-2">
                  <span className="lg:hidden mono text-[10px] uppercase tracking-[0.2em] text-bone-300/60">
                    Quant{" "}
                  </span>
                  <span className="mono text-xs text-lime">{m.quant}</span>
                </div>

                <div className="md:col-span-1">
                  <span className="lg:hidden mono text-[10px] uppercase tracking-[0.2em] text-bone-300/60">
                    Size{" "}
                  </span>
                  <span className="mono text-xs text-bone-200">{m.size}</span>
                </div>

                <div className="md:col-span-3">
                  <span className="lg:hidden mono text-[10px] uppercase tracking-[0.2em] text-bone-300/60">
                    Fit{" "}
                  </span>
                  <span className="text-sm text-bone-200 leading-relaxed">
                    {m.fit}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Measured numbers */}
          <motion.div
            {...fade}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 border-y border-bone-50/10 mb-10"
          >
            {labMeasured.map((r) => (
              <div key={r.label}>
                <div className="display text-4xl md:text-5xl gradient-text mb-2">
                  {r.value}
                  <span className="mono text-sm text-bone-300 ml-2">
                    {r.unit}
                  </span>
                </div>
                <div className="mono text-[10px] uppercase tracking-[0.2em] text-bone-300">
                  {r.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Hardware strip */}
          <motion.div
            {...fade}
            className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5"
          >
            {labHardware.map((h) => (
              <div key={h.label}>
                <div className="mono text-[10px] uppercase tracking-[0.2em] text-bone-300/60 mb-1">
                  {h.label}
                </div>
                <div className="mono text-xs text-bone-100 leading-relaxed">
                  {h.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}