import type { MetadataRoute } from "next";
import { locales, projectIds, type Locale } from "@/content";
import { siteUrl } from "@/lib/asset";

export const dynamic = "force-static";

const languageAlternates = (path: string) =>
  Object.fromEntries(
    locales.map((locale: Locale) => [locale, `${siteUrl}/${locale}${path}`]),
  ) as Record<Locale, string>;

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages = locales.map((lang) => ({
    url: `${siteUrl}/${lang}/`,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages: languageAlternates("/") },
  }));

  const workPages = locales.flatMap((lang) =>
    projectIds.map((id) => ({
      url: `${siteUrl}/${lang}/work/${id}/`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      alternates: { languages: languageAlternates(`/work/${id}/`) },
    })),
  );

  return [...homePages, ...workPages];
}
