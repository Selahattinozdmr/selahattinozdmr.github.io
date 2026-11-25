"use client";

import { useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Dictionary } from "@/content/types";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const RM_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getRM = () => window.matchMedia(RM_QUERY).matches;
const getRMServer = () => false;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

function Intro({ t }: { t: Dictionary }) {
  return (
    <>
      <p
        data-intro
        className="font-mono text-xs tracking-[0.25em] text-accent-ink uppercase sm:text-sm"
      >
        {t.hero.greeting}
      </p>
      <h1
        data-intro
        className="font-display text-gradient mt-2 text-[clamp(2.25rem,8.5vw,6.5rem)] leading-[1.02] font-bold tracking-tight sm:mt-3"
      >
        {t.hero.name}
      </h1>
      <div
        data-intro
        className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:mt-4 sm:gap-3"
      >
        <span className="font-display text-fg text-lg font-medium sm:text-2xl">
          {t.hero.role}
        </span>
        <span className="glass text-muted rounded-full px-3 py-1 font-mono text-[11px] sm:text-xs">
          {t.hero.location}
        </span>
      </div>
      <p
        data-intro
        className="text-muted mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:mt-4 sm:text-base"
      >
        {t.hero.tagline}
      </p>
      <div
        data-intro
        className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6"
      >
        <a
          href="#projects"
          className="bg-accent text-on-accent rounded-full px-5 py-2.5 text-sm font-semibold shadow-[0_0_30px_rgb(var(--accent-rgb)/0.35)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t.hero.ctaProjects}
        </a>
        <a
          href="#contact"
          className="glass text-fg hover:border-accent/50 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t.hero.ctaContact}
        </a>
      </div>
    </>
  );
}

