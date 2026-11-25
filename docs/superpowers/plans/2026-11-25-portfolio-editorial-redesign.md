# Portfolio Editöryel Yeniden Tasarım — Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mevcut koyu/neon/3D portfolyoyu sıcak, editöryel ve vaka çalışması odaklı bir portfolyoya dönüştürmek; hero videosu, iletişim küresi, GSAP ve Lenis'i kaldırıp tipografi, boşluk ve gerçek iş anlatısıyla taşınan, GitHub Pages'te statik yayınlanan bir site bırakmak.

**Architecture:** Next.js App Router tek sayfa. `output: "export"` ve basePath altyapısı korunur. Yeni tasarım sistemi: sıcak kağıt/mürekkep paleti, tek kil (clay) accent, Instrument Serif + Inter + JetBrains Mono, sticky numaralı bölümler, 3 vaka satırı + 2 kısa proje. Hero ve iletişim video/3B içermez; Motion yalnızca küçük reveal ve hover preview için kalır.

**Tech Stack:** Next.js 16.4.6, React 19.3, TypeScript strict, Tailwind v4, Motion; TR/EN; statik export + GitHub Pages. GSAP, Lenis ve video kaldırılır.

**Spec:** `docs/superpowers/specs/2026-11-25-portfolio-editorial-redesign-design.md`

## Global Constraints

- Next.js **16.4.6** — eğitim verisinden farklıdır. Kod yazmadan önce `AGENTS.md` ve `node_modules/next/dist/docs/` rehberlerini oku.
- Node >=20.9, React 19.3, TypeScript strict, Tailwind v4.
- Statik export (`output: "export"`), `trailingSlash`, `images.unoptimized`, basePath ve site URL env davranışı korunur.
- TR/EN rotaları (`/tr`, `/en`) ve `Dictionary` deseni korunur. Görünür metin bileşenlere gömülmez.
- Açık/koyu tema korunur; varsayılan koyu.
- 375 / 768 / 1440 px'te yatay taşma yok.
- WCAG AA: accent metin, `fg-muted`, buton metni ≥4.5:1.
- `prefers-reduced-motion: reduce` altında tüm içerik görünür, hareket kapalı.
- JS kapalıyken tüm SSR içerik ve iletişim bilgileri görünür.
- `npm run build`, `npx tsc --noEmit`, `npm run lint`, `npm run verify` her görev sonunda geçer.
- Playwright yalnızca yerel QA içindir; projeye bağımlılık veya CI adımı olarak eklenmez.
- Uydurma metrik, müşteri adı, referans veya sosyal kanıt yok. Proje metinleri mevcut içerikten türetilir.
- Proje görselleri geçici dekoratif önizlemedir; ziyaretçiye "placeholder" etiketi gösterilmez; README'de not edilir.
- GSAP, `@gsap/react`, Lenis, hero/contact videoları ve 3D render kaldırılır.
- `npm run start` (`next start`) statik export ile çalışmaz; bu planda `next start` düzeltilir.

## Review Focus

Bu değişikliğin en olası hataları; her biri ilgili görevin doğrulamasında kontrol edilir:

1. **BasePath/metadata:** `/portfolio` build'inde canonical, hreflang, OG ve asset yolları basePath'i bir kez içermeli. → Task 1, 9.
2. **Kontrast:** Yeni sıcak palet ve accent-ink/on-accent açık temada AA altına düşmemeli. → Task 1, 9.
3. **Serif font:** Instrument Serif Türkçe glyph'leri (Ö, Ü, Ş, ğ, ı) doğru göstermeli; FOUT/CLS kabul edilebilir olmalı. → Task 1, 9.
4. **Uzun TR/EN metin:** Editöryel satırlar, vaka notları ve tarihler 375/768'de taşmamalı. → Task 3, 4, 5, 9.
5. **Hover preview erişilebilirliği:** Linkler her zaman görünür; preview dokunmatik ve reduced motion'da kapalı; klavye odağını engellemez. → Task 5, 9.
6. **No-JS / reduced motion:** Reveal ve `<details>` içeriği görünür kalmalı; `/` yönlendirmesi çalışmalı. → Task 1, 9.
7. **İçerik bütünlüğü:** Problem/sonuç/vaka maddeleri mevcut açıklamalardan türetilmeli; sayı/referans uydurulmamalı. → Task 4, 5, 6, 9.
8. **Legacy temizliği:** Video/GSAP/Lenis/ScrollVideoHero/ContactVideoOrb/SmoothScroll referansı kalmamalı; statik export bozulmamalı. → Task 8, 9.

## İçerik Değerleri (kesin)

Bu değerler `src/content/tr.ts` ve `src/content/en.ts` içine yazılır. Mevcut alanlar
korunur; yalnızca aşağıdakiler eklenir/değişir/kaldırılır.

### Nav

- TR `menu: "Menü"`; EN `menu: "Menu"`.
- Diğer nav alanları aynı kalır.

### Hero

TR:
- `tagline`: `"Kurumsal Java/Spring Boot backend'leri ve Next.js/React Native ürünleri geliştiriyorum."`
- `ctaProjects`: `"Seçili işler"`
- `availability`: `"Tam zamanlı roller ve freelance projelere açık"`
- `focus`: `"Kurumsal backend · Ürün geliştirme · PostgreSQL"`
- `now`: `"Kurumsal eğitim otomasyonu + full-stack ürünler"`
- `timezone`: `"UTC+3"`
- `stack`: `["Java", "Spring Boot", "Next.js", "React Native", "PostgreSQL"]`
- `focusLabel`: `"Odak"`
- `stackLabel`: `"Stack"`
- `nowLabel`: `"Şu an"`
- `scrollHint` kaldırılır.

EN:
- `tagline`: `"I build enterprise Java/Spring Boot backends and Next.js/React Native products."`
- `ctaProjects`: `"Selected work"`
- `availability`: `"Open to full-time roles and freelance projects"`
- `focus`: `"Enterprise backend · Product engineering · PostgreSQL"`
- `now`: `"Enterprise training automation + full-stack products"`
- `timezone`: `"UTC+3"`
- `stack`: aynı.
- `focusLabel`: `"Focus"`
- `stackLabel`: `"Stack"`
- `nowLabel`: `"Now"`
- `scrollHint` kaldırılır.

