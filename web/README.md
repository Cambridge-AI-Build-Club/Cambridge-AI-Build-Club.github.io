# Website architecture and development

The Cambridge AI Builder Club website is a Next.js 15 App Router static export. Root content is loaded at build time; the production UI follows the [design contract](../DESIGN.md). See [contributor rules](../AGENTS.md), [documentation index](../docs/README.md) and [deployment runbook](CUTOVER.md).

## Commands

CI uses Node 20 and the committed npm lockfile. Run these from `web/`:

```bash
npm ci
npm run dev                            # http://localhost:3000/
npm run check:design                   # icon and contract policy
npm run test:calendar                  # focused Node date/data tests
npm run build                          # static export into out/
node scripts/serve.mjs out 4102         # http://localhost:4102/
```

Prebuild runs the design guard, calendar tests and `sync-assets.mjs`; the export validates TypeScript and then generates legacy redirect stubs. `npm install` is appropriate when intentionally updating dependencies; review the lockfile diff. There is no repository-wide lint command or broad application test suite. Local QA previously used Node 24; that historical result does not replace Node 20 Linux CI.

## Content and assets

| Source | Use |
| --- | --- |
| Root page Markdown | Page titles, introductions, prose and Home front matter |
| `_events/`, `_blogs/`, `_team/` | Activity formats, journal entries, member profiles and listing summaries |
| `_data/menus.yml`, signup/contact/Discord/social/SEO files | Navigation, real action destinations and metadata |
| `_data/features.json` | Activity title/image mapping; descriptions stay in `_events/` |
| `_data/projects.yml` | One shared project record for About and Projects |
| `_data/calendar.json` | Dated calendar records and explicit statuses |
| `_config.yml` | Club name and logo configuration |
| `images/` | Source assets copied into ignored `public/images/` before dev/build |

Content loaders in `lib/content.ts` and `lib/site.ts` read these sources in place. `lib/markdown.tsx` renders prose with react-markdown and heading IDs; marked supplies build-time excerpts. No content copy belongs in `web/`.

`scripts/sync-assets.mjs` replaces the public image copy on every run. A stale public file cannot establish that a source image reference is valid; verify from a clean sync. Keep generated `out/`, `.next/` and `public/images/` out of Git.

## Templates and styles

- Routes live in `app/`, with shared `SiteDocument`, `SiteFrame`, `Shell`, `SiteSections` and `ArticlePage` components.
- `SiteDocument` loads `styles/claude.css` and `styles/site.css`. The playground uses the same design system and shared content; it is a review surface, excluded from the production sitemap and marked noindex.
- `components/Icon.tsx` is the only UI-icon entry point: locally bundled Morphicons React binding with Lucide data, server-rendered SVGs and reduced-motion support.
- Appearance defaults to Warm Paper and persists an optional `cbc-surface` browser preference. Every page title follows the same plain serif style, with natural wrapping.
- Projects use the shared `ProjectPreview` component and a documentary screenshot. Member listing visibility is driven by `promoted`; see AGENTS.md for the exact rules.

The retained `styles/globals.scss` / root `assets/css/style.scss` mirrors and `_sass/` serve the legacy design, not the production CSS. Root Jekyll templates remain recovery inputs; they do not establish current visual parity.

## Calendar

`lib/calendar.ts` loads `_data/calendar.json`; `components/CalendarApp.tsx` and `lib/calendar-dates.ts` supply interaction and date logic. The calendar computes today in Europe/London after hydration, refreshes it every minute and on visibility changes, and opens on the current month rather than the build month or first populated month.

Previous/next navigate consecutive months across years and empty schedules. Current month resets navigation. Weeks start on Monday. Explicit selection is retained within the displayed month; otherwise choose the nearest event today or later, falling back to the latest past event and preferring non-cancelled records. Empty months have no selection. Selected details appear before the chronological list; busy lists and the mobile grid have keyboard-reachable scrolling regions.

Each day of a multi-day event gets its own record. Preserve `id`, ISO `date`, `time`, `title`, `location`, `type` and the `archived` / `completed` / `scheduled` / `cancelled` status. The current UI labels archived and completed records as Completed. Tests cover London date boundaries, month/year navigation, leap years, ordering, selection and data preservation. Test/event totals belong to dated QA, not permanent architecture rules.

The legacy `_layouts/calendar.html` contains a separate hard-coded schedule. Updating JSON does not update that script; legacy recovery requires a divergence review.

## URLs and static hosting

The repository `Cambridge-AI-Build-Club.github.io` serves at the [organisation root](https://cambridge-ai-build-club.github.io/). `next.config.mjs` sets `output: 'export'`, `trailingSlash: true` and unoptimized images. There is no runtime Next.js server.

`NEXT_PUBLIC_BASE_PATH` defaults to empty; CI uses the Pages-reported base path. `NEXT_PUBLIC_SITE_ORIGIN` overrides the default canonical origin. Internal URLs use `url()`; canonical URLs use `absoluteUrl()`. Collection slugs preserve underscores. Static sitemap/robots routes declare `dynamic = 'force-static'`.

`scripts/gen-redirects.mjs` generates meta-refresh stubs under `out/CUABC-Web/` for old project-page URLs when exporting at the root. Keep these stubs. GitHub Pages supplies no application server for HTTP redirects.

## Builds and release

`.github/workflows/nextjs-ci.yml` runs the build-only check on every PR, including content and documentation changes. Its `DESIGN_BASE_SHA` enables the committed-diff design check. `.github/workflows/nextjs.yml` builds and deploys on main pushes and manual dispatch; publication follows the branch, preview, approval and squash-merge rules in AGENTS.md.

`netlify.toml` also builds **Next.js** into `web/out`; it is not a Jekyll fallback configuration. The retained Jekyll workflow is manual-only. Use [CUTOVER.md](CUTOVER.md) for recovery, and [dated design evidence](../docs/README.md#design-evidence) for historical migration decisions and checks.
