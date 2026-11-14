"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { EMBER_HUES, buildEmberSprite, clamp01 } from "@/lib/ember";

/**
 * A coiled sword in a heap of ash, and the fire it feeds.
 *
 * Modelled on the real bonfire: a low heap of pale ash with bone shards
 * radiating out of it, a thin *twisted* blade driven through the middle, and
 * a tall torn plume of flame that wraps the blade's lower half. The fire is a
 * buoyant particle simulation — additively blended temperature bands rising
 * out of a narrow base — because a blurred gradient can glow but cannot tear.
 */

/* ------------------------------------------------------------------ */
/* Geometry (deterministic, so server and client agree)                */
/* ------------------------------------------------------------------ */

/**
 * The blade is a straight, slender spike. What makes it a *coiled* sword is
 * the helix of metal wound around it — highlighted where the coil passes in
 * front, dimmed where it passes behind, which is what gives it depth.
 */
const BLADE_TOP = 168;
const BLADE_TIP = 432;
const BLADE_HALF = 4.4;
const STRAND_TURNS = 7;
const STRAND_STEPS = 160;

/** Widest just under the guard, tapering to a point — a leaf, not a rod. */
function bladeHalfWidth(t: number) {
  return BLADE_HALF * Math.pow(1 - t, 0.72) * (1 + 0.1 * Math.sin(t * Math.PI));
}

const BLADE_OUTLINE = (() => {
  const left: string[] = [];
  const right: string[] = [];
  const steps = 48;
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const y = BLADE_TOP + (BLADE_TIP - BLADE_TOP) * t;
    const half = bladeHalfWidth(t);
    left.push(`${index === 0 ? "M" : "L"}${(150 - half).toFixed(2)} ${y.toFixed(1)}`);
    right.unshift(`L${(150 + half).toFixed(2)} ${y.toFixed(1)}`);
  }
  return `${left.join("")}${right.join("")}Z`;
})();

/**
 * The blade is a tightly braided bar: three strands twisting inside a solid
 * silhouette. The strands shade the surface; they never open the outline, so
 * the blade stays a blade instead of becoming a spring.
 */
const STRANDS = [0, 2, 4].map((third) => {
  const points: string[] = [];
  for (let index = 0; index <= STRAND_STEPS; index += 1) {
    const t = index / STRAND_STEPS;
    const y = BLADE_TOP + (BLADE_TIP - BLADE_TOP) * t;
    const half = bladeHalfWidth(t);
    const x =
      150 +
      Math.sin((t * STRAND_TURNS + third / 6) * Math.PI * 2) * half * 0.82;
    points.push(`${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(1)}`);
  }
  return points.join("");
});

type Bone = {
  d: string;
  width: number;
  tone: "pale" | "dim";
  front: boolean;
  /** The knuckle that shows above the ash. */
  knob: [number, number];
};

/**
 * Shards in the pile: short, tapered, mostly buried. Long bright sticks
 * radiating from one point read as a starburst, not a heap.
 */
const BONES: Bone[] = [
  { d: "M128 425Q112 417 99 418", width: 2.9, tone: "pale", front: false, knob: [99, 418] },
  { d: "M172 426Q188 419 201 421", width: 2.7, tone: "dim", front: false, knob: [201, 421] },
  { d: "M122 434Q107 436 94 442", width: 2.6, tone: "dim", front: false, knob: [94, 442] },
  { d: "M178 435Q193 439 207 445", width: 2.7, tone: "dim", front: false, knob: [207, 445] },
  { d: "M145 441Q134 447 125 452", width: 3.0, tone: "pale", front: true, knob: [125, 452] },
  { d: "M158 441Q170 447 180 452", width: 2.7, tone: "dim", front: true, knob: [180, 452] },
];

const ASH_SHAPE =
  "M40 452C52 442 62 434 78 428c10-4 14-12 26-14 8-2 14-8 24-6 8 2 12 7 22 7s14-5 22-7c10-2 16 4 24 6 12 2 16 10 26 14 16 6 26 14 38 24z";

/** The near lip of the heap, drawn over the blade so it is actually buried. */
const ASH_FRONT = "M110 452c8-15 24-23 40-23s32 8 40 23z";

