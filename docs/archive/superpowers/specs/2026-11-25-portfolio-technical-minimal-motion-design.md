# Portfolio — Teknik Minimal + Motion Yeniden Tasarımı

**Tarih:** 2026-11-25
**Durum:** Onay bekliyor
**Hedef site:** https://selahattinozdmr.github.io
**Önceki tasarım:** `2026-11-25-portfolio-editorial-redesign-design.md` (sıcak editöryel)

## 1. Amaç ve Neden

Sıcak editöryel yön içerik ve okunabilirlik açısından iyi çalıştı; ancak insan
partner siteyi fazla sakin/statik buldu ve **daha futuristik, sade ve hareketli**
bir görünüm istedi. Bu tasarım, mevcut bilgi mimarisini ve vaka-çalışması
içeriğini koruyup görsel sistemi **teknik minimal** bir dile çevirir:

- soğuk monokrom kanvas + tek elektrik mavisi accent,
- Space Grotesk + Inter + JetBrains Mono,
- ince grid/hairline, hafif cam yüzeyler,
- Motion tabanlı, gürültüsüz ama belirgin bir hareket katmanı.

Amaç "sci-fi HUD" değil; **teknoloji şirketine yakışan, sakin, keskin ve canlı**
bir yüzey. İçerik aynı kalır; tasarım ve hareket değişir.

## 2. Araştırma ve Mevcut Durum

Önceki araştırma (SiteBuilderReport, Portfolio Studio, Abdulkader Safi, Mayank
Kushwaha, Empire UI, OneMinuteBranding, Anish Shrestha) şu dengeyi işaret ediyor:
tek vurgu, güçlü tipografi, sakin motion, gerçek iş anlatısı. Bu yön onu korur;
fark, sıcak serif/kağıt paletinin yerine **cool monokrom + tek elektrik accent**
ve daha belirgin mikro-etkileşimler gelmesidir.

Mevcut site: Hero + profil kartı, SectionShell + About, Experience, 3+2 proje,
3 yetenek grubu, Education, Contact, Footer; TR/EN, dark/light, statik export,
no-JS/reduced-motion düzeltmeleri, odak tuzağı. Motion şu an yalnızca Reveal,
CountUp, hover preview ve tema geçişiyle sınırlı; bu yüzden "statik" hissi
veriyor. Bu tasarım hareketi bir **sistem** haline getirir.

## 3. Hedefler

- İlk bakışta "yazılım mühendisi + ürün" sinyali veren, futuristik ama sade bir
  kimlik.
- Hareketin her yerde değil, hiyerarşiyi desteklediği yerde olması: giriş,
  bölüm geçişleri, proje keşfi, iletişim.
- Mevcut içerik, TR/EN, dark/light, statik export, basePath ve erişilebilirlik
  kazanımlarının korunması.
- Yeni ağır bağımlılık yok; Motion + CSS yeterli.
- 375/768/1440, no-JS, reduced-motion ve AA kontrastın korunması.

## 4. Kapsam Dışı

- İçerik/metin değişikliği; vaka çalışmaları, deneyim, eğitim, iletişim aynı.
- Yeni sayfalar, blog, CMS, analytics, form backend'i.
- 3B/WebGL, video, GSAP, Lenis veya scroll-jacking.
- Sci-fi HUD/terminal/scanline/koordinat klişeleri.
- Portre veya gerçek ürün ekran görüntüsü temini; mevcut görseller dekoratif
  önizleme olarak kalır.
- CV/résumé, özel alan adı, yeni sosyal kanıt.

## 5. Anti-Hedefler

- Neon siber estetik, her yerde glow, okunamayan düşük kontrast.
- Aşırı animasyon: her öğenin sürekli hareketi, scroll-jacking, gecikmeli
  içerik.
- Jenerik "dark SaaS" görünümü; sıcak editöryel kimliğin birebir korunması.
- Bilgiyi süsün arkasına saklamak.
- Kullanıcıyı bekletmek; hareket içerikten önce gelmemeli.

## 6. Kısıtlar

- Next.js 16.4.6 App Router, React 19, TypeScript strict, Tailwind v4.
- `output: "export"`, `trailingSlash`, basePath/site URL, `.nojekyll` ve GitHub
  Pages davranışı korunur.
- TR/EN rotaları ve `Dictionary` deseni korunur; görünür metin bileşenlere
  gömülmez.
- Açık/koyu tema korunur; varsayılan koyu.
- 375/768/1440'te yatay taşma yok.
- WCAG AA: accent metin, muted, buton metni ≥4.5:1.
- `prefers-reduced-motion: reduce` altında tüm içerik görünür, hareket kapalı.
- JS kapalıyken içerik ve iletişim bilgileri görünür.
- `npm run build`, `npx tsc --noEmit`, `npm run lint`, `npm run verify` geçer.
- Yeni bağımlılık yok; Motion (kurulu) + CSS. Playwright yalnızca yerel QA.
- Mevcut içerik ve proje görselleri korunur; uydurma metrik/yorum yok.

