"use client";

import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { SignMark } from "@/components/ui/Ornament";
import { skills } from "@/data/projects";

const SLOT = ["I", "II", "III", "IV", "V", "VI"];

export default function Skills() {
  return (
    <section id="arsenal" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-3">
          <SectionLabel numeral="V" chapter="The Armoury" />
        </div>

        <div className="md:col-span-9">
          <Reveal>
            <h2 className="display text-3xl leading-[1.04] text-bone-50 sm:text-4xl md:text-5xl lg:text-6xl">
              What I reach for, <br />
              <span className="display-italic text-bone-200">
                and what I&rsquo;m currently learning
              </span>
              .
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(skills).map(([category, items], index) => (
              <Reveal key={category} delay={index * 0.06} className="h-full">
                <div className="group relative h-full border border-steel-700/25 p-5 transition-colors duration-500 hover:border-ember-400/40 hover:bg-ember-400/[0.02] md:p-6">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-[3px] border border-steel-500/[0.07]"
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="display text-[10px] tracking-[0.3em] text-ember-300">
                      {SLOT[index] ?? String(index + 1).padStart(2, "0")}
                    </span>
                    <SignMark className="h-3 w-3 text-steel-500/40 transition-colors duration-500 group-hover:text-ember-400" />
                  </div>
                  <h3 className="display-italic relative mt-4 text-2xl text-bone-50">
                    {category}
                  </h3>
                  <div className="relative mt-4 flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="border border-steel-700/30 px-2.5 py-1 text-[0.95rem] leading-tight text-bone-200 transition-colors duration-300 hover:border-ember-400/50 hover:bg-ember-400/[0.05] hover:text-ember-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
