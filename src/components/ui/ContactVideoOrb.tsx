"use client";

import { useEffect, useRef } from "react";

/**
 * Looping glass-orb video (Higgsfield Seedance render). Its black background is
 * blended into the page with mix-blend-screen. Plays only while on screen and
 * stays on the poster frame when the user prefers reduced motion.
 */
export default function ContactVideoOrb() {
  const ref = useRef<HTMLVideoElement>(null);

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

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden="true">
      <div className="absolute inset-[18%] rounded-full bg-cyan/20 blur-3xl" />
      <video
        ref={ref}
        className="relative h-full w-full object-cover mix-blend-screen"
        style={{
          maskImage: "radial-gradient(circle at 50% 50%, #000 42%, transparent 68%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 42%, transparent 68%)",
        }}
        src="/video/orb-loop.mp4"
        poster="/video/orb-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      />
    </div>
  );
}
