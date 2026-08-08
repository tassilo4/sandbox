# Component Sites Section — Design

## Purpose

Add a section to the home page listing component/UI sites the user likes (e.g. componentry.dev), organized into groups, so the personal site doubles as a curated reference library.

## Data

`data/component-sites.ts` exports a plain array:

```ts
export type ComponentSite = {
  name: string;
  url: string;
  group: string;
};

export const componentSites: ComponentSite[] = [
  { name: "Componentry", url: "https://componentry.dev/docs", group: "Component Libraries" },
];
```

Seeded with just the one entry; the user adds more by editing this file directly. No admin UI, no database.

## OG image fetching

`lib/og-image.ts` exports `getOgImage(url: string): Promise<string | null>`:

- Server-side only (called from a Server Component).
- Fetches the target URL's HTML with `fetch(url, { next: { revalidate: 86400 } })` (this project is Next.js 16 without the `cacheComponents` flag enabled, so standard `fetch` + time-based revalidation is the correct caching mechanism, not the `use cache` directive).
- Extracts the `<meta property="og:image" content="...">` value via a regex over the response text (no HTML parser dependency needed for a single tag).
- Wrapped in try/catch; returns `null` on network failure, non-2xx response, or missing tag. Callers must treat `null` as "no image" and render a fallback — this is expected/normal for sites without OG tags, not an error state to surface.

## Component

`components/component-sites-section.tsx` — an async Server Component:

- Groups `componentSites` by `group` (preserving first-seen group order).
- Renders one `<section>` per group: a heading (group name) followed by a responsive card grid.
- Resolves OG images for all sites in parallel via `Promise.all`.
- Each card:
  - Whole card is an `<a href={url} target="_blank" rel="noopener noreferrer">`.
  - OG image on top at a fixed aspect ratio, `object-cover`; if `null`, renders a plain zinc placeholder block instead (no broken-image icon, no layout shift).
  - Site name below the image.
  - Styling matches the existing minimal zinc/dark-mode palette already used in `app/page.tsx` (`bg-zinc-50 dark:bg-black` etc.): rounded border, subtle hover state.

## Integration

`app/page.tsx`'s `<main>` is currently empty. Render `<ComponentSitesSection />` inside it.

## Error handling

- OG image fetch failures are silently absorbed (see above) — never break page render.
- No client-side JS required; everything resolves server-side before the page is sent.

## Out of scope

- No filtering/tabs UI for groups (grouped sections with headings only, per user choice).
- No screenshot fallback if OG image is missing — just the placeholder block.
- No caching layer beyond Next's built-in `fetch` revalidation.