export default function ScrollVideoHero({ t }: { t: Dictionary }) {
  const reduced = useSyncExternalStore(subscribeRM, getRM, getRMServer);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      const section = sectionRef.current;
      const stage = stageRef.current;
      const frame = frameRef.current;
      const video = videoRef.current;
      if (!section || !stage || !frame || !video) return;

      // Staggered entrance
      const introEls = gsap.utils.toArray<HTMLElement>("[data-intro]", introRef.current);
      gsap.from(introEls, {
        opacity: 0,
        y: 36,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
      gsap.from(frame, { opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.3 });

      // Cached geometry. The start card is placed in the space left *below* the
      // intro block (measured, not guessed) so it never overlaps the CTAs.
      const geo = { W: 0, H: 0, w0: 0, h0: 0, y0: 0 };
      const measure = () => {
        const W = stage.clientWidth;
        const H = stage.clientHeight;
        const mobile = W < 768;
        const intro = introRef.current;
        const last = intro?.lastElementChild as HTMLElement | null;
        // offsetTop/offsetHeight ignore the transforms we animate on the intro.
        const introBottom = intro && last ? intro.offsetTop + last.offsetTop + last.offsetHeight : H * 0.5;
        const gap = mobile ? 12 : 24;
        const hintSpace = mobile ? 64 : 84; // scroll hint + progress bar below the card
        const top = introBottom + gap;
        const avail = Math.max(H - top - hintSpace, 96);
        const ratio = mobile ? 0.62 : 0.5625;
        let w0 = mobile ? Math.min(W * 0.9, 420) : W * 0.62;
        let h0 = w0 * ratio;
        if (h0 > avail) {
          h0 = avail;
          w0 = Math.min(w0, Math.max(h0 / ratio, W * (mobile ? 0.6 : 0.36)));
        }
        // translateY is relative to the vertically centred flex position.
        const y0 = top + h0 / 2 - H / 2;
        Object.assign(geo, { W, H, w0, h0, y0 });
      };
      measure();

      const state = { target: 0, cur: 0, raf: 0 };

      const apply = (p: number) => {
        const e = ease(range(p, 0, 0.45));
        const w = lerp(geo.w0, geo.W, e);
        const h = lerp(geo.h0, geo.H, e);
        frame.style.width = `${w}px`;
        frame.style.height = `${h}px`;
        frame.style.borderRadius = `${24 * (1 - e)}px`;
        frame.style.transform = `translate3d(0, ${lerp(geo.y0, 0, e)}px, 0)`;
        if (glowRef.current) glowRef.current.style.opacity = String(1 - e);

        // Intro text: fades + moves up by 0.3
        const i = ease(range(p, 0.02, 0.3));
        if (introRef.current) {
          introRef.current.style.opacity = String(1 - i);
          introRef.current.style.transform = `translate3d(0, ${-90 * i}px, 0)`;
          introRef.current.style.visibility = i >= 0.99 ? "hidden" : "visible";
        }

        // Vignette / seamless fade into page bg
        if (shadeRef.current) shadeRef.current.style.opacity = String(0.25 + 0.75 * ease(range(p, 0.35, 1)));
        if (fadeRef.current) fadeRef.current.style.opacity = String(ease(range(p, 0.78, 1)));

        if (hintRef.current) {
          const o = 1 - range(p, 0, 0.05);
          hintRef.current.style.opacity = String(o);
          hintRef.current.style.visibility = o <= 0 ? "hidden" : "visible";
        }
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      };

      const seek = (p: number) => {
        const d = video.duration;
        if (!Number.isFinite(d) || d <= 0 || video.readyState < 1) return;
        const time = clamp(p) * (d - 0.001);
        if (Math.abs(video.currentTime - time) > 1 / 60) video.currentTime = time;
      };

      const tick = () => {
        const diff = state.target - state.cur;
        state.cur = Math.abs(diff) < 0.0004 ? state.target : state.cur + diff * 0.14;
        apply(state.cur);
        seek(state.cur);
        state.raf = state.cur !== state.target ? requestAnimationFrame(tick) : 0;
      };
      const kick = () => {
        if (!state.raf) state.raf = requestAnimationFrame(tick);
      };

      video.pause();
      video.addEventListener("loadedmetadata", kick);
      video.addEventListener("loadeddata", kick);

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          state.target = self.progress;
          kick();
        },
        onRefresh: (self) => {
          measure();
          state.target = self.progress;
          kick();
        },
      });

      state.target = st.progress;
      state.cur = st.progress;
      apply(state.cur);
      seek(state.cur);

      const ro = new ResizeObserver(() => {
        measure();
        apply(state.cur);
      });
      ro.observe(stage);
      if (introRef.current) ro.observe(introRef.current); // font swap / locale text changes height

      return () => {
        ro.disconnect();
        cancelAnimationFrame(state.raf);
        video.removeEventListener("loadedmetadata", kick);
        video.removeEventListener("loadeddata", kick);
        st.kill();
      };
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  if (reduced) {
    return (
      <section
        id="top"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24 text-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/video/hero-poster.jpg")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="to-bg absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/50" />
        <div className="relative z-10 flex max-w-3xl flex-col items-center">
          <Intro t={t} />
        </div>
      </section>
    );
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[180vh] md:h-[240vh]"
    >
      <div
        ref={stageRef}
        className="bg-bg sticky top-0 h-[100svh] w-full overflow-hidden"
      >
        {/* Video frame (animated card -> full-bleed) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            ref={frameRef}
            className="relative overflow-hidden will-change-transform"
            style={{ width: "62vw", height: "42vh", borderRadius: 24, transform: "translate3d(0, 26vh, 0)" }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={asset("/video/hero-poster.jpg")}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={asset("/video/hero-mobile.mp4")} type="video/mp4" media="(max-width: 767px)" />
              <source src={asset("/video/hero.mp4")} type="video/mp4" />
            </video>
            <div
              ref={shadeRef}
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgb(var(--bg-rgb) / 0) 35%, rgb(var(--bg-rgb) / 0.85) 100%), linear-gradient(to bottom, rgb(var(--bg-rgb) / 0.1), rgb(var(--bg-rgb) / 0.55))",
              }}
            />
            <div
              ref={fadeRef}
              className="pointer-events-none absolute inset-0 opacity-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgb(var(--bg-rgb) / 0.35) 0%, rgb(var(--bg-rgb) / 0.8) 60%, var(--bg) 100%)",
              }}
            />
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0 rounded-[inherit] border border-accent/60"
              style={{
                boxShadow:
                  "0 0 60px rgb(var(--accent-rgb) / 0.35), inset 0 0 40px rgb(var(--accent-rgb) / 0.12), 0 24px 60px -20px var(--shadow)",
              }}
            />
          </div>
        </div>

        {/* Intro text */}
        <div
          ref={introRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center px-5 pt-20 text-center will-change-transform sm:pt-24 [&_a]:pointer-events-auto"
        >
          <Intro t={t} />
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="text-muted pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-wider uppercase"
        >
          <span className="text-center">{t.hero.scrollHint}</span>
          <span className="border-fg/40 relative flex h-8 w-5 justify-center rounded-full border">
            <span className="bg-accent mt-1.5 h-1.5 w-1 animate-bounce rounded-full" />
          </span>
        </div>

        {/* Progress bar */}
        <div className="bg-fg/10 absolute inset-x-0 bottom-0 z-30 h-[2px]">
          <div
            ref={barRef}
            className="bg-accent h-full origin-left shadow-[0_0_10px_var(--accent-ink)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
