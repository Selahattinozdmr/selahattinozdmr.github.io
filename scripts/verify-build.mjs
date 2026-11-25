import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const out = "out";
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const required = [
  "index.html",
  "404.html",
  "tr/index.html",
  "en/index.html",
  ".nojekyll",
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
const sectionById = (html, id) => {
  const start = html.search(new RegExp(`<section[^>]*id="${id}"`));
  if (start === -1) return null;
  const end = html.indexOf("</section>", start);
  return end === -1 ? null : html.slice(start, end);
};
const h3Count = (html, id) => {
  const section = sectionById(html, id);
  return section ? [...section.matchAll(/<h3\b/g)].length : -1;
};

checks.push(
  [h3Count(tr, "skills") === 3, `TR yetenek grupları tam 3 h3 (${h3Count(tr, "skills")})`],
  [h3Count(en, "skills") === 3, `EN yetenek grupları tam 3 h3 (${h3Count(en, "skills")})`],
  [tr.includes("Next.js, Motion &amp; Tailwind ile geliştirildi"), "TR footer metni birebir"],
  [en.includes("Built with Next.js, Motion &amp; Tailwind"), "EN footer metni birebir"],
  [pathOf(hrefOf(findLink(tr, "canonical"))) === `${base}/tr/`, "TR canonical basePath bir kez"],
  [pathOf(hrefOf(findLink(en, "canonical"))) === `${base}/en/`, "EN canonical basePath bir kez"],
  [pathOf(hrefOf(findLink(tr, "alternate", "tr"))) === `${base}/tr/`, "TR hreflang basePath bir kez"],
  [pathOf(hrefOf(findLink(en, "alternate", "en"))) === `${base}/en/`, "EN hreflang basePath bir kez"],
  [pathOf(metaContent(tr, "og:image")) === `${base}/images/og.jpg`, "OG görseli basePath bir kez"],
  [!tr.includes('style="opacity:0') && !en.includes('style="opacity:0'), "SSR'da gizli reveal yok"],
  [plainTr.includes(">5+<") && plainTr.includes(">3.42<"), "CountUp SSR son değeri basıyor"],
);

const source = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = join(dir, entry.name);
    return entry.isDirectory() ? walk(p) : [p];
  });
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
  [source("src/components/work/WorkRow.tsx").includes("asset(project.image)"), "proje görselleri basePath'e duyarlı"],
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
  [source("src/components/sections/Skills.tsx").includes("SectionShell"), "Skills SectionShell"],
  [source("src/content/types.ts").includes("summary: string"), "SkillGroup summary"],
  [
    source("src/content/tr.ts").includes("Kurumsal backend") &&
      source("src/content/en.ts").includes("Enterprise backend"),
    "3 yetenek grubu",
  ],
  [!source("src/components/sections/Skills.tsx").includes("lg:grid-cols-3"), "eski chip matrisi kalktı"],
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
const layoutSource = source("src/app/(site)/[lang]/layout.tsx");
const displayFont = layoutSource.match(/Space_Grotesk\(\{([\s\S]*?)\}\)/)?.[1] ?? "";
const appSources = walk("src")
  .filter((p) => /\.(tsx?|css|svg)$/.test(p))
  .map(source)
  .join("\n");
const builtCss = existsSync("out/_next")
  ? walk("out/_next")
      .filter((p) => p.endsWith(".css"))
      .map(source)
      .join("\n")
  : "";
const warmHex = ["#0d0b09", "#d97745", "#e08a5b", "#f4efe6", "#b8501f", "#9a3d17"];

