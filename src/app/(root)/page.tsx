import type { Metadata } from "next";
import Link from "next/link";
import { localeHref } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Selahattin Özdemir",
  robots: { index: false, follow: true },
};

// React hoists <meta> elements rendered anywhere in the tree into <head>, so
// this refresh lands in the document head without hand-writing a <head> tag.
const refreshTo = localeHref("tr");
const languageRedirect = `(function(){try{var lang=(navigator.language||"").toLowerCase();location.replace(lang.indexOf("en")===0?${JSON.stringify(
  localeHref("en"),
)}:${JSON.stringify(refreshTo)});}catch(e){}})();`;

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${refreshTo}`} />
      <script dangerouslySetInnerHTML={{ __html: languageRedirect }} />
      <main className="grid min-h-dvh place-items-center p-6 text-center">
        <p className="text-muted">
          <Link href="/tr/" className="text-accent-ink underline">
            Devam et / Continue
          </Link>
        </p>
      </main>
    </>
  );
}
