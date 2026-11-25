import type { Dictionary } from "@/content/types";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";

export default function Education({ t }: { t: Dictionary }) {
  const e = t.education;
  return (
    <SectionShell id="education" label={e.eyebrow} title={e.title}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal y={16}>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{e.period}</p>
          <h3 className="font-display mt-3 text-2xl leading-snug md:text-3xl">{e.degree}</h3>
          <p className="mt-1 font-mono text-sm text-accent-ink">{e.school}</p>
          <p className="mt-4 text-sm text-muted">{e.gpa}</p>
        </Reveal>
        <Reveal delay={0.08} y={16}>
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">
            {e.languagesTitle}
          </h3>
          <ul className="mt-4 space-y-2 text-muted">
            {e.languages.map((l) => (
              <li key={l.name}>
                <span className="text-fg">{l.name}</span> — {l.level}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <Reveal delay={0.12} y={16} className="mt-12 border-t border-line pt-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[62ch]">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">
              {e.publicationTitle}
            </h3>
            <p className="font-display mt-3 text-xl leading-snug md:text-2xl">{e.publication.title}</p>
            <p className="mt-1 font-mono text-sm text-accent-ink">{e.publication.venue}</p>
            <p className="mt-3 leading-relaxed text-muted">{e.publication.description}</p>
          </div>
          <a
            href={e.publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit shrink-0 items-center gap-2 font-mono text-sm text-accent-ink underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {e.publication.cta}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
}
