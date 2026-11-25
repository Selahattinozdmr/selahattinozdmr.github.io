import type { Dictionary } from "@/content/types";
import { site } from "@/content/site";
import CurrentYear from "@/components/ui/CurrentYear";

export default function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 text-sm text-muted md:flex-row md:items-center">
        <p>
          © <CurrentYear /> {site.name}. {t.footer.rights}
        </p>
        <p className="font-mono text-xs">{t.footer.builtWith}</p>
        <a
          href="#top"
          aria-label={t.footer.backToTop}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 transition hover:border-accent/50 hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 19V5m0 0-6 6m6-6 6 6" />
          </svg>
          <span aria-hidden>↑</span>
        </a>
      </div>
    </footer>
  );
}
