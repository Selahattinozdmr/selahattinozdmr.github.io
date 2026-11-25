import type { Dictionary } from "./types";

const en: Dictionary = {
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
    primary: "Primary",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
  },
  hero: {
    greeting: "Hi, I'm",
    name: "Selahattin Özdemir",
    role: "Software Engineer",
    tagline: "I build scalable, production-ready systems — from Spring Boot APIs to Next.js and React Native apps.",
    location: "Ankara, Turkey",
    scrollHint: "Scroll to step into the workspace",
    ctaProjects: "See my work",
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
    items: [
      {
        id: "autosuchen24",
        name: "Autosuchen24",
        stack: ["React Native", "Node.js", "PostgreSQL"],
        description:
          "Multilingual vehicle marketplace built for a Swiss client. Realtime chat, an admin approval workflow and push notifications on a Node.js + PostgreSQL backend.",
        image: "/images/autosuchen24.jpg",
        url: "https://autosuchen24.ch",
      },
      {
        id: "takasgo",
        name: "TakasGo Global",
        stack: ["Next.js", "Node.js", "PostgreSQL"],
        description:
          "End-to-end bartering marketplace with a normalized PostgreSQL schema and a Node.js REST API handling concurrent offer transactions, plus realtime messaging.",
        image: "/images/takasgo.jpg",
        url: "https://www.takasgoglobal.com.tr/",
      },
      {
        id: "mutfix",
        name: "Mutfix",
        stack: ["Next.js", "Node.js", "PostgreSQL", "RBAC"],
        description:
          "Recipe platform with role-based access control (Chef/Member) and a dynamic reward algorithm. Node.js API on PostgreSQL via Drizzle ORM, with an admin analytics dashboard.",
        image: "/images/mutfix.jpg",
      },
      {
        id: "nerdeyemek",
        name: "Nerdeyemek",
        stack: ["Next.js", "React Native", "Node.js"],
        description:
          "Platform listing meals prepared by home chefs. Node.js service layer with server-side caching for high-performance data delivery.",
        image: "/images/nerdeyemek.jpg",
        url: "https://nerdeyemek.com",
      },
      {
        id: "quiz",
        name: "Online Quiz System",
        stack: ["Next.js", "Node.js", "PostgreSQL"],
        description:
          "Parametric exam generation system for schools. Published in a peer-reviewed journal (BILMES, 2024).",
        image: "/images/quiz.jpg",
        url: "https://dergipark.org.tr/tr/pub/bilmes/article/1613874",
        linkLabel: "Read the article",
      },
    ],
  },
  skills: {
    eyebrow: "04 — Skills",
    title: "My toolbox",
    subtitle: "From enterprise Java to mobile and machine learning.",
    groups: [
      { title: "Languages", items: ["TypeScript", "JavaScript", "Java", "Python 3", "C#", "SQL"] },
      { title: "Web & Mobile", items: ["React", "React Native", "Next.js", "Tailwind CSS"] },
      { title: "Backend & Enterprise", items: ["Java Spring Boot", "Node.js (Express)", "PostgreSQL", "Drizzle ORM", "Prisma", "RBAC / Auth"] },
      { title: "DevOps & Tools", items: ["Git / GitHub", "Docker", "Postman", "CI/CD"] },
      { title: "AI & Machine Learning", items: ["Deep Learning", "GANs", "Reinforcement Learning"] },
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
      { name: "Turkish", level: "Native", score: 5 },
      { name: "English", level: "B1", score: 3 },
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
  footer: { rights: "All rights reserved.", builtWith: "Built with Next.js, GSAP & Motion", backToTop: "Back to top" },
};

export default en;
