# Portfolio — Sadeleştirme ve GitHub Pages Yayını Tasarımı

**Tarih:** 2026-11-25
**Durum:** Onay bekliyor
**Site:** https://selahattinozdmr.github.io (kullanıcı sitesi)

## 1. Neden

Mevcut site etkileyici ama iki hedefle çelişiyor:

1. **Okunabilirlik.** Arka plandaki 3B tel kafes şekiller, perspektif grid ve partiküller
   başlıkların/metinlerin arkasına giriyor. Yetenek küresindeki etiketler üst üste
   biniyor ("JavaTypeScript", "Node.js Next.js", "DockerRBAC/Auth"), yani bölüm
   kullanılamaz durumda.
2. **Yayınlanabilirlik.** GitHub Pages yalnızca statik dosya sunar. Proje şu an
   `output: "export"` kullanmıyor, `src/proxy.ts` middleware'i var, `next/image`
   varsayılan loader'ı sunucu ister ve statik dışa aktarımda asset yolları için
   bir strateji yok.

Amaç: aynı kimliği ve "wow" anını koruyarak siteyi sakin, okunur, hızlı ve
GitHub Pages'te tek tıkla yayınlanabilir hale getirmek.

## 2. Kapsam

### İçinde
- Görsel sadeleştirme: arka plan, yetenekler, hero, deneyim zaman çizelgesi,
  kart kontrastı, boşluk ritmi.
- Etkileşim sadeleştirme: 3B tilt/glare ve yetenek küresi yerine erişilebilir
  statik bileşenler; hero scroll-scrub'ın korunması ama kısaltılması.
- Statik dışa aktarım (`output: "export"`), `.nojekyll`, GitHub Actions deploy.
- `basePath` farkındalığı (kullanıcı sitesi için boş, proje sitesi için otomatik).
- Erişilebilirlik ve performans düzeltmeleri (kontrast, odak tuzağı, reduced motion,
  ağır 3B bağımlılıklarının kaldırılması).
- README'de yayın talimatı.

