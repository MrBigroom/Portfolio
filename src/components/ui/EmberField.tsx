"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { FIRE_HUES, buildEmberFleck, buildEmberSprite, clamp01 } from "@/lib/ember";

/**
 * Embers loose in the room around the mark.
 *
 * Drawn as irregular flecks rather than soft circles: an ember is a flake of
 * burning matter with a hot, uneven core, so a smooth radial blob reads as a
 * bokeh light and never as one. They spawn at the floor as white-hot chips,
 * rise on the draught, tumble, gutter, and cool to deep red before they go out.
 *
 * A handful of out-of-focus embers ride behind them — the same fire, further
 * from the lens — which is what stops the field looking like a flat starfield.
 */

type Layer = {
  weight: number;
  size: [number, number];
  speed: [number, number];
  alpha: [number, number];
  sway: [number, number];
  soft: boolean;
};

/** Far → near. Depth is sold by size, speed and opacity together. */
const LAYERS: Layer[] = [
  { weight: 0.46, size: [4, 8], speed: [0.1, 0.26], alpha: [0.5, 0.78], sway: [0.04, 0.14], soft: false },
  { weight: 0.32, size: [6, 11], speed: [0.16, 0.4], alpha: [0.6, 0.88], sway: [0.08, 0.24], soft: false },
  { weight: 0.16, size: [10, 18], speed: [0.24, 0.52], alpha: [0.62, 0.95], sway: [0.12, 0.32], soft: false },
  { weight: 0.06, size: [26, 44], speed: [0.06, 0.18], alpha: [0.07, 0.15], sway: [0.05, 0.16], soft: true },
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
  angle: number;
  spin: number;
  aspect: number;
  layer: number;
};

export default function EmberField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sharp flecks for the near field, soft sprites for the deep ones.
    const sharp = FIRE_HUES.map((hue) => buildEmberFleck(hue, 40));
    const soft = FIRE_HUES.map((hue) => buildEmberSprite(hue, 64));
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const total = mobile ? 115 : 285;

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
        freq: 0.0006 + Math.random() * 0.0014,
        sway: random(config.sway),
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.0016,
        aspect: 0.7 + Math.random() * 0.7,
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
      // Heat runs from the floor up: born white, dying red.
      const heat = clamp01(particle.y / Math.max(1, height));
      const emerge = clamp01((height - particle.y) / 120);
      // Embers gutter rather than glow steadily.
      const flicker =
        0.78 +
        0.16 * Math.sin(time * 0.004 + particle.phase * 3.1) +
        0.1 * Math.sin(time * 0.011 + particle.phase * 7.7);
      const alpha =
        particle.alpha * emerge * (0.45 + 0.55 * heat) * Math.max(0, flicker);

      if (alpha <= 0.004) return;

      // Biased hot: most of the field is live fire, only what has climbed far
      // enough has gone to slag.
      const index = Math.min(3, Math.floor((1 - heat) * 3.1));
      const set = LAYERS[particle.layer].soft ? soft : sharp;
      const size = particle.size * (1 - 0.2 * (1 - heat));

      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);
      ctx.scale(particle.aspect, 1);

      ctx.globalAlpha = alpha;
      ctx.drawImage(set[index], -size / 2, -size / 2, size, size);

      // The burning point. A fleck alone reads as a smudge; a hot pinpoint
      // inside it is what makes the eye call it an ember.
      if (!LAYERS[particle.layer].soft) {
        const core = Math.max(1.4, size * 0.4);
        ctx.globalAlpha = Math.min(1, alpha * 1.45);
        ctx.drawImage(sharp[0], -core / 2, -core / 2, core, core);
      }

      ctx.restore();
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
        particle.angle += particle.spin * scale;

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
      className={`pointer-events-none fixed inset-0 z-[1] opacity-90 ${className}`}
    />
  );
}