import type { Dictionary } from "@/content/types";
import { site } from "@/content/site";
import SectionShell from "@/components/ui/SectionShell";
import CopyEmailButton from "@/components/ui/CopyEmailButton";

const iconLink =
  "grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:border-accent/50 hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function Contact({ t }: { t: Dictionary }) {
  const c = t.contact;
  const github: string = site.github;
  const linkedin: string = site.linkedin;
  return (
    <SectionShell id="contact" label={c.eyebrow} title={c.title} titleSize="large">
      <p className="max-w-[52ch] text-lg leading-relaxed text-muted">{c.subtitle}</p>
      <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-accent-ink">
        {t.hero.availability}
      </p>
      <div className="mt-10">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{c.emailLabel}</p>
        <a
          href={`mailto:${site.email}`}
          className="email-underline font-display mt-3 block w-fit max-w-full break-all text-[clamp(1.5rem,4vw,3rem)] leading-tight text-fg transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {site.email}
        </a>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CopyEmailButton email={site.email} label={c.copy} copiedLabel={c.copied} />
          {github || linkedin ? (
            <div className="flex gap-3">
              {github ? (
                <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                  </svg>
                </a>
              ) : null}
              {linkedin ? (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.12v5.88h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75Z" />
                  </svg>
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
}
