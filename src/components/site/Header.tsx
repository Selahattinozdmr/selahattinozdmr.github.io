import Link from "next/link";
import type { Dictionary, Locale } from "@/content/types";
import { site } from "@/content/site";
import { localeHref } from "@/lib/asset";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

type Props = {
  lang: Locale;
  t: Dictionary;
  /** Optional path segment under the other locale, e.g. `work/autosuchen24/`. */
  switchPath?: string;
};

export default function Header({ lang, t, switchPath = "" }: Props) {
  const other: Locale = lang === "tr" ? "en" : "tr";

  return (
    <header className="mx-auto flex w-full max-w-[680px] items-center justify-between gap-4 px-5 pt-6 pb-2">
      <Link
        href={`/${lang}/`}
        aria-label={site.name}
        className="inline-flex min-h-11 items-center gap-2.5 rounded-sm"
      >
        <Logo className="h-6 w-6" />
        <span className="font-display text-sm font-semibold tracking-wide">{site.name}</span>
      </Link>

      <div className="flex items-center gap-1">
        <a
          href={`${localeHref(other)}${switchPath}`}
          hrefLang={other}
          lang={other}
          className="inline-flex min-h-11 items-center rounded-full px-3 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-accent-ink"
        >
          <span aria-hidden>{other.toUpperCase()}</span>
          <span className="sr-only">{t.nav.switchLanguage}</span>
        </a>
        <ThemeToggle toLightLabel={t.nav.themeToLight} toDarkLabel={t.nav.themeToDark} />
      </div>
    </header>
  );
}
