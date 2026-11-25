import type { ReactNode } from "react";
import SectionLabel from "@/components/motion/SectionLabel";
import SectionRule from "@/components/motion/SectionRule";

type Props = {
  id: string;
  label: string;
  title: string;
  titleSize?: "default" | "large";
  children: ReactNode;
};

export default function SectionShell({ id, label, title, titleSize = "default", children }: Props) {
  const parts = label.split(" — ");
  const hasIndex = parts.length > 1;
  const index = hasIndex ? parts[0] : "";
  const text = hasIndex ? parts.slice(1).join(" — ") : label;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <SectionRule />
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-24 md:grid-cols-[11rem_1fr] md:gap-14 md:px-8 md:py-36">
        <SectionLabel sectionId={id} index={index} text={text} />
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
