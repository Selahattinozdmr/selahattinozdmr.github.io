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
  [
    source("src/components/ui/SiteBackdrop.tsx").includes("export default function SiteBackdrop"),
    "SiteBackdrop bileşeni mevcut",
  ],
  [
    !existsSync("src/components/three/BackgroundCanvas.tsx") &&
      !existsSync("src/components/three/BackgroundScene.tsx"),
    "eski 3B arka plan silinmiş",
  ],
  [
    source("src/app/(site)/[lang]/page.tsx").includes("<SiteBackdrop />") &&
      !source("src/app/(site)/[lang]/page.tsx").includes("BackgroundCanvas"),
    "sayfa SiteBackdrop kullanıyor",
  ],
  [source("src/app/globals.css").includes(".site-backdrop"), "backdrop CSS mevcut"],
);

const pkg = JSON.parse(source("package.json"));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };

checks.push(
  [source("src/components/sections/Skills.tsx").includes("lg:grid-cols-3"), "yetenekler chip matrisi"],
  [!source("src/components/sections/Skills.tsx").includes("children"), "Skills children prop'u kalktı"],
  [
    source("src/app/(site)/[lang]/page.tsx").includes("<Skills t={t} />") &&
      !source("src/app/(site)/[lang]/page.tsx").includes("SkillsGlobe"),
    "sayfa küresiz Skills kullanıyor",
  ],
  [
    !existsSync("src/components/three/SkillsGlobe.tsx") &&
      !existsSync("src/components/three/SkillsGlobeScene.tsx") &&
      !existsSync("src/content/skills.ts"),
    "eski küre dosyaları silinmiş",
  ],
  [!('three' in deps) && !('@react-three/fiber' in deps) && !('@react-three/drei' in deps), "three bağımlılıkları kalktı"],
  [
    !source("src/content/types.ts").includes("dragHint") &&
      !source("src/content/tr.ts").includes("dragHint") &&
      !source("src/content/en.ts").includes("dragHint"),
    "dragHint sözlükten kalktı",
  ],
);

const sectionFiles = ["About", "Experience", "Projects", "Skills", "Education", "Contact"].map(
  (name) => `src/components/sections/${name}.tsx`,
);
const globals = source("src/app/globals.css");

checks.push(
  [!existsSync("src/components/ui/TiltCard.tsx"), "TiltCard silindi"],
  [sectionFiles.every((f) => !source(f).includes("TiltCard")), "bölümler TiltCard kullanmıyor"],
  [sectionFiles.every((f) => !source(f).includes("py-28 md:py-40")), "bölüm boşlukları sıkılaştı"],
  [globals.includes("--bg-card: rgba(13, 23, 48, 0.82)"), "koyu tema kart opaklığı"],
  [globals.includes("--fg-muted: #a6b4d2"), "koyu tema metin kontrastı"],
  [globals.includes("--bg-card: rgba(255, 255, 255, 0.9)"), "açık tema kart opaklığı"],
  [!globals.includes("blur(14px)") && globals.includes("blur(8px)"), "glass blur azaltıldı"],
  [!source("src/components/ui/SectionHeading.tsx").includes("md:text-6xl"), "başlık ölçeği sakinleşti"],
  [
    source("src/components/sections/Experience.tsx").includes("whitespace-nowrap") &&
      source("src/components/sections/Experience.tsx").includes("13rem"),
    "zaman çizelgesi tarih kolonu",
  ],
  [
    source("src/content/tr.ts").includes("GSAP & Motion") && source("src/content/en.ts").includes("GSAP & Motion"),
    "footer metni güncel",
  ],
  [source("src/components/sections/About.tsx").includes("<figure"), "About görseli figure"],
);

const hero = source("src/components/hero/ScrollVideoHero.tsx");

checks.push(
  [hero.includes("h-[180vh]") && hero.includes("md:h-[240vh]"), "hero yüksekliği kısaldı"],
  [
    !hero.includes("beatRef") && !hero.includes("const bIn") && !hero.includes("const bOut"),
    "hero ikinci beat kalktı",
  ],
  [
    hero.includes("lastElementChild") && hero.includes("Math.min(W * 0.9, 420)"),
    "hero mobil ölçümü son intro öğesine bağlı",
  ],
);

const nav = source("src/components/sections/Navbar.tsx");

checks.push(
  [
    nav.includes("const menuRef") && nav.includes("const toggleRef"),
    "mobil menü ref'leri mevcut",
  ],
  [
    nav.includes('querySelectorAll<HTMLElement>("a[href],button:not([disabled])")'),
    "mobil menü odak tuzağı",
  ],
  [nav.includes("toggle?.focus()"), "odak tetikleyiciye dönüyor"],
);

const workflow = source(".github/workflows/deploy.yml");
const readme = source("README.md");

checks.push(
  [
    workflow.includes("actions/deploy-pages@v4") &&
      workflow.includes("npm run verify") &&
      workflow.includes("NEXT_PUBLIC_BASE_PATH") &&
      workflow.includes("branches: [main]"),
    "deploy workflow mevcut",
  ],
  [
    readme.includes("selahattinozdmr.github.io") && readme.includes("GitHub Actions"),
    "README yayın talimatı",
  ],
  [source("docs/PLAN.md").includes("Superseded"), "eski plan superseded notlu"],
);

let failed = false;
for (const [ok, label] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
