import type { ReactNode } from "react";

type Props = {
  id: string;
  /** Small mono uppercase label rendered as the section heading. */
  title: string;
  children: ReactNode;
};

export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-10 scroll-mt-8 border-t border-line pt-7">
      <h2
        id={`${id}-title`}
        className="font-mono text-xs tracking-[0.16em] text-muted uppercase"
      >
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
