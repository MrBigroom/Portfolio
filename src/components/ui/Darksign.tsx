"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { FIRE_HUES, buildEmberSprite, clamp01 } from "@/lib/ember";

/**
 * The Darksign: a ring of fire around a hole, burned over a carved brand.
 *
 * Three layers, back to front — the burnt hollow, the scar, then the fire.
 * The fire is the only warm thing on this branch, so it gets the whole
 * ember ramp to itself while the rest of the page stays cold.
 */

const VIEW = 400;
const RING = 140; // centreline radius, viewBox units
const BAND = 30; // how thick the band is at birth
const HOLE = 116;
const BRAND_R = RING + 34; // the scar sits outside the fire's reach // nothing burns inside this

/* ------------------------------------------------------------------ */
/* The carved brand (deterministic)                                    */
/* ------------------------------------------------------------------ */

function arcPath(radius: number, from: number, to: number) {
  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: VIEW / 2 + radius * Math.cos(rad),
      y: VIEW / 2 + radius * Math.sin(rad),
    };
  };
  const a = point(from);
  const b = point(to);
  const large = to - from > 180 ? 1 : 0;
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)}A${radius} ${radius} 0 ${large} 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

/** Four arcs with gaps — a brand, not a drawn circle. */
const BRAND_ARCS = [
  [-16, 62],
  [96, 158],
  [186, 244],
  [272, 338],
].map(([from, to]) => arcPath(BRAND_R, from, to));

/** Nicks across the scar, where the brand tore. */
const BRAND_NICKS = [-38, 46, 132, 214, 298].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  const inner = BRAND_R - 9;
  const outer = BRAND_R + 9;
  return `M${(VIEW / 2 + inner * Math.cos(rad)).toFixed(1)} ${(VIEW / 2 + inner * Math.sin(rad)).toFixed(1)}L${(VIEW / 2 + outer * Math.cos(rad)).toFixed(1)} ${(VIEW / 2 + outer * Math.sin(rad)).toFixed(1)}`;
});

/* ------------------------------------------------------------------ */
/* The fire                                                            */
/* ------------------------------------------------------------------ */

type Cell = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  age: number;
  ttl: number;
  seed: number;
};

