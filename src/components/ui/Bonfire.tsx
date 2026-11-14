"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { EMBER_HUES, buildEmberSprite } from "@/lib/ember";

/**
 * A coiled sword in a heap of ash.
 *
 * The blade is drawn point-down into the ash, wrapped in a helix of fire, and
 * a small local emitter keeps embers streaming up out of the pile — so the
 * bonfire reads as the source of the field, not just decoration sitting on
 * top of it.
 */

/** Deterministic helix, so the server and client agree on the path. */
function coilPath(
  turns: number,
  yTop: number,
  yBottom: number,
  amplitude: number,
  steps = 168,
): string {
  const parts: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = t * Math.PI * 2 * turns;
    const x = 150 + Math.sin(angle) * amplitude * (0.74 + 0.26 * t);
    const y = yBottom - (yBottom - yTop) * t + Math.cos(angle) * 5;
    parts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return parts.join(" ");
}

const COIL = coilPath(3.15, 214, 392, 30);

type JetParticle = {
  x: number;
  y: number;
  vy: number;
  drift: number;
  size: number;
  life: number;
  ttl: number;
  phase: number;
};

function EmberJet({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprites = EMBER_HUES.map((hue) => buildEmberSprite(hue));
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const count = mobile ? 16 : 40;

    let width = 0;
    let height = 0;
    let raf = 0;
    let previous = performance.now();
    let clock = 0;
    let visible = true;
    let particles: JetParticle[] = [];

    const spawn = (initial = false): JetParticle => {
      const spread = width * 0.34;
      return {
        x: width / 2 + (Math.random() - 0.5) * spread * 2,
        y: initial ? height - Math.random() * height : height - 2,
        vy: 0.4 + Math.random() * 1.15,
        drift: (Math.random() - 0.5) * 0.18,
        size: 4 + Math.random() * 8,
        life: initial ? Math.random() : 0,
        ttl: 1.1 + Math.random() * 1.9,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const particle of particles) {
        const progress = Math.min(1, particle.life / particle.ttl);
        const alpha = Math.sin(Math.PI * progress) * 0.85;
        if (alpha <= 0.004) continue;

        const tint =
          sprites[Math.min(sprites.length - 1, Math.floor(progress * 4))];
        const size = particle.size * (0.65 + 0.55 * progress);
        const flicker =
          0.85 + 0.15 * Math.sin(time * 0.004 + particle.phase * 2.4);

        ctx.globalAlpha = alpha * flicker;
        ctx.drawImage(
          tint,
          particle.x - size / 2,
          particle.y - size / 2,
          size,
          size,
        );
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: count }, () => spawn(true));
      if (reduced) draw(0);
    };

    const step = (delta: number) => {
      const scale = Math.min(2.5, delta / 16.667);
      const seconds = delta / 1000;
      clock += delta;

      for (const particle of particles) {
        particle.life += seconds;
        if (particle.life >= particle.ttl) {
          Object.assign(particle, spawn(false));
          continue;
        }
        particle.y -= particle.vy * scale;
        particle.x +=
          (particle.drift + Math.sin(clock * 0.0011 + particle.phase) * 0.42) *
          scale;
      }
    };

    const frame = (now: number) => {
      const delta = now - previous;
      previous = now;
      step(delta);
      draw(clock);
      raf = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduced || raf) return;
      previous = performance.now();
      raf = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && !document.hidden) start();
        else stop();
      },
      { rootMargin: "120px" },
    );

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    resize();
    if (!reduced) observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export default function Bonfire({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[:]/g, "");
  const blade = `bf-blade-${uid}`;
  const coil = `bf-coil-${uid}`;
  const ash = `bf-ash-${uid}`;
  const guard = `bf-guard-${uid}`;
  const bloom = `bf-bloom-${uid}`;

  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* The light the fire throws on the ash around it. */}
      <div className="absolute bottom-[1%] left-1/2 h-[30%] w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,122,43,0.2),rgba(184,61,8,0.07)_46%,transparent_74%)] blur-2xl" />

      {/* Fire behind the blade. */}
      <div className="flame flame-a bottom-[5%] left-1/2 h-[44%] w-[32%] -translate-x-1/2" />
      <div className="flame flame-b bottom-[6%] left-[46%] h-[32%] w-[20%] -translate-x-1/2" />

      <svg
        viewBox="0 0 300 460"
        fill="none"
        className="relative h-full w-full [filter:drop-shadow(0_0_28px_rgba(255,122,43,0.22))]"
      >
        <defs>
          <linearGradient
            id={blade}
            x1="150"
            y1="200"
            x2="150"
            y2="424"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#b8b2a8" />
            <stop offset="0.48" stopColor="#8d867c" />
            <stop offset="0.78" stopColor="#c07a3c" />
            <stop offset="1" stopColor="#ffa14f" />
          </linearGradient>
          <linearGradient
            id={coil}
            x1="118"
            y1="214"
            x2="182"
            y2="392"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffe4b8" />
            <stop offset="0.42" stopColor="#ffa14f" />
            <stop offset="1" stopColor="#e85a10" />
          </linearGradient>
          <radialGradient id={ash} cx="0.5" cy="0.15" r="0.85">
            <stop offset="0" stopColor="#3a3129" />
            <stop offset="0.55" stopColor="#1c1815" />
            <stop offset="1" stopColor="#0d0b09" />
          </radialGradient>
          <linearGradient
            id={guard}
            x1="100"
            y1="180"
            x2="200"
            y2="204"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#7a5c30" />
            <stop offset="0.5" stopColor="#d8b98a" />
            <stop offset="1" stopColor="#7a5c30" />
          </linearGradient>
          <filter id={bloom} x="-40%" y="-20%" width="180%" height="150%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
        </defs>

        {/* The helix seen through the blade. */}
        <path
          d={COIL}
          stroke="#7d2604"
          strokeOpacity="0.4"
          strokeWidth="9"
          strokeLinecap="round"
          filter={`url(#${bloom})`}
        />

        {/* Ash. */}
        <path
          d="M6 452C42 424 94 410 150 412c56 2 108 12 144 40v8H6z"
          fill={`url(#${ash})`}
        />
        <path
          d="M6 452C42 424 94 410 150 412c56 2 108 12 144 40"
          stroke="#b08a52"
          strokeOpacity="0.22"
        />

        {/* Blade, driven point-first into the ash. */}
        <path
          d="M143 202h14l-3.5 190q-3.5 30-7 0z"
          fill={`url(#${blade})`}
        />
        <path d="M150 208v176" stroke="#6f6a62" strokeOpacity="0.55" />

        {/* Guard, grip, pommel. */}
        <path
          d="M100 186q50-12 100 0v9q-50 12-100 0z"
          fill={`url(#${guard})`}
        />
        <rect x="143.5" y="142" width="13" height="44" fill="#4e4a44" />
        {[146, 152, 158, 164, 170, 176, 182].map((y) => (
          <path
            key={y}
            d={`M143.5 ${y} h13`}
            stroke="#332c25"
            strokeWidth="1.6"
          />
        ))}
        <circle cx="150" cy="135" r="9" fill="#7a5c30" />
        <circle cx="150" cy="135" r="4" fill="#d8b98a" />

        {/* The coil, lit. */}
        <path
          d={COIL}
          stroke="#ff7a2b"
          strokeOpacity="0.5"
          strokeWidth="7"
          strokeLinecap="round"
          filter={`url(#${bloom})`}
        />
        <path
          d={COIL}
          stroke={`url(#${coil})`}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>

      {/* Fire in front of the pile, then the embers leaving it. */}
      <div className="flame flame-c bottom-[7%] left-[54%] h-[18%] w-[11%] -translate-x-1/2" />
      <EmberJet className="absolute bottom-[2%] left-1/2 h-[54%] w-[62%] -translate-x-1/2" />
    </div>
  );
}
