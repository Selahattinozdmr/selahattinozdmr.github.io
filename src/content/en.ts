import type { DictionarySource } from "./types";

const en: DictionarySource = {
  meta: {
    title: "Selahattin Özdemir — Software Engineer",
    description:
      "Software Engineer with corporate backend experience in Java Spring Boot and full-stack experience in Next.js & React Native.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    switchLanguage: "Türkçe",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    primary: "Primary",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
  },
  hero: {
    name: "Selahattin Özdemir",
    role: "Software Engineer",
    tagline: "I build enterprise Java/Spring Boot backends and Next.js/React Native products.",
    location: "Ankara, Turkey",
    timezone: "UTC+3",
    availability: "Open to full-time roles and freelance projects",
    focus: "Enterprise backend · Product engineering · PostgreSQL",
    now: "Enterprise training automation + full-stack products",
    stack: ["Java", "Spring Boot", "Next.js", "React Native", "PostgreSQL"],
    focusLabel: "Focus",
    stackLabel: "Stack",
    nowLabel: "Now",
    ctaProjects: "Selected work",
    ctaContact: "Get in touch",
  },
  about: {
    eyebrow: "01 — About",
    title: "Backend discipline, full-stack curiosity.",
    paragraphs: [
      "I'm a Software Engineer from Ankara. At a large enterprise technology company in Ankara, I built REST APIs with Java Spring Boot that automate corporate training workflows — the kind of enterprise backend work where correctness and integration matter.",
      "Outside the enterprise, I ship full-stack products with Next.js, React Native and Node.js on PostgreSQL: marketplaces with realtime chat, role-based platforms and a peer-reviewed exam system.",
    ],
    stats: [
      { value: "5+", label: "Shipped products" },
      { value: "2", label: "Industry internships" },
      { value: "1", label: "Published paper" },
      { value: "3.42", label: "GPA / 4.00" },
    ],
    pullQuote: "Enterprise backend work where correctness and integration matter.",
  },
  experience: {
    eyebrow: "02 — Experience",
    title: "Where I've worked",
    items: [
      {
        role: "Software Engineer Intern",
        company: "Enterprise Technology Company",
        period: "Sep 2025 – May 2026",
        location: "Ankara, Turkey",
        bullets: [
          "Developed REST APIs with Java Spring Boot for the Academy department, automating corporate training workflows and integrating with internal systems.",
        ],
      },
      {
        role: "Machine Learning Intern",
        company: "XLOG FIREWALL (Arjeta)",
        period: "Jul 2023 – Aug 2023",
        location: "Isparta, Turkey",
        bullets: [
          "Built predictive models on Kaggle datasets using regression and decision trees.",
          "Researched Generative Adversarial Networks (GANs) and deep reinforcement learning (Deep Q-Learning).",
        ],
      },
    ],
  },
  projects: {
    eyebrow: "03 — Projects",
    title: "Selected work",
    subtitle: "Products I've designed and built end to end.",
    visit: "Visit",
    problemLabel: "Problem",
    outcomeLabel: "Outcome",
    caseNoteLabel: "Case note",
    otherTitle: "Other work",
    items: [
      {
        id: "autosuchen24",
        name: "Autosuchen24",
        description:
          "Multilingual vehicle marketplace built for a Swiss client. Realtime chat, an admin approval workflow and push notifications on a Node.js + PostgreSQL backend.",
        problem:
          "A Swiss client needed a multilingual vehicle marketplace with realtime communication.",
        outcome:
          "A live marketplace on Node.js + PostgreSQL with chat, admin approval and push notifications.",
        details: [
          "Multilingual vehicle listing and search",
          "Realtime chat",
          "Admin approval workflow and push notifications",
        ],
      },
      {
        id: "takasgo",
        name: "TakasGo Global",
        description:
          "End-to-end bartering marketplace with a normalized PostgreSQL schema and a Node.js REST API handling concurrent offer transactions, plus realtime messaging.",
        problem: "Concurrent barter offers and related data needed to stay consistent.",
        outcome:
          "A normalized PostgreSQL schema and Node.js REST API handling concurrent offers, with realtime messaging; live.",
        details: [
          "Normalized PostgreSQL schema",
          "Concurrent offer transactions",
          "Realtime messaging",
        ],
      },
      {
        id: "mutfix",
        name: "Mutfix",
        description:
          "Recipe platform with role-based access control (Chef/Member) and a dynamic reward algorithm. Node.js API on PostgreSQL via Drizzle ORM, with an admin analytics dashboard.",
        problem:
          "A recipe platform needed to separate chef/member roles and calculate rewards dynamically.",
        outcome:
          "An end-to-end platform with RBAC, a dynamic reward algorithm and an admin analytics panel.",
        details: [
          "Chef/Member role-based access",
          "Dynamic reward algorithm",
          "Admin analytics panel",
        ],
      },
      {
        id: "nerdeyemek",
        name: "Nerdeyemek",
        description:
          "Platform listing meals prepared by home chefs. Node.js service layer with server-side caching for high-performance data delivery.",
        problem: "A platform needed to list home-chef meals with high performance.",
        outcome:
          "A server-side cached Node.js service layer with Next.js and React Native clients.",
      },
      {
        id: "quiz",
        name: "Online Quiz System",
        description:
          "Parametric exam generation system for schools. Published in a peer-reviewed journal (BILMES, 2024).",
        problem: "Schools needed parametric exam generation and management.",
        outcome:
          "A K-12 exam system built with Next.js + Node.js; peer-reviewed at BILMES 2024.",
        linkLabel: "Read the article",
      },
    ],
  },
  work: {
    back: "All work",
    selectedTitle: "Selected work",
    otherTitle: "Other work",
    viewCase: "Case study",
    context: "Context",
    problem: "Problem",
    approach: "Approach",
    outcome: "Outcome",
    stack: "Stack",
    live: "Live site",
    prev: "Previous",
    next: "Next",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you are looking for may have moved or never existed.",
    notFoundCta: "Back home",
  },
  skills: {
    eyebrow: "04 — Skills",
    title: "My toolbox",
    subtitle: "From enterprise Java to mobile and machine learning.",
    groups: [
      {
        title: "Enterprise backend",
        summary: "Enterprise work where correctness and integration matter.",
        items: ["Java", "Spring Boot", "PostgreSQL", "REST API", "RBAC / Auth"],
      },
      {
        title: "Product engineering",
        summary: "Web and mobile products from idea to production.",
        items: ["Next.js", "React", "React Native", "Node.js", "Drizzle ORM", "Prisma", "Tailwind CSS"],
      },
      {
        title: "Foundations",
        summary: "Typed code, containers and a machine-learning foundation.",
        items: [
          "TypeScript",
          "JavaScript",
          "Python 3",
          "C#",
          "SQL",
          "Docker",
          "Git / CI",
          "Deep Learning",
          "GANs",
          "Reinforcement Learning",
        ],
      },
    ],
  },
  education: {
    eyebrow: "05 — Education",
    title: "Education & research",
    degree: "B.Sc. in Software Engineering",
    school: "Aksaray University",
    period: "2021 – 2026",
    gpa: "Graduated — GPA 3.42 / 4.00",
    languagesTitle: "Languages",
    languages: [
      { name: "Turkish", level: "Native" },
      { name: "English", level: "B1" },
    ],
    publicationTitle: "Publication",
    publication: {
      title: "Online Quiz Application",
      venue: "BILMES Journal, 2024",
      description: "A parametric exam system for K-12 built with Next.js & Node.js.",
      url: "https://dergipark.org.tr/tr/pub/bilmes/article/1613874",
      cta: "Read the article",
    },
  },
  contact: {
    eyebrow: "06 — Contact",
    title: "Let's build something.",
    subtitle: "Open to full-time roles and freelance projects. My inbox is always open.",
    emailLabel: "Send an email",
    copy: "Copy",
    copied: "Copied!",
  },
  footer: { rights: "All rights reserved.", builtWith: "Built with Next.js, Motion & Tailwind", backToTop: "Back to top" },
};

export default en;
