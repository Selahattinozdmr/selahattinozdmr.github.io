# Selahattin Özdemir — Portfolio

Bilingual (TR/EN) technical-minimal single-page portfolio built with Next.js. The
site is a static export deployed to GitHub Pages.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- Motion (`motion/react`) for a purposeful, reduced-motion-safe motion layer
- Space Grotesk (display) + Inter (body) + JetBrains Mono (labels)
- Static export (`output: "export"`); no server runtime, no GSAP/Lenis/video

Project images are decorative **temporary preview** assets. They are not real
product screenshots and are meant to be replaced with actual captures when
available.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (redirects to `/tr/`).

## Build and verify

```bash
npm run build
npm run verify
npx tsc --noEmit
npm run lint
```

`npm run build` writes the static site to `out/`. `npm run verify` checks that
the export contains both locales, the root redirect, media assets, basePath-aware
canonical/hreflang/OG URLs (exactly once), SSR-visible content, light/dark
contrast, the technical-minimal section structure, and that the legacy video/GSAP/Lenis
files and dependencies are gone.

## Preview the static export

`next start` does not serve a static export. After `npm run build`, preview the
generated `out/` directory with:

```bash
npm run start
```

This runs `npx serve out` and serves the exported site locally (default
`http://localhost:3000`).

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes `out/` on
every push to `main`.

1. Rename the repository to `selahattinozdmr.github.io` (user site).
2. In GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Push to `main`.

If the repository keeps a different name, the workflow automatically uses the
project-site path (`/<repo>/`) for `basePath` and the canonical site URL, so the
deployment still works.

## Docs

- Design: `docs/superpowers/specs/2026-11-25-portfolio-technical-minimal-motion-design.md`
- Implementation plan: `docs/superpowers/plans/2026-11-25-portfolio-technical-minimal-motion.md`
- Previous design: `docs/superpowers/specs/2026-11-25-portfolio-editorial-redesign-design.md`
- Superseded design: `docs/superpowers/specs/2026-11-25-portfolio-simplify-github-pages-design.md`
