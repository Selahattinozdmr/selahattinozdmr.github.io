import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "../../globals.css";
import { getDictionary, hasLocale, locales } from "@/content";
import { siteUrl } from "@/lib/asset";
import ThemeScript from "@/components/providers/ThemeScript";

const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
});
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-jetbrains" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
 
export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}/`,
      languages: { tr: "/tr/", en: "/en/" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      images: ["/images/og.jpg"],
      locale: lang === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, images: ["/images/og.jpg"] },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bg text-fg">
        {/* Applies the saved theme before first paint (no flash). */}
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
