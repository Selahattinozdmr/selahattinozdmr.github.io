# Portfolio — Editöryel Vaka Çalışması Yeniden Tasarımı

**Tarih:** 2026-11-25
**Durum:** Onay bekliyor
**Hedef site:** https://selahattinozdmr.github.io
**Önceki tasarım:** `2026-11-25-portfolio-simplify-github-pages-design.md` (sadeleştirme + yayın altyapısı)

## 1. Amaç

Site şu an teknik olarak sağlam ve görsel olarak tutarlı; ancak piyasadaki güçlü
developer portfolyolarıyla karşılaştırınca **kanıt ve kişilik** katmanında zayıf
kalıyor. Tasarım dili de "koyu arka plan + neon vurgu + 3D render + eşit proje
kartları" kalıbına yakın; bu kalıp 2026'da hızla "AI ile üretilmiş portfolyo"
olarak okunuyor.

Yeni yön: **editöryel, sıcak, tek vurgulu ve vaka çalışması odaklı** bir portfolyo.
Amaç, ziyaretçinin ilk 4 saniyede kim olduğunu, ne yaptığını, hangi somut işleri
teslim ettiğini ve nasıl iletişime geçeceğini anlaması; 3B süs yerine işin ve
metnin taşıması.

## 2. Araştırma Özeti

İncelenen kaynaklar:

- SiteBuilderReport, "Software Engineer Portfolios: 10+ Well-Designed Examples" (2026)
  https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios
- Portfolio Studio, "10 Best Developer Portfolio Examples" (2026)
  https://portfoliostudio.dev/blog/best-developer-portfolio-examples
- Abdulkader Safi, "I redesigned my portfolio: tech dashboard to editorial" (2026)
  https://abdulkadersafi.com/blog/i-redesigned-my-portfolio-from-tech-dashboard-to-editorial
- Mayank Kushwaha, "Building portfolios that don't look AI-generated" (2026)
  https://mayank-kushwaha.in/blog/portfolios-that-dont-look-ai-generated
- Empire UI, "Portfolio Hero Section Designs: 7 Layouts for Developers in 2026"
  https://empire-ui.com/blog/portfolio-hero-designs
- OneMinuteBranding, "Developer Portfolio Branding Guide 2026"
  https://www.oneminutebranding.com/blog/developer-portfolio-branding
- Anish Shrestha, "Redesigning My Site as a Magazine Spread" (2026)
  https://anishshrestha.com/blog/redesigning-my-site-as-a-magazine-spread
- Codrops, "Mathias Adolfsson '26" (2026) — deneysel örnek, karşılaştırma için
  https://tympanus.net/codrops/2026/11/05/mathias-adolfsson-portfolio/

Çıkan ortak kalıplar:

1. **Az ve derin proje.** En iyi portfolyolar 3–6 projeyi problem, rol ve sonuçla
   anlatıyor; 20 repo veya eşit kart galerisi değil. (Portfolio Studio)
2. **Gerçek görsel.** Gerçek ürün ekran görüntüsü/fotoğraf, AI ile üretilmiş 3D
   render'dan daha güvenilir. (Mayank Kushwaha)
3. **Tek vurgu + güçlü tipografi.** Tek renk, sıcak kanvas, hairline çizgiler,
   numaralı editöryel satırlar; gradient ve neon kalabalığı yerine sakinlik.
   (Abdulkader Safi, Anish Shrestha)
4. **Recruiter taraması.** Net değer önerisi, availability, iletişim ve hızlı yük;
   ilk ekranda "kim, ne, kanıt, nasıl ulaşılır". (SiteBuilderReport)
5. **Uzmanlaşma ve bağlam.** "Her şeyi bilen full-stack" yerine belirli bir
   uzmanlık ve bağlam; yetenek listesi yerine ne için kullanıldığı. (OneMinuteBranding)
6. **Sakin motion.** Scroll-jacking ve ağır video yerine amaçlı, küçük
   geçişler; içerik her zaman önce. (Empire UI, Portfolio Studio)

Mevcut sitede güçlü olan: tutarlı görsel dil, güçlü tipografi, TR/EN, tema,
statik/hızlı altyapı, proje görselleri. Eksik olan: vaka çalışması derinliği,
gerçek görsel, portre, CV, kod linkleri, uzmanlık konumlandırması ve
"AI portfolyo" hissinden ayrışma.

