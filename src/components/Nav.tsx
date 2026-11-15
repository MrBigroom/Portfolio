"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { SignMark } from "@/components/ui/Ornament";

const links = [
  { id: "work", href: "#work", label: "Work", numeral: "III" },
  { id: "lab", href: "#lab", label: "Lab", numeral: "IV" },
  { id: "arsenal", href: "#arsenal", label: "Armoury", numeral: "V" },
  { id: "about", href: "#about", label: "About", numeral: "II" },
  { id: "contact", href: "#contact", label: "Summons", numeral: "VI" },
];

const desktopOrder = ["work", "lab", "about", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (value) => setScrolled(value > 24));
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const nodes = links
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open
            ? "border-b border-steel-700/25 bg-void-950"
            : "border-b border-transparent"
        }`}
      >
        {/* Always-present scrim, so the mark never sits on top of copy while
            the scroll listener is still catching up. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -bottom-8 z-0 bg-gradient-to-b from-void-950 via-void-950/70 to-transparent"
        />

        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 z-10 h-px origin-left bg-gradient-to-r from-ember-600/0 via-ember-300/70 to-ember-600/0"
        />

        <nav
          aria-label="Primary"
          className="relative z-10 mx-auto flex max-w-[110rem] items-center justify-between gap-6 px-6 py-5 md:px-12"
        >
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center border border-steel-700/50 transition-colors group-hover:border-ember-400/70">
              <SignMark className="h-4 w-4 text-ember-400" />
              <span
                aria-hidden
                className="absolute inset-[3px] border border-steel-500/15"
              />
            </span>
            <span className="leading-tight">
              <span className="engraved block text-[9px] text-bone-100">
                Chan Yu Xuan
              </span>
              <span className="mono mt-1 block text-[9px] uppercase tracking-[0.18em] text-bone-300/80">
                AI Platform Engineer
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {desktopOrder.map((id) => {
              const link = links.find((entry) => entry.id === id);
              if (!link) return null;
              const isActive = active === link.href;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`engraved group relative text-[10px] transition-colors duration-300 ${
                    isActive
                      ? "text-ember-200"
                      : "text-bone-200 hover:text-ember-200"
                  }`}
                >
                  <span aria-hidden className="mr-1.5 text-steel-500/70">
                    ✦
                  </span>
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-ember-400/80 to-transparent transition-all duration-500 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
            <a
              href="#contact"
              className="engraved border border-steel-700/40 px-3.5 py-2 text-[9px] text-ember-200 transition-colors duration-300 hover:border-ember-400/70 hover:bg-ember-400/[0.06]"
            >
              Summon
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-steel-700/40 md:hidden"
          >
            <span
              className={`h-px w-5 bg-bone-100 transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-bone-100 transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-px w-5 bg-bone-100 transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-void-950 md:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(177,196,205,0.12),transparent_70%)] blur-2xl"
            />
            <div className="relative flex h-full flex-col justify-between px-8 pb-10 pt-28">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                  },
                }}
                className="space-y-1"
              >
                {links.map((link) => (
                  <motion.li
                    key={link.id}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between border-b border-steel-700/20 py-5"
                    >
                      <span className="display text-3xl text-bone-100 transition-colors group-hover:text-ember-200">
                        {link.label}
                      </span>
                      <span className="display text-[10px] tracking-[0.25em] text-steel-500">
                        {link.numeral}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex items-center justify-between">
                <span className="engraved text-[9px] text-bone-300/60">
                  Chan Yu Xuan · 2026
                </span>
                <a
                  href="mailto:chanyuxuan21@gmail.com"
                  className="engraved text-[9px] text-ember-300"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
