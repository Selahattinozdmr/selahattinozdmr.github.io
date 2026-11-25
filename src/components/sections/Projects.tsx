import type { Dictionary } from "@/content/types";
import SectionShell from "@/components/ui/SectionShell";
import WorkRow from "@/components/work/WorkRow";
import CompactWorkRow from "@/components/work/CompactWorkRow";

export default function Projects({ t }: { t: Dictionary }) {
  const p = t.projects;
  const featured = p.items.slice(0, 3);
  const other = p.items.slice(3);

  return (
    <SectionShell id="projects" label={p.eyebrow} title={p.title}>
      <p className="max-w-[62ch] text-muted">{p.subtitle}</p>
      <ul className="mt-10">
        {featured.map((project, index) => (
          <WorkRow
            key={project.id}
            project={project}
            index={index}
            labels={{
              problem: p.problemLabel,
              outcome: p.outcomeLabel,
              caseNote: p.caseNoteLabel,
              visit: p.visit,
            }}
          />
        ))}
      </ul>
      {other.length > 0 ? (
        <div className="mt-16">
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">
            {p.otherTitle}
          </h3>
          <ul className="mt-4">
            {other.map((project) => (
              <CompactWorkRow key={project.id} project={project} labels={{ visit: p.visit }} />
            ))}
          </ul>
        </div>
      ) : null}
    </SectionShell>
  );
}
