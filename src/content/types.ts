import type { ProjectMeta } from "./projects";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export type ProjectText = {
  id: string;
  name: string;
  description: string;
  problem: string;
  outcome: string;
  details?: string[];
  linkLabel?: string;
};

export type Project = ProjectText & Omit<ProjectMeta, "id">;

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

export type DictionarySource = {
  meta: { title: string; description: string };
  nav: {
    about: string;
    experience: string;
    contact: string;
    switchLanguage: string;
    themeToLight: string;
    themeToDark: string;
  };
  hero: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    timezone: string;
    availability: string;
    now: string;
    stack: string[];
    nowLabel: string;
  };
  about: {
    paragraphs: string[];
    stats: { value: string; label: string }[];
  };
  experience: {
    items: Experience[];
  };
  projects: {
    otherTitle: string;
    items: ProjectText[];
  };
  work: {
    back: string;
    selectedTitle: string;
    context: string;
    problem: string;
    approach: string;
    outcome: string;
    live: string;
    screenshot: string;
    newTab: string;
    prev: string;
    next: string;
    notFoundTitle: string;
    notFoundBody: string;
  };
  skills: {
    groups: SkillGroup[];
  };
  education: {
    title: string;
    degree: string;
    school: string;
    period: string;
    gpa: string;
    languagesTitle: string;
    languages: { name: string; level: string }[];
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
    title: string;
    subtitle: string;
    emailLabel: string;
    copy: string;
    copied: string;
  };
  footer: { rights: string; builtWith: string };
};

export type Dictionary = Omit<DictionarySource, "projects"> & {
  projects: Omit<DictionarySource["projects"], "items"> & { items: Project[] };
};
