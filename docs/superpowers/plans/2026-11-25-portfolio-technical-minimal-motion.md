# Portfolio Teknik Minimal + Motion — Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mevcut sıcak editöryel görsel katmanı cool monokrom + tek elektrik mavisi accent ve Space Grotesk tipografisine çevirmek; Motion tabanlı bir giriş/scroll/nav/proje/iletişim hareket sistemi eklemek; içerik, TR/EN, dark/light, statik export ve erişilebilirliği korumak.

**Architecture:** Next.js App Router tek sayfa. Mevcut bileşen ve içerik yapısı korunur. Yeni `src/components/motion/*` primitifleri (ScrollProgress, SectionRule, SectionLabel, CursorSpotlight, Magnetic, TimelineLine) ve mevcut Motion importları kullanılır; GSAP/Lenis/video/3B yok. Tüm görsel token'lar cool monokrom + elektrik mavisi; display font Space Grotesk.

**Tech Stack:** Next.js 16.4.6, React 19.3, TypeScript strict, Tailwind v4, Motion (`motion/react`), CSS keyframes; statik export + GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-25-portfolio-technical-minimal-motion-design.md`

## Global Constraints

- Next.js **16.4.6** — eğitim verisinden farklıdır. Kod yazmadan önce `AGENTS.md` ve `node_modules/next/dist/docs/` rehberlerini oku.
- Node >=20.9, React 19.3, TypeScript strict, Tailwind v4.
- `output: "export"`, `trailingSlash`, `images.unoptimized`, basePath/site URL, `.nojekyll` ve GitHub Pages davranışı korunur.
- TR/EN rotaları ve `Dictionary` deseni korunur; **içerik değişmez**, görünür metin bileşenlere gömülmez.
- Açık/koyu tema korunur; varsayılan koyu.
- 375/768/1440'te yatay taşma yok.
- WCAG AA: accent-ink, fg-muted ve on-accent metinleri ≥4.5:1.
- `prefers-reduced-motion: reduce` altında tüm içerik görünür, hareket kapalı.
- JS kapalıyken içerik ve iletişim bilgileri görünür.
- `npm run build`, `npx tsc --noEmit`, `npm run lint`, `npm run verify` her görev sonunda geçer.
- Yeni bağımlılık yok; Motion (kurulu) + CSS. Playwright yalnızca yerel QA; proje/CI bağımlılığı değil.
- Uydurma metin/metrik/referans yok. Proje görselleri dekoratif önizleme olarak kalır.
- Tek cam yüzey hero profil panelidir; mobil menü kapsam içindedir; SectionShell index'i mevcut `eyebrow`'dan böler; LazyMotion zorunlu değildir; spotlight site geneli değildir.

## Review Focus

Bu değişikliğin en olası hataları; her biri ilgili görevin doğrulamasında kontrol edilir:

1. **Motion fazlalığı/performans:** Sadece transform/opacity; layout tetikleyen animasyon yok; scroll-jacking yok; `will-change` kısa ömürlü. → Task 2, 3, 5, 6, 8.
2. **Kontrast:** Açık temada accent fill/on-accent (5.07), accent-ink (6.19), muted (5.67); koyu tema accent (8.05), accent-ink (11.20), muted (7.94). → Task 1, 8.
3. **Türkçe glyph/CLS:** Space Grotesk Ö/Ü/Ş/ğ/ı doğru; font swap/CLS kabul edilebilir. → Task 1, 8.
4. **No-JS / reduced motion:** Hero CSS animasyonu no-JS'te çalışır; Reveal/SectionLabel/ScrollProgress içerik gizlemez; reduced motion tüm hareketi kapatır. → Task 2, 3, 8.
5. **Hover/spotlight/magnetic:** Yalnızca `(hover: hover) and (pointer: fine)` ve reduced değilken; linkler/klavye odağı etkilenmez; spotlight `pointer-events:none`. → Task 3, 5, 8.
6. **375/768 taşma:** Uzun TR/EN metin, mobil menü, proje satırları, e-posta; yatay taşma yok. → Task 4, 5, 8.
7. **Nav erişilebilirliği:** Gizli nav `inert`; aktif bölüm; mobil menü odak tuzağı; Escape; reduced motion'da animasyonsuz. → Task 4, 8.
8. **BasePath/static export:** canonical/hreflang/OG/asset bir kez; `/portfolio` build; legacy yok. → Task 1, 7, 8.
9. **İçerik bütünlüğü:** Metinler, proje problem/outcome/details, TR/EN değerleri değişmez. → Task 3-8.

## İçerik ve Token Değerleri (kesin)

### Renk token'ları

Koyu `:root`:

```css
--bg: #07080a;
--bg-rgb: 7 8 10;
--bg-elev: #0d0f13;
--surface: rgba(255, 255, 255, 0.04);
--line: rgba(238, 242, 247, 0.12);
--fg: #eef2f7;
--fg-rgb: 238 242 247;
--fg-muted: #9aa4b2;
--accent: #7aa2ff;
--accent-rgb: 122 162 255;
--accent-ink: #a8c1ff;
--on-accent: #07080a;
--shadow: rgba(0, 0, 0, 0.5);
color-scheme: dark;
```

Açık `:root[data-theme="light"]`:

```css
--bg: #f4f6f8;
--bg-rgb: 244 246 248;
--bg-elev: #ffffff;
--surface: rgba(255, 255, 255, 0.72);
--line: rgba(11, 16, 32, 0.12);
--fg: #0b1020;
--fg-rgb: 11 16 32;
--fg-muted: #596273;
--accent: #2b63f0;
--accent-rgb: 43 99 240;
--accent-ink: #1d4ed8;
--on-accent: #ffffff;
--shadow: rgba(11, 16, 32, 0.14);
color-scheme: light;
```

`@theme inline`:

```css
--color-bg: var(--bg);
--color-bg-elev: var(--bg-elev);
--color-surface: var(--surface);
--color-line: var(--line);
--color-fg: var(--fg);
--color-muted: var(--fg-muted);
--color-accent: var(--accent);
--color-accent-ink: var(--accent-ink);
--color-on-accent: var(--on-accent);
--font-sans: var(--font-inter);
--font-display: var(--font-grotesk);
--font-mono: var(--font-jetbrains);
```

`--card`, `--font-serif`, `Instrument_Serif`, warm `#0d0b09`, `#d97745`,
`#e08a5b`, `#f4efe6`, `#b8501f`, `#9a3d17` kalmaz.