/** Deterministic ash grain — a heap with a surface, not a smooth dome. */
const ashRandom = (() => {
  let seed = 97;
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
})();

const ASH_GRAIN = Array.from({ length: 64 }, () => {
  const x = 44 + ashRandom() * 212;
  const centreBias = Math.max(0, 1 - Math.abs(x - 150) / 128);
  const y = 452 - ashRandom() * (14 + centreBias * 26);
  return {
    x: Number(x.toFixed(1)),
    y: Number(y.toFixed(1)),
    r: Number((0.5 + ashRandom() * 1.2).toFixed(2)),
    light: ashRandom() > 0.42,
  };
});

/* ------------------------------------------------------------------ */
/* Fire                                                                */
/* ------------------------------------------------------------------ */

type Band = { core: string; mid: string; edge: string };

/** Hottest first: white-hot core → orange → cooling red. */
const FIRE_BANDS: Band[] = [
  { core: "255,252,236", mid: "255,226,158", edge: "255,168,66" },
  { core: "255,238,184", mid: "255,198,96", edge: "255,138,38" },
  { core: "255,198,112", mid: "255,142,52", edge: "226,78,14" },
  { core: "242,152,74", mid: "204,80,26", edge: "148,40,8" },
  { core: "172,84,44", mid: "108,40,14", edge: "58,20,6" },
];

function buildSprite(stops: Array<[number, string]>, size = 96) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  for (const [at, colour] of stops) gradient.addColorStop(at, colour);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

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

