import en from "./en";
import tr from "./tr";
import type { Dictionary, Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
export * from "./types";
