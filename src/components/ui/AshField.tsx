"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ASH_HUES,
  buildEmberSprite,
  clamp01,
} from "@/lib/ember";

/**
 * Ash falling through a room with no fire in it.
 *
 * The same sprite trick as the mark's flame — one drawImage per mote — but the
 * tints run cold, the drift is slower, and nothing here is allowed to glow.
 * The only warmth on the page belongs to the Darksign.
 */

type Layer = {
  weight: number;
  size: [number, number];
  speed: [number, number];
  alpha: [number, number];
  sway: [number, number];
};

/** Far → near. Depth is sold by size, speed and opacity together. */
const LAYERS: Layer[] = [
  { weight: 0.5, size: [4, 8], speed: [0.04, 0.12], alpha: [0.12, 0.26], sway: [0.03, 0.1] },
  { weight: 0.32, size: [8, 14], speed: [0.13, 0.3], alpha: [0.18, 0.4], sway: [0.06, 0.2] },
  { weight: 0.18, size: [14, 24], speed: [0.3, 0.66], alpha: [0.26, 0.55], sway: [0.1, 0.3] },
];

type Particle = {
  x: number;
  y: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  freq: number;
  sway: number;
  layer: number;
};

export default function AshField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprites = ASH_HUES.map((hue) => buildEmberSprite(hue));
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const total = mobile ? 58 : 150;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let previous = performance.now();
    let clock = 0;
    let running = !document.hidden;

    const spawn = (layer: number, initial: boolean): Particle => {
      const config = LAYERS[layer];
      const random = (range: [number, number]) =>
        range[0] + Math.random() * (range[1] - range[0]);

      return {
        x: Math.random() * width,
        // New embers are born below the fold and drift up into view.
        y: initial ? Math.random() * height : height + 20 + Math.random() * 80,
        vy: random(config.speed),
        size: random(config.size),
        alpha: random(config.alpha),
        phase: Math.random() * Math.PI * 2,
        freq: 0.0006 + Math.random() * 0.0012,
        sway: random(config.sway),
        layer,
      };
    };

    const build = () => {
      particles = [];
      LAYERS.forEach((layer, index) => {
        const count = Math.round(total * layer.weight);
        for (let i = 0; i < count; i += 1) particles.push(spawn(index, true));
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduced) drawStatic();
    };

    const paint = (particle: Particle, time: number) => {
      // Cool with altitude: 0 at the floor, 1 near the ceiling.
      const cool = clamp01((particle.y - height * 0.04) / (height * 0.78));
      const emerge = clamp01((height - particle.y) / 140);
      const flicker =
        0.82 + 0.18 * Math.sin(time * 0.0032 + particle.phase * 3.1);
      const alpha =
        particle.alpha * emerge * (1 - 0.62 * cool) * flicker;

      if (alpha <= 0.004) return;

      const tint = sprites[Math.min(sprites.length - 1, Math.floor(cool * 4))];
      const size = particle.size * (1 - 0.25 * cool);
      ctx.globalAlpha = alpha;
      ctx.drawImage(tint, particle.x - size / 2, particle.y - size / 2, size, size);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const particle of particles) paint(particle, time);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const drawStatic = () => {
      // Reduced motion still deserves a lit room: spread the field across the
      // viewport and paint it exactly once.
      for (const particle of particles) particle.y = Math.random() * height;
      draw(0);
    };

    const step = (delta: number) => {
      const scale = Math.min(2.5, delta / 16.667);
      clock += delta;
      // A slow, breathing draught, so the whole field leans together.
      const wind = Math.sin(clock * 0.00012) * 0.14;

      for (const particle of particles) {
        particle.y -= particle.vy * scale;
        particle.x +=
          (wind + Math.sin(clock * particle.freq + particle.phase) * particle.sway) *
          scale;

        const offTop = particle.y < -80;
        const offSide = particle.x < -120 || particle.x > width + 120;
        if (offTop || offSide) {
          Object.assign(particle, spawn(particle.layer, false));
          // Respawned embers re-enter at the bottom regardless of layer speed.
          particle.y = height + 20 + Math.random() * 80;
        }
      }
    };

    const frame = (now: number) => {
      const delta = now - previous;
      previous = now;
      step(delta);
      draw(clock);
      raf = window.requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        previous = performance.now();
        raf = window.requestAnimationFrame(frame);
      } else {
        window.cancelAnimationFrame(raf);
      }
    };

    resize();

    if (reduced) {
      drawStatic();
    } else if (running) {
      raf = window.requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[1] opacity-55 ${className}`}
    />
  );
}