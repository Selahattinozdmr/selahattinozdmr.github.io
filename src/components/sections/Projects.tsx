import Image from "next/image";
import type { Dictionary } from "@/content/types";
import { asset } from "@/lib/asset";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Projects({ t }: { t: Dictionary }) {
  const p = t.projects;
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading id="projects-title" eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} />
        <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
          {p.items.map((item, i) => {
            const featured = i === 0;
            return (
              <li key={item.id} className={featured ? "md:col-span-2" : ""}>
                <Reveal delay={(i % 2) * 0.1} className="h-full">
                    <article
                      className={`glass group flex h-full flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_80px_-20px_rgb(var(--cyan-rgb)/0.35)] ${
                        featured ? "md:grid md:grid-cols-[1.3fr_1fr]" : ""
                      }`}
                    >
                      <div className="relative aspect-[1344/752] w-full overflow-hidden">
                        <Image
                          src={asset(item.image)}
                          alt={item.name}
                          width={1344}
                          height={752}
                          sizes={featured ? "(min-width: 768px) 700px, 100vw" : "(min-width: 768px) 560px, 100vw"}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-[#050a18]/60 via-transparent to-transparent"
                        />
                      </div>
                      <div className={`flex flex-1 flex-col p-6 md:p-8 ${featured ? "md:justify-center" : ""}`}>
                        <h3
                          className={`font-display font-bold tracking-tight ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}
                        >
                          {item.name}
                        </h3>
                        <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-2" aria-hidden={false}>
                          {item.stack.map((s) => (
                            <li
                              key={s}
                              className="rounded-full border border-line bg-fg/[0.04] px-3 py-1 font-mono text-xs text-cyan"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-5 py-2.5 text-sm font-medium text-cyan transition hover:bg-cyan hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
                          >
                            {item.linkLabel ?? p.visit}
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="M7 17 17 7M8 7h9v9" />
                            </svg>
                          </a>
                        ) : null}
                      </div>
                    </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
