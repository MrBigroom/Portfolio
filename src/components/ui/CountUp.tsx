"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a metric up once it scrolls into view. Values keep their shape —
 * "3,650" groups its thousands, "124 GB" keeps its unit.
 */
export default function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const parsed = useMemo(() => {
    const match = value.match(/^([\d,.]+)(.*)$/);
    if (!match) return null;
    const numeric = match[1].replace(/,/g, "");
    const target = Number(numeric);
    if (!Number.isFinite(target)) return null;
    return {
      target,
      decimals: numeric.includes(".") ? numeric.split(".")[1].length : 0,
      grouped: match[1].includes(","),
      suffix: match[2],
    };
  }, [value]);

  useEffect(() => {
    if (!inView || !parsed) return;
    if (reduced) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const started = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [inView, reduced, parsed]);

  if (!parsed) return <span className={className}>{value}</span>;

  const current = parsed.target * progress;
  const rounded =
    parsed.decimals > 0
      ? current.toFixed(parsed.decimals)
      : Math.round(current).toString();

  const [whole, fraction] = rounded.split(".");
  const display = parsed.grouped
    ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (fraction ? `.${fraction}` : "")
    : rounded;

  return (
    <span ref={ref} className={className}>
      {display}
      {parsed.suffix}
    </span>
  );
}
