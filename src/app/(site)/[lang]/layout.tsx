import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../../globals.css";
import { getDictionary, hasLocale, locales } from "@/content";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/asset";
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
      languages: { tr: "/tr/", en: "/en/", "x-default": "/tr/" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}/`,
      siteName: site.name,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: t.meta.title }],
      locale: lang === "tr" ? "tr_TR" : "en_US",
      alternateLocale: [lang === "tr" ? "en_US" : "tr_TR"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: "/images/og.jpg", alt: t.meta.title }],
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getDictionary(lang);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: t.hero.role,
    url: `${siteUrl}/${lang}/`,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ankara",
      addressCountry: "TR",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: t.education.school,
    },
    knowsAbout: t.hero.stack,
    knowsLanguage: ["tr", "en"],
  };

  return (
    <html
      lang={lang}
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bg text-fg">
        {/* Applies the saved theme before first paint (no flash). */}
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