## 3. Hedefler

- İlk ekranda net konumlandırma: kurumsal Java/Spring Boot backend + ürün odaklı
  Next.js/React Native teslimatı.
- 3 derin vaka çalışması + 2 kısa proje; her birinde problem, ne yapıldığı ve
  sonuç.
- Sıcak, editöryel, tek vurgulu ve akılda kalan bir görsel kimlik.
- Daha az ama daha anlamlı hareket; video/3D yerine tipografi ve düzen.
- Recruiter/CTO taraması için hızlı, erişilebilir, mobil-öncelikli deneyim.
- Gerçek olmayan metrik, referans veya görsel üretmemek.

## 4. Kapsam Dışı

- Ayrı proje detay sayfaları (`/work/[slug]`). Bunun yerine 3 öne çıkan proje
  satırında `<details>` tabanlı, tek sayfa içinde açılabilir kısa vaka notu
  (3 madde) olur; URL durumu yok. Çok sayfalı yapı ayrı bir proje.
- CMS, blog, iletişim formu backend'i, analytics.
- Özel alan adı/CNAME.
- Yeni portre veya gerçek ürün ekran görüntüleri temin etmek; tasarım onlar
  gelene kadar mevcut görsellerle ve metinle çalışır.
- CV/résumé dosyası eklemek (kullanıcı daha önce kaldırdı).
- Uydurma metrik, müşteri adı, referans veya sosyal kanıt.

## 5. Anti-Hedefler

- Koyu neon dashboard / siber estetik / 3D render vitrini.
- Eşit boyutlu kart gridi ve logo duvarı.
- Ağır scroll-jacking, otomatik video, sürekli parallax.
- Düşük kontrastlı "zarif" gri metin.
- Jenerik "passionate developer" dili.
- Bilgiyi süsün arkasına saklamak.

## 6. Kısıtlar

- Next.js 16.4.6 App Router, React 19, TypeScript strict, Tailwind v4.
- Statik export (`output: "export"`), GitHub Pages, `basePath` desteği korunur.
- TR/EN rotaları ve `Dictionary` deseni korunur; görünür metin bileşenlere
  gömülmez.
- Açık/koyu tema korunur.
- 375 / 768 / 1440 px'te yatay taşma yok.
- WCAG AA: gövde metni, etiketler, linkler ve butonlar ≥4.5:1.
- `prefers-reduced-motion: reduce` altında tüm içerik görünür, hareket kapalı.
- JS kapalıyken içerik ve iletişim bilgileri görünür.
- `npm run build`, `npx tsc --noEmit`, `npm run lint`, `npm run verify` geçer.
- Yeni ağır bağımlılık yok; GSAP, Lenis ve video kaldırılır.

## 7. Yaklaşımlar

### A. Editöryel vaka çalışması — **seçildi**

Sıcak kağıt/mürekkep paleti, tek kil (clay) vurgu, serif başlık + Inter + mono
etiketler; sticky numaralı bölümler; 3 derin proje satırı + 2 kısa proje;
hero'da video yok, metin ve profil kartı var; iletişimde küre yok, büyük e-posta
ve availability var. GSAP/Lenis/video kaldırılır.

- **Artı:** Araştırmadaki en güçlü kalıpları uygular; mevcut içerik ve statik
  altyapıyla uyumlu; ayırt edici; hızlı ve erişilebilir.
- **Eksi:** 3D "wow" kaybı; tipografi ve içerik hiyerarşisinin daha disiplinli
  olması gerekir; proje görselleri gerçek ekran görüntüsü olana kadar geçici.

### B. Minimal dark engineer

Brittany Chiang tarzı: koyu, tek yeşil vurgu, sol sticky nav, 4 öne çıkan proje,
video/3D yok. Kanıtlanmış ve hızlı.

- **Artı:** Düşük risk, tanıdık, recruiter dostu.
- **Eksi:** Jenerik; mevcut "AI portfolyo" eleştirisini tam çözmez; kişisel
  kimlik zayıf.

### C. Bento/deneysel

Bento grid hero, etkileşimli kutular, GitHub katkı grafiği, mini oyunlar.

