import type { Dictionary } from "@/content/types";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";
import TimelineLine from "@/components/motion/TimelineLine";

export default function Experience({ t }: { t: Dictionary }) {
  const e = t.experience;
  return (
    <SectionShell id="experience" label={e.eyebrow} title={e.title}>
      <TimelineLine>
        <ol className="space-y-12">
          {e.items.map((item, i) => (
            <li key={item.company + item.period} className="grid gap-3 border-t border-line pt-8 md:grid-cols-[12rem_1fr] md:gap-8">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                <span className="whitespace-nowrap">{item.period}</span><br />{item.location}
              </div>
              <Reveal delay={0.04 * i} y={16}>
                <h3 className="font-display text-2xl font-normal">{item.role}</h3>
                <p className="mt-1 font-mono text-sm text-accent-ink">{item.company}</p>
                <ul className="mt-4 space-y-2 text-muted">{item.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <p className="mt-4 text-sm text-muted">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-accent-ink">{e.outcomeLabel}</span>{" "}
                  {item.outcome}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </TimelineLine>
    </SectionShell>
  );
}
