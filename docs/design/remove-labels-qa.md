# Decorative label removal — 10 October 2026

The owner approved removal of the decorative monospaced captions and section/page labels after reviewing the complete scope. The hero prerequisite sentence, artwork captions, collaboration-strip text, section/page eyebrows, activity/project labels and recruitment/calendar labels are deleted from production and the matching playground. The official Claude logo stays visible. Journal publication dates use regular Arial/Helvetica typography.

## Verification

- `npm run build` passed with the design guard, TypeScript checks, 25 exported routes and 21 legacy redirect stubs. Local runtime: Node 24.19.0; Node 20 Linux validation is provided by PR CI.
- Twenty HTML pages (nineteen production pages and the playground) passed removed-label, single-h1 and retained Join-heading checks. Home, Journal and the story retain the existing publication date. Source comparison confirmed that all heading and image elements remain.
- Home, About, Projects, Explore, Community, Journal, Calendar and Committee pages checked at 1440px and 375px in Warm Paper and Charcoal. Final screenshots captured after the completed build. No missing images, document overflow or missing `aria-labelledby` targets; removed captions stay absent. Useful publication dates use the regular font. The calendar retains its intentional horizontal dates-region scroll on mobile.
- Mobile menu opens; Escape closes it and returns focus. Theme selection persists across navigation. Workshop filtering and reset work. Calendar month navigation and session selection update matching details. Contact, story, activity and member detail pages passed the shared-intro checks. Playground Home/Explore and appearance controls passed at desktop/mobile widths.
- Browser console and page error logs are empty for the final review batches and interaction checks. No full accessibility certification or external signup submission was performed.
- Visual review caught an inline caption removal that also removed the shared Join heading and prose; both were restored before the final build and screenshots. Final checks explicitly require retained Join content and valid labelled-region targets.
- `git diff --check` passed. Calendar data, collection bodies, portraits and project images have no changes. Owner-owned `.zcode/`, copied public assets and build outputs are excluded from the commit.

## Screenshots

All final screenshots and structured checks are in [the evidence folder](remove-labels-2026-10-10/).

| Surface | Desktop, Warm Paper | Mobile, Warm Paper | Desktop, Charcoal | Mobile, Charcoal |
| --- | --- | --- | --- | --- |
| Home | [Image](remove-labels-2026-10-10/home-1440-paper.jpg) | [Image](remove-labels-2026-10-10/home-375-paper.jpg) | [Image](remove-labels-2026-10-10/home-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/home-375-charcoal.jpg) |
| Explore | [Image](remove-labels-2026-10-10/events-1440-paper.jpg) | [Image](remove-labels-2026-10-10/events-375-paper.jpg) | [Image](remove-labels-2026-10-10/events-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/events-375-charcoal.jpg) |
| Journal | [Image](remove-labels-2026-10-10/blogs-1440-paper.jpg) | [Image](remove-labels-2026-10-10/blogs-375-paper.jpg) | [Image](remove-labels-2026-10-10/blogs-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/blogs-375-charcoal.jpg) |

## Review boundary

Preview: http://localhost:4102/. The server remains running for owner review. The pull request remains open until the owner has tested the local preview and approved merging. The site has not been published by this change.