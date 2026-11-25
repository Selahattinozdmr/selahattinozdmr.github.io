"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

type Props = {
  className?: string;
};

export default function SectionRule({ className }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} aria-hidden className={`relative h-px w-full overflow-hidden bg-line ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0 origin-left bg-accent"
        initial={false}
        animate={{ scaleX: reduce || inView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
