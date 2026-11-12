"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Animates the numeric part of a string like "5+" or "3.42" when scrolled into view. */
export default function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(m && !reduce ? "0" : (m?.[2] ?? ""));

  useEffect(() => {
    if (!m || !inView || reduce) return;
    const raw = m[2];
    const decimals = raw.includes(".") ? raw.split(".")[1].length : raw.includes(",") ? raw.split(",")[1].length : 0;
    const target = parseFloat(raw.replace(",", "."));
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
      onComplete: () => setDisplay(raw),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  if (!m) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {m[1]}
      {display}
      {m[3]}
    </span>
  );
}
