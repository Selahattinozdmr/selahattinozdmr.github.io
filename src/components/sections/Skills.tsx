import type { ReactNode } from "react";
import type { Dictionary } from "@/content/types";
import Reveal from "@/components/ui/Reveal";

export default function Skills({ t, children }: { t: Dictionary; children?: ReactNode }) {
  const s = t.skills;
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-cyan uppercase">{s.eyebrow}</p>
            <h2
              id="skills-title"
              className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              {s.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">{s.subtitle}</p>
          </Reveal>
          <div className="mt-10 space-y-7">
            {s.groups.map((g, i) => (
              <Reveal key={g.title} delay={0.05 * i} y={20}>
                <h3 className="font-mono text-xs tracking-widest text-orange uppercase">{g.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="glass rounded-full px-3.5 py-1.5 text-sm text-fg transition hover:border-cyan/50 hover:text-cyan"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="relative min-h-[320px] w-full">{children}</div>
      </div>
    </section>
  );
}
