# Selahattin Özdemir — Portfolio

Bilingual (TR/EN) single-page portfolio built with Next.js. The site is a static
export deployed to GitHub Pages.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- GSAP + ScrollTrigger, Motion, Lenis
- Static export (`output: "export"`); no server runtime

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
URLs, and the accessibility/structure invariants used during the redesign.

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

- Design: `docs/superpowers/specs/2026-11-25-portfolio-simplify-github-pages-design.md`
- Implementation plan: `docs/superpowers/plans/2026-11-25-portfolio-simplify-github-pages.md`