### About

- TR `pullQuote`: `"Doğruluğun ve entegrasyonun kritik olduğu kurumsal backend işleri."`
- EN `pullQuote`: `"Enterprise backend work where correctness and integration matter."`
- Diğer alanlar aynı.

### Experience

Her iki item'a `outcome` eklenir:

TR:
- Kurumsal Teknoloji Şirketi: `"Kurumsal eğitim iş akışları otomatikleşti; iç sistemlerle entegre REST API'ler."`
- XLOG FIREWALL (Arjeta): `"Tahmin modelleri geliştirildi; GAN ve Deep Q-Learning üzerine araştırma."`

EN:
- Enterprise Technology Company: `"Corporate training workflows were automated through REST APIs integrated with internal systems."`
- XLOG FIREWALL (Arjeta): `"Built predictive models and researched GANs and Deep Q-Learning."`

`experience.outcomeLabel`: TR `"Ne değişti"`, EN `"What changed"`.

### Projects

`projects` üst düzey:
- TR `problemLabel: "Problem"`, `outcomeLabel: "Sonuç"`, `caseNoteLabel: "Vaka notu"`, `otherTitle: "Diğer işler"`.
- EN `problemLabel: "Problem"`, `outcomeLabel: "Outcome"`, `caseNoteLabel: "Case note"`, `otherTitle: "Other work"`.

Her proje için `problem`, `outcome`, `details`:

TR:
- **Autosuchen24**
  - problem: `"İsviçreli müşteri için çok dilli, gerçek zamanlı iletişimli bir araç pazaryeri gerekiyordu."`
  - outcome: `"Node.js + PostgreSQL üzerinde canlı pazaryeri; sohbet, admin onayı ve push bildirimleri."`
  - details: `["Çok dilli araç listeleme ve arama", "Gerçek zamanlı sohbet", "Admin onay akışı ve push bildirimleri"]`
- **TakasGo Global**
  - problem: `"Eşzamanlı takas tekliflerini ve ilişkili verileri tutarlı yönetmek gerekiyordu."`
  - outcome: `"Normalize PostgreSQL şeması ve Node.js REST API'si; gerçek zamanlı mesajlaşma; canlı ürün."`
  - details: `["Normalize PostgreSQL şeması", "Eşzamanlı teklif işlemleri", "Gerçek zamanlı mesajlaşma"]`
- **Mutfix**
  - problem: `"Şef/üye rollerini ayıran ve ödülleri dinamik hesaplayan bir tarif platformu gerekiyordu."`
  - outcome: `"RBAC, dinamik ödül algoritması ve admin analitik paneliyle uçtan uca platform."`
  - details: `["Şef/Üye rol tabanlı erişim", "Dinamik ödül algoritması", "Admin analitik paneli"]`
- **Nerdeyemek**
  - problem: `"Ev şeflerinin yemeklerini yüksek performansla listeleyen bir platform gerekiyordu."`
  - outcome: `"Sunucu taraflı önbellekli Node.js servis katmanı; Next.js ve React Native istemcileri."`
  - details: yok.
- **Online Sınav Sistemi**
  - problem: `"Okullar için parametrik sınav üretimi ve yönetimi gerekiyordu."`
  - outcome: `"Next.js + Node.js ile K-12 sınav sistemi; BILMES 2024'te hakemli yayın."`
  - details: yok.

EN:
- **Autosuchen24**
  - problem: `"A Swiss client needed a multilingual vehicle marketplace with realtime communication."`
  - outcome: `"A live marketplace on Node.js + PostgreSQL with chat, admin approval and push notifications."`
  - details: `["Multilingual vehicle listing and search", "Realtime chat", "Admin approval workflow and push notifications"]`
- **TakasGo Global**
  - problem: `"Concurrent barter offers and related data needed to stay consistent."`
  - outcome: `"A normalized PostgreSQL schema and Node.js REST API handling concurrent offers, with realtime messaging; live."`
  - details: `["Normalized PostgreSQL schema", "Concurrent offer transactions", "Realtime messaging"]`
- **Mutfix**
  - problem: `"A recipe platform needed to separate chef/member roles and calculate rewards dynamically."`
  - outcome: `"An end-to-end platform with RBAC, a dynamic reward algorithm and an admin analytics panel."`
  - details: `["Chef/Member role-based access", "Dynamic reward algorithm", "Admin analytics panel"]`
- **Nerdeyemek**
  - problem: `"A platform needed to list home-chef meals with high performance."`
  - outcome: `"A server-side cached Node.js service layer with Next.js and React Native clients."`
- **Online Quiz System**
  - problem: `"Schools needed parametric exam generation and management."`
  - outcome: `"A K-12 exam system built with Next.js + Node.js; peer-reviewed at BILMES 2024."`

Mevcut `description`, `image`, `url`, `linkLabel` alanları korunur.

### Skills

`skills.subtitle` korunur. `groups` **3 gruba** indirilir:

TR:
1. `title: "Kurumsal backend"`, `summary: "Doğruluk ve entegrasyonun kritik olduğu kurumsal işler."`, `items: ["Java", "Spring Boot", "PostgreSQL", "REST API", "RBAC / Auth"]`
2. `title: "Ürün geliştirme"`, `summary: "Fikirden yayına web ve mobil ürünler."`, `items: ["Next.js", "React", "React Native", "Node.js", "Drizzle ORM", "Prisma", "Tailwind CSS"]`
3. `title: "Temeller"`, `summary: "Tipli kod, konteynerler ve makine öğrenmesi temeli."`, `items: ["TypeScript", "JavaScript", "Python 3", "C#", "SQL", "Docker", "Git / CI", "Derin Öğrenme", "GAN", "Pekiştirmeli Öğrenme"]`

