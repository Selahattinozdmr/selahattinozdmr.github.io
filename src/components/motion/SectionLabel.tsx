"use client";

import { useEffect, useState } from "react";

type Props = {
  sectionId: string;
  index?: string;
  text: string;
};

export default function SectionLabel({ sectionId, index, text }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  return (
    <p className="flex items-start gap-3 font-mono text-xs uppercase tracking-[0.16em] md:sticky md:top-28 md:self-start">
      {index ? <span className="text-accent-ink">{index}</span> : null}
      <span className="relative">
        <span className={active ? "text-fg" : "text-muted"}>{text}</span>
        <span aria-hidden className={active ? "absolute -bottom-2 left-0 h-px w-full bg-accent" : "hidden"} />
      </span>
    </p>
  );
}
