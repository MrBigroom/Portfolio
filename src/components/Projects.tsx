"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const isEven = idx % 2 === 0;
  const accentColor = project.accent === "lime" ? "text-lime" : "text-magenta";
  const accentBorder =
    project.accent === "lime" ? "border-lime/20" : "border-magenta/20";
  // The kind line already names the engagement, so the badge only earns its
  // place when it adds something the kind line doesn't say.
  const showStatus = !project.kind
    .toLowerCase()
    .includes(project.status.toLowerCase());

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-16 md:py-24 border-t border-bone-50/10 ${
        !isEven ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Left column: index + title */}
      <div className="lg:col-span-5 min-w-0">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className={`mono text-xs ${accentColor}`}>● {project.index}</span>
          <span className="mono text-xs text-bone-300 uppercase tracking-widest">
            {project.year}
          </span>
          {showStatus && (
            <span
              className={`mono text-xs uppercase tracking-widest border border-bone-50/20 px-2 py-1 ${accentColor}`}
            >
              {project.status}
            </span>
          )}
          {project.featured && (
            <span className="mono text-xs uppercase tracking-widest bg-lime text-ink-950 px-2 py-1">
              Featured
            </span>
          )}
        </div>

        <div className="mono text-[10px] uppercase tracking-[0.2em] text-bone-300/80 mb-3">
          {project.kind}
        </div>

        <h3 className="display text-5xl lg:text-6xl xl:text-7xl leading-none mb-4 break-words">
          {project.title}
        </h3>

        <p className="text-xl md:text-2xl text-bone-200 leading-snug max-w-md italic font-light tracking-wide">
          {project.tagline}
        </p>
      </div>

      {/* Right column: description, highlights, metrics, tech */}
      <div className="lg:col-span-7 space-y-8 min-w-0">
        {project.image && (
          <div
            className={`relative w-full overflow-hidden rounded-sm border ${accentBorder} shadow-[0_4px_32px_rgba(0,0,0,0.45)]`}
          >
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.title} screenshot`}
              width={project.imageW ?? 1280}
              height={project.imageH ?? 800}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        )}

        <p className="text-lg leading-relaxed text-bone-100">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2">
          {project.highlights.map((h, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm text-bone-200 mono leading-relaxed"
            >
              <span className={accentColor}>→</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-bone-50/10">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="display text-2xl md:text-3xl text-bone-50 mb-1">
                  {m.value}
                </div>
                <div className="mono text-[10px] uppercase tracking-[0.15em] text-bone-300">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="mono text-[10px] uppercase tracking-widest border border-bone-50/20 px-3 py-1.5 hover:border-bone-50/60 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Role + access */}
        <div className="mono text-xs uppercase tracking-[0.2em] text-bone-300 pt-2 space-y-2">
          <div>
            <span className="text-bone-300/60">Role / </span>
            {project.role}
          </div>
          {project.access && (
            <div className={accentColor}>
              <span className="text-bone-300/60">Code / </span>
              {project.access}
            </div>
          )}
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  className="magnetic hover:text-lime transition-colors"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative px-6 md:px-12 py-24 md:py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24"
      >
        <div className="md:col-span-3">
          <div className="mono text-xs uppercase tracking-[0.3em] text-bone-300">
            <span className="block text-lime mb-2">§ 03</span>
            Selected Work
          </div>
        </div>
        <div className="md:col-span-9">
          <h2 className="display text-5xl md:text-7xl leading-[0.95]">
            Five projects, <br />
            <span className="display-italic">
              each one a system, not a demo.
            </span>
          </h2>
        </div>
      </motion.div>

      {/* Projects */}
      <div>
        {projects.map((p, i) => (
          <ProjectCard key={p.index} project={p} idx={i} />
        ))}
      </div>
    </section>
  );
}