EN:
1. `title: "Enterprise backend"`, `summary: "Enterprise work where correctness and integration matter."`, items aynı.
2. `title: "Product engineering"`, `summary: "Web and mobile products from idea to production."`, items aynı.
3. `title: "Foundations"`, `summary: "Typed code, containers and a machine-learning foundation."`, `items: ["TypeScript", "JavaScript", "Python 3", "C#", "SQL", "Docker", "Git / CI", "Deep Learning", "GANs", "Reinforcement Learning"]`

### Education

- `languages` içindeki `score` alanı kaldırılır; `name` ve `level` kalır.
- Diğer alanlar aynı.

### Footer

- TR `builtWith`: `"Next.js, Motion & Tailwind ile geliştirildi"`
- EN `builtWith`: `"Built with Next.js, Motion & Tailwind"`

## Dosya Yapısı

**Yeni**
- `src/components/hero/Hero.tsx` (server)
- `src/components/ui/SectionShell.tsx` (server)
- `src/components/work/WorkRow.tsx` (client; hover preview + `<details>`)
- `src/components/work/CompactWorkRow.tsx` (server)
- `scripts/og.html` (yerel OG üretimi için şablon; opsiyonel commit)

**Değişecek**
- `src/app/globals.css`, `src/app/(site)/[lang]/layout.tsx`, `src/app/(site)/[lang]/page.tsx`
- `src/components/ui/{Logo,Reveal,CountUp,ThemeToggle,CopyEmailButton}.tsx`
- `src/components/sections/{Navbar,About,Experience,Projects,Skills,Education,Contact,Footer}.tsx`
- `src/app/(root)/page.tsx`, `src/app/icon.svg`
- `src/content/{types,tr,en}.ts`
- `scripts/verify-build.mjs`, `README.md`, `package.json`, `package-lock.json`
- `docs/superpowers/**` (tasarım + plan commit'i)

**Silinecek**
- `src/components/hero/ScrollVideoHero.tsx`
- `src/components/ui/ContactVideoOrb.tsx`
- `src/components/providers/SmoothScroll.tsx`
- `src/components/ui/SectionHeading.tsx` (tüm bölümler SectionShell'e geçtikten sonra)
- `public/video/hero.mp4`, `hero-mobile.mp4`, `hero-poster.jpg`, `orb-loop.mp4`, `orb-poster.jpg`
- `public/images/workstation-desk.jpg`
- `gsap`, `@gsap/react`, `lenis` bağımlılıkları
- `Space_Grotesk` fontu

---

## Task 1: Tasarım temeli — token'lar, fontlar, marka, global migrasyon

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/(site)/[lang]/layout.tsx`
- Modify: `src/components/ui/Logo.tsx`
- Modify: `src/app/icon.svg`
- Modify: tüm `cyan`/`orange` sınıfı içeren `src` dosyaları (aşağıdaki tablo)
- Modify: `src/content/types.ts`, `src/content/tr.ts`, `src/content/en.ts` (yalnızca `nav.menu`)
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- Produces: `--accent`, `--accent-rgb`, `--accent-ink`, `--on-accent` token'ları; `font-display` = Instrument Serif; `text-accent-ink` / `bg-accent` / `border-accent` sınıfları.
- Consumes: Mevcut tüm bileşenler; bu görev yalnızca renk/font katmanını değiştirir, layout'a dokunmaz.

- [ ] **Step 1: RED — yeni temel assertion'larını ekle**

`scripts/verify-build.mjs` içine ekle (mevcut `globals` değişkenini kullan):

```js
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
```

Mevcut eski token assertion'larını (`--bg-card: rgba(13, 23, 48, 0.82)`, `--blur(8px)`,
`--fg-muted: #a6b4d2`, açık `--bg-card`) kaldır. Kontrast bloğunu şu şekilde
güncelle:

```js
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
```

Run: `npm run verify`
Expected: FAIL (`--bg`, `--accent`, Instrument Serif, logo, favicon, menu).

- [ ] **Step 2: `globals.css` token'larını değiştir**

`@theme inline` bloğunu yeni adlara çevir:

```css
--color-bg: var(--bg);
--color-bg-elev: var(--bg-elev);
--color-card: var(--card);
--color-line: var(--line);
--color-fg: var(--fg);
--color-muted: var(--fg-muted);
--color-accent: var(--accent);
--color-accent-ink: var(--accent-ink);
--color-on-accent: var(--on-accent);
--font-sans: var(--font-inter);
--font-display: var(--font-serif);
--font-mono: var(--font-jetbrains);
```

Koyu `:root`:

```css
--bg: #0d0b09;
--bg-rgb: 13 11 9;
--bg-elev: #15110e;
--card: rgba(244, 239, 230, 0.04);
--line: rgba(244, 239, 230, 0.14);
--fg: #f4efe6;
--fg-rgb: 244 239 230;
--fg-muted: #b8aea2;
--accent: #d97745;
--accent-rgb: 217 119 69;
--accent-ink: #e08a5b;
--on-accent: #0d0b09;
--shadow: rgba(0, 0, 0, 0.45);
color-scheme: dark;
```

Açık `:root[data-theme="light"]`:

```css
--bg: #f4efe6;
--bg-rgb: 244 239 230;
--bg-elev: #fbf8f2;
--card: rgba(255, 255, 255, 0.55);
--line: rgba(26, 21, 18, 0.14);
--fg: #1a1512;
--fg-rgb: 26 21 18;
--fg-muted: #5f574f;
--accent: #b8501f;
--accent-rgb: 184 80 31;
--accent-ink: #9a3d17;
--on-accent: #fff8f0;
--shadow: rgba(26, 21, 18, 0.14);
color-scheme: light;
```

`--cyan`, `--cyan-rgb`, `--cyan-soft`, `--orange`, `--violet` satırlarını sil.
`.text-gradient`'i gradient'siz yap:

```css
.text-gradient {
  color: var(--fg);
  background: none;
  -webkit-text-fill-color: currentColor;
}
```

`.glass`'ı blur'suz yüzeye çevir:

```css
.glass {
  background: var(--card);
  border: 1px solid var(--line);
}
```

`.site-backdrop` içindeki `var(--cyan-rgb)` → `var(--accent-rgb)`; hardcoded
`rgb(251 146 60 / ...)` → `rgb(var(--accent-rgb) / 0.12)`; açık temadaki
`rgb(234 88 12 / ...)` → `rgb(var(--accent-rgb) / 0.08)`. `::selection` accent.

Run: `npm run build`
Expected: Build başarılı olabilir; ancak sınıf referansları hâlâ eski olabilir.

- [ ] **Step 3: Fontları değiştir**

`src/app/(site)/[lang]/layout.tsx`:

```tsx
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";

const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
});
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-jetbrains" });

// <html className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
```

`Space_Grotesk` importunu ve `display` değişkenini kaldır.

- [ ] **Step 4: Logo ve favicon'u yeni palete geçir**

`src/components/ui/Logo.tsx`: path `fill="var(--accent)"`; iki daire
`fill="var(--fg-muted)"`. Yorumu güncelle (cyan/orange ifadesini kaldır).

`src/app/icon.svg`: `#22d3ee` → `#d97745`; `#fb923c` → `#f4efe6`.

- [ ] **Step 5: Global sınıf migrasyonu**

Aşağıdaki dosyalarda eşlemeyi uygula:
`src/components/sections/{Navbar,About,Experience,Projects,Skills,Education,Contact,Footer}.tsx`,
`src/components/hero/ScrollVideoHero.tsx`,
`src/components/ui/{ContactVideoOrb,CopyEmailButton,Logo,SectionHeading,ThemeToggle}.tsx`,
`src/app/(root)/page.tsx`.

| Eski | Yeni |
|---|---|
| `text-cyan`, `text-orange` | `text-accent-ink` |
| `bg-cyan`, `bg-orange` | `bg-accent` |
| `hover:bg-cyan`, `hover:bg-orange` | `hover:bg-accent` |
| `hover:text-cyan` | `hover:text-accent-ink` |
| `border-cyan`, `border-orange` | `border-accent` |
| `hover:border-cyan/50` | `hover:border-accent/50` |
| `outline-cyan`, `outline-orange` | `outline-accent` |
| `decoration-cyan` | `decoration-accent` |
| `from-cyan`, `via-cyan` | `from-accent`, `via-accent` |
| `to-orange` | `to-accent-ink` |
| `var(--cyan-rgb)` | `var(--accent-rgb)` |
| `var(--cyan)` (metin) | `var(--accent-ink)` |
| `var(--orange)` (metin) | `var(--accent-ink)` |

`text-on-accent` sınıfı kalır. Hardcoded `rgb(251_146_60/...)` ve
`rgb(251 146 60 / ...)` değerlerini `rgb(var(--accent-rgb) / ...)` yap.
`Navbar` odak sınıfındaki `outline-cyan` → `outline-accent`.
Navbar'ın kaydırınca kullandığı `glass` sınıfını
`border-b border-line bg-bg/90 backdrop-blur-md` ile değiştir; `.glass` artık
blur'suz yüzey olduğu için nav okunabilirliği ayrı bir yüzey ister.
`index: 0` gibi sayısal değişiklik yok.

Run: `grep -rnE 'cyan|orange' src`
Expected: Yalnızca yorum/geçmiş içerik yok; sınıf/token referansı kalmamalı.

- [ ] **Step 6: Nav menü anahtarını ekle**

`types.ts` `nav` bloğuna `menu: string;` ekle; `tr.ts` `"Menü"`, `en.ts` `"Menu"`.
Mevcut `aria-label="Menu"` hardcoded kullanımını `t.nav.menu` yap.

- [ ] **Step 7: Green**

```bash
npm run build
npm run verify
npx tsc --noEmit
npm run lint
```

Expected: Hepsi temiz; yeni token/kontrast assertion'ları PASS.

- [ ] **Step 8: Görsel kontrol ve commit**

`npm run dev`; 1440/375, koyu/açık: sıcak kanvas, serif başlıklar, logo accent,
eski cyan/orange yok. Kontrast okunur.

```bash
git add -A
git commit -m "style: add warm editorial design tokens and typography"
```

---

## Task 2: Hero — video yerine metin ve profil kartı

**Files:**
- Create: `src/components/hero/Hero.tsx`
- Modify: `src/app/(site)/[lang]/page.tsx`
- Modify: `src/content/{types,tr,en}.ts`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- Produces: `Hero({ t }: { t: Dictionary })`.
- Consumes: Task 1 token'ları; `Dictionary` hero alanları.

- [ ] **Step 1: RED**

`verify-build.mjs`'e ekle:

```js
checks.push(
  [source("src/components/hero/Hero.tsx").includes("export default function Hero"), "Hero bileşeni"],
  [
    source("src/app/(site)/[lang]/page.tsx").includes("<Hero t={t} />") &&
      !source("src/app/(site)/[lang]/page.tsx").includes("ScrollVideoHero"),
    "sayfa yeni Hero'yu kullanıyor",
  ],
  [
    source("src/content/types.ts").includes("availability: string") &&
      source("src/content/tr.ts").includes("Tam zamanlı roller") &&
      source("src/content/en.ts").includes("Open to full-time"),
    "hero availability içeriği",
  ],
  [!source("src/content/tr.ts").includes("scrollHint"), "scrollHint kalktı"],
);
```

Run: `npm run verify` → FAIL.

- [ ] **Step 2: Tip ve içerik alanları**

`Dictionary.hero`:

```ts
hero: {
  greeting: string;
  name: string;
  role: string;
  tagline: string;
  location: string;
  timezone: string;
  availability: string;
  focus: string;
  now: string;
  stack: string[];
  focusLabel: string;
  stackLabel: string;
  nowLabel: string;
  ctaProjects: string;
  ctaContact: string;
};
```

`scrollHint` kaldırılır. `tr.ts`/`en.ts` değerlerini yukarıdaki "İçerik Değerleri"
bölümünden yaz.

- [ ] **Step 3: `Hero` bileşenini yaz**

Yapı:

```tsx
import type { Dictionary } from "@/content/types";

export default function Hero({ t }: { t: Dictionary }) {
  const h = t.hero;
  return (
    <section id="top" className="relative">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-6 pt-28 pb-20 md:grid-cols-[7fr_5fr] md:gap-16 md:px-8 md:pt-36 md:pb-28">
        <div>
          {/* availability pill: accent dot + mono metin */}
          {/* h1: font-display text-[clamp(3.25rem,8.5vw,7.5rem)] leading-[0.95] tracking-[-0.02em] */}
          {/* role: font-mono uppercase tracking-[0.16em] text-accent-ink */}
          {/* tagline: max-w-[52ch] text-lg text-muted */}
          {/* CTAs: bg-accent text-on-accent; border-line text-fg */}
          {/* location + timezone: mono muted */}
        </div>
        <aside className="glass rounded-2xl p-6 md:p-8">
          {/* dl: focusLabel/focus, stackLabel/stack.join(" · "), nowLabel/now */}
        </aside>
      </div>
    </section>
  );
}
```

Kurallar:
- Video, `<Image>`, canvas, GSAP yok.
- Availability pill: küçük accent nokta + `h.availability`; `role="status"` gereksiz.
- CTA'lar `href="#projects"` ve `href="#contact"`.
- Profil kartı `dl`/`dt`/`dd`; `stack` `·` ile birleşir; mobilde tek kolon.
- `h1` solid `var(--fg)`, gradient yok.
- `id="top"`; `scroll-mt-24`.

- [ ] **Step 4: Sayfaya bağla**

`page.tsx`: `ScrollVideoHero` importunu ve kullanımını kaldır; `<Hero t={t} />`.

- [ ] **Step 5: Green + görsel**

```bash
npm run build && npm run verify
npx tsc --noEmit && npm run lint
```

`npm run dev`: 1440/375, TR/EN, koyu/açık; CTA'lar, profil kartı, taşma yok.

- [ ] **Step 6: Commit**

```bash
git add src/components/hero/Hero.tsx "src/app/(site)/[lang]/page.tsx" src/content scripts/verify-build.mjs
git commit -m "feat: replace video hero with editorial hero"
```

---

## Task 3: SectionShell ve Hakkımda

**Files:**
- Create: `src/components/ui/SectionShell.tsx`
- Modify: `src/components/sections/About.tsx`
- Modify: `src/content/{types,tr,en}.ts`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- Produces: `SectionShell({ id, label, title, titleSize?, children })`.
- Consumes: Task 1 token'ları; Task 2 Hero.

- [ ] **Step 1: RED**

```js
checks.push(
  [source("src/components/ui/SectionShell.tsx").includes("export default function SectionShell"), "SectionShell"],
  [source("src/components/sections/About.tsx").includes("SectionShell"), "About SectionShell kullanıyor"],
  [!source("src/components/sections/About.tsx").includes("next/image"), "About görseli kalktı"],
  [source("src/content/tr.ts").includes("pullQuote") && source("src/content/en.ts").includes("pullQuote"), "pull quote içeriği"],
);
```

Eski `About görseli figure` assertion'ını kaldır (yeni About görsel içermiyor).
Run → FAIL.

- [ ] **Step 2: `SectionShell`**

```tsx
import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  title: string;
  titleSize?: "default" | "large";
  children: ReactNode;
};

export default function SectionShell({ id, label, title, titleSize = "default", children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-24 md:grid-cols-[11rem_1fr] md:gap-14 md:px-8 md:py-36">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink md:sticky md:top-28 md:self-start">
          {label}
        </p>
        <div>
          <h2
            id={`${id}-title`}
            className={`font-display leading-[1.05] tracking-tight ${
              titleSize === "large" ? "text-[clamp(2.5rem,5vw,4.5rem)]" : "text-[clamp(2rem,4vw,3.5rem)]"
            }`}
          >
            {title}
          </h2>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: About'u yeniden yaz**

`SectionShell id="about" label={a.eyebrow} title={a.title}`. İçerik:
- Paragraflar: `max-w-[62ch] space-y-5 text-lg leading-relaxed text-muted`.
- İstatistikler: `grid grid-cols-2 gap-px bg-line sm:grid-cols-4`; her hücre
  `bg-bg p-5`; değer `font-display text-4xl`; etiket mono muted. `CountUp` korunur.
- Pull quote: `mt-12 border-l-2 border-accent pl-6 font-display text-2xl italic leading-snug md:text-3xl`.
- `next/image`, `asset`, workstation görseli ve `Reveal` sarmalayıcıları kaldırılır;
  başlık/paragraflar doğrudan akar. (Reveal istenirse yalnızca başlıkta kalabilir.)
- `about.pullQuote` tipi ve TR/EN değeri eklenir.

- [ ] **Step 4: Green + görsel + commit**

```bash
npm run build && npm run verify
npx tsc --noEmit && npm run lint
```

1440/375: istatistik hairline'ları, pull quote, taşma yok. Commit:
`git commit -m "feat: add editorial section shell and about"`.

---

## Task 4: Deneyim — GSAP'siz editöryel satırlar

**Files:**
- Modify: `src/components/sections/Experience.tsx`
- Modify: `src/content/{types,tr,en}.ts`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- Consumes: `SectionShell` (Task 3).
- Produces: `Experience.outcome: string`; `experience.outcomeLabel: string`.

- [ ] **Step 1: RED**

```js
checks.push(
  [!source("src/components/sections/Experience.tsx").includes("gsap"), "Experience GSAP'siz"],
  [source("src/components/sections/Experience.tsx").includes("SectionShell"), "Experience SectionShell"],
  [
    source("src/content/types.ts").includes("outcome: string") &&
      source("src/content/tr.ts").includes("Kurumsal eğitim iş akışları") &&
      source("src/content/en.ts").includes("Corporate training workflows"),
    "Experience outcome içeriği",
  ],
);
```

Eski Experience assertion'larını (`13rem`, `whitespace-nowrap`, `.tl-line`)
kaldır.

Run → FAIL.

- [ ] **Step 2: Tip ve içerik**

`Experience` tipine `outcome: string`; her item'a değer; `experience.outcomeLabel`.
Eski GSAP/ScrollTrigger/useGSAP/useRef importlarını ve `"use client"`'ı kaldır.

- [ ] **Step 3: Bileşeni yeniden yaz**

```tsx
import type { Dictionary } from "@/content/types";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";

export default function Experience({ t }: { t: Dictionary }) {
  const e = t.experience;
  return (
    <SectionShell id="experience" label={e.eyebrow} title={e.title}>
      <ol className="space-y-12">
        {e.items.map((item) => (
          <li key={item.company + item.period} className="grid gap-3 border-t border-line pt-8 md:grid-cols-[12rem_1fr] md:gap-8">
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
              <span className="whitespace-nowrap">{item.period}</span><br />{item.location}
            </div>
            <Reveal y={16}>
              <h3 className="font-display text-2xl font-normal">{item.role}</h3>
              <p className="mt-1 font-mono text-sm text-accent-ink">{item.company}</p>
              <ul className="mt-4 space-y-2 text-muted">{item.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              <p className="mt-4 text-sm text-muted">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-accent-ink">{e.outcomeLabel}</span>{" "}
                {item.outcome}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
```

- [ ] **Step 4: Green + görsel + commit**

1440/375, TR/EN: tarih tek satır, metin taşmıyor; GSAP/glow yok.
Commit: `git commit -m "feat: replace animated timeline with editorial experience"`.

---

## Task 5: Projeler — vaka satırları, `<details>`, hover preview

**Files:**
- Create: `src/components/work/WorkRow.tsx`
- Create: `src/components/work/CompactWorkRow.tsx`
- Modify: `src/components/sections/Projects.tsx`
- Modify: `src/content/{types,tr,en}.ts`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- Produces: `Project.problem/outcome/details?`; `WorkRow({ project, index, labels })`; `CompactWorkRow({ project, labels })`.
- Consumes: `SectionShell`, `asset`, `Image`, `Project`.

- [ ] **Step 1: RED**

```js
checks.push(
  [source("src/content/types.ts").includes("problem: string") && source("src/content/types.ts").includes("details?: string[]"), "proje vaka alanları"],
  [source("src/components/work/WorkRow.tsx").includes("<details"), "vaka notu details"],
  [source("src/components/sections/Projects.tsx").includes("WorkRow"), "Projects WorkRow kullanıyor"],
  [source("src/components/sections/Projects.tsx").includes("SectionShell"), "Projects SectionShell"],
);
```

Eski proje assertion'larını (About figure, `TiltCard`, `grid` kart) kaldır.

Run → FAIL.

- [ ] **Step 2: Tipler ve içerik**

`Project`:

```ts
export type Project = {
  id: string;
  name: string;
  stack: string[];
  description: string;
  problem: string;
  outcome: string;
  details?: string[];
  image: string;
  url?: string;
  linkLabel?: string;
};
```

`projects` üst düzey etiketler ve tüm proje değerleri "İçerik Değerleri"nden.

- [ ] **Step 3: `CompactWorkRow`**

Server component. `<li>`; isim `font-display text-xl`; `description` muted;
stack mono accent-ink `·` ile; `url` varsa link (`target="_blank"
rel="noopener noreferrer"`), yoksa buton yok.

- [ ] **Step 4: `WorkRow`**

Client component (`"use client"`). Props:

```ts
type Labels = { problem: string; outcome: string; caseNote: string; visit: string };
```

Davranış:
- `<li>` grid: index `01`, içerik, link.
- İsim `font-display text-3xl md:text-4xl`.
- Problem satırı, `outcomeLabel` + outcome, stack mono.
- `details` varsa `<details>`; `<summary>` mono accent-ink, `cursor-pointer`;
  3 madde `<ul>`; açık/kapalı URL durumu yok.
- Hover preview: yalnızca `matchMedia("(hover: hover) and (pointer: fine)")` ve
  `prefers-reduced-motion: no-preference`; pointermove ile `fixed` küçük görsel
  (`w-[280px]`, `Image` `asset(project.image)`, `alt=""`, `aria-hidden`);
  pointerleave'de opacity 0. Preview `pointer-events-none`, `z-40`.
- Linkler preview'den bağımsız her zaman görünür; klavye odağı etkilenmez.
- Preview `<Image>` `sizes="280px"`, width/height 560×314.

- [ ] **Step 5: Projects**

`SectionShell id="projects" label={p.eyebrow} title={p.title}`:
- Subtitle `p.subtitle` muted.
- `featured = p.items.slice(0, 3)`; `<ul>` WorkRow.
- `other = p.items.slice(3)`; `otherTitle` mono başlık + `<ul>` CompactWorkRow.
- Link etiketi: `project.linkLabel ?? p.visit`.

- [ ] **Step 6: Green + görsel**

1440: hover preview görünür, linkler durur; 375/dokunmatik: preview yok, içerik
açık; `<details>` klavye ile açılır; taşma yok.

- [ ] **Step 7: Commit**

```bash
git add src/components/work src/components/sections/Projects.tsx src/content scripts/verify-build.mjs
git commit -m "feat: turn projects into editorial case-study rows"
```

---

## Task 6: Yetenekler — bağlamlı 3 grup

**Files:**
- Modify: `src/components/sections/Skills.tsx`
- Modify: `src/content/{types,tr,en}.ts`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- Produces: `SkillGroup.summary: string`; 3 grup.
- Consumes: `SectionShell`.

- [ ] **Step 1: RED**

```js
checks.push(
  [source("src/components/sections/Skills.tsx").includes("SectionShell"), "Skills SectionShell"],
  [source("src/content/types.ts").includes("summary: string"), "SkillGroup summary"],
  [source("src/content/tr.ts").includes("Kurumsal backend") && source("src/content/en.ts").includes("Enterprise backend"), "3 yetenek grubu"],
  [!source("src/components/sections/Skills.tsx").includes("lg:grid-cols-3"), "eski chip matrisi kalktı"],
);
```

Eski Skills assertion'larını (`lg:grid-cols-3`, children) kaldır.

- [ ] **Step 2: Tip ve içerik**

`SkillGroup`:

```ts
export type SkillGroup = { title: string; summary: string; items: string[] };
```

`skills.groups` 3 gruba indir; "İçerik Değerleri"ndeki değerler.

- [ ] **Step 3: Bileşen**

`SectionShell id="skills" label={s.eyebrow} title={s.title}`:
- Subtitle muted.
- `grid gap-10 md:grid-cols-3`.
- Her grup: mono accent-ink başlık, `summary` muted, araçlar mono
  `items.join(" · ")` (chip yok, logo duvarı yok).

- [ ] **Step 4: Green + commit**

1440/375: 3 grup, uzun araç listeleri taşmıyor.
Commit: `git commit -m "feat: present skills as contextual capability groups"`.

---

## Task 7: Eğitim, İletişim, Footer

**Files:**
- Modify: `src/components/sections/Education.tsx`
- Modify: `src/components/sections/Contact.tsx`
- Modify: `src/components/sections/Footer.tsx`
- Modify: `src/app/(site)/[lang]/page.tsx`
- Modify: `src/content/{types,tr,en}.ts`
- Modify: `scripts/verify-build.mjs`

**Interfaces:**
- Produces: `Contact({ t })` (children yok); `Education({ t })`; `Footer({ t })`.
- Consumes: `SectionShell`, `CopyEmailButton`, `site`.

- [ ] **Step 1: RED**

Eski `footer metni güncel` assertion'ını "Motion & Tailwind" kontrolüyle değiştir.

```js
checks.push(
  [source("src/components/sections/Education.tsx").includes("SectionShell"), "Education SectionShell"],
  [!source("src/content/types.ts").includes("score: number"), "dil score kalktı"],
  [
    source("src/components/sections/Contact.tsx").includes("SectionShell") &&
      !source("src/components/sections/Contact.tsx").includes("children"),
    "Contact çocuksuz",
  ],
  [
    !source("src/app/(site)/[lang]/page.tsx").includes("ContactVideoOrb"),
    "sayfa orb kullanmıyor",
  ],
  [source("src/content/tr.ts").includes("Motion & Tailwind"), "footer metni güncel"],
);
```

- [ ] **Step 2: Eğitim**

`SectionShell id="education" label={e.eyebrow} title={e.title}`:
- 2 kolon: derece/okul/dönem/GNO; diller `name — level` (nokta yok).
- Yayın: hairline üst çizgi; başlık/venue/açıklama + makale linki.
- `score` tipini ve değerlerini kaldır.

- [ ] **Step 3: İletişim**

`SectionShell id="contact" label={c.eyebrow} title={c.title} titleSize="large"`:
- Subtitle; büyük e-posta linki (`font-display text-[clamp(1.5rem,4vw,3rem)]`,
  `break-all`); `CopyEmailButton`; GitHub/LinkedIn ikon linkleri;
  `t.hero.availability`.
- Orb, `children`, `ContactVideoOrb` yok.

- [ ] **Step 4: Footer**

`t.footer.builtWith` güncel; basit hairline; `#top` linki.

- [ ] **Step 5: Sayfa**

`page.tsx`: `<Contact t={t} />` (child yok), `ContactVideoOrb` importunu kaldır.

- [ ] **Step 6: Green + görsel + commit**

1440/375; e-posta kopyalama, sosyal linkler, tema. Commit:
`git commit -m "feat: editorial education, contact and footer"`.

---

## Task 8: Legacy temizliği, marka asset'leri, README

**Files:**
- Modify: `src/app/(site)/[lang]/page.tsx`
- Modify: `src/app/globals.css` (smooth scroll + reduced motion)
- Modify: `package.json`, `package-lock.json`
- Modify: `README.md`
- Modify: `scripts/verify-build.mjs`
- Delete: `src/components/hero/ScrollVideoHero.tsx`, `src/components/ui/ContactVideoOrb.tsx`,
  `src/components/providers/SmoothScroll.tsx`, `src/components/ui/SectionHeading.tsx`
- Delete: `public/video/*`, `public/images/workstation-desk.jpg`
- Replace: `public/images/og.jpg`

**Interfaces:**
- Consumes: Task 2-7 bileşenleri.
- Produces: GSAP/Lenis/video'suz sayfa; yeni OG; temiz bağımlılıklar.

- [ ] **Step 1: RED**

```js
checks.push(
  [
    !existsSync("src/components/hero/ScrollVideoHero.tsx") &&
      !existsSync("src/components/ui/ContactVideoOrb.tsx") &&
      !existsSync("src/components/providers/SmoothScroll.tsx"),
    "legacy bileşenler silindi",
  ],
  [!existsSync("public/video/hero.mp4") && !existsSync("public/images/workstation-desk.jpg"), "legacy medya silindi"],
  [
    !('gsap' in deps) && !('@gsap/react' in deps) && !('lenis' in deps),
    "GSAP/Lenis bağımlılıkları kalktı",
  ],
  [source("README.md").includes("temporary preview"), "README görsel notu"],
);
```

Eski `ScrollVideoHero`/`ContactVideoOrb`/`SmoothScroll` ve `hero`
(`h-[180vh]`/beat/measure) assertion'larını kaldır. `verify-build.mjs`
`required` dizisinden `video/hero.mp4`, `video/hero-mobile.mp4`,
`video/orb-loop.mp4` satırlarını çıkar (dosyalar siliniyor).

- [ ] **Step 2: Sayfayı sadeleştir**

`page.tsx`:

```tsx
<>
  <SiteBackdrop />
  <Navbar t={t} lang={lang} />
  <main className="relative z-10">
    <Hero t={t} />
    <About t={t} />
    <Experience t={t} />
    <Projects t={t} />
    <Skills t={t} />
    <Education t={t} />
    <Contact t={t} />
  </main>
  <Footer t={t} />
</>
```

`SmoothScroll` importu/sarmalayıcısı kaldırılır. `globals.css`:

```css
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```

SectionShell/Hero `scroll-mt` değerleri korunur.

- [ ] **Step 3: Legacy dosyaları ve medyayı sil**

```bash
git rm src/components/hero/ScrollVideoHero.tsx src/components/ui/ContactVideoOrb.tsx src/components/providers/SmoothScroll.tsx src/components/ui/SectionHeading.tsx
git rm -r public/video
git rm public/images/workstation-desk.jpg
npm uninstall gsap @gsap/react lenis
```

`SectionHeading` kullanımı kalmadığını doğrula. `npm run start` statik export'ta
çalışmadığı için `package.json` `start` script'ini `"npx serve out"` yap (veya
`preview` ekle ve README'de belirt).

- [ ] **Step 4: Yeni OG görseli**

`scripts/og.html` oluştur: 1200×630, `--bg #0d0b09`, isim `Selahattin Özdemir`,
rol `Yazılım Mühendisi`, accent `#d97745`, kısa `Ankara · UTC+3`. Yerel Chrome
ile üret:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --hide-scrollbars --disable-gpu --virtual-time-budget=3000 \
  --screenshot=/tmp/og.png --window-size=1200,630 "file://$PWD/scripts/og.html"
sips -s format jpeg -s formatOptions 85 /tmp/og.png --out public/images/og.jpg
```

Görseli aç ve yeni kimliği doğrula; eski neon OG kullanılmaz.

- [ ] **Step 5: README**

- Proje görsellerinin geçici dekoratif önizleme olduğunu, gerçek ekran
  görüntüleriyle değiştirileceğini not et; README'de **"temporary preview"**
  ifadesini kullan (verify bunu arıyor).
- Yeni tasarım/plan dokümanlarına link ver.
- `start`/`preview` davranışını ve deploy adımlarını güncelle.

- [ ] **Step 6: Green**

```bash
npm run build && npm run verify
npx tsc --noEmit && npm run lint
NEXT_PUBLIC_BASE_PATH=/portfolio NEXT_PUBLIC_SITE_URL=https://selahattinozdmr.github.io/portfolio npm run build
NEXT_PUBLIC_BASE_PATH=/portfolio npm run verify
npm run build && npm run verify
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove video and GSAP legacy, refresh brand assets"
```

---

## Task 9: Son QA ve doğrulama harness'i

**Files:**
- Modify: `scripts/verify-build.mjs`
- Modify: yalnızca bulunan hataların dosyaları.

**Interfaces:**
- Consumes: tüm görevler.
- Produces: yayına hazır `main`.

- [ ] **Step 1: Harness'i son haline getir**

Doğrula:
- Yeni bölüm yapısı: `Hero`, `SectionShell`, 3 vaka + 2 kısa proje.
- `Problem`, `outcome`, `details`, `summary`, `menu` alanları.
- `accent` token'ları ve AA kontrastı.
- `Instrument_Serif`; cyan/orange/Space Grotesk yok.
- Legacy dosya/medya/deps yok; `public/images/og.jpg` mevcut.
- İki locale canonical/hreflang/OG basePath bir kez.
- SSR'da gizli reveal yok; CountUp son değer.
- README geçici görsel notu.

Run: `npm run build && npm run verify`
Expected: tüm satırlar PASS; `tsc` ve `lint` temiz.

- [ ] **Step 2: HTTP ve basePath**

```bash
python3 -m http.server 4173 -d out &
sleep 1
for path in / /tr/ /en/ /images/og.jpg /images/autosuchen24.jpg; do
  /usr/bin/curl -s -o /dev/null -w "%{http_code} $path\n" "http://localhost:4173$path"
done
kill %1
```

Beklenen: hepsi 200; `/` gövdesinde `url=/tr/`.

- [ ] **Step 3: Playwright yerel QA**

`npm run dev` veya `python3 -m http.server` ile:
- 375/768/1440, TR/EN, koyu/açık.
- `scrollWidth === innerWidth`.
- Mobil menü odak tuzağı; Escape; odak dönüşü.
- Proje `<details>` klavye ile açılır; linkler görünür.
- Hover preview yalnızca fine pointer + no-reduced-motion'da; dokunmatikte yok.
- Reduced motion: hero metni, tüm bölümler görünür; preview yok.
- JS kapalı: tüm metin, projeler, e-posta görünür.
- Instrument Serif Türkçe glyph'ler (Ö, Ü, Ş, ğ, ı) doğru.
- OG görseli yeni palet.
- Konsol hatası yok.

- [ ] **Step 4: Bulunan hataları düzelt**

Her düzeltmeden sonra Step 1'i tekrar çalıştır. Yeni kapsam ekleme.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: final editorial redesign QA"
```

---

## Kapsam Eşlemesi

| Spec bölümü | Görev |
|---|---|
| §8.1 renk | Task 1 |
| §8.2 tipografi | Task 1 |
| §8.3 düzen | Task 3 (SectionShell), Task 2 (Hero) |
| §8.4 motion | Task 1, 5, 8 |
| §8.5 bileşenler | Task 2-7 |
| §9.1 navigasyon | Task 1 |
| §9.2 hero | Task 2 |
| §9.3 hakkımda | Task 3 |
| §9.4 deneyim | Task 4 |
| §9.5 projeler | Task 5 |
| §9.6 yetenekler | Task 6 |
| §9.7 eğitim | Task 7 |
| §9.8 iletişim | Task 7 |
| §9.9 footer | Task 7 |
| §10 içerik modeli | Task 2-7 |
| §11 kaldırılacaklar | Task 8 |
| §12 erişilebilirlik/performans | Task 1, 5, 8, 9 |
| §13 doğrulama | Task 9 |
| §14 riskler | Review Focus |
| §15 uygulayıcıya kalanlar | Task 1-8 |
| §16 builder kararları | Task 3, 5, 8, 9 |
