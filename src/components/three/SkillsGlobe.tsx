"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const SkillsGlobeScene = dynamic(() => import("./SkillsGlobeScene"), {
  ssr: false,
});

export default function SkillsGlobe({ hint }: { hint: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div ref={ref} className="relative h-[420px] w-full md:h-[560px]">
        <SkillsGlobeScene active={active} />
      </div>
      <p className="mt-3 text-center font-mono text-xs tracking-wide text-muted">
        {hint}
      </p>
    </div>
  );
}
