"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/theme";
import { asset } from "@/lib/asset";

const MASK = "radial-gradient(circle at 50% 50%, #000 42%, transparent 68%)";
const PORTAL_MASK = "radial-gradient(circle at 50% 50%, #000 55%, transparent 98%)";

/**
 * Looping glass-orb video (Higgsfield Seedance render). In dark theme its black
 * background is blended into the page with mix-blend-screen. In light theme it
 * sits inside a navy circular "portal". Plays only while on screen and stays on
 * the poster frame when the user prefers reduced motion.
 */
export default function ContactVideoOrb() {
  const ref = useRef<HTMLVideoElement>(null);
  const light = useTheme() === "light";

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced.matches) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const mask = light ? PORTAL_MASK : MASK;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden="true">
      {light ? null : <div className="absolute inset-[18%] rounded-full bg-cyan/20 blur-3xl" />}
      <div
        className={
          light
            ? "absolute inset-[6%] overflow-hidden rounded-full bg-[#0b1530] shadow-[0_24px_70px_-12px_var(--shadow),0_0_0_1px_rgb(var(--cyan-rgb)/0.35),0_0_40px_-6px_rgb(var(--cyan-rgb)/0.35)]"
            : "absolute inset-0"
        }
      >
        <video
          ref={ref}
          className={`relative h-full w-full object-cover ${light ? "" : "mix-blend-screen"}`}
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          src={asset("/video/orb-loop.mp4")}
          poster={asset("/video/orb-poster.jpg")}
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
