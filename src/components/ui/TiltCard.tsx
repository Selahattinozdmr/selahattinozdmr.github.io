"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  lift?: number;
};

/** 3D pointer tilt with lerp smoothing, glare highlight and hover lift. */
export default function TiltCard({ children, className = "", max = 10, glare = true, lift = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const state = useRef({ tx: 0, ty: 0, x: 0, y: 0, hover: 0, h: 0, raf: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;
    const el = ref.current;
    if (!el) return;
    const s = state.current;

    const tick = () => {
      s.x += (s.tx - s.x) * 0.12;
      s.y += (s.ty - s.y) * 0.12;
      s.h += (s.hover - s.h) * 0.12;
      el.style.transform = `perspective(900px) rotateX(${(-s.y * max).toFixed(2)}deg) rotateY(${(s.x * max).toFixed(2)}deg) translateY(${(-s.h * lift).toFixed(2)}px)`;
      const settled =
        Math.abs(s.tx - s.x) < 0.001 && Math.abs(s.ty - s.y) < 0.001 && Math.abs(s.hover - s.h) < 0.001;
      s.raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const start = () => {
      if (!s.raf) s.raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      s.tx = px * 2 - 1;
      s.ty = py * 2 - 1;
      s.hover = 1;
      if (glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.16), transparent 55%)`;
      }
      start();
    };
    const leave = () => {
      s.tx = 0;
      s.ty = 0;
      s.hover = 0;
      if (glareRef.current) glareRef.current.style.opacity = "0";
      start();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [max, lift]);

  return (
    <div ref={ref} className={`relative will-change-transform ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
      {glare ? (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      ) : null}
    </div>
  );
}
