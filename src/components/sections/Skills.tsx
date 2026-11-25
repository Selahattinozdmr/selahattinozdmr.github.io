import type { Dictionary } from "@/content/types";
import Reveal from "@/components/ui/Reveal";

export default function Skills({ t }: { t: Dictionary }) {
  const s = t.skills;
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="font-mono text-sm tracking-widest text-accent-ink uppercase">{s.eyebrow}</p>
          <h2
            id="skills-title"
            className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl"
          >
            {s.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">{s.subtitle}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.groups.map((g, i) => (
            <Reveal key={g.title} delay={0.04 * i} y={20} className="h-full">
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="font-mono text-xs tracking-widest text-accent-ink uppercase">{g.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border border-line bg-fg/[0.04] px-3 py-1.5 text-sm text-fg"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
