import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/content/types";

function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  const langs = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
  return langs.find((l) => (locales as readonly string[]).includes(l)) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;
  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // skip next internals, api and any file with an extension (images, video, pdf…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
