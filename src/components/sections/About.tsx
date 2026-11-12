import Image from "next/image";
import type { Dictionary } from "@/content/types";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import CountUp from "@/components/ui/CountUp";

export default function About({ t }: { t: Dictionary }) {
  const a = t.about;
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-cyan uppercase">{a.eyebrow}</p>
            <h2
              id="about-title"
              className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              {a.title}
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            {a.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 * (i + 1)}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {a.stats.map((s, i) => (
              <li key={s.label}>
                <Reveal delay={0.06 * i} y={20}>
                  <div className="glass rounded-2xl p-5">
                    <div className="font-display text-4xl font-bold text-gradient">
                      <CountUp value={s.value} />
                    </div>
                    <div className="mt-1 font-mono text-xs tracking-wide text-muted uppercase">{s.label}</div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="mx-auto w-full max-w-md">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_50%,rgb(var(--cyan-rgb)/0.28),rgb(251_146_60/0.12)_55%,transparent_75%)] blur-2xl"
            />
            <TiltCard max={12} className="rounded-3xl">
              <div className="glass overflow-hidden rounded-3xl p-2 shadow-[0_0_60px_-10px_rgb(var(--cyan-rgb)/0.35)]">
                <Image
                  src="/images/workstation-desk.jpg"
                  alt=""
                  width={1344}
                  height={752}
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="aspect-[1344/752] w-full rounded-[1.25rem] object-cover"
                />
              </div>
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
