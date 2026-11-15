"use client";

import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import CountUp from "@/components/ui/CountUp";
import { Divider } from "@/components/ui/Ornament";

const stats = [
  { num: "7", label: "GPU services orchestrated" },
  { num: "3,650", label: "Tests in that platform" },
  { num: "124 GB", label: "Of models served locally" },
  { num: "2026", label: "Graduating" },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-3">
          <SectionLabel numeral="II" chapter="Of the Branded" />
        </div>

        <div className="md:col-span-9">
          <Reveal>
            <h2 className="display text-3xl leading-[1.1] text-bone-50 sm:text-4xl md:text-5xl lg:text-6xl">
              I build and operate the systems that put{" "}
              <span className="display-italic ember-text">models</span> in front
              of <span className="display-italic text-ember-300">real users</span>
              .
            </h2>
          </Reveal>

          <Divider className="my-10 h-4 w-full md:my-12" />

          <div className="grid grid-cols-1 gap-8 text-[1.05rem] leading-relaxed text-bone-100 md:grid-cols-2 md:text-[1.15rem]">
            <Reveal delay={0.05}>
              <p className="drop-cap">
                Since July I&rsquo;ve been the engineer behind one component of a
                livestream-commerce platform at SNS Network — the creator studio,
                the viewer, and the orchestration layer that turns a script into
                a rendered stream across seven GPU services. That means serving
                and selecting models, per-stage state and retries, and enough
                test coverage to change a pipeline stage without dreading Friday.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                Outside that, the work is mostly about the seams: an agent
                orchestration harness that coordinates coding models through
                artifacts instead of chat, a RAG booking agent running entirely
                on my laptop with no inbound ports, and a 124 GB model library
                served off one 8 GB card. I care about failure modes, honest
                evaluation, and the boring parts that let a system survive
                contact with users.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="mt-14">
            <div className="grid grid-cols-2 gap-6 border-t border-steel-700/25 pt-10 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <div className="display ember-text text-4xl md:text-5xl">
                    <CountUp value={stat.num} />
                  </div>
                  <div className="engraved mt-2.5 text-[9px] text-bone-300">
                    {stat.label}
                  </div>
                  <span
                    aria-hidden
                    className="mt-4 block h-px w-full bg-steel-700/30 transition-colors duration-500 group-hover:bg-ember-500/70"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}