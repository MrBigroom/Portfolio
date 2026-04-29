"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const isEven = idx % 2 === 0;
  const accentColor = project.accent === "lime" ? "text-lime" : "text-magenta";
  const accentBg = project.accent === "lime" ? "bg-lime" : "bg-magenta";

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-16 md:py-24 border-t border-bone-50/10 ${
        !isEven ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Left column: index + title */}
      <div className="md:col-span-5">
        <div className="flex items-center gap-4 mb-6">
          <span className={`mono text-xs ${accentColor}`}>● {project.index}</span>
          <span className="mono text-xs text-bone-300 uppercase tracking-widest">
            {project.year}
          </span>
          <span className={`mono text-xs uppercase tracking-widest border border-bone-50/20 px-2 py-1 ${accentColor}`}>
            {project.status}
          </span>
        </div>

        <h3 className="display text-5xl md:text-7xl leading-none mb-4">
          {project.title}
        </h3>

        <p className="display-italic text-xl md:text-2xl text-bone-200 leading-tight max-w-md">
          {project.tagline}
        </p>
      </div>

      {/* Right column: description, tech, highlights */}
      <div className="md:col-span-7 space-y-8">
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

        {/* Role */}
        <div className="mono text-xs uppercase tracking-[0.2em] text-bone-300 pt-2">
          <span className="text-bone-300/60">Role / </span>
          {project.role}
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
            <span className="display-italic">all built end-to-end.</span>
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
