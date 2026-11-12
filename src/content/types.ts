export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export type Project = {
  id: string;
  name: string;
  stack: string[];
  description: string;
  image: string;
  url?: string;
  linkLabel?: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
    switchLanguage: string;
    openMenu: string;
    closeMenu: string;
    primary: string;
    themeToLight: string;
    themeToDark: string;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    tagline: string;
    location: string;
    scrollHint: string;
    ctaProjects: string;
    ctaContact: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
  };
  experience: {
    eyebrow: string;
    title: string;
    items: Experience[];
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    visit: string;
    items: Project[];
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
    groups: SkillGroup[];
    dragHint: string;
  };
  education: {
    eyebrow: string;
    title: string;
    degree: string;
    school: string;
    period: string;
    gpa: string;
    languagesTitle: string;
    languages: { name: string; level: string; score: number }[];
    publicationTitle: string;
    publication: {
      title: string;
      venue: string;
      description: string;
      url: string;
      cta: string;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    copy: string;
    copied: string;
  };
  footer: { rights: string; builtWith: string; backToTop: string };
};
