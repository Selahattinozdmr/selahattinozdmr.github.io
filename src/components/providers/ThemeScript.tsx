"use client";

import { useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { themeInitScript } from "./theme";

/**
 * Injects the theme init script into the server HTML only (runs before first
 * paint, so no flash). Using useServerInsertedHTML instead of rendering a
 * <script> element avoids React's client-side "script tag" warning; the
 * data-theme attribute it sets on <html> persists across client navigations.
 */
export default function ThemeScript() {
  const inserted = useRef(false);
  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
  });
  return null;
}