## 7. Yaklaşımlar

### A. Teknik minimal + motion — **seçildi**

Cool monokrom kanvas, tek elektrik mavisi accent, Space Grotesk + Inter + mono;
ince grid/hairline, cam yüzeyler; Motion ile giriş, scroll ilerlemesi, aktif nav,
çizgi çizimi, hover preview, details, spotlight ve manyetik CTA.

- **Artı:** "Futuristik + sade" isteğini dengeler; içerik ve erişilebilirlik
  korunur; ağır 3D/GSAP yok; mevcut bileşenler yeniden kullanılır.
- **Eksi:** Sıcak/serif kimliği kaybolur; motion yanlış dozda olursa gürültülü
  veya yavaş hissedebilir.

### B. Dark HUD

Cyan/lime, koordinat/scanline/terminal detayları, daha agresif motion.

- **Artı:** En "futuristik" görünüm; hatırlanır.
- **Eksi:** Klişe/AI-portfolyo riski, okunabilirlik ve kurumsal sinyal kaybı.

### C. Neo-brutalist futurist

Siyah-beyaz, dev tipografi, sert grid, keskin motion.

- **Artı:** Cesur ve sade.
- **Eksi:** Enterprise backend için fazla agresif; motion inceliği zor.

**Seçim:** İnsan partner A'yı seçti. Mevcut içerik ve vaka yapısı korunur;
yalnızca görsel sistem + motion katmanı değişir.

## 8. Tasarım Sistemi

### 8.1 Renk

