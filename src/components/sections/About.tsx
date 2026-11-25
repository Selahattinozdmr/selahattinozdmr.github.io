import type { Dictionary } from "@/content/types";
import CountUp from "@/components/ui/CountUp";
import SectionShell from "@/components/ui/SectionShell";

export default function About({ t }: { t: Dictionary }) {
  const a = t.about;
  return (
    <SectionShell id="about" label={a.eyebrow} title={a.title}>
      <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-muted">
        {a.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
        {a.stats.map((s) => (
          <li key={s.label} className="bg-bg p-5">
            <div className="font-display text-4xl">
              <CountUp value={s.value} />
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-wide text-muted">{s.label}</div>
          </li>
        ))}
      </ul>
      <blockquote className="mt-12 border-l-2 border-accent pl-6 font-display text-2xl italic leading-snug md:text-3xl">
        {a.pullQuote}
      </blockquote>
    </SectionShell>
  );
}