- **Artı:** Hatırlanır, trend.
- **Eksi:** Enterprise backend için yanlış sinyal; çabuk eskir; okunabilirlik ve
  bakım maliyeti yüksek.

**Seçim gerekçesi:** İnsan partner "sen seç" dedi. A, araştırma bulgularını
mevcut içerik ve yayın altyapısıyla birleştiren en yüksek etkili yön.

## 8. Tasarım Sistemi

### 8.1 Renk

Tek vurgu: kil (clay). İki tema da sıcak; saf siyah/beyaz yok.

| Token | Dark | Light | Kullanım |
|---|---|---|---|
| `--bg` | `#0d0b09` | `#f4efe6` | kanvas |
| `--bg-elev` | `#15110e` | `#fbf8f2` | yükseltilmiş yüzey |
| `--fg` | `#f4efe6` | `#1a1512` | ana metin |
| `--fg-muted` | `#b8aea2` | `#5f574f` | ikincil metin |
| `--line` | `rgba(244,239,230,0.14)` | `rgba(26,21,18,0.14)` | hairline |
| `--accent` | `#d97745` | `#b8501f` | buton dolgusu, çizgi, logo |
| `--accent-ink` | `#e08a5b` | `#9a3d17` | accent metin/link |
| `--on-accent` | `#0d0b09` | `#fff8f0` | accent üstü metin |
| `--card` | `rgba(244,239,230,0.04)` | `rgba(255,255,255,0.55)` | yüzey |

Kontrast (hesaplandı): dark bg/accent 6.24, bg/muted 8.99, bg/fg 17.15;
light bg/accent-ink 6.00, bg/muted 6.19, bg/fg 15.81; light buton
`#b8501f` + `#fff8f0` 4.74. Hepsi AA.

Kurallar:
- UI'da tek vurgu. Cyan ve orange token'ları kaldırılır.
- Gradient metin yok. Logo tek accent + foreground olur.
- Proje görselleri içeriktir; UI rengiyle yarışmaz. Geçici görsellerde
  hafif desaturasyon uygulanabilir.
- Arka plan: `--bg` + tek yumuşak radial accent glow + ince grain; partikül,
  grid veya 3D yok.

### 8.2 Tipografi

- **Display:** `Instrument Serif` (400, normal/italic) — isim, bölüm başlıkları,
  büyük e-posta. Editöryel karakter.
- **Body:** `Inter` — paragraflar, açıklamalar.
- **Label/meta:** `JetBrains Mono` — bölüm numaraları, yıllar, etiketler, link
  türleri.

Space Grotesk kaldırılır. Üç aile yeterli; yeni ağır font eklenmez.

Ölçek:
- Hero isim: `clamp(3.25rem, 8.5vw, 7.5rem)`, satır yüksekliği `0.95`,
  hafif negatif tracking.
- Bölüm başlığı: `clamp(2rem, 4vw, 3.5rem)`.
- Gövde: 16–18px, `1.65` satır yüksekliği; geniş paragraflarda `max-w-[62ch]`.
- Mono etiket: 11–12px, uppercase, `0.16em` tracking.

### 8.3 Düzen

- Maksimum genişlik: `1180px`; yatay boşluk `px-6 md:px-8`.
- Masaüstünde bölümler iki kolon: solda `11rem` sticky numara/etiket, sağda
  içerik. `position: sticky; top: 7rem`.
