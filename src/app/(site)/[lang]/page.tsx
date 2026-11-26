import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import { site } from "@/content/site";
import { asset } from "@/lib/asset";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import CopyEmailButton from "@/components/ui/CopyEmailButton";

const externalLink =
  "inline-flex min-h-11 items-center gap-1 font-mono text-xs text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-current";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const featured = t.projects.items.filter((project) => project.featured);
  const other = t.projects.items.filter((project) => !project.featured);

  return (
    <>
      <Header lang={lang} t={t} />

      <main id="top" className="mx-auto w-full max-w-[680px] px-5">
        <section aria-labelledby="intro-title" className="intro pt-8">
          <h1
            id="intro-title"
            className="font-display text-[clamp(2.25rem,6vw,3.25rem)] leading-[1.05] tracking-tight"
          >
            {t.hero.name}
          </h1>
          <p className="mt-3 font-mono text-xs tracking-[0.14em] text-muted uppercase">
            {t.hero.role} · {t.hero.location} · {t.hero.timezone}
          </p>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">{t.hero.tagline}</p>
          <p className="mt-5 flex items-center gap-2 text-sm text-fg">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.hero.availability}
          </p>
          <p className="mt-2 text-sm text-muted">
            <span className="font-mono text-xs tracking-[0.12em] uppercase">{t.hero.nowLabel}:</span>{" "}
            {t.hero.now}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center hover:text-accent-ink">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center hover:text-accent-ink"
              >
                GitHub<span className="sr-only"> {t.work.newTab}</span>
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center hover:text-accent-ink"
              >
                LinkedIn<span className="sr-only"> {t.work.newTab}</span>
              </a>
            </li>
          </ul>
        </section>

        <Section id="work" title={t.work.selectedTitle}>
          <ul className="space-y-8">
            {featured.map((project) => (
              <li key={project.id}>
                <Link href={`/${lang}/work/${project.id}/`} className="group block rounded-lg">
                  {project.image ? (
                    <div className="aspect-[16/10] overflow-hidden rounded-lg border border-line bg-bg-elev">
                      <img
                        src={asset(project.image)}
                        alt={`${project.name} ${t.work.screenshot}`}
                        width={1600}
                        height={1000}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 motion-reduce:transform-none group-hover:scale-[1.01]"
                      />
                    </div>
                  ) : null}
                  <div className="flex items-baseline justify-between gap-4 pt-3">
                    <h3 className="font-display text-xl leading-snug transition-colors group-hover:text-accent-ink">
                      {project.name}
                    </h3>
                    <span
                      aria-hidden
                      className="text-muted"
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <p className="mt-2 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
                </Link>
              </li>
            ))}
          </ul>

          {other.length > 0 ? (
            <div className="mt-10">
              <h3 className="font-mono text-xs tracking-[0.16em] text-accent-ink uppercase">
                {t.projects.otherTitle}
              </h3>
              <ul className="mt-4">
                {other.map((project) => (
                  <li key={project.id} className="border-t border-line py-4">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <Link
                        href={`/${lang}/work/${project.id}/`}
                        className="inline-flex min-h-11 items-center font-display text-base hover:text-accent-ink"
                      >
                        {project.name}
                      </Link>
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={externalLink}
                        >
                          {project.linkLabel ?? t.work.live} ↗
                          <span className="sr-only"> {t.work.newTab}</span>
                        </a>
                      ) : null}
                    </div>
                    <p className="max-w-[62ch] text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Section>

        <Section id="experience" title={t.nav.experience}>
          <ol className="space-y-8">
            {t.experience.items.map((item) => (
              <li
                key={`${item.company}-${item.period}`}
                className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-6"
              >
                <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                  {item.period}
                </p>
                <div className="mt-2 sm:mt-0">
                  <h3 className="font-display text-lg leading-snug">
                    {item.role} <span className="text-muted">· {item.company}</span>
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-muted">{item.location}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="about" title={t.nav.about}>
          <div className="space-y-4 text-sm leading-relaxed text-muted">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs">
            {t.about.stats.map((stat) => (
              <li key={stat.label}>
                <span className="text-fg">{stat.value}</span>{" "}
                <span className="text-muted">{stat.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3">
            {t.skills.groups.map((group) => (
              <div key={group.title} className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-6">
                <h3 className="font-mono text-xs tracking-[0.12em] text-accent-ink uppercase">
                  {group.title}
                </h3>
                <p className="mt-1 font-mono text-xs leading-relaxed text-muted sm:mt-0">
                  {group.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" title={t.education.title}>
          <p className="font-display text-lg leading-snug">{t.education.degree}</p>
          <p className="mt-1 font-mono text-xs text-muted">
            {t.education.school} · {t.education.period} · {t.education.gpa}
          </p>
          <p className="mt-4 text-sm text-muted">
            <span className="font-mono text-xs tracking-[0.12em] text-fg uppercase">
              {t.education.languagesTitle}:
            </span>{" "}
            {t.education.languages.map((language) => `${language.name} (${language.level})`).join(" · ")}
          </p>

          <div className="mt-6 border-t border-line pt-6">
            <h3 className="font-mono text-xs tracking-[0.16em] text-accent-ink uppercase">
              {t.education.publicationTitle}
            </h3>
            <p className="mt-2 font-display text-lg leading-snug">{t.education.publication.title}</p>
            <p className="font-mono text-xs text-muted">{t.education.publication.venue}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t.education.publication.description}
            </p>
            <a
              href={t.education.publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${externalLink} mt-2`}
            >
              {t.education.publication.cta} ↗
              <span className="sr-only"> {t.work.newTab}</span>
            </a>
          </div>
        </Section>

        <Section id="contact" title={t.nav.contact}>
          <p className="font-display text-xl leading-snug">{t.contact.title}</p>
          <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted">{t.contact.subtitle}</p>
          <p className="mt-6 font-mono text-xs tracking-[0.16em] text-muted uppercase">
            {t.contact.emailLabel}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-1 block w-fit max-w-full break-all font-display text-xl leading-tight hover:text-accent-ink sm:text-3xl"
          >
            {site.email}
          </a>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <CopyEmailButton email={site.email} label={t.contact.copy} copiedLabel={t.contact.copied} />
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm text-muted hover:text-accent-ink"
            >
              GitHub<span className="sr-only"> {t.work.newTab}</span>
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm text-muted hover:text-accent-ink"
            >
              LinkedIn<span className="sr-only"> {t.work.newTab}</span>
            </a>
          </div>
        </Section>
      </main>

      <Footer t={t} />
    </>
  );
}
