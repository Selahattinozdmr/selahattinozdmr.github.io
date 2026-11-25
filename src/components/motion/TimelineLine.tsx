"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef, type ReactNode } from "react";

export default function TimelineLine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  return (
    <div ref={ref} className="relative pl-6 md:pl-10">
      <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-line" />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 w-px origin-top bg-accent"
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
      />
      {children}
    </div>
  );
}