- Mobilde etiket başlığın üstünde; sticky yok.
- Bölüm dikey boşluğu: `py-24 md:py-36`; geniş nefes.
- Hairline kurallar bölümleri ayırır; kartlar yerine çizgi ve boşluk.
- Hero **tam genişlik bir bölüm** (arka plan viewport'a yayılır) içinde 1180px
  içerik gridi, iki kolon 7/5. Sol metin, sağ profil kartı. Navigasyon ve hero
  aynı 1180px hatta hizalanır.

### 8.4 Motion

- `Reveal`: 16px yukarı, 0.6s, `once`, reduced motion'da kapalı.
- Proje hover önizlemesi: masaüstünde imleci yumuşak takip eden küçük görsel;
  `hover: hover and pointer: fine` ve reduced motion değilse. Dekoratif;
  linkler her zaman görünür.
- Tema geçişi 0.3s.
- Scroll-jacking yok; Lenis yok; GSAP yok; otomatik video yok.
- `prefers-reduced-motion` altında tüm hareketler kapalı, içerik görünür.

### 8.5 Bileşenler

- `SectionShell`: numara + etiket + başlık + içerik; sticky sol kolon.
- `Hero`: availability, isim, rol, tek cümlelik konumlandırma, 2 CTA, profil
  kartı (konum/saat dilimi, odak, stack).
- `WorkRow`: index, isim, problem, sonuç, stack, linkler, hover preview ve
  `<details>` "Vaka notu" (3 madde; URL durumu yok).
- `CompactWorkRow`: küçük projeler için tek satır.
- `CapabilityGroup`: başlık + tek cümle + araçlar.
- `TimelineRow`: dönem, rol/şirket, konum, 1–2 madde, sonuç.
- `ContactCTA`: büyük e-posta, kopyala, sosyal linkler, availability.
- `AvailabilityPill`, `SectionLabel`, `ThemeToggle`, `LanguageSwitch`.
- `SiteBackdrop`: mevcut bileşen, sıcak token'larla güncellenir.
- `Logo`: accent + foreground'a göre yeniden renklendirilir.

## 9. Sayfa Akışı

### 9.1 Navigasyon

- Logo + isim; bağlantılar: Hakkımda, Deneyim, Projeler, Yetenekler, İletişim.
- Dil ve tema anahtarı korunur.
- Mobil menü ve odak tuzağı korunur; `aria-label` sözlükten gelir.
- Görünürlük: üstte şeffaf, kaydırınca hairline + hafif backdrop.

### 9.2 Hero

- Sol:
  - `AvailabilityPill`: "Tam zamanlı roller ve freelance projelere açık".
  - İsim, Instrument Serif, solid `--fg`, gradient yok.
  - Rol: "Yazılım Mühendisi" (mono/accent etiket).
  - Tek cümle: "Kurumsal Java/Spring Boot backend'leri ve Next.js/React Native
    ürünleri geliştiriyorum."
  - CTA: "Seçili işler" (accent dolgu) + "İletişime geç" (outline).
- Sağ: profil kartı:
  - Ankara, Türkiye · UTC+3
  - Odak: Kurumsal backend · Ürün geliştirme · PostgreSQL
  - Stack: Java, Spring Boot, Next.js, React Native, PostgreSQL
  - Küçük bir "şu an" satırı: "Kurumsal eğitim otomasyonu + full-stack ürünler".
- Video, 3D render, scroll-scrub ve ikinci beat yok.

### 9.3 Hakkımda

- Sol etiket: `01 — Hakkımda`.
- Sağ: başlık, 2 paragraf, 4 istatistik (kart değil; hairline ayraçlı figürler),
  büyük bir pull quote: "Doğruluğun ve entegrasyonun kritik olduğu kurumsal
  backend işleri." (mevcut metinden).
- 3D masa görseli kaldırılır. Portre yoksa metin ve tipografi taşır.

### 9.4 Deneyim

- Sol etiket: `02 — Deneyim`.
- Sağ: 2 satır; dönem (mono), rol, şirket, konum, 1–2 madde ve `outcome`
  ("Ne değişti") cümlesi. Mevcut içerikten türetilir; metrik uydurulmaz.
- Glow'lu dikey çizgi/nokta yerine hairline ve sade ayraç.

### 9.5 Projeler

- Sol etiket: `03 — Projeler`.
- Sağ:
  - 3 öne çıkan vaka satırı: Autosuchen24, TakasGo Global, Mutfix.
    Her satırda: index, isim (serif), problem (1 cümle), sonuç (1 cümle),
    stack etiketleri, canlı link (varsa), hover preview ve `<details>`
    "Vaka notu" (3 madde; örn. Autosuchen24: çok dilli pazaryeri, gerçek
    zamanlı sohbet, admin onayı + push).
  - 2 kısa satır: Nerdeyemek, Online Sınav Sistemi (makale linki).
  - Problem/sonuç/vaka maddeleri mevcut açıklamalardan türetilir; sayı/metrik
    uydurulmaz. Gerçek ekran görüntüleri gelene kadar mevcut görseller
    dekoratif önizleme olarak kullanılır; **ziyaretçiye "placeholder" etiketi
    gösterilmez**, yerine README/uygulama notunda değiştirileceği belirtilir.
- Linki olmayan projede buton yok; linkler `target="_blank"
  rel="noopener noreferrer"`.

### 9.6 Yetenekler

- Sol etiket: `04 — Yetenekler`.
- Sağ: 3 grup, her biri tek cümle bağlam + araç listesi:
  - Kurumsal backend: REST, auth/RBAC, PostgreSQL, doğruluk/entegrasyon.
  - Ürün geliştirme: Next.js, React, React Native, Node.js, realtime/cache.
  - Temeller: TypeScript, Python, C#, Docker, CI, ML araştırması.
- Logo duvarı/chip bulutu yok; bağlam önce, araçlar sonra.

### 9.7 Eğitim

- Sol etiket: `05 — Eğitim`.
- Sağ: derece, okul, dönem, GNO; diller (metin seviyesi; nokta göstergesi yok);
  yayın satırı (BILMES 2024) makale linkiyle.

### 9.8 İletişim

- Sol etiket: `06 — İletişim`.
- Sağ: büyük serif başlık, büyük e-posta linki, kopyala, GitHub/LinkedIn,
  availability. Cam küre/video yok.
- Tek cümle: "Tam zamanlı pozisyonlara ve freelance projelere açığım."

### 9.9 Footer

- İsim, yıl, "Next.js, Motion & Tailwind ile geliştirildi", başa dön.
- GSAP/Lenis/Three.js ifadesi yok.

## 10. İçerik ve Veri Modeli Değişiklikleri

- `Project` tipi: `problem: string`, `outcome: string`, `details: string[]`
  eklenir. `description` korunur (kısa satırlar için) veya kaldırılır;
  `url`/`linkLabel` korunur. `year`/`role` eklenmez (elimizde doğrulanmış
  veri yok).
- `Experience` tipi: `outcome: string` eklenir (mevcut bullet'lardan türetilen
  tek cümle).
- `SkillGroup` tipi: `summary: string` eklenir.
- `Education.languages`: `score` kaldırılır; `level` metni kalır.
- `hero`: `availability: string`, `focus: string` eklenir; `scrollHint` kaldırılır
  (scroll-scrub yok).
- `nav`: mobil menü `aria-label` için `menu: string` eklenir.
- Footer `builtWith` güncellenir: "Next.js, Motion & Tailwind".
- Tüm metinler TR/EN olarak yazılır; mevcut içerikten türetilir, yeni iddia
  eklenmez.

## 11. Kaldırılacaklar

- `src/components/hero/ScrollVideoHero.tsx`
- `src/components/ui/ContactVideoOrb.tsx`
- `src/components/providers/SmoothScroll.tsx` (Lenis)
- `public/video/hero.mp4`, `hero-mobile.mp4`, `hero-poster.jpg`,
  `orb-loop.mp4`, `orb-poster.jpg`
- `public/images/workstation-desk.jpg` (3D render; proje değil)
- `gsap`, `@gsap/react`, `lenis` bağımlılıkları
- Space Grotesk fontu
- Cyan/orange token'ları (accent/accent-ink'e taşınır)

