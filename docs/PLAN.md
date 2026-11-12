# 3D Portfolio — Plan

## Concept: "Step into the workspace"
A dark, cinematic, single-page portfolio (TR + EN). The hero is a **scroll-scrubbed video**
(Higgsfield Seedance render) of an isometric developer workstation: it starts as a rounded
"screen" card, expands to full-bleed while the camera orbits and the lights go down.
After the hero, a persistent **Three.js background** (particles + glowing perspective grid) reacts
to scroll and pointer. Two interactive 3D moments: a **draggable skills globe** and a
**glass contact orb**.

References: Bruno Simon (playful 3D), Codrops 2026 R3F + GSAP portfolio case study
(camera moves via GSAP), Awwwards portfolio winners (scroll-driven storytelling, big type).

## Stack
- Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (`cacheComponents: true`)
- three + @react-three/fiber 9 + @react-three/drei 10
- gsap 3 + ScrollTrigger (+ @gsap/react `useGSAP`), lenis smooth scroll, motion (motion/react)
- No database. Contact = mailto + copy-email + CV download. (Supabase intentionally not used.)

## i18n
- Routes: `/tr`, `/en` (`src/app/[lang]`), statically generated.
- `src/proxy.ts` redirects `/` → preferred locale (Accept-Language, default `tr`).
- All copy lives in `src/content/{tr,en}.ts`, typed by `Dictionary` in `src/content/types.ts`.
  Components receive `t: Dictionary` as a prop — **never hardcode visible copy**.

## Design tokens (globals.css → Tailwind)
`bg-bg`, `bg-bg-elev`, `bg-card`, `border-line`, `text-fg`, `text-muted`, `text-cyan`,
`text-orange`, `text-violet`, `font-sans` (Inter), `font-display` (Space Grotesk), `font-mono`
(JetBrains Mono). Utilities: `.glass`, `.text-gradient`.
Colors: bg #050a18, cyan #22d3ee, orange #fb923c.

## Assets (all generated with Higgsfield MCP)
- `/video/hero.mp4` — 1280×720, 24fps, 15.04s (361 frames), **every frame a keyframe** (scrubbable), dark bg throughout, full 360° orbit + push-in.
  `/video/hero-mobile.mp4` — 854×480 variant chosen via `<source media>`. Poster `/video/hero-poster.jpg`.
- `/video/orb-loop.mp4` — 720×720 seamless glass-orb loop for the contact section (radial mask + screen blend). Poster `/video/orb-poster.jpg`.
- `/images/workstation-desk.jpg` (1344×752 render matching the hero video), `/images/{autosuchen24,takasgo,mutfix,nerdeyemek,quiz}.jpg` (1344×752), `/images/og.jpg`.
- `/cv/Selahattin_Ozdemir_ENG.pdf`

## Component contracts (page composition in `src/app/[lang]/page.tsx`)
| File | Export default | Props | Owner |
|---|---|---|---|
| components/providers/SmoothScroll.tsx | `SmoothScroll` (client) | `{children}` | Agent B |
| components/hero/ScrollVideoHero.tsx | client | `{t: Dictionary}` | Agent B |
| components/three/BackgroundCanvas.tsx | client | none | Agent A |
| components/three/SkillsGlobe.tsx | client | `{hint: string}` | Agent A |
| components/three/ContactOrb.tsx | client | none | Agent A |
| components/sections/Navbar.tsx | client | `{t, lang: Locale}` | Agent C |
| components/sections/About.tsx | | `{t}` | Agent C |
| components/sections/Experience.tsx | | `{t}` | Agent C |
| components/sections/Projects.tsx | | `{t}` | Agent C |
| components/sections/Skills.tsx | | `{t, children}` (children = 3D globe) | Agent C |
| components/sections/Education.tsx | | `{t}` | Agent C |
| components/sections/Contact.tsx | | `{t, lang, children}` (children = 3D orb) | Agent C |
| components/sections/Footer.tsx | | `{t}` | Agent C |

Section anchor ids: `#about #experience #projects #skills #education #contact`; hero `#top`.

## Cross-cutting rules
- Every 3D canvas is client-only and lazy (`next/dynamic` with `ssr:false` inside a client wrapper, or mount after `useEffect`), pauses when off-screen (`frameloop="demand"` or IntersectionObserver), caps DPR at 1.5, and respects `prefers-reduced-motion`.
- GSAP: register ScrollTrigger once; use `useGSAP` for cleanup. Lenis drives ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` + gsap ticker).
- Mobile-first, works at 375px. No horizontal overflow.
- Accessibility: semantic landmarks, alt text, focus states, reduced motion fallbacks.
- `npm run build` and `npx tsc --noEmit` must pass.
