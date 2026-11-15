"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import CountUp from "@/components/ui/CountUp";
import { SignMark } from "@/components/ui/Ornament";
import { projects, type Project } from "@/data/projects";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

const cornerTicks = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
];

function Corners() {
  return (
    <>
      {cornerTicks.map((corner) => (
        <span
          key={corner}
          aria-hidden
          className={`pointer-events-none absolute z-20 h-3 w-3 border-steel-300/50 ${corner}`}
        />
      ))}
    </>
  );
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const reversed = idx % 2 === 1;
  const accentText =
    project.accent === "ember" ? "text-rime-300" : "text-blood-400";
  const accentLine =
    project.accent === "ember"
      ? "from-rime-500/70 via-rime-400/20"
      : "from-blood-500/70 via-blood-400/20";
  const showStatus = !project.kind
    .toLowerCase()
    .includes(project.status.toLowerCase());

  return (
    <Reveal y={36}>
      <article className="item-card relative px-5 py-10 md:px-10 md:py-14">
        <Corners />
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b to-transparent ${accentLine}`}
        />

        {/* Item header */}
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-b border-steel-700/25 pb-4">
          <div className="flex items-center gap-3">
            <span
              className={`display text-sm tracking-[0.3em] ${accentText}`}
            >
              {ROMAN[idx] ?? project.index}
            </span>
            <span aria-hidden className="h-px w-6 bg-steel-700/50" />
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-bone-300">
              {project.year}
            </span>
            {showStatus && (
              <span className="engraved border border-steel-700/40 px-2 py-1 text-[8px] text-bone-200">
                {project.status}
              </span>
            )}
            {project.featured && (
              <span className="engraved bg-rime-500 px-2 py-1 text-[8px] text-void-950">
                Branded
              </span>
            )}
          </div>
          <span className="mono text-[9px] uppercase tracking-[0.2em] text-bone-300/50">
            {project.index} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div
            className={`min-w-0 lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}
          >
            <div className="engraved text-[9px] text-bone-300/80">
              {project.kind}
            </div>

            <h3 className="display mt-3 break-words text-3xl leading-[1.02] text-bone-50 sm:text-4xl xl:text-5xl">
              {project.title}
            </h3>

            <p className="display-italic mt-5 max-w-md text-xl leading-snug text-bone-100 md:text-2xl">
              {project.tagline}
            </p>

            {project.flavour && (
              <div className="mt-7 border-t border-steel-700/25 pt-4">
                <div className="mono text-[9px] uppercase tracking-[0.24em] text-bone-300/50">
                  Item description
                </div>
                <p className="display-italic mt-2 max-w-md text-lg leading-relaxed text-bone-200/85">
                  {project.flavour}
                </p>
              </div>
            )}

            <div className="mt-8 max-w-xs">
              <div className="relative h-[2px] w-full overflow-hidden bg-void-600">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full origin-left bg-gradient-to-r from-rime-600 via-rime-300 to-rime-600/10"
                />
              </div>
              <div className="engraved mt-2 text-[8px] text-steel-500">
                Witnessed
              </div>
            </div>
          </div>

          <div
            className={`min-w-0 lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}
          >
            {project.image && (
              <div className="group relative overflow-hidden border border-steel-700/40 bg-void-900">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 border border-steel-500/10"
                />
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? `${project.title} screenshot`}
                  width={project.imageW ?? 1280}
                  height={project.imageH ?? 800}
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="regrade h-auto w-full object-cover group-hover:scale-[1.02]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(7,6,5,0.55),transparent_48%)]"
                />
              </div>
            )}

            <p className="mt-8 text-[1.05rem] leading-relaxed text-bone-100">
              {project.description}
            </p>

            <ul className="mt-6 space-y-3">
              {project.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-relaxed text-bone-200"
                >
                  <SignMark className="mt-[0.15em] h-3 w-3 shrink-0 text-rime-500/80" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {project.metrics.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-steel-700/25 py-6 sm:grid-cols-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="display text-2xl text-bone-50 md:text-3xl">
                      <CountUp value={metric.value} />
                    </div>
                    <div className="engraved mt-1.5 text-[8px] text-bone-300/70">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="mono border border-steel-700/35 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-bone-200 transition-colors duration-300 hover:border-rime-400/60 hover:text-rime-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mono mt-6 space-y-2 text-[11px] uppercase tracking-[0.18em] text-bone-300">
              <div>
                <span className="text-bone-300/50">Role / </span>
                <span className="text-bone-200">{project.role}</span>
              </div>
              {project.access && (
                <div className={accentText}>
                  <span className="text-bone-300/50">Code / </span>
                  {project.access}
                </div>
              )}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="magnetic text-bone-300 transition-colors hover:text-rime-200"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-3">
          <SectionLabel numeral="III" chapter="Chronicle of Cinders" />
        </div>
        <div className="md:col-span-9">
          <Reveal>
            <h2 className="display text-3xl leading-[1.02] text-bone-50 sm:text-4xl md:text-5xl lg:text-6xl">
              Five projects, <br />
              <span className="display-italic text-bone-200">
                each one a system, not a demo.
              </span>
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 space-y-8 md:mt-20 md:space-y-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.index} project={project} idx={index} />
        ))}
      </div>
    </section>
  );
}