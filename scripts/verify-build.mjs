import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const out = "out";
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const required = [
  "index.html",
  "404.html",
  "tr/index.html",
  "en/index.html",
  ".nojekyll",
  "video/hero.mp4",
  "video/hero-mobile.mp4",
  "video/orb-loop.mp4",
  "images/og.jpg",
];

const missing = required.filter((p) => !existsSync(join(out, p)));
if (missing.length) {
  console.error("Eksik çıktı:", missing.join(", "));
  process.exit(1);
}

const read = (p) => readFileSync(join(out, p), "utf8");
const root = read("index.html");
const tr = read("tr/index.html");
const en = read("en/index.html");

const checks = [
  [root.includes(`url=${base}/tr/`), "kök yönlendirmesi /tr/ hedefliyor"],
  [tr.includes("Hakkımda") && tr.includes("Selahattin"), "TR içerik basılmış"],
  [en.includes("About") && en.includes("Selahattin"), "EN içerik basılmış"],
  [!(base === "" && tr.includes("/portfolio")), "sabit /portfolio basePath yok"],
  [tr.includes(`${base}/_next/`), "_next asset yolu basePath ile uyumlu"],
  [tr.includes('rel="noopener noreferrer"'), "dış bağlantılar güvenli"],
];

const referenced = [...tr.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p.startsWith(`${base}/`) && !p.endsWith(".html"));

const broken = referenced.filter((p) => {
  const local = p.slice(base.length).split(/[?#]/)[0];
  return !existsSync(join(out, local));
});

checks.push([broken.length === 0, `referanslar mevcut${broken.length ? `: ${broken.join(", ")}` : ""}`]);

const source = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const assetTs = source("src/lib/asset.ts");

checks.push(
  [assetTs.includes("export const basePath"), "asset helper: basePath"],
  [assetTs.includes("export const asset"), "asset helper: asset"],
  [assetTs.includes("export const localeHref"), "asset helper: localeHref"],
  [assetTs.includes("export const siteUrl"), "asset helper: siteUrl"],
  [source("next.config.ts").includes("basePath: process.env.NEXT_PUBLIC_BASE_PATH"), "next.config basePath"],
  [source("src/content/site.ts").includes("siteUrl"), "site URL env'e bağlı"],
  [source("src/app/(site)/[lang]/layout.tsx").includes("localeHref"), "metadata localeHref kullanıyor"],
  [source("src/app/(site)/[lang]/layout.tsx").includes('asset("/images/og.jpg")'), "OG görseli basePath'e duyarlı"],
  [source("src/components/sections/Navbar.tsx").includes("localeHref(other)"), "dil bağlantıları basePath'e duyarlı"],
  [source("src/components/hero/ScrollVideoHero.tsx").includes('asset("/video/hero-poster.jpg")'), "hero poster basePath'e duyarlı"],
  [source("src/components/ui/ContactVideoOrb.tsx").includes('asset("/video/orb-loop.mp4")'), "contact video basePath'e duyarlı"],
  [source("src/components/sections/Projects.tsx").includes("asset(item.image)"), "proje görselleri basePath'e duyarlı"],
  [source("src/components/sections/About.tsx").includes('asset("/images/workstation-desk.jpg")'), "about görseli basePath'e duyarlı"],
  [source("src/app/(root)/page.tsx").includes("basePath"), "kök yönlendirme basePath'e duyarlı"],
);

let failed = false;
for (const [ok, label] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
