# Portfolio Sadeleştirme ve GitHub Pages Yayını — Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Siteyi dengeli biçimde sadeleştirip `https://selahattinozdmr.github.io` üzerinde statik olarak yayınlanabilir hale getirmek.

**Architecture:** Next.js App Router tek sayfa. Çoklu kök layout ile `/` → `/tr/` yönlendirmesi; `output: "export"` ile statik `out/`; `basePath` ve site URL'i env'den. 3B arka plan ve yetenek küresi CSS/HTML ile değiştirilir; hero scroll-scrub videosu ve iletişimdeki cam küre korunur.

**Tech Stack:** Next.js 16.4.6, React 19.3, TypeScript strict, Tailwind v4, GSAP + ScrollTrigger, motion, Lenis; GitHub Actions + GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-25-portfolio-simplify-github-pages-design.md`

## Global Constraints

- Next.js **16.4.6** — eğitim verisinden farklıdır. Kod yazmadan önce `AGENTS.md`'yi ve `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`, `01-app/01-getting-started/02-project-structure.md` (multiple root layouts) rehberlerini oku.
- Node **>=20.9** (CI'da Node 20), React 19.3, TypeScript strict, Tailwind v4.
- Tüm görünür metin `src/content/{tr,en}.ts` içinde; bileşenler `t: Dictionary` alır. Metni bileşene gömme.
- Rotalar: `/tr`, `/en`; `/` → `/tr/`. `trailingSlash: true`.
- `npm run build`, `npx tsc --noEmit`, `npm run lint` her görev sonunda geçmeli.
- 375px'te yatay taşma olmamalı (`document.documentElement.scrollWidth <= window.innerWidth`).
- `prefers-reduced-motion: reduce` altında içerik görünür ve kullanılabilir olmalı.
- GitHub Pages statiktir; `.nojekyll` zorunlu. `src/proxy.ts` kullanılamaz.
- `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` bu plan sonunda kalmayacak.
- Görünür metin değişikliği yalnızca: `dragHint` kaldırma ve footer'daki "Three.js" ifadesini "GSAP & Motion" yapma.

## Review Focus

Bu değişikliğin en olası hataları; her biri ilgili görevin doğrulama adımında kontrol edilir:

1. **Kullanıcı sitesi kökü:** `/` yönlendirmesi, `_next` asset'leri, video ve görseller 200 dönmeli; basePath yanlışlıkla eklenmemeli. → Task 1, 2, 8, 9.
2. **375px taşma:** uzun proje adları, chip'ler ve "Eyl 2025 – May 2026" tarihi taşmamalı. → Task 4, 5, 6, 9.
3. **Açık tema kontrastı:** yeni kart/arka planla gövde metni ve chip'ler AA altına düşmemeli. → Task 5, 9.
4. **Reduced motion:** Reveal/hero/contact hiçbir içeriği görünmez bırakmamalı. → Task 3, 6, 9.
5. **JS yok / ilk boya:** `/` meta refresh ile yönlenmeli; içerik hidrasyondan önce görünmeli. → Task 1, 8, 9.
6. **TR/EN uzunluk farkı:** İngilizce başlık ve tarihler düzeni bozmamalı. → Task 5, 6, 9.
7. **Dış bağlantılar:** URL'si olmayan projelerde buton gizli kalmalı; olanlar `target="_blank" rel="noopener noreferrer"` ile açılmalı. → Task 2, 5, 9.

---

## Task 1: Statik export, kök yönlendirmesi ve doğrulama iskeleti

**Files:**
- Modify: `next.config.ts`
- Modify: `package.json` (verify script)
- Move: `src/app/[lang]/layout.tsx` → `src/app/(site)/[lang]/layout.tsx`
- Move: `src/app/[lang]/page.tsx` → `src/app/(site)/[lang]/page.tsx`
- Create: `src/app/(root)/layout.tsx`
- Create: `src/app/(root)/page.tsx`
- Create: `scripts/verify-build.mjs`
- Create: `public/.nojekyll`
- Delete: `src/proxy.ts`

**Interfaces:**
- Produces: `/` rotası (meta refresh ile `/tr/`), `out/` çıktısı, `npm run verify` komutu.
- Produces: `(root)` ve `(site)` çoklu kök layout yapısı; sonraki görevler bu yapıya dosya ekler.

- [ ] **Step 1: Rehberleri oku**

Oku: `AGENTS.md`, `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`, `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md` ("Creating multiple root layouts").

- [ ] **Step 2: Rota dosyalarını taşı**

```bash
mkdir -p "src/app/(site)"
git mv "src/app/[lang]" "src/app/(site)/[lang]"
```

`src/app/(site)/[lang]/layout.tsx` içindeki CSS importunu düzelt:

```tsx
import "../../globals.css";
```

(`../globals.css` artık `src/app/(site)/globals.css`'e bakar; dosya orada değil.)

- [ ] **Step 3: `(root)` layout ve yönlendirme sayfasını ekle**

`src/app/(root)/layout.tsx`:

```tsx
import "../globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-dvh bg-bg text-fg">{children}</body>
    </html>
  );
}
```

`src/app/(root)/page.tsx` (server component; React 19 `<meta>`'yı `<head>`'e taşır):

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selahattin Özdemir",
  robots: { index: false, follow: true },
};

export default function RootPage() {
  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <meta httpEquiv="refresh" content="0; url=/tr/" />
      <p className="text-muted">
        <a href="/tr/" className="text-cyan underline">
          Devam et / Continue
        </a>
      </p>
    </main>
  );
}
```

