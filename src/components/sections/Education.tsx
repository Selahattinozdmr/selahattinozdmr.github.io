import type { Dictionary } from "@/content/types";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Education({ t }: { t: Dictionary }) {
  const e = t.education;
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading id="education-title" eyebrow={e.eyebrow} title={e.title} />
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-3xl p-7 md:p-9">
              <p className="font-mono text-xs tracking-wide text-cyan uppercase">{e.period}</p>
              <h3 className="font-display mt-3 text-2xl font-bold md:text-3xl">{e.degree}</h3>
              <p className="mt-2 text-lg text-orange">{e.school}</p>
              <p className="mt-6 inline-block rounded-full border border-line px-4 py-1.5 font-mono text-sm text-fg">
                {e.gpa}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass h-full rounded-3xl p-7 md:p-9">
              <h3 className="font-mono text-xs tracking-widest text-cyan uppercase">{e.languagesTitle}</h3>
              <ul className="mt-5 space-y-5">
                {e.languages.map((l) => (
                  <li key={l.name} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-lg font-semibold">{l.name}</p>
                      <p className="text-sm text-muted">{l.level}</p>
                    </div>
                    <div
                      role="img"
                      aria-label={`${l.score} / 5`}
                      className="flex gap-1.5"
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          aria-hidden
                          className={`h-2.5 w-2.5 rounded-full ${
                            i < l.score
                              ? "bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                              : "border border-line bg-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-2">
            <div className="glass rounded-3xl p-7 md:p-9">
              <h3 className="font-mono text-xs tracking-widest text-orange uppercase">{e.publicationTitle}</h3>
              <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-2xl">
                  <p className="font-display text-xl font-bold md:text-2xl">{e.publication.title}</p>
                  <p className="mt-1 font-mono text-sm text-cyan">{e.publication.venue}</p>
                  <p className="mt-3 leading-relaxed text-muted">{e.publication.description}</p>
                </div>
                <a
                  href={e.publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-5 py-2.5 text-sm font-medium text-orange transition hover:bg-orange hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                >
                  {e.publication.cta}
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