checks.push(
  [globals.includes("--bg: #07080a;"), "koyu kanvas"],
  [globals.includes("--bg: #f4f6f8;"), "açık kanvas"],
  [globals.includes("--fg: #eef2f7;"), "koyu fg"],
  [globals.includes("--fg: #0b1020;"), "açık fg"],
  [globals.includes("--accent: #7aa2ff;"), "koyu accent"],
  [globals.includes("--accent: #2b63f0;"), "açık accent"],
  [globals.includes("--accent-rgb: 122 162 255;"), "koyu accent-rgb"],
  [globals.includes("--accent-rgb: 43 99 240;"), "açık accent-rgb"],
  [globals.includes("--accent-ink: #a8c1ff;"), "koyu accent metin"],
  [globals.includes("--accent-ink: #1d4ed8;"), "açık accent metin"],
  [globals.includes("--on-accent: #07080a;"), "koyu on-accent"],
  [globals.includes("--on-accent: #ffffff;"), "açık on-accent"],
  [globals.includes("--surface: rgba(255, 255, 255, 0.04);"), "koyu cam yüzey"],
  [globals.includes("--surface: rgba(255, 255, 255, 0.72);"), "açık cam yüzey"],
  [globals.includes("--font-display: var(--font-grotesk)"), "Space Grotesk display"],
  [globals.includes("--font-sans: var(--font-inter)"), "Inter gövde"],
  [globals.includes("--font-mono: var(--font-jetbrains)"), "JetBrains Mono"],
  [layoutSource.includes("Space_Grotesk"), "Space Grotesk yüklü"],
  [displayFont.includes('"500", "700"'), "Space Grotesk 500/700"],
  [displayFont.includes('"latin-ext"'), "Space Grotesk latin-ext"],
  [!layoutSource.includes("Instrument_Serif"), "Instrument Serif kalktı"],
  [!appSources.includes("Instrument_Serif"), "Instrument Serif kaynağı yok"],
  [!/--font-serif\b/.test(appSources), "serif display token'ı yok"],
  [!/--card\b/.test(appSources), "eski --card token'ı yok"],
  [!/\.glass\b/.test(appSources), ".glass sınıfı yok"],
  [warmHex.every((hex) => !appSources.toLowerCase().includes(hex)), "sıcak palet izleri yok"],
  [builtCss.length > 0, "üretilmiş CSS bulundu"],
  [warmHex.every((hex) => !builtCss.toLowerCase().includes(hex)), "çıktı CSS'inde sıcak palet yok"],
  [!builtCss.includes("Instrument_Serif"), "çıktı CSS'inde Instrument Serif yok"],
  [!/\.glass\b/.test(builtCss), "çıktı CSS'inde .glass yok"],
  [!/var\(--(card|font-serif)/.test(globals), "eski card/serif token'ı kalktı"],
  [!(/--cyan|--orange|--violet/.test(globals)), "eski renk token'ları kalktı"],
  [
    !/(text|bg|border|outline|decoration|from|via|to)-(cyan|orange)/.test(
      [...sectionFiles, "src/app/(root)/page.tsx", "src/components/hero/Hero.tsx",
       "src/components/ui/CopyEmailButton.tsx", "src/components/ui/ThemeToggle.tsx", "src/components/ui/Logo.tsx"]
        .map(source).join("\n"),
    ),
    "cyan/orange sınıfları kalktı",
  ],
  [
    !/var\(--(cyan|orange)/.test(
      [...sectionFiles, "src/app/globals.css", "src/components/hero/Hero.tsx",
       "src/components/ui/Logo.tsx"].map(source).join("\n"),
    ),
    "eski renk değişkenleri kalktı",
  ],
  [source("src/components/ui/Logo.tsx").includes("var(--accent)"), "logo accent"],
  [source("src/app/icon.svg").includes("#7aa2ff") && !source("src/app/icon.svg").includes("#d97745"), "favicon yeni palet"],
  [source("src/content/tr.ts").includes('menu: "Menü"'), "TR menü etiketi"],
  [source("src/content/en.ts").includes('menu: "Menu"'), "EN menü etiketi"],
);

checks.push(
  [!existsSync("src/components/ui/TiltCard.tsx"), "TiltCard silindi"],
  [sectionFiles.every((f) => !source(f).includes("TiltCard")), "bölümler TiltCard kullanmıyor"],
  [sectionFiles.every((f) => !source(f).includes("py-28 md:py-40")), "bölüm boşlukları sıkılaştı"],
  [
    source("src/content/tr.ts").includes('builtWith: "Next.js, Motion & Tailwind ile geliştirildi"') &&
      source("src/content/en.ts").includes('builtWith: "Built with Next.js, Motion & Tailwind"'),
    "footer metni birebir",
  ],
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
);

checks.push(
  [source("src/components/ui/SectionShell.tsx").includes("export default function SectionShell"), "SectionShell"],
  [source("src/components/sections/About.tsx").includes("SectionShell"), "About SectionShell kullanıyor"],
  [!source("src/components/sections/About.tsx").includes("next/image"), "About görseli kalktı"],
  [source("src/content/tr.ts").includes("pullQuote") && source("src/content/en.ts").includes("pullQuote"), "pull quote içeriği"],
);

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

checks.push(
  [!source("src/components/sections/Experience.tsx").includes("gsap"), "Experience GSAP'siz"],
  [source("src/components/sections/Experience.tsx").includes("SectionShell"), "Experience SectionShell"],
  [
    source("src/content/types.ts").includes("outcome: string") &&
      source("src/content/tr.ts").includes(
        "Kurumsal eğitim iş akışları otomatikleşti; iç sistemlerle entegre REST API'ler.",
      ) &&
      source("src/content/tr.ts").includes(
        "Tahmin modelleri geliştirildi; GAN ve Deep Q-Learning üzerine araştırma.",
      ) &&
      source("src/content/en.ts").includes(
        "Corporate training workflows were automated through REST APIs integrated with internal systems.",
      ) &&
      source("src/content/en.ts").includes(
        "Built predictive models and researched GANs and Deep Q-Learning.",
      ),
    "Experience outcome içeriği",
  ],
);

checks.push(
  [
    source("src/content/types.ts").includes("problem: string") &&
      source("src/content/types.ts").includes("details?: string[]"),
    "proje vaka alanları",
  ],
  [source("src/components/work/WorkRow.tsx").includes("<details"), "vaka notu details"],
  [source("src/components/sections/Projects.tsx").includes("WorkRow"), "Projects WorkRow kullanıyor"],
  [source("src/components/sections/Projects.tsx").includes("SectionShell"), "Projects SectionShell"],
  [source("src/components/work/CompactWorkRow.tsx").includes("aria-label"), "compact link context"],
  [globals.includes("details[open]") || globals.includes("details summary"), "details motion"],
);

const trContent = source("src/content/tr.ts");
const enContent = source("src/content/en.ts");
const exact = (blob, strings) => strings.every((s) => blob.includes(s));

checks.push(
  [
    exact(trContent, [
      "İsviçreli müşteri için çok dilli, gerçek zamanlı iletişimli bir araç pazaryeri gerekiyordu.",
      "Eşzamanlı takas tekliflerini ve ilişkili verileri tutarlı yönetmek gerekiyordu.",
      "Şef/üye rollerini ayıran ve ödülleri dinamik hesaplayan bir tarif platformu gerekiyordu.",
      "Ev şeflerinin yemeklerini yüksek performansla listeleyen bir platform gerekiyordu.",
      "Okullar için parametrik sınav üretimi ve yönetimi gerekiyordu.",
    ]),
    "TR proje problem metinleri birebir",
  ],
  [
    exact(trContent, [
      "Node.js + PostgreSQL üzerinde canlı pazaryeri; sohbet, admin onayı ve push bildirimleri.",
      "Normalize PostgreSQL şeması ve Node.js REST API'si; gerçek zamanlı mesajlaşma; canlı ürün.",
      "RBAC, dinamik ödül algoritması ve admin analitik paneliyle uçtan uca platform.",
      "Sunucu taraflı önbellekli Node.js servis katmanı; Next.js ve React Native istemcileri.",
      "Next.js + Node.js ile K-12 sınav sistemi; BILMES 2024'te hakemli yayın.",
    ]),
    "TR proje outcome metinleri birebir",
  ],
  [
    exact(trContent, [
      "Çok dilli araç listeleme ve arama",
      "Gerçek zamanlı sohbet",
      "Admin onay akışı ve push bildirimleri",
      "Normalize PostgreSQL şeması",
      "Eşzamanlı teklif işlemleri",
      "Gerçek zamanlı mesajlaşma",
      "Şef/Üye rol tabanlı erişim",
      "Dinamik ödül algoritması",
      "Admin analitik paneli",
    ]),
    "TR proje details metinleri birebir",
  ],
  [
    exact(enContent, [
      "A Swiss client needed a multilingual vehicle marketplace with realtime communication.",
      "Concurrent barter offers and related data needed to stay consistent.",
      "A recipe platform needed to separate chef/member roles and calculate rewards dynamically.",
      "A platform needed to list home-chef meals with high performance.",
      "Schools needed parametric exam generation and management.",
    ]),
    "EN proje problem metinleri birebir",
  ],
  [
    exact(enContent, [
      "A live marketplace on Node.js + PostgreSQL with chat, admin approval and push notifications.",
      "A normalized PostgreSQL schema and Node.js REST API handling concurrent offers, with realtime messaging; live.",
      "An end-to-end platform with RBAC, a dynamic reward algorithm and an admin analytics panel.",
      "A server-side cached Node.js service layer with Next.js and React Native clients.",
      "A K-12 exam system built with Next.js + Node.js; peer-reviewed at BILMES 2024.",
    ]),
    "EN proje outcome metinleri birebir",
  ],
  [
    exact(enContent, [
      "Multilingual vehicle listing and search",
      "Realtime chat",
      "Admin approval workflow and push notifications",
      "Normalized PostgreSQL schema",
      "Concurrent offer transactions",
      "Realtime messaging",
      "Chef/Member role-based access",
      "Dynamic reward algorithm",
      "Admin analytics panel",
    ]),
    "EN proje details metinleri birebir",
  ],
  [
    exact(trContent, [
      "Yazılım Mühendisi Stajyeri",
      "Kurumsal Teknoloji Şirketi",
      "Akademi birimi için Java Spring Boot ile REST API'ler geliştirdim; kurumsal eğitim iş akışlarını otomatikleştirip iç sistemlerle entegre ettim.",
      "Makine Öğrenmesi Stajyeri",
      "XLOG FIREWALL (Arjeta)",
      "Kaggle veri setleri üzerinde regresyon ve karar ağaçları ile tahmin modelleri geliştirdim.",
      "Çekişmeli Üretici Ağlar (GAN) ve derin pekiştirmeli öğrenme (Deep Q-Learning) üzerine araştırma yaptım.",
    ]),
    "TR Experience metinleri birebir",
  ],
  [
    exact(enContent, [
      "Software Engineer Intern",
      "Enterprise Technology Company",
      "Developed REST APIs with Java Spring Boot for the Academy department, automating corporate training workflows and integrating with internal systems.",
      "Machine Learning Intern",
      "XLOG FIREWALL (Arjeta)",
      "Built predictive models on Kaggle datasets using regression and decision trees.",
      "Researched Generative Adversarial Networks (GANs) and deep reinforcement learning (Deep Q-Learning).",
    ]),
    "EN Experience metinleri birebir",
  ],
  [
    exact(trContent, ["Kurumsal backend", "Ürün geliştirme", "Temeller"]),
    "TR üç yetenek grubu birebir",
  ],
  [
    exact(enContent, ["Enterprise backend", "Product engineering", "Foundations"]),
    "EN üç yetenek grubu birebir",
  ],
  [
    exact(trContent, ['id: "autosuchen24"', 'id: "takasgo"', 'id: "mutfix"', 'id: "nerdeyemek"', 'id: "quiz"']),
    "TR beş proje kaydı",
  ],
  [
    exact(enContent, ['id: "autosuchen24"', 'id: "takasgo"', 'id: "mutfix"', 'id: "nerdeyemek"', 'id: "quiz"']),
    "EN beş proje kaydı",
  ],
  [
    source("src/content/types.ts").includes('export const locales = ["tr", "en"] as const;'),
    "iki locale tanımı",
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
  [nav.includes('e.key === "Escape"'), "mobil menü Escape ile kapanıyor"],
  [nav.includes('aria-modal="true"'), "mobil menü dialog"],
  [nav.includes("IntersectionObserver"), "navbar active observer"],
  [nav.includes("inert={hidden"), "hidden nav inert"],
  [nav.includes('aria-current={active === k ? "true" : undefined}'), "navbar aria-current"],
  [nav.includes("active"), "navbar active state"],
  [nav.includes("md:hidden"), "mobile menu korunuyor"],
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

checks.push(
  [
    !existsSync("src/components/hero/ScrollVideoHero.tsx") &&
      !existsSync("src/components/ui/ContactVideoOrb.tsx") &&
      !existsSync("src/components/ui/SectionHeading.tsx") &&
      !existsSync("src/components/providers/SmoothScroll.tsx") &&
      !existsSync("public/video"),
    "legacy bileşenler silindi",
  ],
  [
    !existsSync("public/video/hero.mp4") &&
      !existsSync("public/video/hero-mobile.mp4") &&
      !existsSync("public/video/orb-loop.mp4") &&
      !existsSync("public/images/workstation-desk.jpg"),
    "legacy medya silindi",
  ],
  [
    !("gsap" in deps) && !("@gsap/react" in deps) && !("lenis" in deps),
    "GSAP/Lenis bağımlılıkları kalktı",
  ],
  [readme.includes("temporary preview"), "README görsel notu"],
  [
    globals.includes("scroll-behavior: smooth") &&
      globals.includes("scroll-behavior: auto"),
    "smooth scroll + reduced-motion override",
  ],
);

const motion = (name) => source(`src/components/motion/${name}.tsx`);
const workRow = source("src/components/work/WorkRow.tsx");
const hero = source("src/components/hero/Hero.tsx");

checks.push(
  [motion("ScrollProgress").includes("useScroll"), "ScrollProgress"],
  [motion("ScrollProgress").includes("reduce ? scrollYProgress : smooth"), "progress reduced flat"],
  [motion("SectionRule").includes("useInView"), "SectionRule"],
  [motion("SectionRule").includes("scaleX"), "SectionRule çizgi"],
  [motion("SectionLabel").includes("IntersectionObserver"), "SectionLabel"],
  [motion("SectionLabel").includes("md:sticky"), "SectionLabel sticky"],
  [source("src/app/(site)/[lang]/page.tsx").includes("<ScrollProgress />"), "sayfa progress kullanıyor"],
  [source("src/components/ui/SectionShell.tsx").includes('split(" — ")'), "section index parse"],
  [
    source("src/components/ui/SectionShell.tsx").includes("SectionRule") &&
      source("src/components/ui/SectionShell.tsx").includes("SectionLabel"),
    "SectionShell rule/label kullanıyor",
  ],
  [!source("src/app/(site)/[lang]/page.tsx").includes("CursorSpotlight"), "spotlight site geneline yayılmıyor"],
  [globals.includes("gridDrift") || globals.includes("grid-drift"), "grid drift keyframes"],
  [globals.includes("background-size: 64px 64px"), "64px hairline grid"],
  [globals.includes("rgb(var(--accent-rgb) / 0.16)"), "accent radial glow"],
  [globals.includes("@media (prefers-reduced-motion: reduce)"), "reduced motion bloğu"],
);

const reducedCss = globals.slice(globals.indexOf("@media (prefers-reduced-motion: reduce)"));

checks.push(
  [hero.includes("CursorSpotlight"), "hero spotlight"],
  [hero.includes("Magnetic"), "hero magnetic"],
  [hero.includes("data-hero"), "hero CSS giriş"],
  [hero.includes('data-delay="4"'), "hero stagger gecikmeleri"],
  [hero.includes("md:grid-cols-[7fr_5fr]"), "hero 7/5 düzen"],
  [hero.includes("availability-dot"), "availability pulse"],
  [globals.includes("hero-in") || globals.includes("heroIn"), "hero keyframes"],
  [globals.includes("[data-hero] {"), "hero no-JS CSS seçicisi"],
  [
    /\[data-hero\]\s*\{\s*animation:\s*none\s*!important/.test(reducedCss),
    "hero reduced motion off",
  ],
  [motion("CursorSpotlight").includes("--spot-x"), "CursorSpotlight CSS var"],
  [motion("CursorSpotlight").includes("(hover: hover) and (pointer: fine)"), "spotlight fine pointer"],
  [motion("CursorSpotlight").includes("(prefers-reduced-motion: no-preference)"), "spotlight reduced off"],
  [motion("Magnetic").includes("translate3d"), "Magnetic yalnızca transform"],
  [motion("Magnetic").includes("(hover: hover) and (pointer: fine)"), "magnetic fine pointer"],
  [motion("Magnetic").includes("(prefers-reduced-motion: no-preference)"), "magnetic reduced off"],
);

checks.push(
  [workRow.includes("useSpring"), "preview spring"],
  [workRow.includes("springX.jump"), "preview ilk hover'da snap"],
  [workRow.includes("onPointerEnter"), "preview mount on hover"],
  [workRow.includes("aria-label"), "project link context"],
  [workRow.includes("(hover: hover) and (pointer: fine)"), "preview fine pointer"],
  [workRow.includes("(prefers-reduced-motion: no-preference)"), "preview reduced off"],
  [[...workRow.matchAll(/<Image\b/g)].length === 1, "preview tek görsel"],
  [source("src/components/ui/Reveal.tsx").includes("initial={false}"), "Reveal no-JS initial false"],
  [
    source("src/components/ui/Reveal.tsx").includes("getBoundingClientRect().top > window.innerHeight"),
    "Reveal yalnızca ekran altında arm ediliyor",
  ],
);

checks.push(
  [!source("src/components/sections/About.tsx").includes("italic"), "About serif italic kalktı"],
  [source("src/components/sections/About.tsx").includes("font-display"), "About sans statement"],
  [motion("TimelineLine").includes("useScroll"), "timeline line"],
  [motion("TimelineLine").includes("scaleY"), "timeline scaleY"],
  [source("src/components/sections/Contact.tsx").includes("email-underline"), "email underline"],
  [globals.includes(".email-underline:focus-visible"), "email underline focus"],
  [!source("src/components/sections/Footer.tsx").includes("↑"), "footer tek ok"],
  [source("src/components/sections/Footer.tsx").includes("M12 19V5m0 0-6 6m6-6 6 6"), "footer başa dön oku"],
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

checks.push(
  [base === "" || !tr.includes(`${base}${base}`), "basePath iki kez eklenmiyor"],
  [tr.includes("data-hero") && en.includes("data-hero"), "hero no-JS/SSR görünür"],
  [tr.includes("mailto:selahattin32ozdmr@gmail.com"), "e-posta SSR'da görünür"],
  [
    ogSize?.width === 1200 && ogSize?.height === 630,
    `OG 1200x630 (${ogSize ? `${ogSize.width}x${ogSize.height}` : "?"})`,
  ],
  [metaContent(tr, "og:locale") === "tr_TR", "TR OG locale"],
  [metaContent(en, "og:locale") === "en_US", "EN OG locale"],
  [tr.includes('name="twitter:card"') && tr.includes('content="summary_large_image"'), "twitter card"],
  [metaContent(tr, "og:title") !== undefined, "OG başlığı"],
  [metaContent(en, "og:description") !== undefined, "OG açıklaması"],
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

let failed = false;
for (const [ok, label] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
