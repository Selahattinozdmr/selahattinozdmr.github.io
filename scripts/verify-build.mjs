import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Build-output verification: checks the exported site (out/), not the source
// components. UI work should not be blocked by this script as long as the
// deployed HTML keeps its URLs, metadata and accessibility basics intact.

const out = "out";
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Project ids come from the source data, not from the build output, so a
// missing case-study page fails even if the sitemap forgot it.
const projectSource = readFileSync("src/content/projects.ts", "utf8");
const projects = [...projectSource.matchAll(/\{\s*id:\s*"([^"]+)"([\s\S]*?)\}/g)].map(
  (m) => ({ id: m[1], featured: /featured:\s*true/.test(m[2]) }),
);
const ids = projects.map((p) => p.id);
const featuredIds = projects.filter((p) => p.featured).map((p) => p.id);

const required = [
  "index.html",
  "404.html",
  "tr/index.html",
  "en/index.html",
  ".nojekyll",
  "images/og.jpg",
  "robots.txt",
  "sitemap.xml",
  ...["tr", "en"].flatMap((lang) => ids.map((id) => `${lang}/work/${id}/index.html`)),
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

const checks = [];

// --- Sayfa ve yönlendirme -------------------------------------------------

checks.push(
  [root.includes(`url=${base}/tr/`), "kök yönlendirmesi /tr/ hedefliyor"],
  [tr.includes("Selahattin") && tr.includes('lang="tr"'), "TR içerik basılmış"],
  [en.includes("Selahattin") && en.includes('lang="en"'), "EN içerik basılmış"],
  [!(base === "" && tr.includes("/portfolio")), "sabit /portfolio basePath yok"],
  [tr.includes(`${base}/_next/`), "_next asset yolu basePath ile uyumlu"],
  [base === "" || !tr.includes(`${base}${base}`), "basePath iki kez eklenmiyor"],
  [tr.includes('rel="noopener noreferrer"'), "dış bağlantılar güvenli"],
);

// --- Yerel referanslar ----------------------------------------------------

const referencedOf = (html) =>
  [...html.matchAll(/(?:src|href|poster)="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((p) => p.startsWith(`${base}/`) && !p.endsWith(".html"));

const broken = [...referencedOf(tr), ...referencedOf(en)].filter((p) => {
  const local = p.slice(base.length).split(/[?#]/)[0];
  return !existsSync(join(out, local));
});

checks.push([broken.length === 0, `referanslar mevcut${broken.length ? `: ${broken.join(", ")}` : ""}`]);

// --- Metadata -------------------------------------------------------------

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

// Tag yoksa kontrol uygulanmaz. Varsa yol, basePath'li ya da basePath'siz
// olabilir (metadata mutlak site URL'i kullanabilir); iki kez geçemez.
const pathIsExactly = (url, path) => {
  const pathname = pathOf(url);
  return pathname === path || (base !== "" && pathname === `${base}${path}`);
};
const linkPathIs = (html, rel, hreflang, path) => {
  const tag = findLink(html, rel, hreflang);
  return !tag || pathIsExactly(hrefOf(tag), path);
};

checks.push(
  [linkPathIs(tr, "canonical", undefined, "/tr/"), "TR canonical basePath bir kez (varsa)"],
  [linkPathIs(en, "canonical", undefined, "/en/"), "EN canonical basePath bir kez (varsa)"],
  [linkPathIs(tr, "alternate", "tr", "/tr/"), "TR hreflang basePath bir kez (varsa)"],
  [linkPathIs(en, "alternate", "en", "/en/"), "EN hreflang basePath bir kez (varsa)"],
  [
    !metaContent(tr, "og:image") || pathIsExactly(metaContent(tr, "og:image"), "/images/og.jpg"),
    "OG görseli basePath bir kez (varsa)",
  ],
  [!tr.includes('style="opacity:0') && !en.includes('style="opacity:0'), "SSR'da gizli reveal yok"],
  [tr.includes("mailto:selahattin32ozdmr@gmail.com"), "e-posta SSR'da görünür"],
  [metaContent(tr, "og:locale") === "tr_TR", "TR OG locale"],
  [metaContent(en, "og:locale") === "en_US", "EN OG locale"],
  [tr.includes('name="twitter:card"') && tr.includes('content="summary_large_image"'), "twitter card"],
  [metaContent(tr, "og:title") !== undefined, "OG başlığı"],
  [metaContent(en, "og:description") !== undefined, "OG açıklaması"],
);

const jpegSize = (p) => {
  const buf = readFileSync(p);
  let i = 2;
  while (i + 8 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xff) {
      i += 1;
      continue;
    }
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
};
const ogSize = existsSync(join(out, "images/og.jpg")) ? jpegSize(join(out, "images/og.jpg")) : null;

checks.push([
  ogSize?.width === 1200 && ogSize?.height === 630,
  `OG 1200x630 (${ogSize ? `${ogSize.width}x${ogSize.height}` : "?"})`,
]);

// --- Tasarım token'ları (AA kontrast) -------------------------------------

const globals = readFileSync("src/app/globals.css", "utf8");
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
  for (const name of ["accent-ink", "fg-muted", "fg"]) {
    const fg = hex(token(block, name));
    const ratio = bg && fg ? contrast(fg, bg) : 0;
    checks.push([ratio >= 4.5, `${themeName} ${name} AA (${ratio ? ratio.toFixed(2) : "?"})`]);
  }
  const accent = hex(token(block, "accent"));
  const onAccent = hex(token(block, "on-accent"));
  const ratio = accent && onAccent ? contrast(onAccent, accent) : 0;
  checks.push([ratio >= 4.5, `${themeName} on-accent AA (${ratio ? ratio.toFixed(2) : "?"})`]);
}

// --- Vaka sayfaları, sitemap, 404 ve robots -------------------------------

checks.push([ids.length > 0, `proje id'leri kaynaktan okundu (${ids.length})`]);

for (const lang of ["tr", "en"]) {
  for (const id of ids) {
    const path = `/${lang}/work/${id}/`;
    const html = read(`${lang}/work/${id}/index.html`);

    checks.push([
      html.includes(`lang="${lang}"`) && /<h1[\s>]/.test(html),
      `${lang}/work/${id}/ lang ve h1`,
    ]);
    checks.push([linkPathIs(html, "canonical", undefined, path), `${lang}/work/${id}/ canonical bir kez`]);

    const alternates = ["tr", "en", "x-default"].map((hl) => ({
      hl,
      href: hrefOf(findLink(html, "alternate", hl)),
    }));
    checks.push([
      alternates.every(({ hl, href }) => href !== undefined && pathIsExactly(href, hl === "en" ? `/en/work/${id}/` : `/tr/work/${id}/`)),
      `${lang}/work/${id}/ hreflang tr/en/x-default`,
    ]);

    const brokenRefs = referencedOf(html).filter((p) => {
      const local = p.slice(base.length).split(/[?#]/)[0];
      return !existsSync(join(out, local));
    });
    checks.push([
      brokenRefs.length === 0,
      `${lang}/work/${id}/ referanslar mevcut${brokenRefs.length ? `: ${brokenRefs.join(", ")}` : ""}`,
    ]);
  }
}

for (const lang of ["tr", "en"]) {
  const html = read(`${lang}/index.html`);
  checks.push([html.includes("application/ld+json"), `${lang}/ index JSON-LD`]);
  checks.push([/hreflang="x-default"/i.test(html), `${lang}/ x-default hreflang`]);
  checks.push([metaContent(html, "og:url") !== undefined, `${lang}/ og:url`]);
  checks.push([
    featuredIds.every((id) => html.includes(`href="${base}/${lang}/work/${id}/"`)),
    `${lang}/ öne çıkan vaka linkleri`,
  ]);
}

const imagePaths = [
  ...projectSource.matchAll(/image(?:Mobile)?:\s*"([^"]+)"/g),
].map((m) => m[1]);
checks.push([imagePaths.length > 0, `proje görselleri kaynaktan okundu (${imagePaths.length})`]);
for (const image of imagePaths) {
  checks.push([existsSync(join(out, image)), `görsel çıktıda var: ${image}`]);
}

const sitemap = read("sitemap.xml");
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pathOf(m[1]));
const expectedPaths = [
  ...["tr", "en"].map((lang) => `${base}/${lang}/`),
  ...ids.flatMap((id) => ["tr", "en"].map((lang) => `${base}/${lang}/work/${id}/`)),
];
checks.push([
  expectedPaths.every((path) => sitemapPaths.includes(path)),
  `sitemap tüm dil ve vaka sayfalarını içeriyor (${sitemapPaths.length})`,
]);
checks.push([base === "" || !sitemap.includes(`${base}${base}`), "sitemap basePath iki kez eklenmiyor"]);

const notFound = read("404.html");
checks.push([notFound.includes('lang="tr"'), "404 lang=tr"]);
checks.push([/<link[^>]*rel="stylesheet"[^>]*\.css/.test(notFound), "404 stylesheet"]);
checks.push([read("robots.txt").includes("Sitemap:"), "robots.txt Sitemap satırı"]);

// --- Rapor -----------------------------------------------------------------

let failed = false;
for (const [ok, label] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
