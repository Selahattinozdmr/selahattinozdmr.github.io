import type { Dictionary } from "@/content/types";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";

export default function Skills({ t }: { t: Dictionary }) {
  const s = t.skills;
  return (
    <SectionShell id="skills" label={s.eyebrow} title={s.title}>
      <p className="max-w-[62ch] text-muted">{s.subtitle}</p>
      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {s.groups.map((g, i) => (
          <Reveal key={g.title} delay={0.04 * i} y={16}>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">{g.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{g.summary}</p>
            <p className="mt-4 font-mono text-sm leading-relaxed text-fg">{g.items.join(" · ")}</p>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
