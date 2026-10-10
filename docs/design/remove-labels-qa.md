# Decorative label removal — 10 October 2026

The owner approved removal of the decorative monospaced captions and section/page labels after reviewing the complete scope. The hero prerequisite sentence, artwork captions, collaboration-strip slogan, section/page eyebrows, activity/project labels and recruitment/calendar labels are deleted from production and the matching playground. Following the owner's final clarification, only In collaboration with and the official Claude logo remain as a plain linked footer within the hero illustration frame. The headline and illustration are top-aligned on desktop. The full-width band and supporting programme paragraph are removed. Journal publication dates use regular Arial/Helvetica typography.

## Verification

- `npm run build` passed with the design guard, TypeScript checks, 25 exported routes and 21 legacy redirect stubs. Local runtime: Node 24.19.0; Node 20 Linux validation is provided by PR CI.
- Twenty HTML pages (nineteen production pages and the playground) passed removed-label, single-h1 and retained Join-heading checks. Home, Journal and the story retain the existing publication date. Source comparison confirmed that all heading and image elements remain.
- Home, About, Projects, Explore, Community, Journal, Calendar and Committee pages checked at 1440px and 375px in Warm Paper and Charcoal. Final screenshots captured after the completed build. No missing images, document overflow or missing `aria-labelledby` targets; removed captions stay absent. Useful publication dates use the regular font. The calendar retains its intentional horizontal dates-region scroll on mobile.
- Mobile menu opens; Escape closes it and returns focus. Theme selection persists across navigation. Workshop filtering and reset work. Calendar month navigation and session selection update matching details. Contact, story, activity and member detail pages passed the shared-intro checks. Playground Home/Explore and appearance controls passed at desktop/mobile widths.
- Browser console and page error logs are empty for the final review batches and interaction checks. No full accessibility certification or external signup submission was performed.
- Visual review caught an inline caption removal that also removed the shared Join heading and prose; both were restored before the final build and screenshots. Final checks explicitly require retained Join content and valid labelled-region targets.
- `git diff --check` passed. Calendar data, collection bodies, portraits and project images have no changes. Owner-owned `.zcode/`, copied public assets and build outputs are excluded from the commit.

## Screenshots

The original removal screenshots and structured checks are in [the evidence folder](remove-labels-2026-10-10/). The latest Home/playground screenshots are in the coordinated hero revision below. Earlier strip, supporting-copy and boxed-badge screenshots remain as historical evidence; those layouts have been superseded.

| Surface | Desktop, Warm Paper | Mobile, Warm Paper | Desktop, Charcoal | Mobile, Charcoal |
| --- | --- | --- | --- | --- |
| Home | [Image](remove-labels-2026-10-10/home-1440-paper.jpg) | [Image](remove-labels-2026-10-10/home-375-paper.jpg) | [Image](remove-labels-2026-10-10/home-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/home-375-charcoal.jpg) |
| Explore | [Image](remove-labels-2026-10-10/events-1440-paper.jpg) | [Image](remove-labels-2026-10-10/events-375-paper.jpg) | [Image](remove-labels-2026-10-10/events-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/events-375-charcoal.jpg) |
| Journal | [Image](remove-labels-2026-10-10/blogs-1440-paper.jpg) | [Image](remove-labels-2026-10-10/blogs-375-paper.jpg) | [Image](remove-labels-2026-10-10/blogs-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/blogs-375-charcoal.jpg) |

## Compact collaboration attribution revision

The owner requested retaining In collaboration with Claude. A shared Home/playground component now places the regular-font label beside the existing official logo/link, directly after the hero. The existing warm strip keeps the black wordmark readable in both themes. Reduced padding and gap bring the strip to 70px high; no new decoration or animation was added.

- Design guard and static build passed again (25 routes, 21 legacy redirects).
- Twelve focused checks covered Home and playground at 1440px, 375px and 320px in both themes. The label and logo remain aligned in a single row; the official image loads, destination and link attributes are correct, the link has a visible keyboard focus outline and a 44px minimum height, and no document overflows.
- Eight fresh desktop/mobile screenshots were inspected in both themes. Other decorative labels and the prerequisite sentence remain absent. Browser error and console logs are empty. No additional external signup or full accessibility audit was performed for this narrow revision.
- [Structured checks](remove-labels-2026-10-10/collaboration/checks.json), [browser errors](remove-labels-2026-10-10/collaboration/errors.json) and [console log](remove-labels-2026-10-10/collaboration/console.json).

