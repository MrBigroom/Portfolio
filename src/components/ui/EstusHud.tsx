"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * The flask in the corner. Its fill is the scroll position — a HUD that
 * happens to be a progress indicator, driven straight from motion values so
 * scrolling never re-renders React.
 */
export default function EstusHud() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.3,
  });
  const fill = reduced ? scrollYProgress : smooth;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-6 left-3 z-40 hidden select-none mix-blend-screen md:block"
    >
      <div className="relative h-11 w-7 drop-shadow-[0_0_18px_rgba(255,122,43,0.35)]">
        <svg viewBox="0 0 36 48" className="h-full w-full">
          <defs>
            <linearGradient id="estus-liquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe4b8" />
              <stop offset="0.45" stopColor="#ffa14f" />
              <stop offset="1" stopColor="#b83d08" />
            </linearGradient>
            <clipPath id="estus-body">
              <path d="M13 13c0-1.4 10-1.4 10 0v2.4c4 1.9 6.2 5.2 6.2 8.7v13.4c0 4.5-4.3 7.3-11.2 7.3S6.8 41.9 6.8 37.4V24.1c0-3.5 2.2-6.8 6.2-8.7V13Z" />
            </clipPath>
          </defs>

          <g clipPath="url(#estus-body)">
            <rect x="0" y="0" width="36" height="48" fill="#141110" />
            <motion.rect
              x="0"
              y="0"
              width="36"
              height="48"
              fill="url(#estus-liquid)"
              style={{
                scaleY: fill,
                transformBox: "fill-box",
                transformOrigin: "bottom",
              }}
            />
          </g>

          <path
            d="M13 13c0-1.4 10-1.4 10 0v2.4c4 1.9 6.2 5.2 6.2 8.7v13.4c0 4.5-4.3 7.3-11.2 7.3S6.8 41.9 6.8 37.4V24.1c0-3.5 2.2-6.8 6.2-8.7V13Z"
            fill="none"
            stroke="#b08a52"
            strokeOpacity="0.7"
          />
          <rect x="13.5" y="7" width="9" height="6" rx="1" fill="#7a5c30" />
          <rect
            x="11.5"
            y="4"
            width="13"
            height="4"
            rx="2"
            fill="#b08a52"
            fillOpacity="0.85"
          />
        </svg>
      </div>
    </div>
  );
}
