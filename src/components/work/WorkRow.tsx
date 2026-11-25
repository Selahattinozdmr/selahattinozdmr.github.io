"use client";

import Image from "next/image";
import { useEffect, useState, type PointerEvent } from "react";
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

export default function WorkRow({ project, index, labels }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  const handlePointerMove = (event: PointerEvent<HTMLLIElement>) => {
    if (!enabled) return;
    const maxX = window.innerWidth - PREVIEW_WIDTH - 16;
    const maxY = window.innerHeight - PREVIEW_HEIGHT - 16;
    setPosition({
      x: Math.max(16, Math.min(event.clientX + 24, maxX)),
      y: Math.max(16, Math.min(event.clientY + 24, maxY)),
    });
    setVisible(true);
  };

  return (
    <li
      className="grid gap-4 border-t border-line py-10 md:grid-cols-[3rem_1fr_auto] md:gap-8"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setVisible(false)}
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
          <details className="mt-5">
            <summary className="w-fit cursor-pointer font-mono text-xs uppercase tracking-[0.12em] text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {labels.caseNote}
            </summary>
            <ul className="mt-3 space-y-2 text-sm text-muted">
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
      {enabled ? (
        <div
          aria-hidden
          className="pointer-events-none fixed z-40 transition-opacity duration-300"
          style={{
            left: position.x,
            top: position.y,
            opacity: visible ? 1 : 0,
          }}
        >
          <Image
            src={asset(project.image)}
            alt=""
            width={560}
            height={314}
            sizes="280px"
            className="h-auto w-[280px] rounded-sm border border-line object-cover"
          />
        </div>
      ) : null}
    </li>
  );
}
