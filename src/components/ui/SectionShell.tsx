import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  title: string;
  titleSize?: "default" | "large";
  children: ReactNode;
};

export default function SectionShell({ id, label, title, titleSize = "default", children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-24 md:grid-cols-[11rem_1fr] md:gap-14 md:px-8 md:py-36">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink md:sticky md:top-28 md:self-start">
          {label}
        </p>
        <div>
          <h2
            id={`${id}-title`}
            className={`font-display leading-[1.05] tracking-tight ${
              titleSize === "large" ? "text-[clamp(2.5rem,5vw,4.5rem)]" : "text-[clamp(2rem,4vw,3.5rem)]"
            }`}
          >
            {title}
          </h2>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
