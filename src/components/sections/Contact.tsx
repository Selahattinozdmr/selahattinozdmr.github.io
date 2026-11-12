import type { ReactNode } from "react";
import type { Dictionary } from "@/content/types";
import { site } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import CopyEmailButton from "@/components/ui/CopyEmailButton";

const iconBtn =
  "grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:border-cyan/50 hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

export default function Contact({ t, children }: { t: Dictionary; children?: ReactNode }) {
  const c = t.contact;
  const github: string = site.github;
  const linkedin: string = site.linkedin;
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-cyan uppercase">{c.eyebrow}</p>
            <h2
              id="contact-title"
              className="font-display text-gradient mt-4 text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl md:text-7xl"
            >
              {c.title}
            </h2>
            <p className="mt-6 max-w-lg text-lg text-muted">{c.subtitle}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-mono text-xs tracking-widest text-muted uppercase">{c.emailLabel}</p>
            <a
              href={`mailto:${site.email}`}
              className="font-display mt-2 block text-xl font-semibold break-all text-fg underline decoration-cyan/40 underline-offset-8 transition hover:decoration-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan sm:text-2xl"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_30px_-4px_rgba(34,211,238,0.6)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                {c.emailLabel}
              </a>
              <CopyEmailButton email={site.email} label={c.copy} copiedLabel={c.copied} />
            </div>
            {github || linkedin ? (
              <div className="mt-6 flex gap-3">
                {github ? (
                  <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconBtn}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                    </svg>
                  </a>
                ) : null}
                {linkedin ? (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconBtn}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.12v5.88h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75Z" />
                    </svg>
                  </a>
                ) : null}
              </div>
            ) : null}
          </Reveal>
        </div>
        <div className="relative min-h-[300px] w-full">{children}</div>
      </div>
    </section>
  );
}