function DarksignFire({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprites = FIRE_HUES.map((hue) => buildEmberSprite(hue, 96));
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const FLAME_MAX = mobile ? 190 : 460;
    const EMBER_MAX = mobile ? 16 : 40;

    let width = 0;
    let height = 0;
    let scale = 1;
    let cx = 0;
    let cy = 0;
    let flames: Cell[] = [];
    let embers: Cell[] = [];
    let flameDebt = 0;
    let emberDebt = 0;
    let clock = 0;
    let raf = 0;
    let previous = performance.now();
    let onScreen = true;

    const onRing = () => {
      const theta = Math.random() * Math.PI * 2;
      const radius = (RING + (Math.random() - 0.5) * BAND) * scale;
      return {
        theta,
        x: cx + Math.cos(theta) * radius,
        y: cy + Math.sin(theta) * radius,
      };
    };

    const spawnFlame = (): Cell => {
      const at = onRing();
      const outward = (8 + Math.random() * 26) * scale;
      return {
        x: at.x,
        y: at.y,
        vx: Math.cos(at.theta) * outward,
        vy: Math.sin(at.theta) * outward - 18 * scale,
        size: (13 + Math.random() * 24) * scale,
        age: 0,
        ttl: 0.8 + Math.random() * 0.7,
        seed: Math.random() * Math.PI * 2,
      };
    };

    const spawnEmber = (): Cell => {
      const at = onRing();
      return {
        x: at.x,
        y: at.y,
        vx: Math.cos(at.theta) * (16 + Math.random() * 34) * scale,
        vy: Math.sin(at.theta) * 16 * scale - (40 + Math.random() * 55) * scale,
        size: (1.5 + Math.random() * 2.4) * scale,
        age: 0,
        ttl: 1.3 + Math.random() * 1.5,
        seed: Math.random() * Math.PI * 2,
      };
    };

    const advance = (
      cell: Cell,
      delta: number,
      ttlLife: number,
      buoyancy: number,
    ) => {
      cell.age += delta;
      const dx = cell.x - cx;
      const dy = cell.y - cy;
      const distance = Math.hypot(dx, dy) || 1;
      const nx = dx / distance;
      const ny = dy / distance;

      // A weak spring back to the ring: without it the buoyancy pulls the
      // whole band upward and the mark stops reading as a circle.
      const offset = distance - RING * scale;
      cell.vx -= nx * offset * 1.3 * delta;
      cell.vy -= ny * offset * 1.3 * delta;

      // Lick around the hoop rather than straight up.
      const spin = 16 * scale;
      cell.vx += -ny * spin * delta;
      cell.vy += nx * spin * delta;

      // And upward, into the air, where a flame belongs.
      cell.vy -= buoyancy * scale * delta;

      // Turbulence, so the rim tears instead of glowing evenly.
      cell.vx += Math.sin(clock * 1.7 + cell.seed) * 26 * scale * delta;

      // Never burn inside the hole. This is the mark.
      const holeRadius = HOLE * scale;
      if (distance < holeRadius) {
        cell.x = cx + nx * holeRadius;
        cell.y = cy + ny * holeRadius;
        const inward = cell.vx * nx + cell.vy * ny;
        if (inward < 0) {
          cell.vx -= nx * inward;
          cell.vy -= ny * inward;
        }
      }

      const drag = 1 - 1.9 * ttlLife * delta;
      cell.vx *= Math.max(0, drag);
      cell.vy *= Math.max(0, drag * 0.92);

      cell.x += cell.vx * delta;
      cell.y += cell.vy * delta;
    };

    const draw = () => {
      if (width < 4 || height < 4) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // A continuous band for the particles to break up. Without it the ring
      // is gravel; with it, the gravel reads as flame licking off a hoop.
      const breath = 0.84 + 0.16 * Math.sin(clock * 1.4);
      const radius = RING * scale;

      // Blurred, or the band reads as a drawn hoop instead of heat.
      ctx.filter = `blur(${Math.round(radius * 0.1)}px)`;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(206, 66, 12, ${0.26 * breath})`;
      ctx.lineWidth = radius * 0.62;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 132, 38, ${0.34 * breath})`;
      ctx.lineWidth = radius * 0.3;
      ctx.stroke();

      ctx.filter = "none";

      for (const cell of flames) {
        const t = cell.age / cell.ttl;
        const band = Math.min(
          sprites.length - 1,
          Math.floor(t * sprites.length),
        );
        const size = cell.size * (0.7 + 0.7 * t);
        const alpha = 0.8 * Math.min(1, t * 10) * Math.pow(1 - t, 0.6);
        if (alpha <= 0.004) continue;
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          sprites[band],
          cell.x - size / 2,
          cell.y - size / 2,
          size,
          size,
        );
      }

      for (const cell of embers) {
        const t = cell.age / cell.ttl;
        const band = Math.min(
          sprites.length - 1,
          Math.floor(t * sprites.length),
        );
        const alpha = Math.sin(Math.PI * clamp01(t)) * 0.95;
        if (alpha <= 0.004) continue;
        const size = cell.size * (1 - 0.4 * t);
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          sprites[band],
          cell.x - size / 2,
          cell.y - size / 2,
          size,
          size,
        );
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const step = (delta: number) => {
      if (width < 4 || height < 4) return;
      clock += delta;

      flameDebt += (FLAME_MAX / 1.05) * delta;
      emberDebt += (EMBER_MAX / 2.2) * delta;

      while (flameDebt >= 1) {
        if (flames.length < FLAME_MAX + 40) flames.push(spawnFlame());
        flameDebt -= 1;
      }
      while (emberDebt >= 1) {
        if (embers.length < EMBER_MAX + 12) embers.push(spawnEmber());
        emberDebt -= 1;
      }

      flames = flames.filter((cell) => {
        advance(cell, delta, cell.age / cell.ttl, 30);
        return cell.age < cell.ttl;
      });
      embers = embers.filter((cell) => {
        advance(cell, delta, cell.age / cell.ttl, 14);
        return cell.age < cell.ttl;
      });
    };

    const frame = (now: number) => {
      const delta = Math.min(0.048, (now - previous) / 1000);
      previous = now;
      step(delta);
      draw();
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

    const seedStill = () => {
      // One honest frame: an even ring, already lit, that does not move.
      const count = mobile ? 96 : 190;
      flames = Array.from({ length: count }, (_, index) => {
        const cell = spawnFlame();
        const theta = (index / count) * Math.PI * 2 + Math.random() * 0.12;
        const radius = (RING + (Math.random() - 0.5) * BAND) * scale;
        cell.x = cx + Math.cos(theta) * radius;
        cell.y = cy + Math.sin(theta) * radius;
        cell.age = Math.random() * cell.ttl;
        return cell;
      });
      embers = Array.from({ length: mobile ? 12 : 30 }, () => {
        const cell = spawnEmber();
        cell.age = Math.random() * cell.ttl;
        return cell;
      });
      draw();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(width, height) / VIEW;
      cx = width / 2;
      cy = height / 2;

      // Only one of the two emblems is ever laid out; the hidden one has a
      // zero-sized canvas and seeding it would divide by zero.
      if (width < 4 || height < 4) {
        flames = [];
        embers = [];
        return;
      }
      if (reduced) seedStill();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { rootMargin: "140px" },
    );

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
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

/* ------------------------------------------------------------------ */
/* The mark                                                            */
/* ------------------------------------------------------------------ */

export default function Darksign({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[:]/g, "");
  const glow = `ds-glow-${uid}`;

  return (
    <div className={`relative ${className}`} aria-hidden>
      <defs>
        <radialGradient id={glow} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stopColor="#1a0709" stopOpacity="0.95" />
          <stop offset="0.8" stopColor="#1a0709" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1a0709" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The hollow: burned through, not left empty. */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(8,4,6,0.92) 0%, rgba(8,4,6,0.55) 40%, transparent 58%)`,
        }}
      />

      {/* The carved brand, sitting under the flame. */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <g
          stroke="#66717b"
          strokeOpacity="0.3"
          strokeWidth="2.4"
          strokeLinecap="round"
        >
          {BRAND_ARCS.map((d, index) => (
            <path key={`arc-${index}`} d={d} />
          ))}
          {BRAND_NICKS.map((d, index) => (
            <path
              key={`nick-${index}`}
              d={d}
              strokeOpacity="0.22"
              strokeWidth="1.6"
            />
          ))}
        </g>
      </svg>

      <DarksignFire className="absolute inset-0" />
    </div>
  );
}