### Dışında
- İçerik/metin değişikliği (TR/EN metinleri aynı kalır; yalnızca kullanılmayan
  `dragHint` kaldırılır ve footer'daki artık geçersiz "Three.js" ifadesi düzeltilir).
- CMS, iletişim formu backend'i, analytics.
- Özel alan adı / CNAME.
- Yeni bölüm, CV/résumé indirme, blog.
- Görsel asset'lerin yeniden üretimi (video yeniden encode opsiyonel, aşağıda).

### Anti-goals
- 3B kimliği tamamen silmek. Hero videosu ve iletişimdeki cam küre kalır.
- Siteyi jenerik bir template'e çevirmek.
- Yeni ağır bağımlılık eklemek.

## 3. Kısıtlar

- Next.js **16.4.6** — eğitim verisinden farklı olabilir; ilgili rehber
  `node_modules/next/dist/docs/` altından okunacak (özellikle static-exports,
  route-groups/multiple root layouts, cacheComponents).
- React 19.3, Tailwind v4, TypeScript strict, GSAP + ScrollTrigger, motion, Lenis.
- Görünür tüm metin `src/content/{tr,en}.ts` içinde; bileşenler `t: Dictionary`
  alır, metin hardcode edilmez.
- TR/EN rotaları korunur: `/tr`, `/en`; `/` varsayılan olarak `/tr`'ye yönlenir.
- `npm run build`, `npx tsc --noEmit`, `npm run lint` geçmeli.
- 375px'te yatay taşma olmamalı.
- `prefers-reduced-motion: reduce` altında içerik görünür ve kullanılabilir olmalı.
- GitHub Pages: statik, Jekyll kapalı, HTTPS.

## 4. Yaklaşımlar

### A. Dengeli sadeleştirme — **seçildi**
Hero scroll-scrub videosu ve iletişim küresi kalır. 3B arka plan ve yetenek küresi
kaldırılır; yerine CSS arka plan ve gruplu chip matrisi gelir. Tilt/glare kalkar.
Süreler ve boşluklar kısalır, kontrast artar. `three`, `@react-three/fiber`,
`@react-three/drei` bağımlılıkları silinir.
**Artı:** Karakter korunur, okunabilirlik ve performans ciddi artar, deploy basitleşir.
**Eksi:** Etkileşimli 3B küre kaybı.

### B. Radikal sade
Tüm 3B sahneler ve videolar kalkar; statik poster, tipografi, ince geçişler kalır.
**Artı:** En hızlı ve en erişilebilir.
**Eksi:** Sitenin imza niteliğindeki hero deneyimi kaybolur.

### C. Sadece düzelt ve yayınla
Tasarım aynı kalır; yalnızca küre etiketleri, basePath, statik export ve deploy
düzeltilir.
**Artı:** En hızlı çözüm.
**Eksi:** "Sade" isteğini karşılamaz; okunabilirlik sorunları kalır.

**Seçim gerekçesi:** Kullanıcı A'yı seçti. İmza anları korunurken gürültü ve
karmaşa kaynağı katmanlar kaldırılıyor.

## 5. Kararlar (insan partner onayladı)

- Sadeleştirme yönü: **Dengeli (A)**.
- Yayın adresi: **https://selahattinozdmr.github.io** — kullanıcı sitesi.
  Bunun için GitHub deposunun adı `selahattinozdmr.github.io` olmalı.
  Depo adı değişmezse workflow otomatik olarak `/<repo>` basePath'ini ve proje
  sitesi canonical URL'ini uygular; asset/link helper'ları sayesinde site çalışır.
- Footer metni: TR "Next.js, GSAP & Motion ile geliştirildi",
  EN "Built with Next.js, GSAP & Motion".
- `docs/PLAN.md` tarihsel belge olarak kalır; başına "superseded" notu ve bu
  tasarım dokümanına bağlantı eklenir.

## 6. Tasarım

### 6.1 Bilgi mimarisi ve ritim
Tek sayfa ve mevcut çapa sırası korunur:
`#top → #about → #experience → #projects → #skills → #education → #contact`.

- Bölüm dikey boşluğu `py-28 md:py-40` → **`py-20 md:py-28`**.
- Bölüm başlıkları `text-4xl sm:text-5xl` (masaüstünde `md:text-6xl` kalkar).
- `max-w-6xl` korunur.
- Hero dışındaki tüm bölümler aynı sol hizada başlar.

### 6.2 Arka plan
`BackgroundCanvas`, `BackgroundScene`, `SkillsGlobe`, `SkillsGlobeScene` silinir.

Yeni `src/components/ui/SiteBackdrop.tsx` (server component, `aria-hidden`):
- `fixed inset-0 z-0`, tıklama geçirmez (gövde arka planının üstünde, `main` z-10 altında).
- Katmanlar: temel `--bg`, üstte iki geniş radial glow (cyan sol-üst, orange sağ),
  en üstte %2-3 opaklıkta ince grain (inline SVG `feTurbulence` data URI veya CSS).
- Animasyon yok, `three` yok, scroll/pointer dinleyicisi yok.
- Açık temada glow opaklığı yarıya iner.
- `main` üstündeki `relative z-10` korunur.

### 6.3 Hero
Korunur: scroll ile videoyu scrub eden sticky sahne, poster fallback, ilerleme çubuğu.

Değişir:
- Yükseklik `h-[300vh] md:h-[420vh]` → **`h-[180vh] md:h-[240vh]`**.
- İkinci "beat" (role + tagline tekrarı) kaldırılır; ilk intro ve video yeterli.
- Mobil boşluk düzeltilir: kartın başlangıç konumu intro konteynerinin yüksekliğine
  değil, **intro içindeki son görünür öğenin alt kenarına** göre ölçülür; intro ile
  kart arası boşluk mobilde `12px`, masaüstünde `24px` ile sınırlanır.
- Mobilde başlangıç kartı `w0 = min(W * 0.9, 420px)`, oran `0.62`; `hintSpace` 64px.
- Video `preload="auto"`, `poster`, `muted`, `playsInline` korunur.
- Reduced motion: poster + intro (mevcut fallback) korunur.

### 6.4 Yetenekler
3B küre ve `src/content/skills.ts` kaldırılır. `t.skills.dragHint` sözlükten çıkarılır.

Yeni düzen:
- Başlık bloğu tam genişlik.
- 5 grup, `grid gap-5 sm:grid-cols-2 lg:grid-cols-3`; her grup bir `.glass` kart:
  mono büyük harf başlık + chip listesi.
- Chip'ler mevcut stil (`.glass` yerine `border border-line bg-fg/[0.04]`), hover'da
  yalnızca kenarlık rengi değişir.
- Semantik: her grup `<div>` + `<ul>`; ekran okuyucu için başlık `aria-labelledby`.
- Eski sağ kolon ve `min-h-[320px]` kaldırılır.

### 6.5 Deneyim
- Zaman çizelgesi çizgisi/noktası korunur.
- Tarih kolonu `11.5rem` → **`13rem`**; `md:pr-8`; tarih `text-xs`,
  **`whitespace-nowrap`**, `tracking-normal`. Böylece "Eyl 2025 – May 2026" tek satır.
- Mobilde tarih kartın üstünde tek satır; nokta hizası korunur.
- Kart içi boşluk `p-6 md:p-7`.

### 6.6 Kartlar, kontrast ve tilt
- `TiltCard` silinir; About görseli ve proje kartları tilt/glare kullanmaz.
- Proje kartlarında hover: `hover:-translate-y-1`, gölge artışı, görselde
  `group-hover:scale-[1.03]` (1.05 yerine).
- About görseli: `figure` + çerçeve + sabit gölge; parlama efektleri kaldırılır.
- Token değişiklikleri (`globals.css`):
  - Dark: `--bg-card: rgba(13, 23, 48, 0.82)`, `--fg-muted: #a6b4d2`,
    `--line: rgba(140, 180, 255, 0.16)`.
  - Light: `--bg-card: rgba(255, 255, 255, 0.9)`, `--fg-muted: #4b5a7a`,
    `--line: rgba(15, 40, 90, 0.14)`.
  - `.glass`: `backdrop-filter: blur(8px)` (14px yerine).
- Kontrast hedefi: gövde metni ve chip'ler WCAG AA (≥4.5:1).

### 6.7 Navigasyon
- Görünüm korunur (hide-on-scroll, glass arka plan, dil değiştirme, tema).
- Mobil menüde **odak tuzağı**: açılınca ilk bağlantıya odaklanır, Tab menü içinde
  döner, Escape ve kapat butonu odağı tetikleyici butona geri verir.
- Dil bağlantıları `basePath` farkındadır.

### 6.8 İletişim ve footer
- İletişimdeki cam küre videosu korunur.
- E-posta, kopyala, GitHub/LinkedIn ve footer aynı kalır.
- Gereksiz süs kalmaz; kart yok.

### 6.9 Motion
- `Reveal`, `CountUp`, Lenis ve GSAP ScrollTrigger korunur.
- `TiltCard` kaldırılır.
- Hero'daki scroll-scrub dışındaki sürekli 3B animasyon yoktur.
- Reduced motion: Lenis kapalı, Reveal başlangıç durumu uygulanmaz, hero poster,
  iletişim videosu poster karesinde.

### 6.10 Rotalar ve `/` yönlendirmesi
Çoklu kök layout (Next docs: "multiple root layouts") kullanılır:

```
src/app/(site)/[lang]/layout.tsx   # mevcut html/body/fontlar/tema
src/app/(site)/[lang]/page.tsx     # mevcut sayfa
src/app/(root)/layout.tsx          # minimal html/body + globals.css
src/app/(root)/page.tsx            # meta refresh + görünür /tr bağlantısı
```

- `src/proxy.ts` silinir. `next dev` ve statik export'ta `/` artık gerçek bir sayfa.
- `(root)/page.tsx` server component'tir; `<meta httpEquiv="refresh">` (React 19
  head'e taşır) ve `<a href={...}/tr/>` döner. `basePath` varsa hedefe eklenir.
- `/tr` ve `/en` `generateStaticParams` ile statik üretilir.
- `trailingSlash: true` → `out/tr/index.html`, `out/en/index.html`.

### 6.11 Statik export ve basePath
`next.config.ts`:
- `output: "export"`
- `trailingSlash: true`
- `images: { unoptimized: true }`
- `basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined`
- `cacheComponents` ve `partialPrefetching` kaldırılır (statik export ile gereksiz;
  davranışı deterministik tutar).
- Tailwind turbopack kuralı korunur.

Yeni `src/lib/asset.ts`:
```ts
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;
export const localeHref = (locale: string) => `${basePath}/${locale}/`;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://selahattinozdmr.github.io";
```
Kullanım: HTML `src`/`href`, medya yolları ve locale bağlantıları.
Metadata (canonical, hreflang, OG/Twitter görselleri) yolları basePath içermez;
Next `basePath`'i metadata URL'lerine otomatik ekler. `asset()`/`localeHref()`
metadata için kullanılmaz.
`site.url` → `siteUrl` (varsayılan kullanıcı sitesi). Böylece depo yeniden
adlandırılmazsa CI `NEXT_PUBLIC_SITE_URL`'i proje sitesi adresine ayarlar ve
canonical/OG dahil her şey doğru kalır.

### 6.12 GitHub Pages
- `public/.nojekyll` eklenir.
- `.github/workflows/deploy.yml`:
  - `on: push: branches: [main]` + `workflow_dispatch`.
  - İzinler: `contents: read`, `pages: write`, `id-token: write`.
  - Concurrency: `pages`, `cancel-in-progress: true`.
  - Adımlar: checkout → setup-node 20 + npm cache → basePath ve site URL belirle →
    `npm ci` → `npm run build` → `actions/upload-pages-artifact@v3` (`path: out`)
    → `actions/deploy-pages@v4`.
  - basePath: depo adı `<owner>.github.io` ise boş, değilse `/<repo>`.
  - Site URL: depo adı `<owner>.github.io` ise `https://<owner>.github.io`,
    değilse `https://<owner>.github.io/<repo>`.
- README: depoyu `selahattinozdmr.github.io` olarak adlandırma, Settings → Pages →
  Source: GitHub Actions, main'e push.
- Depo yeniden adlandırılmazsa workflow proje sitesi olarak yayınlar; helper'lar
  sayesinde linkler/asset'ler çalışır.

### 6.13 Bağımlılıklar
Kaldırılır: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`.
Kalır: `next`, `react`, `react-dom`, `gsap`, `@gsap/react`, `motion`, `lenis`,
Tailwind v4 araçları.
`npm uninstall` ile `package.json` ve `package-lock.json` güncellenir.

### 6.14 Video ağırlığı
Hero videosu 7.5 MB (mobil 3.2 MB). İlk yük için poster hemen görünür.
Bu tasarımda yeniden encode **zorunlu değil**; deploy'u engellemez. Uygulama
sırasında ffmpeg varsa masaüstü videoyu ~4 MB altına indirmek opsiyonel bir
iyileştirmedir; kalite düşerse orijinal kalır.

## 7. Dosya yapısı (özet)

**Silinecek**
- `src/proxy.ts`
- `src/components/three/BackgroundCanvas.tsx`
- `src/components/three/BackgroundScene.tsx`
- `src/components/three/SkillsGlobe.tsx`
- `src/components/three/SkillsGlobeScene.tsx`
- `src/components/ui/TiltCard.tsx`
- `src/content/skills.ts`

**Yeni**
- `src/components/ui/SiteBackdrop.tsx`
- `src/lib/asset.ts`
- `src/app/(root)/layout.tsx`
- `src/app/(root)/page.tsx`
- `public/.nojekyll`
- `.github/workflows/deploy.yml`
- `scripts/verify-build.mjs`

**Taşınacak**
- `src/app/[lang]/layout.tsx` → `src/app/(site)/[lang]/layout.tsx`
- `src/app/[lang]/page.tsx` → `src/app/(site)/[lang]/page.tsx`

**Değişecek**
- `next.config.ts`, `package.json`, `README.md`
- `docs/PLAN.md` (başına superseded notu)
- `src/app/globals.css`
- `src/content/{types,tr,en,site}.ts`
- `src/components/hero/ScrollVideoHero.tsx`
- `src/components/sections/{About,Experience,Projects,Skills,Navbar}.tsx`
- `src/app/(site)/[lang]/page.tsx` (backdrop ve Skills çocukları)

## 8. Doğrulama

- `npm run build` → `out/` üretir; `/tr`, `/en`, `/` ve `404.html` var.
- `npx tsc --noEmit` ve `npm run lint` temiz.
- `node scripts/verify-build.mjs`:
  - Canonical/hreflang/OG yolları basePath'i **bir kez** içerir.
  - SSR HTML'de gizli reveal yoktur; CountUp son değeri basar.
  - Açık/koyu tema cyan, orange ve muted metin AA (≥4.5:1).
  - Medya ve `_next` referansları her iki locale için mevcuttur.
  - `out/index.html`, `out/tr/index.html`, `out/en/index.html`, `out/404.html`,
    `out/.nojekyll`, `out/video/hero.mp4`, `out/images/og.jpg` mevcut.
  - `out/index.html` `/tr` hedefini içeriyor.
  - HTML'de `/_next/` referansları var; `"/portfolio` gibi sabit basePath yok.
  - `src/proxy.ts` yok.
- `npx serve out` ile:
  - `/` → `/tr/` yönlenir.
  - `/tr/`, `/en/` açılır; dil değiştirme çalışır.
  - Video/poster/görseller 200 döner.
  - 375 / 768 / 1440 px'te yatay taşma yok; açık/koyu tema okunur.
  - Reduced motion: içerik görünür, otomatik video oynamaz.

## 9. Review Focus (bu değişikliğin en olası tuzakları)

1. **Kullanıcı sitesi kökü:** `/` yönlendirmesi, `_next` asset'leri ve video/görsel
   200 dönmeli; basePath yanlışlıkla eklenmemeli.
2. **375px taşma:** uzun proje adları, chip'ler ve "Eyl 2025 – May 2026" tarihi
   tek satırda taşmamalı.
3. **Açık tema kontrastı:** yeni kart/arka planla gövde metni ve chip'ler AA altına
   düşmemeli.
4. **Reduced motion:** Reveal/hero/contact hiçbir içeriği görünmez bırakmamalı.
5. **JS yok / ilk boya:** `/` meta refresh ile yönlenmeli; içerik hidrasyondan önce
   görünmeli.
6. **TR/EN uzunluk farkı:** İngilizce başlık ve tarihler düzeni bozmamalı.
7. **Dış bağlantılar:** URL'si olmayan projelerde buton gizli kalmalı; olanlar
   yeni sekmede `rel="noopener noreferrer"` ile açılmalı.

Her madde, ilgili görevin doğrulama adımında kontrol edilir.

## 10. Uygulayıcıya kalanlar

- Arka plan grain dokusunun tam SVG parametreleri.
- Chip hover tonu ve kart gölge değerleri (token'lara sadık kalarak).
- Hero mobil ölçümünün tam formülü (son intro öğesinin alt kenarına göre).
- Mobil menü odak tuzağının tam implementasyonu.
- Opsiyonel video encode parametreleri.
