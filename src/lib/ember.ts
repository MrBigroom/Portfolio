/**
 * Sprite toolkit shared by the two things that drift in this page: the fire
 * on the Darksign, and the ash that falls off it.
 *
 * Particles are drawn from pre-rendered radiance sprites rather than
 * per-frame gradients — one drawImage each keeps both fields cheap — and the
 * four tints carry a mote from hot to cold as it ages.
 */

export type EmberHue = { core: string; mid: string; edge: string };

/** Hot. The Darksign, and nothing else. */
export const FIRE_HUES: EmberHue[] = [
  { core: "255, 245, 228", mid: "255, 198, 132", edge: "255, 122, 43" },
  { core: "255, 214, 160", mid: "255, 161, 79", edge: "232, 90, 16" },
  { core: "255, 170, 92", mid: "232, 90, 16", edge: "125, 38, 4" },
  { core: "210, 96, 48", mid: "125, 38, 4", edge: "74, 22, 3" },
];

/** Cold. Ash without a fire under it. */
export const ASH_HUES: EmberHue[] = [
  { core: "226, 232, 236", mid: "168, 178, 187", edge: "96, 104, 112" },
  { core: "198, 206, 213", mid: "134, 146, 156", edge: "74, 83, 92" },
  { core: "168, 178, 187", mid: "102, 113, 123", edge: "48, 57, 65" },
  { core: "120, 130, 140", mid: "60, 72, 82", edge: "30, 36, 42" },
];

export function buildEmberSprite(hue: EmberHue, size = 64): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(0, `rgba(${hue.core}, 1)`);
  gradient.addColorStop(0.18, `rgba(${hue.mid}, 0.78)`);
  gradient.addColorStop(0.48, `rgba(${hue.edge}, 0.26)`);
  gradient.addColorStop(1, `rgba(${hue.edge}, 0)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

export const clamp01 = (value: number) =>
  value < 0 ? 0 : value > 1 ? 1 : value;
