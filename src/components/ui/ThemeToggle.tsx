"use client";

import { setTheme, useTheme } from "@/components/providers/theme";

export default function ThemeToggle({
  toLightLabel,
  toDarkLabel,
  className = "",
}: {
  toLightLabel: string;
  toDarkLabel: string;
  className?: string;
}) {
  const theme = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? toLightLabel : toDarkLabel;
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:border-cyan/50 hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  );
}
