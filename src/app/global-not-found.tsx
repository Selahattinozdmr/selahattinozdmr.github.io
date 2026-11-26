import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getDictionary } from "@/content";
import { localeHref } from "@/lib/asset";
import ThemeScript from "@/components/providers/ThemeScript";

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — Selahattin Özdemir",
  description: "Sayfa bulunamadı / Page not found",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  const tr = getDictionary("tr");
  const en = getDictionary("en");

  return (
    <html
      lang="tr"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bg text-fg">
        {/* Applies the saved theme before first paint (no flash). */}
        <ThemeScript />
        <main className="mx-auto grid min-h-dvh w-full max-w-2xl content-center gap-10 p-6">
          <p className="font-mono text-sm tracking-[0.2em] text-accent-ink">404</p>

          <div className="grid gap-3 border-l border-line pl-5">
            <h1 className="text-2xl font-medium text-fg sm:text-3xl">{tr.work.notFoundTitle}</h1>
            <p className="max-w-prose text-muted">{tr.work.notFoundBody}</p>
          </div>

          <div className="grid gap-3 border-l border-line pl-5" lang="en">
            <h2 className="text-xl font-medium text-fg sm:text-2xl">{en.work.notFoundTitle}</h2>
            <p className="max-w-prose text-muted">{en.work.notFoundBody}</p>
          </div>

          <nav className="flex flex-wrap gap-3 font-mono text-sm">
            <a
              href={localeHref("tr")}
              className="inline-flex min-h-11 items-center rounded-md border border-line px-4 py-2 text-accent-ink transition-colors hover:text-fg"
            >
              Türkçe
            </a>
            <a
              href={localeHref("en")}
              className="inline-flex min-h-11 items-center rounded-md border border-line px-4 py-2 text-accent-ink transition-colors hover:text-fg"
            >
              English
            </a>
          </nav>
        </main>
      </body>
    </html>
  );
}
