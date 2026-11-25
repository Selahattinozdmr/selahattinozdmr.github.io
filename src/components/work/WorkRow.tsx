"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Project } from "@/content/types";
import { asset } from "@/lib/asset";

type Labels = { problem: string; outcome: string; caseNote: string; visit: string };

type Props = {
  project: Project;
  index: number;
  labels: Labels;
};

const PREVIEW_WIDTH = 280;
const PREVIEW_HEIGHT = Math.round((PREVIEW_WIDTH * 314) / 560);
const FADE_MS = 300;

export default function WorkRow({ project, index, labels }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverRef = useRef(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 20 });
  const springY = useSpring(y, { stiffness: 160, damping: 20 });

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(hoverQuery.matches && motionQuery.matches);
    update();
    hoverQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      hoverQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const target = (clientX: number, clientY: number) => {
    const maxX = Math.max(16, window.innerWidth - PREVIEW_WIDTH - 16);
    const maxY = Math.max(16, window.innerHeight - PREVIEW_HEIGHT - 16);
    return {
      x: Math.max(16, Math.min(clientX + 24, maxX)),
      y: Math.max(16, Math.min(clientY + 24, maxY)),
    };
  };

  const place = (clientX: number, clientY: number) => {
    const next = target(clientX, clientY);
    x.set(next.x);
    y.set(next.y);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLLIElement>) => {
    if (!enabled) return;
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    const next = target(event.clientX, event.clientY);
    x.set(next.x);
    y.set(next.y);
    springX.jump(next.x);
    springY.jump(next.y);
    opacity.set(0);
    hoverRef.current = true;
    setHovered(true);
    requestAnimationFrame(() => {
      if (hoverRef.current) opacity.set(1);
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLLIElement>) => {
    if (!enabled || !hoverRef.current) return;
    place(event.clientX, event.clientY);
    opacity.set(1);
  };

  const handlePointerLeave = () => {
    hoverRef.current = false;
    opacity.set(0);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      hideTimer.current = null;
      if (!hoverRef.current) setHovered(false);
    }, FADE_MS);
  };

  return (
    <li
      className="work-row grid gap-4 border-t border-line py-10 md:grid-cols-[3rem_1fr_auto] md:gap-8"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="font-display text-3xl leading-tight md:text-4xl">{project.name}</h3>
        <p className="mt-4 max-w-[62ch] text-muted">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-accent-ink">
            {labels.problem}
          </span>{" "}
          {project.problem}
        </p>
        <p className="mt-2 max-w-[62ch] text-sm text-muted">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-accent-ink">
            {labels.outcome}
          </span>{" "}
          {project.outcome}
        </p>
        <p className="mt-4 font-mono text-xs text-accent-ink">{project.stack.join(" · ")}</p>
        {project.details && project.details.length > 0 ? (
          <details className="group mt-5">
            <summary className="flex w-fit cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {labels.caseNote}
              <span
                aria-hidden="true"
                className="inline-grid h-4 w-4 place-items-center text-sm leading-none transition-transform duration-300 ease-out group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <ul className="details-body mt-3 space-y-2 text-sm text-muted">
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
        ) : null}
      </div>
      <div className="md:pt-2">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} — ${project.linkLabel ?? labels.visit}`}
            className="inline-flex w-fit items-center gap-2 text-sm text-accent-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {project.linkLabel ?? labels.visit}
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        ) : null}
      </div>
      {hovered && enabled ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-40 transition-opacity duration-300 will-change-transform"
          style={{ x: springX, y: springY, opacity }}
        >
          <Image
            src={asset(project.image)}
            alt=""
            aria-hidden
            loading="lazy"
            width={560}
            height={314}
            sizes="280px"
            className="h-auto w-[280px] rounded-sm border border-line object-cover"
          />
        </motion.div>
      ) : null}
    </li>
  );
}
