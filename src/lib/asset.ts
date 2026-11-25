export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;
export const localeHref = (locale: string) => `${basePath}/${locale}/`;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://selahattinozdmr.github.io";
