import en from "./en";
import { projectMeta } from "./projects";
import tr from "./tr";
import type { Dictionary, DictionarySource, Locale, Project } from "./types";

const sources: Record<Locale, DictionarySource> = { tr, en };

const buildDictionary = (locale: Locale): Dictionary => {
  const source = sources[locale];
  const texts = new Map(source.projects.items.map((project) => [project.id, project]));

  if (texts.size !== source.projects.items.length) {
    throw new Error(`Duplicate project ids in ${locale} dictionary`);
  }

  const items: Project[] = projectMeta.map((meta) => {
    const text = texts.get(meta.id);
    if (!text) {
      throw new Error(`Missing ${locale} text for project "${meta.id}"`);
    }
    texts.delete(meta.id);
    return { ...text, ...meta };
  });

  if (texts.size > 0) {
    throw new Error(`Unknown project ids in ${locale} dictionary: ${[...texts.keys()].join(", ")}`);
  }

  return {
    ...source,
    projects: { ...source.projects, items },
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  tr: buildDictionary("tr"),
  en: buildDictionary("en"),
};

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export const getProject = (locale: Locale, id: string): Project | undefined =>
  dictionaries[locale].projects.items.find((project) => project.id === id);

export const projectIds = projectMeta.map((project) => project.id);

export * from "./types";
