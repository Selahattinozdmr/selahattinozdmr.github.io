"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Dictionary } from "@/content/types";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience({ t }: { t: Dictionary }) {
  const root = useRef<HTMLDivElement>(null);
  const e = t.experience;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".tl-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: { trigger: ".tl-list", start: "top 70%", end: "bottom 60%", scrub: 0.6 },
          },
        );
        gsap.utils.toArray<HTMLElement>(".tl-item").forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            x: i % 2 === 0 ? -48 : 48,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
          gsap.from(el.querySelector(".tl-dot"), {
            scale: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          });
        });
      });
    },
    { scope: root, dependencies: [e.items.length] },
  );

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-20 md:py-28">
      <div ref={root} className="mx-auto max-w-6xl px-5">
        <SectionHeading id="experience-title" eyebrow={e.eyebrow} title={e.title} />
        <ol className="tl-list relative ml-3 md:ml-0">
          <div aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-line md:left-[13rem]" />
          <div
            aria-hidden
            className="tl-line absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-cyan via-cyan to-orange shadow-[0_0_14px_2px_rgb(var(--cyan-rgb)/0.6)] md:left-[13rem]"
          />
          {e.items.map((item) => (
            <li
              key={item.company + item.period}
              className="tl-item relative pb-12 pl-8 last:pb-0 md:grid md:grid-cols-[13rem_1fr] md:pl-0"
            >
              <div className="mb-3 md:mb-0 md:pr-8 md:text-right">
                <p className="font-mono text-xs tracking-normal whitespace-nowrap text-cyan uppercase">{item.period}</p>
                <p className="mt-1 font-mono text-xs text-muted">{item.location}</p>
              </div>
              <span
                aria-hidden
                className="tl-dot absolute top-1.5 -left-[5px] h-[11px] w-[11px] rounded-full bg-cyan shadow-[0_0_14px_3px_rgb(var(--cyan-rgb)/0.7)] md:left-[13rem] md:-translate-x-1/2"
              />
              <div className="glass rounded-2xl p-6 md:ml-10 md:p-7">
                <h3 className="font-display text-2xl font-bold">{item.role}</h3>
                <p className="font-display mt-1 text-lg font-semibold text-orange">{item.company}</p>
                <ul className="mt-4 space-y-3 text-muted">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed">
                      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
