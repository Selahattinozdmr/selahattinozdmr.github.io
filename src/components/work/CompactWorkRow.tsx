import type { Project } from "@/content/types";

type Props = {
  project: Project;
  labels: { visit: string };
};

export default function CompactWorkRow({ project, labels }: Props) {
  return (
    <li className="grid gap-2 border-t border-line py-6 md:grid-cols-[1fr_auto] md:items-start md:gap-8">
      <div>
        <h3 className="font-display text-xl">{project.name}</h3>
        <p className="mt-1 max-w-[62ch] text-sm text-muted">{project.description}</p>
        <p className="mt-2 font-mono text-xs text-accent-ink">{project.stack.join(" · ")}</p>
      </div>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-sm text-accent-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {project.linkLabel ?? labels.visit}
        </a>
      ) : null}
    </li>
  );
}
