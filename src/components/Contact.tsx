"use client";

import Reveal from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Ornament";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-28 md:px-12 md:py-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="rime-glow absolute bottom-0 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(177,196,205,0.13),transparent_70%)] blur-2xl" />
        <div className="absolute right-0 top-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(134,146,156,0.07),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="engraved flex items-center justify-center gap-4 text-[10px] text-bone-300">
          <span aria-hidden className="h-px w-10 bg-steel-700/50" />
          <span className="text-rime-300">VI</span> · A Summons
          <span aria-hidden className="h-px w-10 bg-steel-700/50" />
        </div>

        <Reveal>
          <h2 className="display mt-8 text-[10.5vw] leading-[0.94] text-bone-50 sm:text-[8vw] md:text-[6.2vw]">
            Got a project? <br />
            <span className="display-italic rime-text">
              Let&rsquo;s build it.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <a
            href="mailto:chanyuxuan21@gmail.com"
            className="display-italic mt-10 inline-block break-all text-2xl text-rime-200 transition-colors duration-500 hover:text-rime-100 md:mt-14 md:text-4xl"
          >
            chanyuxuan21@gmail.com →
          </a>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="display-italic mt-6 text-lg text-bone-300/80">
            Leave your mark, and I will answer.
          </p>
        </Reveal>

        <Divider className="mx-auto my-12 h-4 w-full max-w-2xl md:my-14" />

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          <a
            href="https://github.com/MrBigroom"
            className="magnetic engraved text-[10px] text-bone-200 transition-colors hover:text-rime-200"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/chan-yu-xuan-244a5a400"
            className="magnetic engraved text-[10px] text-bone-200 transition-colors hover:text-rime-200"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:chanyuxuan21@gmail.com"
            className="magnetic engraved text-[10px] text-bone-200 transition-colors hover:text-rime-200"
          >
            Email ↗
          </a>
        </div>

        <div
          aria-hidden
          className="rime-glow mx-auto mt-14 h-16 w-[18rem] rounded-[50%] border border-rime-500/20 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(177,196,205,0.1),transparent_72%)]"
        />
      </div>
    </section>
  );
}