function BonfireFire({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fireSprites = FIRE_BANDS.map((band) =>
      buildSprite([
        [0, `rgba(${band.core}, 1)`],
        [0.26, `rgba(${band.mid}, 0.62)`],
        [0.62, `rgba(${band.edge}, 0.18)`],
        [1, `rgba(${band.edge}, 0)`],
      ]),
    );
    const smokeSprite = buildSprite([
      [0, "rgba(126,122,116,0.5)"],
      [0.5, "rgba(96,93,88,0.22)"],
      [1, "rgba(70,68,64,0)"],
    ]);
    const emberSprites = EMBER_HUES.map((hue) => buildEmberSprite(hue, 48));

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const FLAME_MAX = mobile ? 130 : 300;
    const EMBER_MAX = mobile ? 16 : 38;
    const SMOKE_MAX = mobile ? 7 : 14;

    let width = 0;
    let height = 0;
    // Particle sizes are authored against a 620px-tall bonfire; shrink them on
    // small canvases so a phone does not get one fat blur.
    let unit = 1;
    let flames: Cell[] = [];
    let embers: Cell[] = [];
    let smoke: Cell[] = [];
    let flameDebt = 0;
    let emberDebt = 0;
    let smokeDebt = 0;
    let clock = 0;
    let raf = 0;
    let previous = performance.now();
    let onScreen = true;

    const base = () => ({ x: width / 2, y: height * 0.955 });

    const spawnFlame = (): Cell => {
      const spread = Math.max(1, width * 0.12);
      // Uniform across the axis: an inner-only spawn leaves a hole exactly
      // where the blade sits.
      const offset = (Math.random() * 2 - 1) * spread;
      const outer = Math.min(1, Math.abs(offset) / spread);
      return {
        x: base().x + offset,
        y: base().y - Math.random() * height * 0.018,
        vx: (Math.random() - 0.5) * 46,
        vy: -(150 + Math.random() * 130),
        size: (24 + Math.random() * 50) * unit,
        age: 0,
        ttl: (0.9 + Math.random() * 0.55) * (1 - 0.18 * outer),
        seed: Math.random() * Math.PI * 2,
      };
    };

    const spawnEmber = (): Cell => ({
      x: base().x + (Math.random() - 0.5) * width * 0.14,
      y: base().y - Math.random() * height * 0.22,
      vx: (Math.random() - 0.5) * 34,
      vy: -(110 + Math.random() * 150),
      size: 2 + Math.random() * 4.5,
      age: 0,
      ttl: 1.6 + Math.random() * 1.8,
      seed: Math.random() * Math.PI * 2,
    });

    const spawnSmoke = (): Cell => ({
      x: base().x + (Math.random() - 0.5) * width * 0.06,
      y: height * 0.62 - Math.random() * height * 0.05,
      vx: (Math.random() - 0.5) * 12,
      vy: -(26 + Math.random() * 34),
      size: (60 + Math.random() * 70) * unit,
      age: 0,
      ttl: 2.6 + Math.random() * 1.6,
      seed: Math.random() * Math.PI * 2,
    });

    const advance = (
      cell: Cell,
      delta: number,
      buoyancy: number,
      drag: number,
      gather: number,
    ) => {
      cell.age += delta;
      const t = cell.age / cell.ttl;
      cell.vy -= buoyancy * delta;
      cell.vx += Math.sin(cell.y * 0.021 + clock * 2.1 + cell.seed) * 72 * delta;
      cell.vx *= Math.max(0, 1 - drag * delta);
      // A fire is broad where it feeds and converges as it climbs, so the pull
      // toward the axis grows with age instead of fading.
      cell.vx += (base().x - cell.x) * (0.6 + 1.2 * clamp01(t)) * gather * delta;
      cell.x += cell.vx * delta;
      cell.y += cell.vy * delta;
      return t;
    };

    const draw = () => {
      if (width < 4 || height < 4) return;
      ctx.clearRect(0, 0, width, height);

      // Smoke first: it belongs behind the flame.
      ctx.globalCompositeOperation = "source-over";
      for (const cell of smoke) {
        const t = cell.age / cell.ttl;
        const size = cell.size * (0.7 + 1.1 * t);
        ctx.globalAlpha = Math.sin(Math.PI * t) * 0.16;
        ctx.drawImage(
          smokeSprite,
          cell.x - size / 2,
          cell.y - size / 2,
          size,
          size,
        );
      }

      ctx.globalCompositeOperation = "lighter";

      for (const cell of flames) {
        const t = cell.age / cell.ttl;
        const band = Math.min(
          fireSprites.length - 1,
          Math.floor(t * fireSprites.length),
        );
        const size = cell.size * (0.72 + 0.62 * t);
        const fadeIn = Math.min(1, t * 9);
        const alpha = 0.64 * fadeIn * Math.pow(1 - t, 0.72);
        if (alpha <= 0.004) continue;
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          fireSprites[band],
          cell.x - size / 2,
          cell.y - size / 2,
          size,
          size,
        );
      }

      for (const cell of embers) {
        const t = cell.age / cell.ttl;
        const band = Math.min(
          emberSprites.length - 1,
          Math.floor(t * emberSprites.length),
        );
        const alpha = Math.sin(Math.PI * Math.min(1, t)) * 0.9;
        if (alpha <= 0.004) continue;
        const size = cell.size * (1 - 0.3 * t);
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          emberSprites[band],
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

      // Spawn at a steady rate rather than per frame, so the fire does not
      // change density with refresh rate.
      flameDebt += (FLAME_MAX / 1.15) * delta;
      emberDebt += (EMBER_MAX / 2.4) * delta;
      smokeDebt += (SMOKE_MAX / 3.2) * delta;

      while (flameDebt >= 1) {
        if (flames.length < FLAME_MAX + 40) flames.push(spawnFlame());
        flameDebt -= 1;
      }
      while (emberDebt >= 1) {
        if (embers.length < EMBER_MAX + 12) embers.push(spawnEmber());
        emberDebt -= 1;
      }
      while (smokeDebt >= 1) {
        if (smoke.length < SMOKE_MAX + 6) smoke.push(spawnSmoke());
        smokeDebt -= 1;
      }

      flames = flames.filter((cell) => {
        advance(cell, delta, 232, 2.1, 1);
        return cell.age < cell.ttl;
      });
      embers = embers.filter((cell) => {
        advance(cell, delta, 95, 0.8, 0.15);
        return cell.age < cell.ttl;
      });
      smoke = smoke.filter((cell) => {
        advance(cell, delta, 14, 0.5, 0.1);
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
      // One honest frame for reduced motion: a lit fire that does not move.
      flames = Array.from({ length: 150 }, () => {
        const cell = spawnFlame();
        cell.age = Math.random() * cell.ttl;
        cell.y = base().y - Math.random() * height * 0.5;
        return cell;
      });
      embers = Array.from({ length: 30 }, () => {
        const cell = spawnEmber();
        cell.age = Math.random() * cell.ttl;
        cell.y = base().y - Math.random() * height * 0.65;
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
      unit = Math.max(0.45, Math.min(1, height / 620));
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Only one of the two bonfires is ever laid out; the hidden one has a
      // zero-sized canvas and seeding it would divide by zero.
      if (width < 4 || height < 4) {
        flames = [];
        embers = [];
        smoke = [];
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
/* The shrine                                                          */
/* ------------------------------------------------------------------ */

function BoneShard({ bone }: { bone: Bone }) {
  const base = bone.tone === "pale" ? "#b2a58c" : "#7f7766";
  return (
    <g>
      <path
        d={bone.d}
        stroke="#1a1713"
        strokeOpacity="0.6"
        strokeWidth={bone.width + 2}
        strokeLinecap="round"
        transform="translate(0.8 1.6)"
      />
      <path
        d={bone.d}
        stroke={base}
        strokeWidth={bone.width}
        strokeLinecap="round"
      />
      <circle
        cx={bone.knob[0]}
        cy={bone.knob[1]}
        r={bone.width * 0.62}
        fill={base}
      />
      <circle
        cx={bone.knob[0] - 0.4}
        cy={bone.knob[1] - 0.6}
        r={bone.width * 0.3}
        fill="#e2cfae"
        fillOpacity={bone.tone === "pale" ? 0.35 : 0.18}
      />
    </g>
  );
}

export default function Bonfire({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[:]/g, "");
  const ash = `bf-ash-${uid}`;
  const bladeClip = `bf-bclip-${uid}`;
  const heat = `bf-heat-${uid}`;
  const ashClip = `bf-clip-${uid}`;
  const heapMask = `bf-mask-${uid}`;
  const heapFade = `bf-fade-${uid}`;
  const guard = `bf-guard-${uid}`;
  const scorch = `bf-scorch-${uid}`;
  const bloom = `bf-bloom-${uid}`;

  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* The pool of light the fire throws on the ground. */}
      <div className="absolute bottom-[0.5%] left-1/2 h-[26%] w-[120%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,140,52,0.26),rgba(184,61,8,0.09)_48%,transparent_76%)] blur-2xl" />

      <svg
        viewBox="0 0 300 460"
        fill="none"
        className="relative h-full w-full"
      >
        <defs>
          <radialGradient id={ash} cx="0.5" cy="0.95" r="0.64">
            <stop offset="0" stopColor="#a69a87" />
            <stop offset="0.26" stopColor="#857b69" />
            <stop offset="0.58" stopColor="#544d43" />
            <stop offset="1" stopColor="#231f1b" />
          </radialGradient>
          <radialGradient id={scorch} cx="0.5" cy="0.4" r="0.55">
            <stop offset="0" stopColor="#1d1915" stopOpacity="0.95" />
            <stop offset="0.6" stopColor="#2a241e" stopOpacity="0.7" />
            <stop offset="1" stopColor="#2a241e" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={guard}
            x1="116"
            y1="146"
            x2="184"
            y2="160"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#463a27" />
            <stop offset="0.42" stopColor="#bb9c6d" />
            <stop offset="1" stopColor="#463a27" />
          </linearGradient>
          <filter id={bloom} x="-60%" y="-30%" width="220%" height="170%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <linearGradient
            id={heat}
            x1="150"
            y1="250"
            x2="150"
            y2="432"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ff7a2b" stopOpacity="0" />
            <stop offset="1" stopColor="#ffab5e" stopOpacity="0.55" />
          </linearGradient>
          <clipPath id={bladeClip}>
            <path d={BLADE_OUTLINE} />
          </clipPath>
          <clipPath id={ashClip}>
            <path d={ASH_SHAPE} />
          </clipPath>
          <linearGradient
            id={heapFade}
            x1="0"
            y1="0"
            x2="0"
            y2="460"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.88" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={heapMask}>
            <rect
              x="0"
              y="0"
              width="300"
              height="460"
              fill={`url(#${heapFade})`}
            />
          </mask>
        </defs>

        {/* The heap, and the shards resting in it, sinking into the dark. */}
        <g mask={`url(#${heapMask})`}>
        {/* A second, lower heap behind the first breaks the dome silhouette. */}
        <path
          d="M48 452c8-11 24-18 42-19 10 0 18 4 26 9-22 3-50 7-68 10z"
          fill={`url(#${ash})`}
          opacity="0.8"
        />
        <path
          d="M214 452c10-9 26-14 42-13 8 1 14 5 20 9-22 2-46 4-62 4z"
          fill={`url(#${ash})`}
          opacity="0.7"
        />
        <path d={ASH_SHAPE} fill={`url(#${ash})`} />

        {/* Grain, clipped to the pile. */}
        <g clipPath={`url(#${ashClip})`}>
          <g fill="#d9cfbc" fillOpacity="0.16">
            {ASH_GRAIN.filter((grain) => grain.light).map((grain, index) => (
              <circle
                key={`light-${index}`}
                cx={grain.x}
                cy={grain.y}
                r={grain.r}
              />
            ))}
          </g>
          <g fill="#15120f" fillOpacity="0.3">
            {ASH_GRAIN.filter((grain) => !grain.light).map((grain, index) => (
              <circle
                key={`dark-${index}`}
                cx={grain.x}
                cy={grain.y}
                r={grain.r}
              />
            ))}
          </g>
        </g>

        {/* Where the fire sits on it. */}
        <ellipse
          cx="150"
          cy="437"
          rx="48"
          ry="15"
          fill="rgba(214,144,84,0.28)"
        />
        <ellipse cx="150" cy="439" rx="30" ry="8" fill={`url(#${scorch})`} />

        {/* Shards in the back of the pile. */}
        {BONES.filter((bone) => !bone.front).map((bone, index) => (
          <BoneShard key={`back-${index}`} bone={bone} />
        ))}
        </g>

        {/* The blade: a braided bar, hot where it enters the fire. */}
        <path d={BLADE_OUTLINE} fill="#4f4840" />
        <g clipPath={`url(#${bladeClip})`}>
          {STRANDS.map((strand, index) => (
            <g key={`strand-${index}`}>
              <path
                d={strand}
                fill="none"
                stroke="#271f19"
                strokeWidth="2.7"
                strokeLinecap="round"
                transform="translate(0.8 0.6)"
              />
              <path
                d={strand}
                fill="none"
                stroke="#93866f"
                strokeWidth="1.85"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>
        <path d={BLADE_OUTLINE} fill={`url(#${heat})`} />
        <path
          d={BLADE_OUTLINE}
          fill="none"
          stroke="#241f1a"
          strokeOpacity="0.55"
          strokeWidth="0.8"
        />


        {/* Guard, grip, pommel. */}
        <path
          d="M128 149q11-3.4 22-3.4t22 3.4l-1.8 5.4q-10.2-2.8-20.2-2.8t-20.2 2.8z"
          fill={`url(#${guard})`}
        />
        <path
          d="M129 154.6q10-2.4 21-2.4t21 2.4"
          stroke="#1c1712"
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
        <rect x="146.5" y="114" width="7" height="38" fill="#3d352c" />
        {[119, 125, 131, 137, 143, 149].map((y) => (
          <path
            key={y}
            d={`M146.5 ${y}h7`}
            stroke="#241f1a"
            strokeWidth="1.2"
          />
        ))}
        <circle cx="150" cy="109" r="5" fill="#5c4a2f" />
        <circle cx="150" cy="109" r="1.9" fill="#c4a878" />

        <g mask={`url(#${heapMask})`}>
        {/* The near lip buries the point. */}
        <path d={ASH_FRONT} fill={`url(#${ash})`} />
        <path
          d={ASH_FRONT}
          stroke="#b3a68e"
          strokeOpacity="0.12"
          strokeWidth="1"
        />

        {/* Shards the blade was driven through. */}
        {BONES.filter((bone) => bone.front).map((bone, index) => (
          <BoneShard key={`front-${index}`} bone={bone} />
        ))}
        </g>
      </svg>

      {/* The fire, in front of everything it is burning. */}
      <BonfireFire className="absolute inset-0" />
    </div>
  );
}