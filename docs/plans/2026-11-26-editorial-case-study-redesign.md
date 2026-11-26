# Yeniden Tasarım Planı: Tek Kolon + Vaka Çalışmaları

- Tarih: 2026-11-26
- Entegrasyon branch'i: `redesign/editorial` (main'den). Her worker görevi kendi child worktree'sinde, bu branch'ten açılır; Opus inceleyip bu branch'e merge eder.
- Uygulayıcı: OpenCode `opencode-go/deepseek-v4.1-flash` (Orca worker). Planlama/inceleme: Opus.
- Kaynaklar: araştırma raporu (Yön A), mevcut site denetimi.

## Kararlar (kullanıcı onaylı)
1. Düzen: **A** — paco.me / delba.dev sadeliğinde tek kolon ana sayfa + her proje için `/[lang]/work/[id]/` statik vaka sayfası.
2. Proje görselleri: AI üretimi geçici görseller kaldırılır; **canlı sitelerden gerçek ekran görüntüsü** alınır (autosuchen24.ch, takasgoglobal.com.tr, nerdeyemek.com). Canlı sitesi olmayan projeler (Mutfix, Online Quiz) görselsiz, tipografik kart kullanır.
3. Staj şirketi **anonim** kalır ("Kurumsal Teknoloji Şirketi").
4. Palet korunur (koyu varsayılan + açık tema, mavi accent, mevcut token hex'leri). Süs efektleri kalkar: `SiteBackdrop` (grid/noise/glow), `CursorSpotlight`, `Magnetic`, `ScrollProgress`, `CountUp`, imleç takipli hover önizleme. Font: Inter (gövde/başlık) + JetBrains Mono (etiket); Space Grotesk kalkar.

## Hedef bilgi mimarisi

### Ana sayfa `/[lang]/` (tek kolon, ~680px içerik genişliği)
1. Header: logo + ad (sol), TR/EN + tema (sağ). Masaüstünde anchor nav yok; tek sayfa kısa olduğu için gerekmez. Mobil menü kalkar.
2. Intro: ad, rol · Ankara · UTC+3, tagline (1–2 cümle), müsaitlik satırı, e-posta / GitHub / LinkedIn linkleri.
3. Seçili işler: `featured` projeler (3). Her satır: görsel (varsa, 16:10 küçük thumbnail, her ekranda görünür) + ad + yıl + tek cümle özet + stack (mono) → `/[lang]/work/[id]/` linki. Tüm satır tıklanabilir, en az 44px dokunma hedefi.
4. Diğer işler: kalan projeler, kompakt liste (ad, tek satır, stack, dış link / vaka linki).
5. Deneyim: tarih | rol · şirket | 1 cümle sonuç. `bullets`+`outcome` tekrarı tek listeye iner.
6. Hakkımda + Yetenekler (birleşik kısa blok): 1 paragraf + 3 grup stack listesi (mono).
7. Eğitim & Yayın: tek blok.
8. İletişim + footer.
Dikey bölüm boşluğu: `py-12 md:py-16` civarı. Hedef sayfa yüksekliği ≤ ~3500px (1440 genişlikte).

### Vaka sayfası `/[lang]/work/[id]/`
- Geri linki, başlık, meta satırı (yıl, rol, stack, canlı link), büyük ekran görüntüsü (varsa), bölümler: Bağlam · Problem · Yaklaşım (details maddeleri) · Sonuç. Altta önceki/sonraki proje.
- **İçerik kuralı:** Yalnızca mevcut `tr.ts`/`en.ts` metinleri yeniden düzenlenir; yeni olgusal iddia, metrik veya teknoloji uydurulmaz. Eksik alan varsa bölüm gösterilmez.
- `generateStaticParams` her dil × her proje; `generateMetadata` ile proje başlığı, açıklama, canonical, hreflang.

## Fazlar ve worker görevleri

| Faz | Görev | Worktree | Bağımlılık | Dokunduğu dosyalar |
|---|---|---|---|---|
| 1 | T1: verify-build sadeleştirme | `rd-verify` | — | `scripts/verify-build.mjs` |
| 1 | T2: canlı ekran görüntüleri | `rd-shots` | — | `public/images/` (yeni `.webp`) |
| 2 | T3: içerik modeli refaktörü | `rd-content` | T1 merge | `src/content/*` + content kullanan bileşenler (minimum) |
| 3 | T4: ana sayfa + vaka sayfaları + sade UI | `rd-ui` | T2, T3 | `src/app/(site)/[lang]/page.tsx`, `work/[id]/page.tsx`, `src/components/**`, `globals.css` |
| 3 | T5: SEO + font + 404 | `rd-seo` | T3 | `[lang]/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`, `(root)/*` |
| 4 | T6: verify'a yeni çıktı kontrolleri + temizlik | `rd-verify2` | T4, T5 | `scripts/verify-build.mjs`, `README.md`, ölü dosyalar |
| 5 | Opus QA: build, verify, lint, tsc, 1440/390 ekran görüntüsü, a11y | — | hepsi | — |

Her görevin "bitti" ölçütü: `npm run build && npm run verify && npm run lint && npx tsc --noEmit` hepsi çıkış 0, tek commit (conventional commit mesajı), sadece listelenen dosyalar değişmiş.

## Kabul kriterleri (bütün iş için)
- TR/EN tüm içerik korunur (denetim raporu §2 envanteri), `greeting` gibi ölü alanlar hariç.
- Mobil (390px) ilk ekranda: ad, rol, tagline ve en az ilk projenin başlığı görünür.
- Proje görselleri tüm cihazlarda görünür; hover'a bağlı içerik yok.
- Tüm interaktif öğeler ≥44px dokunma hedefi; klavye ile gezilebilir; reduced-motion desteği sürer.
- `/tr/`, `/en/`, `/tr/work/<id>/`, `/en/work/<id>/` (5×2), `robots.txt`, `sitemap.xml`, stilli 404 build çıktısında var; basePath'li build'de (`NEXT_PUBLIC_BASE_PATH=/x`) linkler doğru.
- JSON-LD `Person`, `x-default` hreflang, `og:url`.
- `/tr/` için JS gzip toplamı mevcut ~247 KB'tan belirgin düşük (hedef < 170 KB); font dosyası sayısı ≤ 8.
- Palet token hex'leri aynı; AA kontrast kontrolü verify'da sürer.
