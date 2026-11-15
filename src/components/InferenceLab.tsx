"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import CountUp from "@/components/ui/CountUp";
import { SignMark } from "@/components/ui/Ornament";
import {
  fitStrategies,
  labHardware,
  labIntro,
  labMeasured,
  models,
} from "@/data/models";

const ROMAN = ["I", "II", "III"];
const LAYERS = 41;
const OFFLOADED = 35;

export default function InferenceLab() {
  return (
    <section
      id="lab"
      className="relative overflow-hidden border-y border-steel-700/25 bg-void-900/40 px-6 py-28 md:px-12 md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[32rem] w-[46rem] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(177,196,205,0.09),transparent_72%)] blur-2xl"
      />

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-3">
          <SectionLabel numeral="IV" chapter="The Kiln" />
        </div>

        <div className="md:col-span-9">
          <Reveal>
            <h2 className="display text-3xl leading-[1.06] text-bone-50 sm:text-4xl md:text-5xl lg:text-6xl">
              {labIntro.headline} <br />
              <span className="display-italic ember-text">
                {labIntro.headlineItalic}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-7 max-w-3xl text-[1.05rem] leading-relaxed text-bone-100 md:text-xl">
              {labIntro.lead}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-9 max-w-sm">
            <div className="flex items-baseline justify-between gap-4">
              <span className="engraved text-[9px] text-bone-300/70">
                One consumer card
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.15em] text-ember-300">
                8 GB
              </span>
            </div>
            <div className="relative mt-2 h-[3px] w-full overflow-hidden bg-void-600">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full origin-left bg-gradient-to-r from-ember-700 via-ember-400 to-ember-300"
              />
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {fitStrategies.map((strategy, index) => (
              <Reveal
                key={strategy.title}
                delay={index * 0.08}
                className="h-full"
              >
                <div className="item-card flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="display text-xs tracking-[0.3em] text-ember-300">
                      {ROMAN[index]}
                    </span>
                    <SignMark className="h-3 w-3 text-steel-500/60" />
                  </div>
                  <h3 className="display-italic mt-5 text-2xl text-bone-50">
                    {strategy.title}
                  </h3>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-bone-200">
                    {strategy.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="engraved text-[9px] text-bone-300/70">
                On disk
              </div>
              <div className="mono text-[10px] uppercase tracking-[0.15em] text-bone-300/60">
                124 GB · eight families
              </div>
            </div>

            <div className="mt-4 border-t border-steel-700/30">
              <div className="hidden grid-cols-12 gap-4 border-b border-steel-700/25 py-3 lg:grid">
                {[
                  { label: "Model", className: "col-span-4" },
                  { label: "Task", className: "col-span-2" },
                  { label: "Quant", className: "col-span-2" },
                  { label: "Size", className: "col-span-1" },
                  { label: "How it fits", className: "col-span-3" },
                ].map((column) => (
                  <div
                    key={column.label}
                    className={`engraved ${column.className} text-[8px] text-bone-300/70`}
                  >
                    {column.label}
                  </div>
                ))}
              </div>

              {models.map((model) => (
                <div
                  key={model.name}
                  className="grid grid-cols-1 gap-x-4 gap-y-1 border-b border-steel-700/15 py-4 transition-colors duration-300 hover:bg-ember-400/[0.03] lg:grid-cols-12 lg:items-baseline lg:border-l lg:border-l-transparent lg:pl-3 lg:hover:border-l-ember-500/60"
                >
                  <div className="lg:col-span-4">
                    <span className="mono mb-1 block text-[9px] uppercase tracking-[0.18em] text-bone-300/50 lg:hidden">
                      Model
                    </span>
                    <span className="text-base text-bone-50 md:text-lg">
                      {model.name}
                    </span>
                  </div>
                  <div className="lg:col-span-2">
                    <span className="mono mr-2 text-[9px] uppercase tracking-[0.18em] text-bone-300/50 lg:hidden">
                      Task
                    </span>
                    <span className="mono text-xs text-bone-200">
                      {model.task}
                    </span>
                  </div>
                  <div className="lg:col-span-2">
                    <span className="mono mr-2 text-[9px] uppercase tracking-[0.18em] text-bone-300/50 lg:hidden">
                      Quant
                    </span>
                    <span className="mono text-xs text-ember-300">
                      {model.quant}
                    </span>
                  </div>
                  <div className="lg:col-span-1">
                    <span className="mono mr-2 text-[9px] uppercase tracking-[0.18em] text-bone-300/50 lg:hidden">
                      Size
                    </span>
                    <span className="mono whitespace-nowrap text-xs text-bone-100">
                      {model.size}
                    </span>
                  </div>
                  <div className="lg:col-span-3">
                    <span className="mono mr-2 text-[9px] uppercase tracking-[0.18em] text-bone-300/50 lg:hidden">
                      Fit
                    </span>
                    <span className="text-sm leading-relaxed text-bone-200">
                      {model.fit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <div className="item-card p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="engraved text-[9px] text-ember-300">
                  Expert offload
                </div>
                <div className="mono text-[10px] uppercase tracking-[0.15em] text-bone-300/70">
                  35 / 41 layers · system RAM
                </div>
              </div>

              <div
                aria-hidden
                className="mt-5 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1.5"
              >
                {Array.from({ length: LAYERS }, (_, index) => (
                  <span
                    key={index}
                    className={`h-4 ${
                      index < OFFLOADED
                        ? "bg-gradient-to-t from-ember-700/70 to-ember-300/90"
                        : "bg-void-600"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-bone-200">
                35 of 41 layers&rsquo; expert tensors held in system RAM while
                attention stays on the GPU · 128k context at q8_0 K/V.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 border-y border-steel-700/25 py-9 sm:grid-cols-3">
            {labMeasured.map((measure) => (
              <div key={measure.label}>
                <div className="flex items-baseline gap-2">
                  <span className="display ember-text text-4xl md:text-5xl">
                    <CountUp value={measure.value} />
                  </span>
                  <span className="mono text-sm text-bone-300">
                    {measure.unit}
                  </span>
                </div>
                <div className="engraved mt-2 text-[9px] text-bone-300/70">
                  {measure.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3">
            {labHardware.map((entry) => (
              <div key={entry.label} className="border-t border-steel-700/20 pt-3">
                <div className="engraved text-[8px] text-bone-300/70">
                  {entry.label}
                </div>
                <div className="mono mt-1 text-xs leading-relaxed text-bone-100">
                  {entry.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
