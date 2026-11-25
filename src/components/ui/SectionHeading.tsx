import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="font-mono text-sm tracking-widest text-accent-ink uppercase">{eyebrow}</p>
      <h2
        id={id}
        className="font-display mt-4 max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight text-fg sm:text-5xl"
      >
        {title}
      </h2>
      {subtitle ? <p className="mt-5 max-w-xl text-lg text-muted">{subtitle}</p> : null}
      {children}
    </Reveal>
  );
}
