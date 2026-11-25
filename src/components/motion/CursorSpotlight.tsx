"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

export default function CursorSpotlight({ children, className, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!fine.matches || !motion.matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };
    const onEnter = () => el.setAttribute("data-spot", "on");
    const onLeave = () => {
      el.removeAttribute("data-spot");
      el.style.setProperty("--spot-x", "50%");
      el.style.setProperty("--spot-y", "50%");
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} {...rest} className={`spotlight relative ${className ?? ""}`}>
      {children}
    </div>
  );
}
