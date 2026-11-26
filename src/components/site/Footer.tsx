import type { Dictionary } from "@/content/types";
import { site } from "@/content/site";
import CurrentYear from "@/components/ui/CurrentYear";

export default function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="mt-12 border-t border-line">
      <div className="mx-auto flex w-full max-w-[680px] flex-col gap-2 px-5 py-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> {site.name}. {t.footer.rights}
        </p>
        <p className="font-mono">{t.footer.builtWith}</p>
      </div>
    </footer>
  );
}