Proje görselleri (`autosuchen24`, `takasgo`, `mutfix`, `nerdeyemek`, `quiz`)
kalır; gerçek ekran görüntüleri gelene kadar dekoratif önizleme olarak kullanılır.

Yeni kimlikle birlikte:
- `public/images/og.jpg` yeniden üretilir (1200×630; sıcak kanvas, isim, rol,
  tek accent; eski neon/3D OG görseli kullanılmaz).
- `src/app/icon.svg` ve `src/components/ui/Logo.tsx` accent + foreground
  renklerine geçirilir (cyan/orange kalmaz).
- Eski `public/images/workstation-desk.jpg` kaldırılır.

## 12. Erişilebilirlik ve Performans

- AA kontrast; linkler underline/offset ile ayırt edilir; focus halkası görünür.
- Hover önizlemesi dekoratif; klavye ve dokunmatikte linkler her zaman görünür.
- `prefers-reduced-motion` tüm hareketi kapatır; içerik görünür.
- JS kapalıyken tüm SSR içerik görünür (mevcut Reveal/CountUp düzeltmesi korunur).
- Görseller `next/image` ile; alt metin anlamlı; dekoratif olanlar boş alt.
- Video ve GSAP/Lenis kaldırıldığı için ilk yük hafifler.
- Fontlar `next/font/google` ile subset; üç aile.
- Statik export ve basePath davranışı korunur.

