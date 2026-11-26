import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, getProject, hasLocale, locales, projectIds } from "@/content";
import { site } from "@/content/site";
import { asset } from "@/lib/asset";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";

type Props = { params: Promise<{ lang: string; id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projectIds.map((id) => ({ lang, id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  if (!hasLocale(lang)) return {};
  const project = getProject(lang, id);
  if (!project) return {};

  const canonical = `/${lang}/work/${id}/`;

  return {
    title: `${project.name} — ${site.name}`,
    description: project.description,
    alternates: {
      canonical,
      languages: {
        tr: `/tr/work/${id}/`,
        en: `/en/work/${id}/`,
        "x-default": `/tr/work/${id}/`,
      },
    },
    openGraph: {
      title: `${project.name} — ${site.name}`,
      description: project.description,
      url: canonical,
      locale: lang === "tr" ? "tr_TR" : "en_US",
      images: [project.image ?? "/images/og.jpg"],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();
  const project = getProject(lang, id);
  if (!project) notFound();

  const t = getDictionary(lang);
  const index = projectIds.indexOf(id);
  const prev = index > 0 ? getProject(lang, projectIds[index - 1]) : undefined;
  const next = index >= 0 && index < projectIds.length - 1 ? getProject(lang, projectIds[index + 1]) : undefined;

  return (
    <>
      <Header lang={lang} t={t} switchPath={`work/${id}/`} />

      <main className="mx-auto w-full max-w-[680px] px-5">
        <article className="pt-8">
          <Link
            href={`/${lang}/#work`}
            className="inline-flex min-h-11 items-center font-mono text-xs tracking-[0.12em] text-muted uppercase hover:text-accent-ink"
          >
            ← {t.work.back}
          </Link>

          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,2.75rem)] leading-tight tracking-tight">
            {project.name}
          </h1>

          <p className="mt-3 font-mono text-xs leading-relaxed text-muted">
            {project.stack.join(" · ")}
            {project.url ? (
              <>
                {" · "}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-accent-ink underline decoration-line underline-offset-4 hover:decoration-current"
                >
                  {project.linkLabel ?? t.work.live} ↗
                  <span className="sr-only"> {t.work.newTab}</span>
                </a>
              </>
            ) : null}
          </p>

          {project.image ? (
            <picture className="mt-6 block overflow-hidden rounded-lg border border-line bg-bg-elev">
              {project.imageMobile ? (
                <source media="(max-width: 640px)" srcSet={asset(project.imageMobile)} />
              ) : null}
              <img
                src={asset(project.image)}
                alt={`${project.name} ${t.work.screenshot}`}
                width={1600}
                height={1000}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-auto w-full"
              />
            </picture>
          ) : null}

          <Section id="context" title={t.work.context}>
            <p className="text-sm leading-relaxed text-muted">{project.description}</p>
          </Section>

          <Section id="problem" title={t.work.problem}>
            <p className="text-sm leading-relaxed text-muted">{project.problem}</p>
          </Section>

          {project.details && project.details.length > 0 ? (
            <Section id="approach" title={t.work.approach}>
              <ul className="list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted">
                {project.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          <Section id="outcome" title={t.work.outcome}>
            <p className="text-sm leading-relaxed text-muted">{project.outcome}</p>
          </Section>

          {prev || next ? (
            <nav className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:justify-between">
              {prev ? (
                <Link
                  href={`/${lang}/work/${prev.id}/`}
                  className="group inline-flex min-h-11 flex-col justify-center rounded-sm"
                >
                  <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                    ← {t.work.prev}
                  </span>
                  <span className="font-display text-base group-hover:text-accent-ink">
                    {prev.name}
                  </span>
                </Link>
              ) : null}
              {next ? (
                <Link
                  href={`/${lang}/work/${next.id}/`}
                  className="group inline-flex min-h-11 flex-col justify-center rounded-sm sm:ml-auto sm:items-end sm:text-right"
                >
                  <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                    {t.work.next} →
                  </span>
                  <span className="font-display text-base group-hover:text-accent-ink">
                    {next.name}
                  </span>
                </Link>
              ) : null}
            </nav>
          ) : null}
        </article>
      </main>

      <Footer t={t} />
    </>
  );
}
