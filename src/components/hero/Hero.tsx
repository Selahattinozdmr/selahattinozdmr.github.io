import type { Dictionary } from "@/content/types";

export default function Hero({ t }: { t: Dictionary }) {
  const h = t.hero;
  return (
    <section id="top" className="relative scroll-mt-24">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-6 pt-28 pb-20 md:grid-cols-[7fr_5fr] md:gap-16 md:px-8 md:pt-36 md:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {h.availability}
          </p>
          <h1 className="font-display mt-6 text-[clamp(3.25rem,8.5vw,7.5rem)] leading-[0.95] tracking-[-0.02em] text-fg">
            {h.name}
          </h1>
          <p className="mt-5 font-mono text-xs tracking-[0.16em] text-accent-ink uppercase">
            {h.role}
          </p>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            {h.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {h.ctaProjects}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-accent-ink/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {h.ctaContact}
            </a>
          </div>
          <p className="mt-8 font-mono text-xs tracking-[0.16em] text-muted uppercase">
            {h.location} · {h.timezone}
          </p>
        </div>
        <aside className="surface h-fit rounded-2xl p-6 md:p-8">
          <dl className="space-y-6">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                {h.focusLabel}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg">{h.focus}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                {h.stackLabel}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg">{h.stack.join(" · ")}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                {h.nowLabel}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg">{h.now}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
