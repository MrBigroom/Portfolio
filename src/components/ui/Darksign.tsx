"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { FIRE_HUES, buildEmberSprite, clamp01 } from "@/lib/ember";

/**
 * The Darksign: a thin, ragged ring of fire with flame licking off it, around
 * a dark hole. Modelled on the mark as it appears burning in the dark —
 * a white-hot line, tongues rising from it, smoke and out-of-focus sparks
 * behind.
 *
 * The ring is drawn as a path rather than built from particles: particles
 * alone read as gravel, and a blurred band reads as a hoop. A jittered line
 * gives the torn edge, and the flame is what moves.
 */

const VIEW = 400;
const RING = 140; // centreline radius, viewBox units
const BRAND_R = RING + 30; // the scar, just outside the fire's reach

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

const BRAND_ARCS = [
  [-14, 74],
  [82, 168],
  [176, 252],
  [260, 344],
].map(([from, to]) => arcPath(BRAND_R, from, to));

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

type Mote = { x: number; y: number; size: number; alpha: number; phase: number };

/* ------------------------------------------------------------------ */
/* The fire                                                            */
/* ------------------------------------------------------------------ */

function DarksignFire({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprites = FIRE_HUES.map((hue) => buildEmberSprite(hue, 96));
    const smokeSprite = buildEmberSprite(
      { core: "150, 118, 96", mid: "110, 82, 64", edge: "60, 42, 30" },
      96,
    );

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const FLAME_MAX = mobile ? 170 : 380;
    const SPARK_MAX = mobile ? 30 : 70;
    const SMOKE_MAX = mobile ? 7 : 14;

    let width = 0;
    let height = 0;
    let scale = 1;
    let cx = 0;
    let cy = 0;
    let flames: Cell[] = [];
    let sparks: Cell[] = [];
    let smoke: Cell[] = [];
    let bokeh: Mote[] = [];
    let flameDebt = 0;
    let sparkDebt = 0;
    let smokeDebt = 0;
    let clock = 0;
    let raf = 0;
    let previous = performance.now();
    let onScreen = true;

    /** The ring is not a circle: it is torn, and thicker in places. */
    const ringRadius = (theta: number) =>
      RING *
      (1 +
        0.016 * Math.sin(theta * 3 + 0.7) +
        0.01 * Math.sin(theta * 7 + 2.1) +
        0.007 * Math.sin(theta * 13 + 4.3)) *
      scale;

    const ringPoint = (theta: number) => {
      const radius = ringRadius(theta);
      return {
        x: cx + Math.cos(theta) * radius,
        y: cy + Math.sin(theta) * radius,
        radius,
      };
    };

    // Tongues come from a handful of hot spots that drift; spawning evenly
    // around the ring can only ever produce a halo.
    // Biased to the upper half — fire climbs, it does not sit level.
    const anchors = [-2.5, -1.95, -1.35, -0.6, 0.75, 2.35];
    const anchorAt = (index: number) =>
      anchors[index] + Math.sin(clock * 0.28 + index * 1.9) * 0.42;

    const spawnFlame = (): Cell => {
      const theta =
        anchorAt(Math.floor(Math.random() * anchors.length)) +
        (Math.random() - 0.5) * 0.42;
      const at = ringPoint(theta);
      // Tallest at the top of the ring, shortest at the foot: fire climbs, and
      // flames off the bottom would only fill the hole.
      const height = (1 - Math.sin(theta)) / 2;
      const reach = 0.45 + 0.8 * height;
      return {
        x: at.x,
        y: at.y,
        vx: Math.cos(theta) * (26 + Math.random() * 44) * scale,
        vy: -(50 + Math.random() * 95) * scale * (0.55 + 0.6 * height),
        size: (16 + Math.random() * 30) * scale * (0.75 + 0.45 * height),
        age: 0,
        ttl: (0.7 + Math.random() * 0.6) * reach,
        seed: Math.random() * Math.PI * 2,
      };
    };

    const spawnSpark = (): Cell => {
      const theta = Math.random() * Math.PI * 2;
      const at = ringPoint(theta);
      return {
        x: at.x,
        y: at.y,
        vx: (Math.random() - 0.5) * 26 * scale,
        vy: -(30 + Math.random() * 70) * scale,
        size: (1 + Math.random() * 2.2) * scale,
        age: 0,
        ttl: 1.2 + Math.random() * 1.8,
        seed: Math.random() * Math.PI * 2,
      };
    };

    const spawnSmoke = (): Cell => {
      const theta = Math.random() * Math.PI * 2;
      const at = ringPoint(theta);
      return {
        x: at.x,
        y: at.y,
        vx: (Math.random() - 0.5) * 10 * scale,
        vy: -(12 + Math.random() * 24) * scale,
        size: (50 + Math.random() * 70) * scale,
        age: 0,
        ttl: 2.4 + Math.random() * 1.8,
        seed: Math.random() * Math.PI * 2,
      };
    };

    const advance = (cell: Cell, delta: number, buoyancy: number) => {
      cell.age += delta;
      cell.vy -= buoyancy * scale * delta;
      cell.vx += Math.sin(clock * 1.6 + cell.seed) * 30 * scale * delta;
      const drag = 1 - 1.5 * delta;
      cell.vx *= Math.max(0, drag);
      cell.vy *= Math.max(0, drag * 0.96);
      cell.x += cell.vx * delta;
      cell.y += cell.vy * delta;
    };

    const draw = () => {
      if (width < 4 || height < 4) return;
      ctx.clearRect(0, 0, width, height);

      const breath = 0.86 + 0.1 * Math.sin(clock * 2.2) + 0.04 * Math.sin(clock * 7.3);

      // Smoke first — it belongs behind everything.
      ctx.globalCompositeOperation = "source-over";
      for (const cell of smoke) {
        const t = cell.age / cell.ttl;
        const size = cell.size * (0.6 + 1.2 * t);
        ctx.globalAlpha = Math.sin(Math.PI * t) * 0.1;
        ctx.drawImage(
          smokeSprite,
          cell.x - size / 2,
          cell.y - size / 2,
          size,
          size,
        );
      }

      ctx.globalCompositeOperation = "lighter";

      // Out-of-focus sparks in the air around the mark.
      for (const mote of bokeh) {
        const drift = Math.sin(clock * 0.5 + mote.phase) * 6 * scale;
        const size = mote.size * scale;
        ctx.globalAlpha = mote.alpha * (0.7 + 0.3 * Math.sin(clock * 0.9 + mote.phase));
        ctx.drawImage(
          sprites[0],
          mote.x + drift - size / 2,
          mote.y - size / 2,
          size,
          size,
        );
      }

      // The ring itself: a ragged, blazing line.
      const steps = 200;
      const path = new Path2D();
      for (let index = 0; index <= steps; index += 1) {
        const theta = (index / steps) * Math.PI * 2;
        const point = ringPoint(theta);
        if (index === 0) path.moveTo(point.x, point.y);
        else path.lineTo(point.x, point.y);
      }
      path.closePath();

      ctx.filter = `blur(${Math.round(7 * scale)}px)`;
      ctx.strokeStyle = `rgba(196, 68, 7, ${0.55 * breath})`;
      ctx.lineWidth = 11 * scale;
      ctx.stroke(path);
      ctx.filter = "none";

      ctx.strokeStyle = `rgba(228, 102, 28, ${0.9 * breath})`;
      ctx.lineWidth = 2.6 * scale;
      ctx.stroke(path);

      ctx.strokeStyle = `rgba(255, 236, 196, 1)`;
      ctx.lineWidth = 1.7 * scale;
      ctx.stroke(path);

      // Flame licking off it.
      for (const cell of flames) {
        const t = cell.age / cell.ttl;
        const band = Math.min(
          sprites.length - 1,
          Math.floor(t * sprites.length),
        );
        const size = cell.size * (0.65 + 0.85 * t);
        const alpha = 0.46 * Math.min(1, t * 9) * Math.pow(1 - t, 0.8);
        if (alpha <= 0.004) continue;
        ctx.globalAlpha = alpha;
        // Tall and narrow: a lick of flame, not a bead of light.
        const w = size * 0.62;
        const h = size * 1.95;
        ctx.drawImage(sprites[band], cell.x - w / 2, cell.y - h / 2, w, h);
      }

      for (const cell of sparks) {
        const t = cell.age / cell.ttl;
        const band = Math.min(
          sprites.length - 1,
          Math.floor(t * sprites.length),
        );
        const alpha = Math.sin(Math.PI * clamp01(t)) * 0.9;
        if (alpha <= 0.004) continue;
        const size = cell.size * (1 - 0.35 * t);
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
      sparkDebt += (SPARK_MAX / 2) * delta;
      smokeDebt += (SMOKE_MAX / 3.4) * delta;

      while (flameDebt >= 1) {
        if (flames.length < FLAME_MAX + 40) flames.push(spawnFlame());
        flameDebt -= 1;
      }
      while (sparkDebt >= 1) {
        if (sparks.length < SPARK_MAX + 16) sparks.push(spawnSpark());
        sparkDebt -= 1;
      }
      while (smokeDebt >= 1) {
        if (smoke.length < SMOKE_MAX + 8) smoke.push(spawnSmoke());
        smokeDebt -= 1;
      }

      flames = flames.filter((cell) => {
        advance(cell, delta, 105);
        return cell.age < cell.ttl;
      });
      sparks = sparks.filter((cell) => {
        advance(cell, delta, 55);
        return cell.age < cell.ttl;
      });
      smoke = smoke.filter((cell) => {
        advance(cell, delta, 18);
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
      // A lit mark that does not move: flames already part-way up, so the
      // shape reads the same as it does in motion.
      const count = mobile ? 90 : 190;
      flames = Array.from({ length: count }, (_, index) => {
        const cell = spawnFlame();
        const theta = (index / count) * Math.PI * 2 + Math.random() * 0.1;
        const at = ringPoint(theta);
        cell.x = at.x;
        cell.y = at.y;
        cell.age = Math.random() * cell.ttl;
        cell.y -= Math.random() * 40 * scale;
        return cell;
      });
      sparks = Array.from({ length: mobile ? 16 : 40 }, () => {
        const cell = spawnSpark();
        cell.age = Math.random() * cell.ttl;
        return cell;
      });
      smoke = Array.from({ length: 10 }, () => {
        const cell = spawnSmoke();
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
        sparks = [];
        smoke = [];
        bokeh = [];
        return;
      }

      bokeh = Array.from({ length: 14 }, () => {
        const theta = Math.random() * Math.PI * 2;
        const radius = (RING + 40 + Math.random() * 90) * scale;
        return {
          x: cx + Math.cos(theta) * radius,
          y: cy + Math.sin(theta) * radius * 0.9,
          size: 6 + Math.random() * 16,
          alpha: 0.05 + Math.random() * 0.12,
          phase: Math.random() * Math.PI * 2,
        };
      });

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
  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* The hollow: dark, with the fire's warmth bleeding a little way in. */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(20, 6, 0, 0.97) 0%, rgba(22, 7, 0, 0.9) 52%, rgba(120, 34, 6, 0.12) 64%, transparent 74%)",
        }}
      />

      {/* The scar, faint, sitting outside the flame. */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <g
          stroke="#998c7d"
          strokeOpacity="0.09"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {BRAND_ARCS.map((d, index) => (
            <path key={`arc-${index}`} d={d} />
          ))}
        </g>
      </svg>

      <DarksignFire className="absolute inset-0" />
    </div>
  );
}