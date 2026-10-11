# Page title design verification

> Historical QA from 11 October, published in PR #26 after owner preview approval. Publication is complete; the preview-only statements below describe the earlier checkpoint. See the [release ledger](../README.md#release-ledger) and [current design contract](../../DESIGN.md). Checks and screenshots below apply to their recorded version; this cleanup did not repeat browser QA.

11 October 2026. Preview: [Home](http://localhost:4102/) and [Calendar](http://localhost:4102/calendar/). Owner preview approval is required before merging under [AGENTS.md](../../AGENTS.md).

All page titles use the existing shared Georgia/Times serif h1 style, regular weight, with natural wrapping. Removed forced line breaks, italic/underlined second lines and the smaller article-title override. PageIntro accepts plain title strings. Home still reads its headline from the root content; article/member wording, publication dates, descriptions and section headings are preserved. The playground follows the same title treatment.

## Validation

- Design guard, eleven existing calendar date/data tests, TypeScript and static export passed locally on Node 24: 25 generated routes and 21 legacy redirects.
- All 19 production content routes plus the default playground export have one plain h1, no nested title markup and unchanged title wording compared with the prior export. Framework error pages and legacy redirect stubs are excluded.
- 76 browser layout checks cover every production content route at 1440px and 375px in both paper and charcoal. Computed title typography is identical across routes: 79.92px / 87.1128px line height on desktop, 43.875px / 48.2625px on mobile; Georgia/Times, normal style, weight 400 and no decoration.
- 20 additional production checks cover Home, Calendar, the longest article, Projects and Community at 903px and 320px in both themes. Font sizes remain shared at 63px and 42px respectively. No document overflow, broken loaded images or decorated title children occurred.
- Navigation from the mobile menu to Calendar, Escape dismissal/focus return, visible keyboard focus, appearance switching and persistence passed. Calendar still defaults to 7 October, supports manual 6 October selection, leaves empty November unselected and restores the current month.
- Twelve fresh screenshots below were visually inspected. Long article titles wrap fully on mobile, and the homepage illustration/Claude attribution remains coordinated with the plain heading.
- A targeted mobile About WCAG A/AA accessibility scan found zero violations and zero incomplete findings. Browser errors, hydration errors and console messages were absent.

Twelve playground checks cover Home, Explore and Community at 1440px/375px in both actual theme states, with matching plain title typography and no overflow. See [layout and interaction results](page-titles/results.json). This is a reviewable branch preview; publication awaits owner approval.

## Screenshots

| Page | Desktop paper | Desktop charcoal | Mobile paper | Mobile charcoal |
| --- | --- | --- | --- | --- |
| Home | [1440px](page-titles/home-1440-paper.png) | [1440px](page-titles/home-1440-charcoal.png) | [375px](page-titles/home-375-paper.png) | [375px](page-titles/home-375-charcoal.png) |
| Calendar | [1440px](page-titles/calendar-1440-paper.png) | [1440px](page-titles/calendar-1440-charcoal.png) | [375px](page-titles/calendar-375-paper.png) | [375px](page-titles/calendar-375-charcoal.png) |
| Long article | [1440px](page-titles/article-1440-paper.png) | [1440px](page-titles/article-1440-charcoal.png) | [375px](page-titles/article-375-paper.png) | [375px](page-titles/article-375-charcoal.png) |
