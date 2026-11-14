/**
 * Shared ember rendering primitives.
 *
 * Embers are drawn from pre-rendered radiance sprites rather than per-frame
 * gradients: one drawImage per particle keeps the field cheap, and four tints
 * carry an ember from white-hot to cooling slag as it climbs.
 */

export type EmberHue = { core: string; mid: string; edge: string };

/** Hot → cold. The first entry is the fire itself; the last is only ash's memory of it. */
export const EMBER_HUES: EmberHue[] = [
  { core: "255, 245, 228", mid: "255, 198, 132", edge: "255, 122, 43" },
  { core: "255, 214, 160", mid: "255, 161, 79", edge: "232, 90, 16" },
  { core: "255, 170, 92", mid: "232, 90, 16", edge: "125, 38, 4" },
  { core: "210, 96, 48", mid: "125, 38, 4", edge: "74, 22, 3" },
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