| Surface | Desktop, Warm Paper | Mobile, Warm Paper | Desktop, Charcoal | Mobile, Charcoal |
| --- | --- | --- | --- | --- |
| Home | [Image](remove-labels-2026-10-10/collaboration/home-1440-paper.jpg) | [Image](remove-labels-2026-10-10/collaboration/home-375-paper.jpg) | [Image](remove-labels-2026-10-10/collaboration/home-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/collaboration/home-375-charcoal.jpg) |
| Playground | [Image](remove-labels-2026-10-10/collaboration/playground-1440-paper.jpg) | [Image](remove-labels-2026-10-10/collaboration/playground-375-paper.jpg) | [Image](remove-labels-2026-10-10/collaboration/playground-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/collaboration/playground-375-charcoal.jpg) |

## Collaboration copy revision

The owner requested a more appealing explanation of the collaboration. The sentence now stored once in `index.md` front matter is:

> Through the Claude Builder Club programme, we help Cambridge students turn ideas into working projects, learn from one another and connect with builders around the world.

It draws on the root About introduction, the [club launch article](../../_blogs/claude-builder-program.md) and the [official campus programme](https://claude.com/programs/campus), checked on 10 October 2026. The programme describes student-led learning activities and worldwide student connections. The copy adds no promises about credits, guest speakers or ambassador benefits.

The existing attribution/logo row remains, with one centered regular-font paragraph underneath. Production and playground receive the same loaded root content. No additional heading, CTA, visual asset or motion is introduced.

- Design guard and static build passed (25 routes, 21 legacy redirects); `git diff --check` passed.
- Sixteen focused Home/playground checks at 1440px, 903px, 375px and 320px in both themes passed. Exact source copy, 14px body typography, a maximum 700px reading width, natural wrapping, retained single-row attribution, image loading, link destination and visible keyboard focus were verified. No document overflow; decorative captions remain absent.
- Eight fresh desktop/mobile screenshots were inspected. Browser errors and console messages are empty. A full accessibility audit and external signup submission were not repeated for this copy/layout revision.
- [Structured checks](remove-labels-2026-10-10/collaboration-copy/checks.json), [browser errors](remove-labels-2026-10-10/collaboration-copy/errors.json) and [console log](remove-labels-2026-10-10/collaboration-copy/console.json).

| Surface | Desktop, Warm Paper | Mobile, Warm Paper | Desktop, Charcoal | Mobile, Charcoal |
| --- | --- | --- | --- | --- |
| Home | [Image](remove-labels-2026-10-10/collaboration-copy/home-1440-paper.jpg) | [Image](remove-labels-2026-10-10/collaboration-copy/home-375-paper.jpg) | [Image](remove-labels-2026-10-10/collaboration-copy/home-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/collaboration-copy/home-375-charcoal.jpg) |
| Playground | [Image](remove-labels-2026-10-10/collaboration-copy/playground-1440-paper.jpg) | [Image](remove-labels-2026-10-10/collaboration-copy/playground-375-paper.jpg) | [Image](remove-labels-2026-10-10/collaboration-copy/playground-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/collaboration-copy/playground-375-charcoal.jpg) |

## Hero collaboration lockup revision

The owner requested retaining only In collaboration with Claude and improving its presentation. The final UI integrates a compact warm lockup beneath the hero actions, aligned with the heading and prose. The whole label/logo unit is a single existing Claude link with a 52px target; its border changes on hover without movement. The official asset remains unchanged and renders at its natural 573:125 proportions. Production and playground share the component.

The full-width band, supporting sentence, root supporting-copy field, loader property, prop and unused band styles are removed. The primary and secondary hero actions remain.

- Design guard and static build passed (25 exported routes, 21 legacy redirects); `git diff --check` passed.
- Sixteen focused Home/playground checks at 1440px, 903px, 375px and 320px in both themes passed: one link inside the hero copy, left alignment, placement below actions, fitting within the copy column, correct label/logo/destination, regular 13px font, 52px target, visible keyboard focus and border hover feedback without movement.
- Eight fresh desktop/mobile screenshots were inspected. Supporting copy and obsolete band stay absent; no document overflow, missing logo or browser errors/messages. A full accessibility audit and external signup submission were not repeated for this narrow revision.
- [Structured checks](remove-labels-2026-10-10/hero-collaboration/checks.json), [browser errors](remove-labels-2026-10-10/hero-collaboration/errors.json) and [console log](remove-labels-2026-10-10/hero-collaboration/console.json).

| Surface | Desktop, Warm Paper | Mobile, Warm Paper | Desktop, Charcoal | Mobile, Charcoal |
| --- | --- | --- | --- | --- |
| Home | [Image](remove-labels-2026-10-10/hero-collaboration/home-1440-paper.jpg) | [Image](remove-labels-2026-10-10/hero-collaboration/home-375-paper.jpg) | [Image](remove-labels-2026-10-10/hero-collaboration/home-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/hero-collaboration/home-375-charcoal.jpg) |
| Playground | [Image](remove-labels-2026-10-10/hero-collaboration/playground-1440-paper.jpg) | [Image](remove-labels-2026-10-10/hero-collaboration/playground-375-paper.jpg) | [Image](remove-labels-2026-10-10/hero-collaboration/playground-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/hero-collaboration/playground-375-charcoal.jpg) |

## Coordinated hero revision

The final layout places the plain In collaboration with Claude link in a footer of the existing illustration frame. A matching thin rule separates it from the artwork; the existing warm surface keeps the unchanged official logo readable in both themes. The standalone badge is removed from the copy column, and the headline and illustration frame are top-aligned on desktop. The original illustration image area, contain sizing and orange offset remain. Home and playground share this structure and component.

- Design guard and static build passed (25 routes, 21 legacy redirects); `git diff --check` passed.
- Twenty focused Home/playground checks at 1680px, 1440px, 903px, 375px and 320px in both themes passed. Desktop top alignment, a single footer within the frame after the image, label/logo fit, image loading and preserved image heights (448px/378px/333px inside the former bordered frames) were checked. The official logo remains at natural 573:125 proportions with no inherited illustration padding or animation.
- Both hero actions remain. The footer has a 52px target, an inset visible focus outline and an underline on label hover without movement. The supporting copy, separate badge and old band remain absent. No document overflow or browser errors/messages.
- Ten fresh screenshots were inspected: Home and playground at 1440px/375px in both themes, plus wide Home at 1680px in both themes. No full accessibility audit or external signup submission was repeated for this layout revision.
- [Structured checks](remove-labels-2026-10-10/coordinated-hero/checks.json), [browser errors](remove-labels-2026-10-10/coordinated-hero/errors.json) and [console log](remove-labels-2026-10-10/coordinated-hero/console.json).

| Surface | Desktop, Warm Paper | Mobile, Warm Paper | Desktop, Charcoal | Mobile, Charcoal |
| --- | --- | --- | --- | --- |
| Home | [Image](remove-labels-2026-10-10/coordinated-hero/home-1440-paper.jpg) | [Image](remove-labels-2026-10-10/coordinated-hero/home-375-paper.jpg) | [Image](remove-labels-2026-10-10/coordinated-hero/home-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/coordinated-hero/home-375-charcoal.jpg) |
| Playground | [Image](remove-labels-2026-10-10/coordinated-hero/playground-1440-paper.jpg) | [Image](remove-labels-2026-10-10/coordinated-hero/playground-375-paper.jpg) | [Image](remove-labels-2026-10-10/coordinated-hero/playground-1440-charcoal.jpg) | [Image](remove-labels-2026-10-10/coordinated-hero/playground-375-charcoal.jpg) |

Wide Home: [Warm Paper](remove-labels-2026-10-10/coordinated-hero/home-1680-paper.jpg), [Charcoal](remove-labels-2026-10-10/coordinated-hero/home-1680-charcoal.jpg).

## Review boundary

Preview: http://localhost:4102/. The server remains running for owner review. The pull request remains open until the owner has tested the local preview and approved merging. The site has not been published by this change.