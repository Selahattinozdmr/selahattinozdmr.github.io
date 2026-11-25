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

const referencedOf = (html) =>
  [...html.matchAll(/(?:src|href|poster)="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((p) => p.startsWith(`${base}/`) && !p.endsWith(".html"));

const broken = [...referencedOf(tr), ...referencedOf(en)].filter((p) => {
  const local = p.slice(base.length).split(/[?#]/)[0];
  return !existsSync(join(out, local));
});

checks.push([broken.length === 0, `referanslar mevcut${broken.length ? `: ${broken.join(", ")}` : ""}`]);

const pathOf = (url) => {
  try {
    return new URL(url).pathname;
  } catch {
    return null;
  }
};
const linkTags = (html) => [...html.matchAll(/<link[^>]*>/g)].map((m) => m[0]);
const findLink = (html, rel, hreflang) =>
  linkTags(html).find(
    (tag) =>
      tag.includes(`rel="${rel}"`) &&
      (!hreflang || new RegExp(`hreflang="${hreflang}"`, "i").test(tag)),
  );
const hrefOf = (tag) => tag?.match(/href="([^"]+)"/)?.[1];
const metaTags = (html) => [...html.matchAll(/<meta[^>]*>/g)].map((m) => m[0]);
const metaContent = (html, prop) => {
  const tag = metaTags(html).find((t) => t.includes(`property="${prop}"`));
  return tag?.match(/content="([^"]+)"/)?.[1];
};

const plainTr = tr.replace(/<!--[\s\S]*?-->/g, "");

checks.push(
  [pathOf(hrefOf(findLink(tr, "canonical"))) === `${base}/tr/`, "TR canonical basePath bir kez"],
  [pathOf(hrefOf(findLink(en, "canonical"))) === `${base}/en/`, "EN canonical basePath bir kez"],
  [pathOf(hrefOf(findLink(tr, "alternate", "tr"))) === `${base}/tr/`, "TR hreflang basePath bir kez"],
  [pathOf(hrefOf(findLink(en, "alternate", "en"))) === `${base}/en/`, "EN hreflang basePath bir kez"],
  [pathOf(metaContent(tr, "og:image")) === `${base}/images/og.jpg`, "OG görseli basePath bir kez"],
  [!tr.includes('style="opacity:0') && !en.includes('style="opacity:0'), "SSR'da gizli reveal yok"],
  [plainTr.includes(">5+<") && plainTr.includes(">3.42<"), "CountUp SSR son değeri basıyor"],
);

const source = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const assetTs = source("src/lib/asset.ts");

checks.push(
  [assetTs.includes("export const basePath"), "asset helper: basePath"],
  [assetTs.includes("export const asset"), "asset helper: asset"],
  [assetTs.includes("export const localeHref"), "asset helper: localeHref"],
  [assetTs.includes("export const siteUrl"), "asset helper: siteUrl"],
  [source("next.config.ts").includes("basePath: process.env.NEXT_PUBLIC_BASE_PATH"), "next.config basePath"],
  [source("src/content/site.ts").includes("siteUrl"), "site URL env'e bağlı"],
  [
    !source("src/app/(site)/[lang]/layout.tsx").includes("localeHref") &&
      !source("src/app/(site)/[lang]/layout.tsx").includes('asset("/images/og.jpg")'),
    "metadata basePath'siz yollar kullanıyor",
  ],
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
  [globals.includes("--bg: #0d0b09;"), "koyu kanvas"],
  [globals.includes("--bg: #f4efe6;"), "açık kanvas"],
  [globals.includes("--accent: #d97745;"), "koyu accent"],
  [globals.includes("--accent: #b8501f;"), "açık accent"],
  [globals.includes("--accent-ink: #e08a5b;"), "koyu accent metin"],
  [globals.includes("--accent-ink: #9a3d17;"), "açık accent metin"],
  [globals.includes("--font-display: var(--font-serif)"), "serif display token'ı"],
  [!(/--cyan|--orange|--violet/.test(globals)), "eski renk token'ları kalktı"],
  [source("src/app/(site)/[lang]/layout.tsx").includes("Instrument_Serif"), "Instrument Serif yüklü"],
  [!source("src/app/(site)/[lang]/layout.tsx").includes("Space_Grotesk"), "Space Grotesk kalktı"],
  [
    !/(text|bg|border|outline|decoration|from|via|to)-(cyan|orange)/.test(
      [...sectionFiles, "src/app/(root)/page.tsx", "src/components/hero/ScrollVideoHero.tsx",
       "src/components/ui/ContactVideoOrb.tsx", "src/components/ui/CopyEmailButton.tsx",
       "src/components/ui/SectionHeading.tsx", "src/components/ui/ThemeToggle.tsx", "src/components/ui/Logo.tsx"]
        .map(source).join("\n"),
    ),
    "cyan/orange sınıfları kalktı",
  ],
  [
    !/var\(--(cyan|orange)/.test(
      [...sectionFiles, "src/app/globals.css", "src/components/hero/ScrollVideoHero.tsx",
       "src/components/ui/ContactVideoOrb.tsx", "src/components/ui/Logo.tsx"].map(source).join("\n"),
    ),
    "eski renk değişkenleri kalktı",
  ],
  [source("src/components/ui/Logo.tsx").includes("var(--accent)"), "logo accent kullanıyor"],
  [!source("src/app/icon.svg").includes("#22d3ee") && !source("src/app/icon.svg").includes("#fb923c"), "favicon yeni palet"],
  [source("src/content/tr.ts").includes('menu: "Menü"'), "TR menü etiketi"],
  [source("src/content/en.ts").includes('menu: "Menu"'), "EN menü etiketi"],
);

checks.push(
  [!existsSync("src/components/ui/TiltCard.tsx"), "TiltCard silindi"],
  [sectionFiles.every((f) => !source(f).includes("TiltCard")), "bölümler TiltCard kullanmıyor"],
  [sectionFiles.every((f) => !source(f).includes("py-28 md:py-40")), "bölüm boşlukları sıkılaştı"],
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

const darkBlock = globals.match(/:root\s*\{([\s\S]*?)\}/)?.[1] ?? "";
const lightBlock = globals.match(/:root\[data-theme="light"\]\s*\{([\s\S]*?)\}/)?.[1] ?? "";
const token = (block, name) => block.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1]?.trim();
const hex = (value) => {
  const match = value?.match(/^#([0-9a-f]{6})$/i);
  return match ? [0, 2, 4].map((i) => parseInt(match[1].slice(i, i + 2), 16)) : null;
};
const luminance = ([r, g, b]) => {
  const channel = [r, g, b].map((v) => {
    const n = v / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channel[0] + 0.7152 * channel[1] + 0.0722 * channel[2];
};
const contrast = (a, b) => {
  const first = luminance(a);
  const second = luminance(b);
  const [high, low] = first > second ? [first, second] : [second, first];
  return (high + 0.05) / (low + 0.05);
};

for (const [themeName, block] of [["koyu", darkBlock], ["açık", lightBlock]]) {
  const bg = hex(token(block, "bg"));
  for (const name of ["accent-ink", "fg-muted"]) {
    const fg = hex(token(block, name));
    const ratio = bg && fg ? contrast(fg, bg) : 0;
    checks.push([ratio >= 4.5, `${themeName} ${name} AA (${ratio ? ratio.toFixed(2) : "?"})`]);
  }
  const accent = hex(token(block, "accent"));
  const onAccent = hex(token(block, "on-accent"));
  const ratio = accent && onAccent ? contrast(onAccent, accent) : 0;
  checks.push([ratio >= 4.5, `${themeName} on-accent AA (${ratio ? ratio.toFixed(2) : "?"})`]);
}

let failed = false;
for (const [ok, label] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
