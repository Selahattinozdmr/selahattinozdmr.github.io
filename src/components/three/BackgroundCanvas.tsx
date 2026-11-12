"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const BackgroundScene = dynamic(() => import("./BackgroundScene"), {
  ssr: false,
});

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export default function BackgroundCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const h = window.innerHeight;
      const o = smoothstep(h * 1.6, h * 2.4, window.scrollY);
      el.style.opacity = o.toFixed(3);
      el.style.visibility = o < 0.003 ? "hidden" : "visible";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <BackgroundScene />
    </div>
  );
}
