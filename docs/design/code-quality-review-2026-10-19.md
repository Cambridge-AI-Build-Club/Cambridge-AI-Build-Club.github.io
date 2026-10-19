# Code-quality and UX branch review

Reviewed on 19 October 2026 against `main` at `ddf073b`. The inherited branch contained `f627812` and `47792a1`. This record describes the follow-up review and local verification; it is not a publication receipt.

The shared types, contextual content errors, data-driven navigation, common journal card and improved calendar breakpoint are useful changes. The review found the regressions below and corrected them while preserving the approved design and factual content.

## Findings and improvements

| Priority | Finding | Correction |
| --- | --- | --- |
| P2 | The new global 404 had no exported stylesheet links. The mobile logo rendered at 600px and the document overflowed to 608px. | Use one actual `app/layout.tsx` for SiteDocument and global styles. The 404 inherits it; the playground keeps its metadata and local surface controls. Add a post-export regression test. |
| P2 | Opening the mobile menu and resizing above its breakpoint kept `menuOpen` true, leaving main and footer inert on desktop. | Close the menu when the viewport crosses to desktop. Check resizing, Escape focus return and navigation in the browser. |
| P2 | File, parsed-data, collection and calendar caches survived content edits in `next dev`. | Bypass all loader caches outside production. Regression tests edit isolated YAML, Markdown and JSON fixtures, add a collection entry, and verify subsequent reads. Production caching is checked separately. |
| P2 | New radio filters exposed radio semantics without arrow-key selection or a single tab stop. | Share ActivityFilters between production and the playground, with roving tabindex and wrapping arrow-key selection. |
| P2 | Card headings, descriptions, member roles and publication dates were marked `aria-hidden`, removing substantive content from screen-reader browsing. | Keep concise link names and decorative pseudo-actions, while exposing the real headings and supporting content. |
| P2 | Home passed an already-prefixed image URL to `absoluteUrl`, duplicating a nonempty deployment base path. | Resolve the unprefixed source path once for canonical metadata. Add an exported social-image check and base-path loader assertions. |
| P3 | The pre-paint theme script intentionally changed the root attribute before React hydrated it. | Mark that root attribute as an intentional hydration difference; retain pre-paint restoration and verify navigation/reload persistence. |
| P3 | The no-JavaScript calendar showed both its notice and a perpetual loading message. | Hide the client loading status inside the no-script fallback; verify with JavaScript disabled. |
| P3 | `activities.discover` was added to UI copy but the loader still hardcoded the English label. | Interpolate the shared UI-copy pattern in the activity loader. |

The global root layout was recorded in DESIGN.md before implementation. Its saved production theme selector targets `.lab.site`, so a dark production preference cannot override the playground's paper controls. No portrait, historical asset, calendar record, role or recruitment term changed. Unrelated `.workbuddy/` remains untouched.

## Local verification

- Windows, Node 24.19.0. The production build passed the design guard, 20 image references against 25 assets, eleven calendar tests, three content-loader tests, TypeScript and static export. Two additional post-export tests pass for 404 styles and Home social-image metadata. These checks now run with `npm run build`; Node 20 Linux CI is a separate gate.
- Playwright: 36 screenshots captured across Home, Explore, Community, Journal, Calendar, Projects and the unknown-route 404, at 1440px and 375px in both themes; Calendar also captured at 761px, 900px, 1000px and 1100px in both themes. Representative full-page captures were visually inspected for shared layout, cards, titles, logo/illustration treatment, wrapping, calendar names and footer fit. No broken images, horizontal document overflow, console errors or hydration errors were observed in that run.
- Browser interactions: radio arrows and wrapping, roving tabindex, exposed card headings, mobile inert state, Escape and focus return, desktop resize dismissal, navigation, theme persistence across navigation/reload, current/consecutive/year-boundary calendar navigation, empty months, event selection, scroll-region focusability, playground filter parity and independent surface controls, and no-JavaScript fallback all passed.
- Static preview smoke checks: 21 exported HTML routes returned 200, including retained hidden member URLs and the explicit `/404/` export. Twenty-nine unique local links/resources returned 200. Unknown URLs returned 404 with the styled shell; malformed URL encoding returned 400; the legacy `/CUABC-Web/calendar/` redirect stub returned 200 with a refresh target. Home's social-image URL is absolute and correct at the default deployment path. The four hidden members stay out of the sitemap.
- axe-core 4.10.3: 24 targeted WCAG A/AA scans across Home, Explore, Community, Journal, Calendar and 404 at desktop/mobile in both themes reported no violations. The mobile calendar left 17 contrast nodes incomplete in each theme because of its clipped scrolling grid. Calendar colors were manually reviewed in screenshots; this is not a completed automated contrast audit or a screen-reader test.
- agent-browser could not start because its installed package lacks the Windows executable. Browser checks used the available bundled Playwright runtime instead. Temporary tooling, full screenshots and machine-readable reports remain under ignored `tmp/agent-review/`.

## Retained screenshots

- 404 regression: [before the root-layout fix](code-quality-review-2026-10-19/404-before.png), [fixed mobile paper](code-quality-review-2026-10-19/404-375-paper.png), [fixed mobile charcoal](code-quality-review-2026-10-19/404-375-charcoal.png).
- Calendar at 900px: [paper](code-quality-review-2026-10-19/calendar-900-paper.png), [charcoal](code-quality-review-2026-10-19/calendar-900-charcoal.png).
- Home at 1440px: [paper](code-quality-review-2026-10-19/home-1440-paper.png), [charcoal](code-quality-review-2026-10-19/home-1440-charcoal.png).

## Remaining suggestions and release gates

- A future owner-supplied wide-format club logo could improve the desktop header. The existing artwork decision remains open; this review does not crop or replace it.
- Consider stronger value/type validation for the remaining presence-only content assertions when those schemas next change. Current source data builds successfully; no additional content framework is introduced here.
- Real screen-reader testing would complement the keyboard, semantic-role and axe checks.
- Local preview: `http://localhost:4102/`. Owner testing/approval, PR build CI, squash merge and final Pages/live verification remain separate gates. No merge or deployment is claimed by this local report.