### Font

`src/app/(site)/[lang]/layout.tsx`:

```tsx
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const display = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-grotesk" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-jetbrains" });
```

`Instrument_Serif` importu ve `--font-serif` kalkar. `<html>` class'ı `${sans.variable} ${display.variable} ${mono.variable}`.

### Background

`SiteBackdrop` CSS: `--bg` + 64px ince grid + tek accent radial glow + grain.
Grid opaklığı koyu ~0.055, açık ~0.05; glow koyu 0.16/0.10, açık 0.10/0.06.
Grid yavaş drift (`background-position` 24s) yalnızca no-preference'ta.

### Content

İçerik değişmez. Mevcut `hero` (`availability`, `focus`, `now`, `timezone`,
`stack`, etiketler), `about.pullQuote`, `experience.outcome`, proje
`problem/outcome/details`, `skills.groups`, eğitim/iletişim/footer aynı kalır.

## Dosya Yapısı

**Yeni**
- `src/components/motion/ScrollProgress.tsx` (client)
- `src/components/motion/SectionRule.tsx` (client)
- `src/components/motion/SectionLabel.tsx` (client)
- `src/components/motion/CursorSpotlight.tsx` (client)
- `src/components/motion/Magnetic.tsx` (client)
- `src/components/motion/TimelineLine.tsx` (client)