## 13. Doğrulama

- `npm run build`, `npx tsc --noEmit`, `npm run lint`, `npm run verify`.
- `verify-build.mjs` güncellenir: yeni bölüm yapısı, proje problem/sonuç alanları,
  accent token'ları, AA kontrastı, SSR görünürlüğü, iki locale, canonical/OG.
- Playwright **yalnızca yerel QA** için kullanılır; projeye bağımlılık olarak
  eklenmez ve CI'a konmaz (ağır tarayıcı kurulumu istemiyoruz). Kontroller:
  375 / 768 / 1440; TR/EN; açık/koyu; reduced motion; JS kapalı; mobil menü odak
  tuzağı; hover preview (masaüstü) ve dokunmatikte yokluğu; yatay taşma yok;
  linkler 200; OG görselinin yeni kimlikte olduğu.
- BasePath build: `/portfolio` altında canonical/asset yolları bir kez.
- Görsel kontrol: hero, projeler, iletişim; tipografi taşması ve satır kırılmaları.

## 14. Riskler ve Dikkat Noktaları

1. **"Wow" kaybı.** Video/3D gidince kimlik tipografiye kalır; Instrument Serif
   ve sıcak palet doğru uygulanmazsa sıradan görünebilir.
2. **İçerik uydurma riski.** Problem/sonuç metinleri mevcut açıklamalardan
   türetilmeli; sayı, müşteri adı veya referans eklenmemeli.
3. **Geçici görseller.** AI render'lar gerçek ekran görüntüsü değil; ziyaretçiye
   "placeholder" etiketi gösterilmez. README/uygulama notunda gerçek ekran
   görüntüleriyle değiştirileceği belirtilir; görseller desatüre kullanılabilir.
4. **Serif font yüklemesi.** Instrument Serif'in Türkçe karakterleri ve
   fallback'i test edilmeli; FOUT/CLS izlenmeli.
5. **Uzun TR/EN metin.** Editöryel satırlarda ve mobilde taşma/kırılma
   kontrol edilmeli.
6. **Hover preview erişilebilirliği.** Linkler her zaman görünür olmalı;
   preview klavye odağını engellememeli.
7. **Kapsam.** Birçok dosya değişir; ayrı proje detay sayfalarına kaymamalı.

## 15. Uygulayıcıya Kalanlar

- Tam tip ölçeği ve tracking değerleri.
- Bölüm aralıkları ve sticky etiketin tam `top` değeri.
- Hover preview'in easing'i ve görsel boyutu.
- Geçici proje görsellerinin desaturasyon/çerçeve tonu.
- Problem/sonuç cümlelerinin son metni (mevcut içerikten).
- Instrument Serif'in Türkçe glyph ve fallback kontrolü.
- Accent tonunun son görsel ayarı (AA korunarak).

## 16. Builder Check Sonrası Kararlar

1. **Vaka notları:** 3 öne çıkan projede `<details>` ile 3 maddelik kısa vaka
   notu; ayrı sayfa ve URL durumu yok.
2. **Playwright:** yalnızca yerel QA; proje bağımlılığı veya CI adımı değil.
   Otomatik harness `scripts/verify-build.mjs`.
3. **Experience "Ne değişti":** `Experience.outcome` alanı eklenir; mevcut
   bullet'lardan türetilen tek cümle.
4. **Geçici görseller:** ziyaretçiye "placeholder" etiketi gösterilmez;
   dekoratif hover preview olarak kalır, README/uygulama notunda değiştirileceği
   belirtilir.
5. **Hero genişliği:** tam genişlik bölüm, 1180px içerik gridi; nav aynı hizada.
6. **OG/favicon:** yeni sıcak kimlikle OG görseli yeniden üretilir; favicon ve
   logo accent + foreground renklerine geçer.
