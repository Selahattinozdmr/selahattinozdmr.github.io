# Selahattin Özdemir — Portfolio

Bilingual (TR/EN) editorial single-column portfolio with a case-study page per
project, built with Next.js. The site is a static export deployed to GitHub Pages.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- Inter (display/body) + JetBrains Mono (labels)
- Static export (`output: "export"`); no server runtime and no animation library

Project images under `public/images/work/` are real screenshots captured from the
live sites (autosuchen24.ch, takasgoglobal.com.tr, nerdeyemek.com). Mutfix and
Online Quiz have no live site, so their cards stay typographic with no image.

## Structure

- `/` redirects to the visitor's language; `/tr/` and `/en/` are the single-column
  home pages.
- `/[lang]/work/[id]/` is one static case-study page per project and locale
  (10 pages), generated from `src/content/projects.ts`.
- `robots.txt` and `sitemap.xml` are generated at build time from the same
  project list.
- `global-not-found.tsx` produces a styled bilingual `404.html`.
- Copy lives in `src/content/tr.ts` and `src/content/en.ts`; shared project data
  (stack, links, images) lives in `src/content/projects.ts`.

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
the export contains both locales, the root redirect, all five case-study pages
per locale (with `h1`, canonical and hreflang), `robots.txt`, `sitemap.xml`, the
styled 404, JSON-LD and Open Graph metadata, every project image, basePath-aware
canonical/hreflang/OG URLs (exactly once), SSR-visible content, and light/dark
contrast.

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

- Design / implementation plan: `docs/plans/2026-11-26-editorial-case-study-redesign.md`
- Superseded plans and specs: `docs/archive/`