| Token | Dark | Light | Kullanım |
|---|---|---|---|
| `--bg` | `#07080a` | `#f4f6f8` | kanvas |
| `--bg-elev` | `#0d0f13` | `#ffffff` | yükseltilmiş yüzey |
| `--fg` | `#eef2f7` | `#0b1020` | ana metin |
| `--fg-muted` | `#9aa4b2` | `#596273` | ikincil metin |
| `--line` | `rgba(238,242,247,0.12)` | `rgba(11,16,32,0.12)` | hairline/grid |
| `--accent` | `#7aa2ff` | `#2b63f0` | buton dolgusu/çizgi |
| `--accent-rgb` | `122 162 255` | `43 99 240` | glow/overlay |
| `--accent-ink` | `#a8c1ff` | `#1d4ed8` | accent metin/link |
| `--on-accent` | `#07080a` | `#ffffff` | accent üstü metin |
| `--surface` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.72)` | cam yüzey |

Kontrast (hesaplandı): dark accent/bg 8.05, accent-ink/bg 11.20, muted/bg 7.94,
fg/bg 17.82; light accent-ink/bg 6.19, muted/bg 5.67, fg/bg 17.48, on-accent/
accent 5.07. Hepsi AA.

Kurallar:
- Tek accent; ikinci renk yok (grayscale + accent).
- Gradient metin yok. Logo `--accent` + `--fg-muted`.
- Proje görselleri içeriktir; hafif cool overlay/desaturasyon uygulanabilir.
- Kanvas: `--bg` + 64px ince grid + tek yumuşak accent radial glow; grid
  opaklığı ~0.06-0.08, maskeli; partikül/3B yok.

### 8.2 Tipografi

- **Display:** `Space Grotesk` (500/700) — isim, bölüm başlıkları, büyük e-posta.
- **Body:** `Inter` — paragraflar.
- **Label/meta:** `JetBrains Mono` — numaralar, tarihler, etiketler, status.

Instrument Serif kaldırılır. Space Grotesk Türkçe glyph'leri test edilir.

Ölçek:
- Hero isim: `clamp(3.25rem, 8.5vw, 7.5rem)`, `leading-[0.92]`,
  `tracking-[-0.03em]`.
- Bölüm başlığı: `clamp(2rem, 4vw, 3.5rem)`.
- Gövde: 16–18px, `1.65`.
- Mono: 11–12px, uppercase, `0.16em`.

### 8.3 Düzen

- Mevcut 1180px grid, 11rem sticky SectionShell etiketi ve bölüm sırası korunur.
- Hairline kurallar; kart yerine çizgi/boşluk.
- **Tek cam yüzey hero profil panelidir.** Nav yarı saydam bir bar; About
  istatistikleri hairline grid; iletişim availability öğesi ince çerçeveli
  pill; başka kart/grid yok. `.glass`/`--surface` yalnızca hero profil paneli
  için kalır.
- Hero 7/5; sağda profil paneli; sol metin.
- Sol etikete ince dikey çizgi ve `index`; scroll'da aktiflik göstergesi.
- Üstte 2px scroll ilerleme çizgisi.

### 8.4 Motion Sistemi

Motion (`motion/react`) + CSS; GSAP/Lenis yok. Tüm hareketler
`prefers-reduced-motion: reduce` altında kapalı; `hover: hover`/`pointer: fine`
gerektirenler dokunmatikte kapalı.

**Global**
- `ScrollProgress`: üstte accent çizgi; `useScroll` + `useSpring`; reduced
  motion'da düz.
- `SiteBackdrop`: grid + accent glow; 24s çok yavaş drift (CSS); reduced
  motion'da statik.
- `Reveal`: mevcut no-JS güvenli mantık korunur; 16px yukarı + 0.6s; stagger
  desteği eklenir.
- `SectionRule`: hairline çizgi görünür olduğunda soldan sağa çizilir.
- `SectionLabel`: sticky etiket; in-view olduğunda accent nokta/çizgi aktif.
- Navbar: aktif bölüm göstergesi (IntersectionObserver) ve alt çizgi animasyonu.
- Mobil menü bu sistemin parçasıdır: tam ekran `bg-bg/95` panel, hairline
  ayraçlar, mono index + Space Grotesk linkler, stagger'lı giriş, aktif bölüm,
  mevcut odak tuzağı; reduced motion'da giriş animasyonu kapalı.

**Hero**
- İsim/rol/tagline/CTA: CSS keyframe stagger (yükleme), no-JS'te de çalışır;
  reduced motion'da kapalı.
- Availability dot: yavaş pulse (CSS); reduced motion'da statik.
- Profil paneli: hafif giriş + **yerel** cursor spotlight (fine pointer,
  reduced değil). Spotlight site genelinde bir imleç katmanı değildir; yalnızca
  hero profil panelinde (ve istenirse WorkRow önizlemesinde) çalışır.
- CTA'lar: manyetik pointer offset (fine pointer, reduced değil; sadece
  transform).

**Bölümler**
- About: pull quote ve istatistikler stagger; count-up korunur.
- Experience: satırlar stagger; dikey çizgi scroll ile çizilir; tarih mono.
- Projects: satır stagger; hover preview spring/scale; satır hover'da accent
  çizgi; `<details>` aç/kapa ikonu döner, içerik fade/slide; link oku kayar.
- Skills: gruplar stagger; hover'da ince accent çizgi.
- Education: yayın satırı reveal.
- Contact: e-posta alt çizgisi hover'da çizilir; kopyala başarı animasyonu;
  sosyal ikonlarda hafif kalkma.
- Footer: başa dön oku.

**Sınırlar**
- Sadece `transform`/`opacity`; layout tetikleyen animasyon yok.
- Scroll-jacking, pinned section, otomatik video yok.
- Hareket süreleri 0.3–0.8s; gecikmeler toplamda <0.4s.
- `will-change` yalnızca animasyon sırasında.

### 8.5 Bileşenler

- `ScrollProgress` (client, fixed).
- `SiteBackdrop` (mevcut; cool grid/glow).
- `Reveal` (mevcut; stagger/variant).
- `SectionShell` (mevcut; label line/active).
- `SectionRule` (client; çizgi).
- `Hero` (server) + `HeroMotion` (client; spotlight/magnetic/pulse).
- `WorkRow` (client; preview spring + details).
- `CursorSpotlight` (client; CSS var ile radial highlight).
- `Magnetic` (client; CTA offset).
- `Navbar` (client; active section + underline + restyled mobile menu).
- `CopyEmailButton` (mevcut; başarı animasyonu).
- `Logo`/favicon (accent'a göre).

## 9. Sayfa Akışı

Mevcut akış ve içerik korunur: Navbar → Hero → About → Experience → Projects →
Skills → Education → Contact → Footer. Görsel/motion katmanı değişir.

- **Hero:** Space Grotesk isim; availability pill + pulse; profil kartında
  konum/focus/stack/now; 2 CTA; spotlight.
- **About:** sans pull quote (serif italic yerine), hairline stats, count-up.
- **Experience:** mono tarih, rol/şirket, outcome; dikey çizgi.
- **Projects:** 3 vaka + 2 kısa; hover preview spring; details; linkler.
- **Skills:** 3 grup; mono tools; hover line.
- **Education/Contact/Footer:** yeni cool palet ve motion; içerik aynı.

## 10. İçerik ve Veri Modeli

- İçerik değişmez; `Dictionary` alanları aynı kalır.
- Bölüm index'i yeni alan gerektirmez: `SectionShell`, mevcut `eyebrow`
  metnini `" — "` ayracından `index` + `label` olarak böler; ayraç yoksa yalnızca
  label gösterir. Böylece TR/EN içerik ve tipler değişmez.
- Yeni metin alanı eklenmez. Hero'daki mevcut `availability/focus/stack/now`
  kullanılır.
- Proje görselleri aynı; dekoratif önizleme.
- OG/favicon yeni kimlikle güncellenir; README'deki "temporary preview" notu
  korunur.

## 11. Kaldırılacak / Değişecek

- Instrument Serif → Space Grotesk (layout fonts, `--font-display`).
- Sıcak kil/kağıt token'ları → cool monokrom + elektrik mavisi.
- About serif pull quote → sans/teknik statement.
- OG görseli (`public/images/og.jpg`) yeni kimlikle yeniden üretilir.
- `src/app/icon.svg` ve `Logo.tsx` accent'e geçer.
- Motion dışında yeni bağımlılık yok; GSAP/Lenis/video geri gelmez.

## 12. Erişilebilirlik ve Performans

- AA token'lar; focus halkaları; `aria-hidden` dekoratif spotlight/grid.
- Hover preview/spotlight/magnetic yalnızca fine pointer + no-reduced; linkler
  her zaman görünür.
- JS kapalıyken içerik görünür; CSS hero animasyonu no-JS'te de çalışır.
- Reveal no-JS güvenli mantığı korunur.
- Sadece transform/opacity; `will-change` kısa ömürlü.
- `LazyMotion`/`domAnimation` **zorunlu değildir**; mevcut Motion importları
  korunur. Bundle ölçümü gerekirse ayrı bir optimizasyon olarak düşünülür.
- Space Grotesk `next/font` subset; Türkçe glyph testi.

## 13. Doğrulama

- `npm run build`, `npx tsc --noEmit`, `npm run lint`, `npm run verify`.
- `verify-build.mjs`: yeni token'lar/accent, Space Grotesk, Instrument Serif yok,
  AA, motion bileşenleri (ScrollProgress/SectionRule/HeroMotion/Spotlight/
  Magnetic), legacy yok, basePath/canonical/OG, no-JS/SSR, iki locale.
- Playwright yerel: 375/768/1440; TR/EN; dark/light; no-JS; reduced motion;
  hero intro; scroll progress; active nav; project hover/details; spotlight/
  magnetic dokunmatikte yok; taşma yok; konsol temiz; anchor offset.
- BasePath build: `/portfolio` canonical/asset bir kez.
- OG 1200×630 yeni kimlik; favicon accent.

## 14. Riskler

1. **Motion fazlalığı.** Aşırı hareket "sade" hedefini bozar; süre/adedi
   sınırlı tutulmalı.
2. **Futuristik klişe.** Grid/glow/HUD'a kaymamalı; grid çok soluk, accent tek.
3. **Kontrast.** Açık temada accent fill/on-accent ve accent-ink pinlenmeli.
4. **Space Grotesk Türkçe glyph/CLS.** Font swap ve glyph testi.
5. **No-JS/reduced.** CSS hero animasyonu ve Reveal içeriği görünür kalmalı.
6. **Spotlight/magnetic performans.** Pointermove'da style; React render yok;
   touch/reduced off.
7. **Geçici proje görselleri.** Cool overlay; gerçek ekran görüntüsü değil.
8. **Kapsam.** İçerik değişmemeli; motion görsel katmanla sınırlı.

## 15. Uygulayıcıya Kalanlar

- Tam motion süreleri/easing ve stagger aralıkları.
- Grid çizgi aralığı/opaklığı ve glow yoğunluğu.
- Spotlight yarıçapı/opaklığı; magnetic gücü.
- Space Grotesk'in son ağırlıkları/tracking'i.
- OG düzeni ve favicon tonu.
- Details aç/kapa ikonunun tam geometrisi.

## 16. Builder Check Sonrası Kararlar

1. **Kart dili:** Tek cam yüzey hero profil panelidir; nav yarı saydam bar,
   About istatistikleri hairline grid, iletişim availability öğesi ince
   çerçeveli pill. Başka kart yok.
2. **Mobil menü:** Kapsam içinde; tam ekran teknik panel, mono index + Space
   Grotesk linkler, stagger, aktif bölüm, odak tuzağı; reduced motion'da anında.
3. **Bölüm index'i:** Yeni içerik alanı yok; `SectionShell` mevcut `eyebrow`
   metnini `" — "` ayracından böler, ayraç yoksa yalnızca label gösterir.
4. **LazyMotion:** Zorunlu değil; mevcut Motion importları korunur, bundle
   optimizasyonu ayrı bir iş olarak kalır.
5. **Spotlight:** Site geneli imleç katmanı değil; yalnızca hero profil paneli
   (ve istenirse WorkRow önizlemesi) içinde yerel çalışır.
