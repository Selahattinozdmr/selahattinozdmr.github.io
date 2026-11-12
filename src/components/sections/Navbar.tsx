"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/content/types";
import { site } from "@/content/site";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "@/components/ui/Logo";

const links = ["about", "experience", "projects", "skills", "contact"] as const;

export default function Navbar({ t, lang }: { t: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  const reduce = useReducedMotion();
  const other: Locale = lang === "tr" ? "en" : "tr";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last.current) > 8) {
        setHidden(y > last.current && y > 200);
        last.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const focus =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan rounded-sm";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled || open ? "glass border-x-0 border-t-0" : "border-b border-transparent"}`}
      >
        <nav
          aria-label={t.nav.primary}
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20"
        >
          <a
            href="#top"
            aria-label={site.name}
            className={`group flex items-center gap-3 ${focus}`}
            onClick={() => setOpen(false)}
          >
            <Logo className="h-9 w-9 drop-shadow-[0_0_10px_rgb(var(--cyan-rgb)/0.35)] transition group-hover:scale-105 group-hover:drop-shadow-[0_0_16px_rgb(var(--cyan-rgb)/0.6)]" />
            <span className="font-display hidden text-sm font-semibold tracking-wide sm:block">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((k) => (
              <li key={k}>
                <a
                  href={`#${k}`}
                  className={`text-sm text-muted transition-colors hover:text-fg ${focus}`}
                >
                  {t.nav[k]}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`/${other}`}
                hrefLang={other}
                lang={other}
                aria-label={t.nav.switchLanguage}
                className={`flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition hover:border-cyan/50 hover:text-fg ${focus}`}
              >
                <span className="text-cyan">{lang.toUpperCase()}</span>
                <span aria-hidden>→</span>
                <span>{other.toUpperCase()}</span>
              </a>
            </li>
            <li>
              <ThemeToggle toLightLabel={t.nav.themeToLight} toDarkLabel={t.nav.themeToDark} />
            </li>
          </ul>

          <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle
            toLightLabel={t.nav.themeToLight}
            toDarkLabel={t.nav.themeToDark}
            className="relative z-[60]"
          />
          <button
            type="button"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`relative z-[60] grid h-10 w-10 place-items-center ${focus}`}
          >
            <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
            <span
              aria-hidden
              className={`absolute h-0.5 w-6 bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-6 bg-fg transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-6 bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 38px) 32px)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 38px) 32px)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 38px) 32px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-5">
              {links.map((k, i) => (
                <motion.li
                  key={k}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                >
                  <a
                    href={`#${k}`}
                    onClick={() => setOpen(false)}
                    className={`font-display flex items-baseline gap-4 text-4xl font-bold ${focus}`}
                  >
                    <span className="font-mono text-sm text-cyan">0{i + 1}</span>
                    {t.nav[k]}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={`/${other}`}
              hrefLang={other}
              lang={other}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`mt-12 inline-flex w-fit items-center gap-3 rounded-full border border-line px-4 py-2 font-mono text-sm ${focus}`}
            >
              <span className="text-cyan">{lang.toUpperCase()}</span>
              <span aria-hidden>→</span>
              <span>{t.nav.switchLanguage}</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
