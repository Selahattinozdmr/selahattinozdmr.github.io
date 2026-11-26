import type { DictionarySource } from "./types";

const tr: DictionarySource = {
  meta: {
    title: "Selahattin Özdemir — Yazılım Mühendisi",
    description:
      "Java Spring Boot ile kurumsal backend ve Next.js & React Native ile full-stack deneyimine sahip Yazılım Mühendisi.",
  },
  nav: {
    about: "Hakkımda",
    experience: "Deneyim",
    projects: "Projeler",
    skills: "Yetenekler",
    contact: "İletişim",
    switchLanguage: "English",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    menu: "Menü",
    primary: "Ana menü",
    themeToLight: "Açık temaya geç",
    themeToDark: "Koyu temaya geç",
  },
  hero: {
    name: "Selahattin Özdemir",
    role: "Yazılım Mühendisi",
    tagline: "Kurumsal Java/Spring Boot backend'leri ve Next.js/React Native ürünleri geliştiriyorum.",
    location: "Ankara, Türkiye",
    timezone: "UTC+3",
    availability: "Tam zamanlı roller ve freelance projelere açık",
    focus: "Kurumsal backend · Ürün geliştirme · PostgreSQL",
    now: "Kurumsal eğitim otomasyonu + full-stack ürünler",
    stack: ["Java", "Spring Boot", "Next.js", "React Native", "PostgreSQL"],
    focusLabel: "Odak",
    stackLabel: "Stack",
    nowLabel: "Şu an",
    ctaProjects: "Seçili işler",
    ctaContact: "İletişime geç",
  },
  about: {
    eyebrow: "01 — Hakkımda",
    title: "Backend disiplini, full-stack merakı.",
    paragraphs: [
      "Ankara'da yaşayan bir Yazılım Mühendisiyim. Ankara merkezli büyük bir kurumsal teknoloji şirketinde, kurumsal eğitim süreçlerini otomatikleştiren Java Spring Boot REST API'leri geliştirdim — doğruluğun ve entegrasyonun kritik olduğu kurumsal backend işleri.",
      "Kurumsal dünyanın dışında Next.js, React Native ve Node.js ile PostgreSQL üzerinde uçtan uca ürünler geliştiriyorum: gerçek zamanlı sohbetli pazaryerleri, rol tabanlı platformlar ve hakemli dergide yayımlanmış bir sınav sistemi.",
    ],
    stats: [
      { value: "5+", label: "Yayında ürün" },
      { value: "2", label: "Sektör stajı" },
      { value: "1", label: "Yayımlanmış makale" },
      { value: "3.42", label: "GNO / 4.00" },
    ],
    pullQuote: "Doğruluğun ve entegrasyonun kritik olduğu kurumsal backend işleri.",
  },
  experience: {
    eyebrow: "02 — Deneyim",
    title: "Çalıştığım yerler",
    items: [
      {
        role: "Yazılım Mühendisi Stajyeri",
        company: "Kurumsal Teknoloji Şirketi",
        period: "Eyl 2025 – May 2026",
        location: "Ankara, Türkiye",
        bullets: [
          "Akademi birimi için Java Spring Boot ile REST API'ler geliştirdim; kurumsal eğitim iş akışlarını otomatikleştirip iç sistemlerle entegre ettim.",
        ],
      },
      {
        role: "Makine Öğrenmesi Stajyeri",
        company: "XLOG FIREWALL (Arjeta)",
        period: "Tem 2023 – Ağu 2023",
        location: "Isparta, Türkiye",
        bullets: [
          "Kaggle veri setleri üzerinde regresyon ve karar ağaçları ile tahmin modelleri geliştirdim.",
          "Çekişmeli Üretici Ağlar (GAN) ve derin pekiştirmeli öğrenme (Deep Q-Learning) üzerine araştırma yaptım.",
        ],
      },
    ],
  },
  projects: {
    eyebrow: "03 — Projeler",
    title: "Seçili işler",
    subtitle: "Uçtan uca tasarlayıp geliştirdiğim ürünler.",
    visit: "Ziyaret et",
    problemLabel: "Problem",
    outcomeLabel: "Sonuç",
    caseNoteLabel: "Vaka notu",
    otherTitle: "Diğer işler",
    items: [
      {
        id: "autosuchen24",
        name: "Autosuchen24",
        description:
          "İsviçreli bir müşteri için çok dilli araç pazaryeri. Node.js + PostgreSQL backend üzerinde gerçek zamanlı sohbet, admin onay akışı ve push bildirimleri.",
        problem:
          "İsviçreli müşteri için çok dilli, gerçek zamanlı iletişimli bir araç pazaryeri gerekiyordu.",
        outcome:
          "Node.js + PostgreSQL üzerinde canlı pazaryeri; sohbet, admin onayı ve push bildirimleri.",
        details: [
          "Çok dilli araç listeleme ve arama",
          "Gerçek zamanlı sohbet",
          "Admin onay akışı ve push bildirimleri",
        ],
      },
      {
        id: "takasgo",
        name: "TakasGo Global",
        description:
          "Normalize PostgreSQL şeması ve eşzamanlı teklif işlemlerini yöneten Node.js REST API'si ile uçtan uca takas pazaryeri; gerçek zamanlı mesajlaşma dahil.",
        problem:
          "Eşzamanlı takas tekliflerini ve ilişkili verileri tutarlı yönetmek gerekiyordu.",
        outcome:
          "Normalize PostgreSQL şeması ve Node.js REST API'si; gerçek zamanlı mesajlaşma; canlı ürün.",
        details: [
          "Normalize PostgreSQL şeması",
          "Eşzamanlı teklif işlemleri",
          "Gerçek zamanlı mesajlaşma",
        ],
      },
      {
        id: "mutfix",
        name: "Mutfix",
        description:
          "Rol tabanlı erişim kontrolü (Şef/Üye) ve dinamik ödül algoritmasına sahip tarif platformu. Drizzle ORM ile PostgreSQL kullanan Node.js API ve admin analitik paneli.",
        problem:
          "Şef/üye rollerini ayıran ve ödülleri dinamik hesaplayan bir tarif platformu gerekiyordu.",
        outcome:
          "RBAC, dinamik ödül algoritması ve admin analitik paneliyle uçtan uca platform.",
        details: [
          "Şef/Üye rol tabanlı erişim",
          "Dinamik ödül algoritması",
          "Admin analitik paneli",
        ],
      },
      {
        id: "nerdeyemek",
        name: "Nerdeyemek",
        description:
          "Ev şeflerinin hazırladığı yemekleri listeleyen platform. Yüksek performanslı veri sunumu için sunucu taraflı önbellekli Node.js servis katmanı.",
        problem:
          "Ev şeflerinin yemeklerini yüksek performansla listeleyen bir platform gerekiyordu.",
        outcome:
          "Sunucu taraflı önbellekli Node.js servis katmanı; Next.js ve React Native istemcileri.",
      },
      {
        id: "quiz",
        name: "Online Sınav Sistemi",
        description:
          "Okullar için parametrik sınav üretim sistemi. Hakemli bir dergide yayımlandı (BILMES, 2024).",
        problem: "Okullar için parametrik sınav üretimi ve yönetimi gerekiyordu.",
        outcome:
          "Next.js + Node.js ile K-12 sınav sistemi; BILMES 2024'te hakemli yayın.",
        linkLabel: "Makaleyi oku",
      },
    ],
  },
  work: {
    back: "Tüm işler",
    selectedTitle: "Seçili işler",
    otherTitle: "Diğer işler",
    viewCase: "Vaka çalışması",
    context: "Bağlam",
    problem: "Problem",
    approach: "Yaklaşım",
    outcome: "Sonuç",
    stack: "Stack",
    live: "Canlı site",
    screenshot: "ekran görüntüsü",
    newTab: "(yeni sekmede açılır)",
    prev: "Önceki",
    next: "Sonraki",
    notFoundTitle: "Sayfa bulunamadı",
    notFoundBody: "Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.",
    notFoundCta: "Ana sayfaya dön",
  },
  skills: {
    eyebrow: "04 — Yetenekler",
    title: "Araç kutum",
    subtitle: "Kurumsal Java'dan mobile ve makine öğrenmesine.",
    groups: [
      {
        title: "Kurumsal backend",
        summary: "Doğruluk ve entegrasyonun kritik olduğu kurumsal işler.",
        items: ["Java", "Spring Boot", "PostgreSQL", "REST API", "RBAC / Auth"],
      },
      {
        title: "Ürün geliştirme",
        summary: "Fikirden yayına web ve mobil ürünler.",
        items: ["Next.js", "React", "React Native", "Node.js", "Drizzle ORM", "Prisma", "Tailwind CSS"],
      },
      {
        title: "Temeller",
        summary: "Tipli kod, konteynerler ve makine öğrenmesi temeli.",
        items: [
          "TypeScript",
          "JavaScript",
          "Python 3",
          "C#",
          "SQL",
          "Docker",
          "Git / CI",
          "Derin Öğrenme",
          "GAN",
          "Pekiştirmeli Öğrenme",
        ],
      },
    ],
  },
  education: {
    eyebrow: "05 — Eğitim",
    title: "Eğitim & araştırma",
    degree: "Yazılım Mühendisliği Lisans",
    school: "Aksaray Üniversitesi",
    period: "2021 – 2026",
    gpa: "Mezun — GNO 3.42 / 4.00",
    languagesTitle: "Diller",
    languages: [
      { name: "Türkçe", level: "Ana dil" },
      { name: "İngilizce", level: "B1" },
    ],
    publicationTitle: "Yayın",
    publication: {
      title: "Online Quiz Application",
      venue: "BILMES Dergisi, 2024",
      description: "Next.js & Node.js ile geliştirilmiş, K-12 için parametrik sınav sistemi.",
      url: "https://dergipark.org.tr/tr/pub/bilmes/article/1613874",
      cta: "Makaleyi oku",
    },
  },
  contact: {
    eyebrow: "06 — İletişim",
    title: "Birlikte bir şeyler inşa edelim.",
    subtitle: "Tam zamanlı pozisyonlara ve freelance projelere açığım. Mesajlarıma her zaman dönüş yaparım.",
    emailLabel: "E-posta gönder",
    copy: "Kopyala",
    copied: "Kopyalandı!",
  },
  footer: { rights: "Tüm hakları saklıdır.", builtWith: "Next.js & Tailwind ile geliştirildi", backToTop: "Başa dön" },
};

export default tr;