**Değişecek**
- `src/app/globals.css`, `src/app/(site)/[lang]/layout.tsx`, `src/app/(site)/[lang]/page.tsx`
- `src/components/ui/{Logo,SectionShell,Reveal,CopyEmailButton}.tsx`
- `src/components/hero/Hero.tsx`
- `src/components/sections/{Navbar,About,Experience,Projects,Skills,Education,Contact,Footer}.tsx`
- `src/components/work/{WorkRow,CompactWorkRow}.tsx`
- `src/app/icon.svg`
- `scripts/verify-build.mjs`, `scripts/og.html`, `public/images/og.jpg`, `README.md`
- `docs/superpowers/**` (yeni tasarım/plan commit'i)

**Silinecek**
- `--card`/`--font-serif`/Instrument Serif referansları
- `.glass` sınıfı (`.surface`'a taşınır)
- `.text-gradient` (dead)

---

## Task 1: Cool tasarım temeli — token'lar, Space Grotesk, logo/favicon, backdrop

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/(site)/[lang]/layout.tsx`
- Modify: `src/components/ui/Logo.tsx`
- Modify: `src/app/icon.svg`
- Modify: `src/components/hero/Hero.tsx` (yalnızca `.glass` → `.surface`)
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- Produces: cool token'lar, `--surface`, `--font-grotesk`, `font-display` = Space Grotesk, `.surface`, grid backdrop.
- Consumes: mevcut tüm bileşenler; layout değişmez.

- [ ] **Step 1: RED — yeni temel assertion'ları**

`verify-build.mjs`'e ekle; eski warm/serif assertion'larını kaldır:

```js
checks.push(
  [globals.includes("--bg: #07080a;"), "koyu kanvas"],
  [globals.includes("--bg: #f4f6f8;"), "açık kanvas"],
  [globals.includes("--accent: #7aa2ff;"), "koyu accent"],
  [globals.includes("--accent: #2b63f0;"), "açık accent"],
  [globals.includes("--accent-ink: #a8c1ff;"), "koyu accent metin"],
  [globals.includes("--accent-ink: #1d4ed8;"), "açık accent metin"],
  [globals.includes("--surface:"), "surface token'ı"],
  [globals.includes("--font-display: var(--font-grotesk)"), "Space Grotesk display"],
  [source("src/app/(site)/[lang]/layout.tsx").includes("Space_Grotesk"), "Space Grotesk yüklü"],
  [!source("src/app/(site)/[lang]/layout.tsx").includes("Instrument_Serif"), "Instrument Serif kalktı"],
  [!/var\(--(card|font-serif)/.test(globals), "eski card/serif token'ı kalktı"],
  [source("src/components/ui/Logo.tsx").includes("var(--accent)"), "logo accent"],
  [source("src/app/icon.svg").includes("#7aa2ff") && !source("src/app/icon.svg").includes("#d97745"), "favicon yeni palet"],
);
```

Contrast döngüsü aynı token adlarını kullanır; değerler yeni olduğu için
otomatik güncellenir. Eski `--bg: #0d0b09`, `--accent: #d97745`,
`--accent-ink: #e08a5b`, `Instrument_Serif`, `blur`/`glass` assertion'larını sil.

Run: `npm run verify` → FAIL.

- [ ] **Step 2: `globals.css`**

- `:root`/light token'larını yukarıdaki değerlerle değiştir.
- `@theme` `--color-card` → `--color-surface`; `var(--card)` → `var(--surface)`.
- `--font-display: var(--font-grotesk)`.
- `.glass` → `.surface`:

```css
.surface {
  background: var(--surface);
  border: 1px solid var(--line);
}
```

- `.text-gradient` bloğunu sil.
- `SiteBackdrop`: 64px grid + tek accent glow + grain (statik); açık tema
  grid/glow değerleri. Grid drift Task 2'de eklenir.
- `html` smooth scroll ve reduced-motion auto korunur.

- [ ] **Step 3: Font**

`layout.tsx`: `Inter, Space_Grotesk, JetBrains_Mono`; `display` = Space Grotesk
`variable: "--font-grotesk"`; `Instrument_Serif` kaldır; html class güncelle.

- [ ] **Step 4: Logo/favicon**

`Logo.tsx`: path `var(--accent)`, daireler `var(--fg-muted)`; yorumu güncelle.
`icon.svg`: `#22d3ee`/`#d97745` → `#7aa2ff`; `#fb923c`/`#f4efe6` → `#07080a`.

- [ ] **Step 5: Hero surface**

`Hero.tsx` `<aside className="glass ...">` → `surface`. Başka `.glass` kullanımı
kalmadığını doğrula.

- [ ] **Step 6: Green + görsel + commit**

```bash
npm run build && npm run verify
npx tsc --noEmit && npm run lint
```

1440/375, dark/light: cool kanvas, Space Grotesk, elektrik mavisi accent, logo/favicon;
taşma yok.

```bash
git add -A
git commit -m "style: switch to cool technical-minimal design system"
```

---

## Task 2: Motion primitifleri, SectionShell ve scroll ilerlemesi

**Files:**
- Create: `src/components/motion/{ScrollProgress,SectionRule,SectionLabel}.tsx`
- Modify: `src/components/ui/SectionShell.tsx`
- Modify: `src/app/(site)/[lang]/page.tsx`
- Modify: `src/components/ui/Reveal.tsx`
- Modify: `src/app/globals.css`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- `ScrollProgress()` — fixed 2px accent line.
- `SectionRule({ className? })` — view'a girince soldan sağa çizilen hairline.
- `SectionLabel({ sectionId, index, text })` — sticky; section in-view olduğunda
  accent nokta/çizgi; no-JS statik.
- `SectionShell` `label`'ı `" — "` ile `index` + `text` böler; ayraç yoksa
  yalnızca metin.

- [ ] **Step 1: RED**

```js
checks.push(
  [source("src/components/motion/ScrollProgress.tsx").includes("useScroll"), "ScrollProgress"],
  [source("src/components/motion/SectionRule.tsx").includes("useInView"), "SectionRule"],
  [source("src/components/motion/SectionLabel.tsx").includes("IntersectionObserver"), "SectionLabel"],
  [source("src/app/(site)/[lang]/page.tsx").includes("<ScrollProgress />"), "sayfa progress kullanıyor"],
  [source("src/components/ui/SectionShell.tsx").includes("split(\" — \")"), "section index parse"],
  [globals.includes("gridDrift") || globals.includes("grid-drift"), "grid drift keyframes"],
);
```

Run → FAIL.

- [ ] **Step 2: `ScrollProgress`**

```tsx
"use client";
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ scaleX }} />
  );
}
```

- [ ] **Step 3: `SectionRule` ve `SectionLabel`**

`SectionRule`: client; `useInView(ref,{once:true,margin:"-80px"})`; `initial={false}`,
`animate={{scaleX: inView?1:0}}`, `origin-left bg-line` + accent; `aria-hidden`.

`SectionLabel`: client; props `{ sectionId, index, text }`; `useEffect` ile
`document.getElementById(sectionId)` üzerinde IntersectionObserver
`{ rootMargin: "-35% 0px -55% 0px" }`; `active` state; render:

```tsx
<p className="flex items-start gap-3 font-mono text-xs uppercase tracking-[0.16em] md:sticky md:top-28 md:self-start">
  {index ? <span className="text-accent-ink">{index}</span> : null}
  <span className="relative">
    <span className={active ? "text-fg" : "text-muted"}>{text}</span>
    <span className={active ? "absolute -bottom-2 left-0 h-px w-full bg-accent" : "hidden"} />
  </span>
</p>
```

No-JS: initial `active=false`; label visible; no motion.

- [ ] **Step 4: `SectionShell`**

`label.split(" — ")`; `index = parts.length>1 ? parts[0] : ""`, `text = parts.length>1 ? parts.slice(1).join(" — ") : label`.
`border-t` yerine `<SectionRule />`; label yerine `<SectionLabel sectionId={id} index={index} text={text} />`.
Title/children aynı.

- [ ] **Step 5: Page + Reveal + CSS**

`page.tsx`: `<ScrollProgress />` ekle (SiteBackdrop'tan önce).
`Reveal` default `y=16`; mevcut no-JS mantığı korunur.
`globals.css`: `@keyframes grid-drift` (background-position), `@keyframes
status-pulse`; reduced-motion'da none. `.site-backdrop` grid background-size.

- [ ] **Step 6: Green + commit**

```bash
npm run build && npm run verify
npx tsc --noEmit && npm run lint
```

1440/375: progress, label line/active, rule draw; no-JS başlık/etiket görünür.
Commit: `git commit -m "feat: add motion primitives and scroll progress"`.

---

## Task 3: Hero motion — CSS giriş, spotlight, manyetik CTA

**Files:**
- Create: `src/components/motion/{CursorSpotlight,Magnetic}.tsx`
- Modify: `src/components/hero/Hero.tsx`
- Modify: `src/app/globals.css`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- `CursorSpotlight({ children, className? })` — yerel pointer spotlight; fine pointer/no reduced; CSS var; `pointer-events:none`.
- `Magnetic({ children, strength? })` — inline-block wrapper; fine pointer/no reduced; transform; klavye/odak etkilenmez.

- [ ] **Step 1: RED**

```js
checks.push(
  [source("src/components/hero/Hero.tsx").includes("CursorSpotlight"), "hero spotlight"],
  [source("src/components/hero/Hero.tsx").includes("Magnetic"), "hero magnetic"],
  [source("src/components/hero/Hero.tsx").includes("data-hero"), "hero CSS giriş"],
  [globals.includes("hero-in") || globals.includes("heroIn"), "hero keyframes"],
);
```

- [ ] **Step 2: `CursorSpotlight`**

Client; wrapper `div` ref; `useEffect` media `(hover: hover) and (pointer: fine)`
ve `(prefers-reduced-motion: no-preference)`; `pointermove` ile
`el.style.setProperty("--spot-x", ...)`, `--spot-y`; `pointerleave` 50%;
`className` + `relative`; `::before` CSS radial accent, `opacity 0/1`,
`pointer-events:none`.

- [ ] **Step 3: `Magnetic`**

Client; `span` wrapper `inline-block`; media gate; `pointermove` offset
`strength` (varsayılan 6px) `translate3d`; `pointerleave` sıfırla; link
klavye/odak davranışı değişmez.

- [ ] **Step 4: Hero**

- Availability pill dot: `animate-[status-pulse_2.4s_ease-in-out_infinite]`
  (CSS keyframes; reduced motion none).
- İsim/rol/tagline/CTA: `data-hero` + `data-delay` classes; CSS `hero-in`
  keyframes; no-JS'te de çalışır; reduced motion none.
- Profil paneli: `<CursorSpotlight className="surface ...">`; içerik aynı.
- CTA'lar: her birini `<Magnetic>` ile sar; link still `<a>`.
- Video/3B/GSAP yok.

- [ ] **Step 5: Green + görsel + commit**

1440: spotlight profil panelinde; CTA manyetik; 375/dokunmatik: spotlight yok,
CTA normal; reduced motion: intro/pulse/spotlight/magnetic yok; içerik görünür.
Commit: `git commit -m "feat: add hero motion and spotlight"`.

---

## Task 4: Navbar active state ve teknik mobil menü

**Files:**
- Modify: `src/components/sections/Navbar.tsx`
- Modify: `src/app/globals.css`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- Navbar: `active` section state; desktop underline; mobile menu technical.
- Hidden header: `inert` when `hidden && !open`.

- [ ] **Step 1: RED**

```js
checks.push(
  [nav.includes("IntersectionObserver"), "navbar active observer"],
  [nav.includes("inert={hidden"), "hidden nav inert"],
  [nav.includes("active"), "navbar active state"],
  [nav.includes("md:hidden"), "mobile menu korunuyor"],
);
```

- [ ] **Step 2: Active section**

`useEffect`: `links` id'leri için `IntersectionObserver` `{rootMargin:"-40% 0px -50% 0px"}`;
`active` state. Desktop link: `aria-current={active===k?"true":undefined}`;
`text-fg` + `after` accent line for active; hover underline.

- [ ] **Step 3: Hidden nav**

`<header inert={hidden && !open ? true : undefined} ...>`; when hidden, links
not focusable. Scrolling up/focusing the menu reveals via existing scroll.
No `aria-hidden` needed.

- [ ] **Step 4: Mobil menü**

Panel: `bg-bg/95` + grid/hairline; links `font-display text-4xl` + mono index;
active link accent; `motion.li` stagger; reduced motion'da `initial={false}`,
`animate` immediate, delay 0; panel clipPath reduce-aware (mevcut). Keep focus
trap, Escape, overflow lock. `aria-label={t.nav.menu}`.

- [ ] **Step 5: Green + görsel + commit**

1440: active underline; 375: menu open/close, focus trap, reduced motion instant;
hidden nav Tab ile erişilmez. Commit: `git commit -m "feat: add navbar active state and motion menu"`.

---

## Task 5: Projeler — spring hover preview, details, erişilebilir linkler

**Files:**
- Modify: `src/components/work/{WorkRow,CompactWorkRow}.tsx`
- Modify: `src/app/globals.css`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- WorkRow: preview yalnızca ilk hover'dan sonra mount; `useMotionValue`/`useSpring`;
  details ikonu/fade; link `aria-label={`${project.name} — ...`}`.
- CompactWorkRow: aynı accessible name.

- [ ] **Step 1: RED**

```js
checks.push(
  [source("src/components/work/WorkRow.tsx").includes("useSpring"), "preview spring"],
  [source("src/components/work/WorkRow.tsx").includes("onPointerEnter"), "preview mount on hover"],
  [source("src/components/work/WorkRow.tsx").includes("aria-label"), "project link context"],
  [source("src/components/work/CompactWorkRow.tsx").includes("aria-label"), "compact link context"],
  [globals.includes("details[open]") || globals.includes("details summary"), "details motion"],
);
```

- [ ] **Step 2: WorkRow preview**

- `const [hovered,setHovered]=useState(false)`; `onPointerEnter={()=>setHovered(true)}`.
- `x/y/opacity` `useMotionValue`; `useSpring` (stiffness 160/damping 20) for
  x/y; apply via `style={{x,y,opacity}}` on preview; no per-move setState.
- Preview yalnızca `hovered && enabled` iken render; `Image loading="lazy"`,
  `sizes="280px"`, `alt=""`, `aria-hidden`, `pointer-events-none`.
- Links: `aria-label={`${project.name} — ${project.linkLabel ?? labels.visit}`}`.
- Details: summary `+`/`×` ikonu; `group-open:rotate-45`; content CSS fade;
  native `<details>` korunur.
- Row hover: `after` accent line scaleX; only CSS.
- Compact link: `aria-label`.

- [ ] **Step 3: Green + görsel + commit**

1440: hover'da tek preview yüklenir/spring; details açılır; 375: preview yok,
linkler görünür; no overflow. Commit: `git commit -m "feat: add project preview springs and accessible links"`.

---

## Task 6: Bölüm görsel/motion pass

**Files:**
- Create: `src/components/motion/TimelineLine.tsx`
- Modify: `src/components/sections/{About,Experience,Skills,Education,Contact,Footer}.tsx`
- Modify: `src/components/ui/CopyEmailButton.tsx`
- Modify: `src/app/globals.css`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- `TimelineLine()` — Experience dikey accent çizgisi; `useScroll` target; reduced motion'da statik.
- About pull quote: `italic` yok; sans/teknik.
- Contact: email underline animasyonu; copy success.
- Footer: tek ok.

- [ ] **Step 1: RED**

```js
checks.push(
  [!source("src/components/sections/About.tsx").includes("italic"), "About serif italic kalktı"],
  [source("src/components/motion/TimelineLine.tsx").includes("useScroll"), "timeline line"],
  [source("src/components/sections/Contact.tsx").includes("email-underline"), "email underline"],
  [!source("src/components/sections/Footer.tsx").includes("↑"), "footer tek ok"],
);
```

- [ ] **Step 2: About / Experience / Skills / Education**

- About: pull quote `font-display text-2xl md:text-3xl` (italic yok); stats
  hairline; Reveal delay; `.surface` yok.
- Experience: `<TimelineLine />` üstte/`ol` içinde; satırlar `Reveal` delay;
  tarih mono; no GSAP.
- Skills: gruplar `Reveal` delay; hover'da `after` accent line.
- Education: yayın satırı `Reveal`; mono labels.

- [ ] **Step 3: Contact / CopyEmail / Footer**

- Contact: büyük e-posta linkine `.email-underline` (background-size 0→100%
  on hover/focus); availability pill; copy/social.
- `CopyEmailButton`: copied state'te ikon/scale CSS; `aria-live` korunur.
- Footer: `<span aria-hidden>↑</span>` kaldır; tek SVG ok; hover translate.

- [ ] **Step 4: Green + görsel + commit**

1440/375: About quote, timeline line, contact underline/copy, footer tek ok;
reduced motion statik. Commit: `git commit -m "feat: add section motion and visual polish"`.

---

## Task 7: OG görseli ve dokümantasyon

**Files:**
- Modify: `scripts/og.html`, `public/images/og.jpg`, `README.md`

**Interfaces:**
- OG 1200×630 yeni kimlik; README docs linkleri güncel.

- [ ] **Step 1: RED/QA**

`public/images/og.jpg` 1200×630 olmalı; README'de yeni tasarım/plan linkleri.
Mevcut OG warm/kil; yeni cool/mavi olmalı.

- [ ] **Step 2: OG**

`scripts/og.html`: `--bg #07080a`, isim Space Grotesk, rol, `#7aa2ff` accent,
64px grid, "Ankara · UTC+3". Yerel Chrome + `sips` ile üret:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --hide-scrollbars --disable-gpu --virtual-time-budget=3000 \
  --screenshot=/tmp/og.png --window-size=1200,630 "file://$PWD/scripts/og.html"
sips -s format jpeg -s formatOptions 85 /tmp/og.png --out public/images/og.jpg
```

- [ ] **Step 3: README**

Yeni tasarım/plan linkleri; `temporary preview` notu korunur; deploy/start aynı.

- [ ] **Step 4: Green + commit**

`npm run build && npm run verify && npx tsc --noEmit && npm run lint`.
Commit: `git commit -m "chore: refresh OG image and docs for technical minimal"`.

---

## Task 8: Son QA ve doğrulama harness'i

**Files:**
- Modify: `scripts/verify-build.mjs`
- Modify: yalnızca bulunan hataların dosyaları.

**Interfaces:**
- Consumes: tüm görevler.

- [ ] **Step 1: Harness'i son haline getir**

Doğrula:
- Yeni token'lar (`#07080a/#f4f6f8`, `#7aa2ff/#2b63f0`, accent-ink/on-accent),
  Space Grotesk, Instrument Serif yok, warm token yok.
- Motion primitifleri (`ScrollProgress`, `SectionRule`, `SectionLabel`,
  `CursorSpotlight`, `Magnetic`, `TimelineLine`), Hero/mobil/nav/proje motion.
- AA kontrast; iki locale; no-JS/SSR; basePath/canonical/OG; legacy yok.
- İçerik değişmedi: proje problem/outcome/details ve exact footer/Experience
  outcome assertion'ları korunur.

Run: `npm run build && npm run verify` → tüm PASS; `tsc`/`lint` temiz.

- [ ] **Step 2: HTTP + basePath**

```bash
python3 -m http.server 4174 -d out &
sleep 1
for path in / /tr/ /en/ /images/og.jpg /images/autosuchen24.jpg; do
  curl -s -o /dev/null -w "%{http_code} $path\n" "http://localhost:4174$path"
done
kill %1
```

Beklenen 200; `/` gövdesinde `url=/tr/`.

- [ ] **Step 3: Playwright yerel QA**

375/768/1440, TR/EN, dark/light:
- `scrollWidth === innerWidth`.
- Hero CSS giriş, progress, active nav; spotlight/magnetic fine pointer'da,
  dokunmatik/reduced'da yok.
- Mobil menü odak tuzağı, Escape, reduced motion instant; gizli nav inert.
- Proje hover preview tek görsel; details; linkler; no overflow.
- Contact email hover/copy; footer tek ok.
- JS kapalı: tüm içerik, hero, e-posta görünür.
- Reduced motion: tüm içerik, hareket yok; anchor offset.
- Space Grotesk Türkçe glyph (Ö, Ü, Ş, ğ, ı).
- OG yeni kimlik; konsol temiz.

- [ ] **Step 4: Düzelt + commit**

Her düzeltmeden sonra Step 1. Yeni kapsam ekleme.
Commit: `git commit -m "chore: final technical-minimal motion QA"`.

---

## Kapsam Eşlemesi

| Spec bölümü | Görev |
|---|---|
| §8.1 renk | Task 1 |
| §8.2 tipografi | Task 1 |
| §8.3 düzen | Task 2, 6 |
| §8.4 motion | Task 2-6 |
| §8.5 bileşenler | Task 2-6 |
| §9 sayfa akışı | Task 3-6 |
| §10 içerik | Hiçbiri (değişmez) |
| §11 kaldırılacaklar | Task 1, 3, 7 |
| §12 erişilebilirlik/performans | Task 2-8 |
| §13 doğrulama | Task 8 |
| §14 riskler | Review Focus |
| §15 uygulayıcıya kalanlar | Task 1-7 |
| §16 builder kararları | Task 1-4, 7 |