- [ ] **Step 4: `next.config.ts`'i statik export'a çevir**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
```

`cacheComponents` ve `partialPrefetching` satırlarını kaldır.

- [ ] **Step 5: Proxy'yi sil, `.nojekyll` ekle**

```bash
git rm src/proxy.ts
touch public/.nojekyll
```

- [ ] **Step 6: Export doğrulama script'ini yaz**

`scripts/verify-build.mjs`:

```js
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

let failed = false;
for (const [ok, label] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
```

- [ ] **Step 7: `package.json`'a verify script'i ekle**

```json
"verify": "node scripts/verify-build.mjs"
```

- [ ] **Step 8: Build ve doğrulamayı çalıştır**

```bash
npm run build
npm run verify
npx tsc --noEmit
npm run lint
```

Expected: build `out/` üretir; `verify` tüm satırlarda `PASS`; tsc ve lint temiz.

- [ ] **Step 9: Commit**

```bash
git add next.config.ts package.json scripts/verify-build.mjs public/.nojekyll "src/app/(site)" "src/app/(root)"
git add -A src/proxy.ts
git commit -m "build: add static export and root locale redirect"
```

---

## Task 2: basePath ve site URL altyapısı

**Files:**
- Create: `src/lib/asset.ts`
- Modify: `next.config.ts`
- Modify: `src/content/site.ts`
- Modify: `src/app/(site)/[lang]/layout.tsx` (metadata)
- Modify: `src/app/(root)/page.tsx` (basePath'li hedef)
- Modify: `src/components/sections/Navbar.tsx` (dil bağlantıları)
- Modify: `src/components/sections/About.tsx`
- Modify: `src/components/sections/Projects.tsx`
- Modify: `src/components/hero/ScrollVideoHero.tsx`
- Modify: `src/components/ui/ContactVideoOrb.tsx`

**Interfaces:**
- Produces: `basePath: string`, `asset(path: string): string`, `localeHref(locale: string): string`, `siteUrl: string` (`src/lib/asset.ts`).
- Consumes: Task 1'in `/` rotası ve export yapısı.

- [ ] **Step 1: `src/lib/asset.ts` oluştur**

```ts
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;
export const localeHref = (locale: string) => `${basePath}/${locale}/`;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://selahattinozdmr.github.io";
```

- [ ] **Step 2: `next.config.ts`'e basePath ekle**

```ts
basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
```

- [ ] **Step 3: `site.ts` ve metadata'yı env'e bağla**

`src/content/site.ts`:

```ts
import { siteUrl } from "@/lib/asset";
// ...
url: siteUrl,
```

`src/app/(site)/[lang]/layout.tsx` metadata:

```ts
import { siteUrl } from "@/lib/asset";
// metadataBase: new URL(siteUrl)
// alternates: { canonical: `/${lang}/`, languages: { tr: "/tr/", en: "/en/" } }
// openGraph.images: ["/images/og.jpg"]
// twitter.images: ["/images/og.jpg"]
```

Metadata yolları basePath içermez; Next `basePath`'i otomatik ekler. `asset()`/`localeHref()` yalnızca HTML medya/link yolları içindir. (Review düzeltmesi: Task 2 Step 3'ün ilk hali metadata'da double basePath üretiyordu.) Kullanılmayan `site` importunu bu dosyadan kaldır (`siteUrl` doğrudan kullanılıyor).

- [ ] **Step 4: Dil bağlantılarını `localeHref`'e çevir**

`Navbar.tsx` içinde iki yerde:

```tsx
href={localeHref(other)}
```

- [ ] **Step 5: Video/görsel yollarını `asset()` ile sar**

- `ScrollVideoHero.tsx`: `poster={asset("/video/hero-poster.jpg")}`, `<source src={asset("/video/hero-mobile.mp4")}>`, `<source src={asset("/video/hero.mp4")}>`; reduced-motion `<img src={asset("/video/hero-poster.jpg")}>`.
- `ContactVideoOrb.tsx`: `src={asset("/video/orb-loop.mp4")}`, `poster={asset("/video/orb-poster.jpg")}`.
- `Projects.tsx`: `<Image src={asset(item.image)} ... />`.
- `About.tsx`: `<Image src={asset("/images/workstation-desk.jpg")} ... />`.

- [ ] **Step 6: Kök yönlendirmeyi basePath'e duyarlı yap**

`src/app/(root)/page.tsx`:

```tsx
import { basePath } from "@/lib/asset";
// ...
<meta httpEquiv="refresh" content={`0; url=${basePath}/tr/`} />
<a href={`${basePath}/tr/`} className="text-cyan underline">
```

- [ ] **Step 7: Sabit mutlak yol kalmadığını doğrula**

```bash
grep -rnE 'src="/|poster="/|href="/' src || true
```

Expected: yalnızca `href="#..."` çapaları ve `asset(...)`/`localeHref(...)` içindeki yollar. Çıplak `src="/`, `poster="/`, `href="/` kalmamalı.

- [ ] **Step 8: Kullanıcı ve proje sitesi build'lerini doğrula**

```bash
npm run build && npm run verify
NEXT_PUBLIC_BASE_PATH=/portfolio NEXT_PUBLIC_SITE_URL=https://selahattinozdmr.github.io/portfolio npm run build
NEXT_PUBLIC_BASE_PATH=/portfolio npm run verify
npm run build && npm run verify
npx tsc --noEmit && npm run lint
```

Expected: ikinci build'de `verify` `/portfolio` basePath'li yolları doğrular; son build kullanıcı sitesine döner. (`verify` basePath'i `NEXT_PUBLIC_BASE_PATH`'ten okur; bu yüzden ayrıca verilir.)

- [ ] **Step 9: Commit**

```bash
git add src/lib/asset.ts next.config.ts src/content/site.ts "src/app/(site)/[lang]/layout.tsx" "src/app/(root)/page.tsx" src/components
git commit -m "feat: make asset and locale URLs GitHub Pages aware"
```

---

## Task 3: 3B arka planı kaldır, CSS backdrop ekle

**Files:**
- Create: `src/components/ui/SiteBackdrop.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/(site)/[lang]/page.tsx`
- Delete: `src/components/three/BackgroundCanvas.tsx`
- Delete: `src/components/three/BackgroundScene.tsx`

**Interfaces:**
- Produces: `SiteBackdrop` default export, prop almaz.
- Consumes: `main` üstündeki `relative z-10` katmanı.

- [ ] **Step 1: Backdrop stillerini `globals.css`'e ekle**

```css
.site-backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(1100px 560px at 20% -10%, rgb(var(--cyan-rgb) / 0.16), transparent 68%),
    radial-gradient(900px 520px at 88% 6%, rgb(251 146 60 / 0.12), transparent 66%),
    var(--bg);
}

.site-backdrop::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
}

:root[data-theme="light"] .site-backdrop {
  background:
    radial-gradient(1100px 560px at 20% -10%, rgb(var(--cyan-rgb) / 0.1), transparent 68%),
    radial-gradient(900px 520px at 88% 6%, rgb(234 88 12 / 0.07), transparent 66%),
    var(--bg);
}
```

- [ ] **Step 2: `SiteBackdrop` bileşenini yaz**

```tsx
export default function SiteBackdrop() {
  return <div aria-hidden className="site-backdrop" />;
}
```

- [ ] **Step 3: Sayfada değiştir**

`src/app/(site)/[lang]/page.tsx`:

```tsx
import SiteBackdrop from "@/components/ui/SiteBackdrop";
// <BackgroundCanvas /> → <SiteBackdrop />
```

`BackgroundCanvas` importunu kaldır.

- [ ] **Step 4: Eski dosyaları sil**

```bash
git rm src/components/three/BackgroundCanvas.tsx src/components/three/BackgroundScene.tsx
```

- [ ] **Step 5: Doğrula**

```bash
grep -rnE 'BackgroundCanvas|BackgroundScene' src || true
npm run build && npm run verify
npx tsc --noEmit && npm run lint
```

Expected: grep boş; build/verify/tsc/lint temiz.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/SiteBackdrop.tsx src/app/globals.css "src/app/(site)/[lang]/page.tsx"
git commit -m "refactor: replace 3D background with CSS backdrop"
```

---

## Task 4: Yetenek küresini chip matrisiyle değiştir, three'yi kaldır

**Files:**
- Modify: `src/components/sections/Skills.tsx`
- Modify: `src/app/(site)/[lang]/page.tsx`
- Modify: `src/content/types.ts`
- Modify: `src/content/tr.ts`
- Modify: `src/content/en.ts`
- Modify: `package.json`, `package-lock.json`
- Delete: `src/components/three/SkillsGlobe.tsx`
- Delete: `src/components/three/SkillsGlobeScene.tsx`
- Delete: `src/content/skills.ts`

**Interfaces:**
- Produces: `Skills({ t }: { t: Dictionary })` — `children` prop'u kalkar.
- Consumes: Task 1'in sayfa yapısı.

- [ ] **Step 1: `Skills` bileşenini yeniden yaz**

`src/components/sections/Skills.tsx`:

- `children` prop'unu ve `ReactNode` importunu kaldır.
- Bölümü tek kolon başlık + grid yap:

```tsx
<section id="skills" aria-labelledby="skills-title" className="relative py-20 md:py-28">
  <div className="mx-auto max-w-6xl px-5">
    <Reveal>
      <p className="font-mono text-sm tracking-widest text-cyan uppercase">{s.eyebrow}</p>
      <h2 id="skills-title" className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
        {s.title}
      </h2>
      <p className="mt-5 max-w-xl text-lg text-muted">{s.subtitle}</p>
    </Reveal>
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {s.groups.map((g, i) => (
        <Reveal key={g.title} delay={0.04 * i} y={20} className="h-full">
          <div className="glass h-full rounded-2xl p-6">
            <h3 className="font-mono text-xs tracking-widest text-orange uppercase">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li key={it} className="rounded-full border border-line bg-fg/[0.04] px-3 py-1.5 text-sm text-fg">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Sayfadan küreyi kaldır**

`src/app/(site)/[lang]/page.tsx`:

```tsx
<Skills t={t} />
```

`SkillsGlobe` importunu ve `hint` kullanımını kaldır.

- [ ] **Step 3: `dragHint`'i sözlükten çıkar**

`src/content/types.ts` (`skills` bloğu), `src/content/tr.ts:128`, `src/content/en.ts:128` — `dragHint` satırlarını sil.

- [ ] **Step 4: Eski dosyaları sil**

```bash
git rm src/components/three/SkillsGlobe.tsx src/components/three/SkillsGlobeScene.tsx src/content/skills.ts
```

- [ ] **Step 5: `three` bağımlılıklarını kaldır**

```bash
npm uninstall three @react-three/fiber @react-three/drei @types/three
```

- [ ] **Step 6: Doğrula**

```bash
grep -rnE 'three|@react-three|SkillsGlobe|allSkills|dragHint' src || true
npm run build && npm run verify
npx tsc --noEmit && npm run lint
```

Expected: grep boş; build/verify/tsc/lint temiz.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/Skills.tsx "src/app/(site)/[lang]/page.tsx" src/content package.json package-lock.json
git commit -m "feat: replace 3D skills globe with accessible skill grid"
```

---

## Task 5: Görsel sakinleştirme (token, boşluk, kart, zaman çizelgesi, footer)

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/ui/SectionHeading.tsx`
- Modify: `src/components/sections/About.tsx`
- Modify: `src/components/sections/Experience.tsx`
- Modify: `src/components/sections/Projects.tsx`
- Modify: `src/components/sections/Education.tsx`
- Modify: `src/components/sections/Contact.tsx`
- Modify: `src/content/tr.ts:166`
- Modify: `src/content/en.ts:166`
- Delete: `src/components/ui/TiltCard.tsx`

**Interfaces:**
- Produces: güncel tasarım token'ları ve kart davranışı; `TiltCard` yok.
- Consumes: Task 2'nin `asset()` kullanımı (About/Projects görselleri).

- [ ] **Step 1: Token'ları ve `.glass`'ı güncelle**

`src/app/globals.css`:

```css
--bg-card: rgba(13, 23, 48, 0.82);
--line: rgba(140, 180, 255, 0.16);
--fg-muted: #a6b4d2;
```

Light tema:

```css
--bg-card: rgba(255, 255, 255, 0.9);
--line: rgba(15, 40, 90, 0.14);
--fg-muted: #4b5a7a;
```

`.glass` içinde `blur(14px)` → `blur(8px)` (webkit dahil).

- [ ] **Step 2: Bölüm boşluklarını sıkılaştır**

Altı bölüm dosyasında `py-28 md:py-40` → `py-20 md:py-28` (About, Experience, Projects, Skills, Education, Contact; Skills Task 4'te zaten yapıldıysa atla).

- [ ] **Step 3: Bölüm başlığı ölçeğini sakinleştir**

- `SectionHeading.tsx`: `text-4xl ... sm:text-5xl md:text-6xl` → `text-4xl ... sm:text-5xl`.
- `About.tsx` ve `Skills.tsx` başlıkları: `md:text-6xl` kaldır.
- `Contact.tsx` başlığı: `text-5xl sm:text-6xl md:text-7xl` → `text-4xl sm:text-5xl`.

- [ ] **Step 4: TiltCard'ı kaldır**

`About.tsx`:
- `TiltCard` importunu sil.
- `<TiltCard max={12} className="rounded-3xl">` … `</TiltCard>` yerine `<figure className="rounded-3xl">` … `</figure>`.
- Görselin arkasındaki `aria-hidden` radial glow `div`'ini tamamen kaldır.
- İç `div`'lerdeki parlama/gölge sınıflarını sadeleştir: `glass overflow-hidden rounded-3xl p-2 shadow-[0_20px_60px_-30px_var(--shadow)]`.

`Projects.tsx`:
- `TiltCard` importunu sil.
- Kartı saran `<TiltCard ...>` / `</TiltCard>` kaldır; `<article>` doğrudan `Reveal` içinde kalsın.
- `<article>` sınıfına `hover:-translate-y-1` ekle; `transition-shadow` → `transition duration-300`.
- Görselde `group-hover:scale-105` → `group-hover:scale-[1.03]`.

`git rm src/components/ui/TiltCard.tsx`.

- [ ] **Step 5: Zaman çizelgesi tarihlerini düzelt**

`src/components/sections/Experience.tsx`:

- Üç yerdeki `md:left-[11.5rem]` → `md:left-[13rem]`.
- `md:grid-cols-[11.5rem_1fr]` → `md:grid-cols-[13rem_1fr]`.
- Tarih kolonunda `md:pr-10` → `md:pr-8`.
- Tarih `<p>`: `text-xs tracking-wide ... md:text-sm` → `text-xs tracking-normal whitespace-nowrap ...`.
- Kart `p-6 md:p-8` → `p-6 md:p-7`.

- [ ] **Step 6: Footer metnini düzelt**

`src/content/tr.ts`: `"Next.js, GSAP & Motion ile geliştirildi"`
`src/content/en.ts`: `"Built with Next.js, GSAP & Motion"`

- [ ] **Step 7: Doğrula**

```bash
grep -rnE 'TiltCard' src || true
grep -rnE 'py-28 md:py-40' src || true
npm run build && npm run verify
npx tsc --noEmit && npm run lint
```

Expected: iki grep de boş; build/verify/tsc/lint temiz.

- [ ] **Step 8: Görsel kontrol**

Dev sunucusunda (`npm run dev`) 1440px ve 375px'te `/tr` ve `/en`:
- Açık/koyu temada gövde metni ve chip'ler okunur.
- Deneyim tarihleri tek satır: "Eyl 2025 – May 2026".
- Proje kartlarında hover'da yalnızca hafif yükselme/gölge var.
- Mutfix kartında "Ziyaret et" butonu yok (URL tanımlı değil).
- `document.documentElement.scrollWidth <= window.innerWidth`.

- [ ] **Step 9: Commit**

```bash
git add src/app/globals.css src/components src/content
git commit -m "style: calm spacing, cards and timeline"
```

---

## Task 6: Hero'yu kısalt ve mobil boşluğu düzelt

**Files:**
- Modify: `src/components/hero/ScrollVideoHero.tsx`

**Interfaces:**
- Consumes: `asset()` (Task 2).
- Produces: `ScrollVideoHero({ t: Dictionary })` — prop imzası değişmez.

- [ ] **Step 1: Yüksekliği düşür**

`src/components/hero/ScrollVideoHero.tsx:267`:

```tsx
className="relative h-[180vh] md:h-[240vh]"
```

- [ ] **Step 2: İkinci beat'i kaldır**

- `beatRef` tanımını (yaklaşık satır 89) sil.
- `apply` içindeki `bIn`/`bOut` bloğunu (yaklaşık 160-169) sil.
- JSX'teki `ref={beatRef}` taşıyan `<div>` bloğunu (yaklaşık 328-344) sil.

- [ ] **Step 3: Mobil ölçümü son intro öğesine bağla**

`measure` içinde:

```ts
const last = intro?.lastElementChild as HTMLElement | null;
const introBottom = intro && last
  ? intro.offsetTop + last.offsetTop + last.offsetHeight
  : H * 0.5;
const gap = mobile ? 12 : 24;
const hintSpace = mobile ? 64 : 84;
const top = introBottom + gap;
const ratio = mobile ? 0.62 : 0.5625;
let w0 = mobile ? Math.min(W * 0.9, 420) : W * 0.62;
```

`introBottom` hesabı `introRef` konumlandırılmış olduğu için `offsetTop`'ları toplar.

- [ ] **Step 4: Doğrula**

```bash
grep -nE 'beatRef|bIn|bOut' src/components/hero/ScrollVideoHero.tsx || true
npm run build && npm run verify
npx tsc --noEmit && npm run lint
```

Expected: grep boş; build/verify temiz.

- [ ] **Step 5: Reduced motion ve mobil kontrol**

- `npm run dev`; `/tr` 375px: CTA'lar ile video kartı arasındaki boşluk ≤ ~24px; taşma yok.
- DevTools → Rendering → `prefers-reduced-motion: reduce`: poster + intro görünür, scrub yok.
- 1440px'te hero 240vh; ilerleme çubuğu çalışır; ikinci metin tekrarı yok.

- [ ] **Step 6: Commit**

```bash
git add src/components/hero/ScrollVideoHero.tsx
git commit -m "refactor: shorten hero and close mobile gap"
```

---

## Task 7: Mobil menüye odak tuzağı ekle

**Files:**
- Modify: `src/components/sections/Navbar.tsx`

**Interfaces:**
- Consumes: `localeHref` (Task 2).
- Produces: `Navbar({ t, lang })` — prop imzası değişmez.

- [ ] **Step 1: Ref'leri ekle**

```tsx
const menuRef = useRef<HTMLDivElement>(null);
const toggleRef = useRef<HTMLButtonElement>(null);
```

`<button aria-controls="mobile-menu" ...>` üzerine `ref={toggleRef}`; menü `motion.div` üzerine `ref={menuRef}`.

- [ ] **Step 2: Açıkken odak yönetimini uygula**

Mevcut `useEffect(() => { if (!open) return; ... }, [open])` bloğunu şu davranışla değiştir:

- Açılınca `menuRef.current?.querySelector<HTMLElement>("a[href],button")?.focus()`.
- `Tab`/`Shift+Tab` menüdeki ilk/son öğe arasında döner.
- `Escape` kapatır.
- Cleanup'ta `toggleRef.current?.focus()` ve `document.documentElement.style.overflow = ""`.

Örnek gövde:

```tsx
useEffect(() => {
  if (!open) return;
  const root = menuRef.current;
  root?.querySelector<HTMLElement>("a[href],button")?.focus();
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key !== "Tab" || !root) return;
    const items = [...root.querySelectorAll<HTMLElement>("a[href],button:not([disabled])")];
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  document.addEventListener("keydown", onKey);
  document.documentElement.style.overflow = "hidden";
  return () => {
    document.removeEventListener("keydown", onKey);
    document.documentElement.style.overflow = "";
    toggleRef.current?.focus();
  };
}, [open]);
```

- [ ] **Step 3: Doğrula**

```bash
npm run build && npm run verify
npx tsc --noEmit && npm run lint
```

- [ ] **Step 4: Klavye kontrolü**

`npm run dev`, 375px:
- Menü açılınca odak ilk bağlantıda.
- Tab/Shift+Tab menü içinde döner.
- Escape kapatır ve odak hamburger butonuna döner.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Navbar.tsx
git commit -m "fix: trap focus in mobile menu"
```

---

## Task 8: GitHub Actions deploy, README ve tarihsel plan notu

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`
- Modify: `docs/PLAN.md`

**Interfaces:**
- Consumes: Task 1/2'nin export, `basePath`, `siteUrl` ve `npm run verify` altyapısı.
- Produces: `main`'e push'ta otomatik Pages deploy.

- [ ] **Step 1: Workflow'u yaz**

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Resolve base path and site URL
        run: |
          owner=$(echo "${GITHUB_REPOSITORY%/*}" | tr '[:upper:]' '[:lower:]')
          repo=$(echo "${GITHUB_REPOSITORY#*/}" | tr '[:upper:]' '[:lower:]')
          if [ "$repo" = "$owner.github.io" ]; then
            echo "NEXT_PUBLIC_BASE_PATH=" >> "$GITHUB_ENV"
            echo "NEXT_PUBLIC_SITE_URL=https://$owner.github.io" >> "$GITHUB_ENV"
          else
            echo "NEXT_PUBLIC_BASE_PATH=/$repo" >> "$GITHUB_ENV"
            echo "NEXT_PUBLIC_SITE_URL=https://$owner.github.io/$repo" >> "$GITHUB_ENV"
          fi
      - run: npm ci
      - run: npm run build
      - run: npm run verify
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: YAML'i doğrula**

```bash
ruby -ryaml -e 'YAML.load_file(".github/workflows/deploy.yml")' && echo OK
```

Expected: `OK`.

- [ ] **Step 3: README'yi güncelle**

Boilerplate'i şununla değiştir:
- Kısa proje tanımı ve stack.
- `npm install`, `npm run dev`, `npm run build`, `npm run verify`.
- Yayın: depoyu `selahattinozdmr.github.io` olarak adlandır; Settings → Pages → Source: GitHub Actions; `main`'e push.
- Depo adı farklıysa workflow'un `/<repo>` basePath'ini otomatik uyguladığını not et.
- `docs/superpowers/` altındaki tasarım/plan bağlantıları.

- [ ] **Step 4: `docs/PLAN.md`'ye superseded notu ekle**

Dosyanın en başına:

```md
> **Superseded:** Bu belge ilk 3B sürümü anlatır. Güncel tasarım:
> [2026-11-25 portfolio design](superpowers/specs/2026-11-25-portfolio-simplify-github-pages-design.md).
```

- [ ] **Step 5: İki deployment senaryosunu yerelde doğrula**

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio NEXT_PUBLIC_SITE_URL=https://selahattinozdmr.github.io/portfolio npm run build
NEXT_PUBLIC_BASE_PATH=/portfolio npm run verify
npm run build
npm run verify
```

Expected: proje sitesi build'inde `verify` `/portfolio/_next/` ve `/portfolio/tr/` yollarını doğrular; son build kullanıcı sitesine döner.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/deploy.yml README.md docs/PLAN.md docs/superpowers
git commit -m "ci: deploy static export to GitHub Pages"
```

---

## Task 9: Son QA ve temizlik

**Files:**
- Modify: yalnızca bulunan hataların dosyaları.

**Interfaces:**
- Consumes: tüm önceki görevler.
- Produces: yayına hazır `main`.

- [ ] **Step 1: Tüm kontrolleri çalıştır**

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run verify
```

Expected: hepsi temiz; `verify` tüm satırlarda `PASS`.

- [ ] **Step 2: Statik çıktıyı sun ve HTTP kontrolleri yap**

```bash
python3 -m http.server 4173 -d out &
SERVER=$!
sleep 1
for path in / /tr/ /en/ /video/hero.mp4 /video/hero-mobile.mp4 /video/orb-loop.mp4 /images/og.jpg; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4173$path")
  echo "$code $path"
done
kill $SERVER
```

Expected: hepsi `200`. `/` gövdesinde `url=/tr/` var.

- [ ] **Step 3: Tarayıcı kontrolü (375 / 768 / 1440)**

`npm run dev` ile:
- `/` → `/tr/` yönlenir.
- TR/EN dil değiştirme çalışır.
- Açık/koyu tema okunur; chip'ler ve kartlar AA kontrastında.
- 375px'te `document.documentElement.scrollWidth <= window.innerWidth` → `true`.
- Proje kartlarında hover yükselmesi; tilt/glare yok.
- Yetenek bölümünde etiket çakışması yok.
- Deneyim tarihleri tek satır.
- Konsolda hata yok.

- [ ] **Step 4: Reduced motion kontrolü**

DevTools → Rendering → `prefers-reduced-motion: reduce`:
- Hero poster + intro görünür; scrub yok.
- İletişim küresi video oynamaz, poster görünür.
- Reveal içerikleri görünür.
- Sayfa kaydırılabilir.

- [ ] **Step 5: Bulunan hataları düzelt ve yeniden doğrula**

Her düzeltmeden sonra Step 1'i tekrar çalıştır. Yeni kapsam ekleme; yalnızca bu planın hedeflerine hizmet eden düzeltmeleri yap.

- [ ] **Step 6: Son commit**

```bash
git add -A
git commit -m "chore: final QA fixes for static deployment"
```

---

## Kapsam Eşlemesi

| Spec bölümü | Görev |
|---|---|
| §6.1 bilgi mimarisi/ritim | Task 5 |
| §6.2 arka plan | Task 3 |
| §6.3 hero | Task 6 |
| §6.4 yetenekler | Task 4 |
| §6.5 deneyim | Task 5 |
| §6.6 kart/kontrast/tilt | Task 5 |
| §6.7 navigasyon | Task 7 |
| §6.8 iletişim/footer | Task 5 |
| §6.9 motion | Task 3, 5, 6 |
| §6.10 rotalar ve `/` | Task 1, 2 |
| §6.11 statik export/basePath | Task 1, 2 |
| §6.12 GitHub Pages | Task 8 |
| §6.13 bağımlılıklar | Task 4 |
| §6.14 video ağırlığı | Task 9 (bilgi amaçlı; zorunlu değil) |
| §7 dosya yapısı | Task 1-8 |
| §9 Review Focus | Task 1-9 doğrulamaları |
