"use client";

import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";
export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script for <head>: applies the saved theme before first paint so the
 * page never flashes the wrong palette. Dark is the default design.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

const read = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

/** Current theme; re-renders when <html data-theme> changes. Server snapshot is "dark". */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "dark");
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage blocked: theme still applies for this visit */
  }
  window.setTimeout(() => root.classList.remove("theme-transition"), 400);
}
