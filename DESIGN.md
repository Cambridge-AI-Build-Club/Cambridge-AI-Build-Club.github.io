# Cambridge AI Builder Club design rules

Last updated: 11 October 2026. Applies to all production Next.js routes and the design playground.

## Maintain this document first

This is the living UI/UX contract for contributors and coding agents. Agents maintain it as part of design work; it is not an autonomous background process.

Before changing a layout, component, icon, animation, navigation, visual asset or interaction:

1. Read this file, `AGENTS.md`, the user's current request and the affected source files.
2. Update this file **before editing the implementation**. Record the requested change, affected surfaces, intended interaction and acceptance checks in the [change record](docs/design/change-record.md). Amend the relevant rules when the user changes a design decision.
3. Preserve existing approved decisions unless the current request changes them. The user's explicit instructions take precedence; record the new decision rather than silently keeping contradictory rules.
4. Implement against the updated contract. Share components between production and playground instead of creating competing design systems.
5. Build and inspect the result. Update the same change record with actual verification and any limitation. Never mark a check passed or a change published before verifying it.
6. Include `DESIGN.md` with the design changes in any commit/PR. Keep the active rules concise; keep dated decisions and evidence links in the [change record](docs/design/change-record.md). Remove obsolete active rules when replacing them.

For a fix that preserves the rules, add a change record explaining the regression and its checks; a new design direction is unnecessary. Implementation discoveries that change the intended design must be recorded here before applying them. A new agent should be able to continue using this file without chat history.

`AGENTS.md` points every agent to this workflow. `npm run check:design` checks icon usage and requires a `DESIGN.md` update alongside uncommitted UI/style/visual-asset changes before builds. PR CI also compares the committed changes against its base and requires this file in the same change. Agents still follow the update-first order above; the automated check verifies that the maintained contract accompanies the implementation. When appending to the separate change record, update this contract in the same change; CI still requires `DESIGN.md` itself.

## Identity and assets

- The official name is **Cambridge AI Builder Club**, with singular Builder. Claude is the collaboration partner; retain the approved official Claude palette and a compact collaboration attribution in the footer of the homepage hero illustration frame.
- The header uses the existing club logo image alone, linking home with an accessible club-name label. Do not add a duplicate text title beside it. Use the configured compact logo on mobile.
- The footer copyright is **© 2026 Cambridge AI Builder Club**, read from `_data/seo.yml`. Do not restore the removed bottom location/edition line.
- Reuse the existing club marks, hero illustration and real member portraits. Source partner logos from official publishers and retain their geometry, proportions and colors. Never generate partner logos.
- The three approved activity illustrations are decorative artwork. Brand marks and illustration assets retain their source files, and portraits keep their photographed composition (see the portrait delivery rule below); interactive UI pictograms follow the icon rules below.
- Generate new imagery only for a concrete gap in the existing inventory. Record its purpose, source/prompt, intended size and accessible treatment before generation. Never fabricate team portraits or event photography.
- Static assets live once, tracked under `web/public/images/` and served and exported verbatim; do not add a second copy or a sync step.
- Member portraits are delivered at display size: square, no larger than 1200px per side, progressive JPEG. Resizing and compressing for the web is allowed, and the owner may direct a framing crop so portraits on the same surface read at a similar scale. Never crop, retouch, recolor or regenerate a portrait on your own initiative. Keep the untouched camera original outside the repository, because `web/public/images/` is served and shipped verbatim.

## Visual system

| Token | Warm Paper | Charcoal |
| --- | --- | --- |
| Accent | `#D97757` | `#D97757` |
| Canvas | `#FAF9F5` | `#141413` |
| Text | `#141413` | `#FAF9F5` |
| Panel | `#FAF9F5` | `#20201E` |
| Surface | `#E8E6DC` | `#292926` |
| Secondary text | `#5F5E57` | `#C4C2B8` |
| Rule/border | `#D0CEC5` | `#45453F` |

- Warm Paper is the default. The appearance toggle persists the user's choice across navigation and reloads. Theme changes must not tint image/logo files.
- Use Georgia/Times New Roman for editorial headings and Arial/Helvetica for body, controls and publication dates. Omit decorative monospaced captions and eyebrow labels from production and matching playground content. Local review controls also use the regular font. These are local font choices, not a claim about Claude's proprietary typography.
- Retain generous whitespace, warm surfaces, thin borders, orange framing and clear section hierarchy. Avoid introducing unrelated gradients, glass effects or a new font system without an explicit design decision.
- Share tokens and general styles in `web/styles/claude.css`; production page styles live in `web/styles/site.css`. Avoid duplicate component-specific palettes and scattered inline visual settings.
- The existing content shell is 1256px maximum, with 36px desktop and 20px mobile horizontal padding. Preserve intentional section spacing; use the existing spacing scale before introducing new values.
- Member card and member profile portraits keep their source 1:1 framing: the image box is a square `aspect-ratio`, never a fixed-height band that crops a square portrait. Keep the intrinsic `width`/`height` attributes matching the rendered square so the reserved space is correct. The compact (non-promoted) card variant still crops to a short band and needs a decision on how it compacts without one, recorded in the change record before any member renders in it.
- Every page title uses the same plain, regular-weight Georgia/Times serif h1 typography and responsive sizing from the shared styles, including Home, listings, articles and member profiles. Preserve title wording, allow natural wrapping, and omit forced line breaks, partial italics, underlines and smaller article-title overrides. Match the playground page titles; section headings retain their existing styling. Body copy remains readable with comfortable line height and bounded reading width. Useful metadata, including publication dates, remains legible in the regular font; light gray is for decorative surfaces, not low-contrast body text.
- Primary CTAs use dark text on Claude orange. Keep one clear primary action per section and a visibly quieter secondary action.

## Icons and animation

- **All UI icons use [Morphicons](https://www.morphicons.com/).** Use its official React binding with SVG icon data, following the [maintainer's documentation](https://github.com/guillermolg00/morphicons).
- Use `web/components/Icon.tsx` as the single shared application icon component. Lucide's vanilla data exports supply a consistent 24x24 stroke family to Morphicons; never substitute `lucide-react` components as its icon data.
- Do not use Unicode/emoji glyphs, icon fonts, hand-written SVG paths or CSS-drawn pictograms for action, navigation or state icons. In particular, remove text arrows that iOS can render as emoji.
- Use `currentColor`, round strokes, 1.5px stroke width and explicit 18-20px dimensions for inline action icons. Icons must align with text, retain their aspect ratio and never shrink or change surrounding layout during a morph.
- Provide real Morphicons spring animations: menu to close, sun to moon on appearance changes, and subtle arrow morphs when the enclosing action receives hover or keyboard focus. Calendar and same-page controls use directional icons that match their action.
- Trigger animation from the whole enclosing link/button/card, not only the tiny icon. Touch users can activate the action without hover or animation completion. State changes remain immediate.
- Use the library's `reducedMotion="user"` policy. Disable additional CSS motion for reduced-motion users. Do not run perpetual icon loops, schedule decorative intro icon animations, or delay navigation to finish an animation. Restore a saved theme as soon as client state is available.
- Decorative icons are hidden from assistive technology. Icon-only controls need an accessible label on the button/link. Do not make decorative SVGs independent focus targets or use an icon as the only explanation of an unfamiliar action.
- Bundle the library locally. Do not rely on an icon CDN or runtime asset request. Keep the static export compatible, with a real SVG available in the server-rendered HTML.

## Navigation and interactions

- Main navigation is About, Explore, Projects, Calendar, Community and Journal, with a persistent Join action. Keep About in the footer as well. Preserve the existing destination URLs and active-page indication. Production navigation uses the existing menu pattern at 1100px and below so the expanded set of destinations never collides with the logo or appearance control.
- Logo navigation returns home. Internal destinations go through `url()`; canonical URLs use `absoluteUrl()`.
- Join, Discord and application actions use their real configured URLs. External tabs use `rel="noopener noreferrer"`. Keep visible action labels explicit about their purpose.
- A whole activity/member/story card is one clear link. Avoid nested links/buttons, duplicate tab stops and decorative elements that intercept clicks.
- Mobile navigation opens from a labeled toggle, exposes its expanded state, closes on Escape and navigation, and returns focus to the toggle on Escape. It must not cover or block controls when closed.
- Filters show the current selection with a filled surface and text emphasis, retain context and offer an understandable empty state. Keep hover and keyboard feedback visible in both themes. Do not make filtering dependent on hover.
- Preserve standard browser Back behavior, link destinations and anchor navigation. Do not hijack scrolling, add autoplay video or make interactions depend on a pointer.

## Content and page behavior

- Root Markdown, `_data/` and the existing collections are the single content source. Do not duplicate biographies, activity descriptions, application links or calendar data in components.
- Project records live once in `_data/projects.yml`; root `projects.md` supplies the page introduction. About and Projects share the same project preview and build-time data. Show real built projects with a screenshot, useful description and explicit live/source actions; omit placeholder projects and filters until needed.
- About introduces the club activities, then the wider Claude Builder Club community and the role of Claude Campus Ambassadors, before explaining why we built CBC World. Use Anthropic's official campus programme for role descriptions and the club's launch article for its programme connection. Explain the campus role in plain language; do not confuse it with city-based community ambassadors or imply all club members are ambassadors. Keep the transition in root Markdown and retain the shared project record.
- CBC World is an international Claude ambassador map built by the club. Describe its globe, university search and ambassador connections; do not represent its global map totals as club membership. Use `https://cambridge-ai-build-club.github.io/CBC-World/` for permanent links: the approved research verified that `?v=2` serves the same app.
- Project screenshots are documentary captures: retain their original proportions, content and branding in both themes. The approved CBC World overview was captured from the live app on 10 October 2026 and is delivered at `web/public/images/projects/cbc-world.jpg`; use a descriptive image alt and a separate labeled action to launch the interactive app. Do not load the WebGL app in an About or Projects iframe.
- Andrew is Outreach Team Lead and Zihao is Technical Team Lead. Preserve the collection's visibility and sorting rules; do not invent titles or member records.
- Committee recruitment remains visible from Home and Community. Preserve the configured application process and factual seat/track information; verify changes rather than inventing availability or deadlines.
- Activity pages describe formats. Publication dates are not event dates. Avoid presenting past records as future sessions.
- Omit the homepage hero note, eyebrow and artwork captions; retain only `In collaboration with` beside the official Claude logo as a quiet footer inside the hero illustration frame. Omit the separate boxed badge, supporting programme sentence and full-width collaboration band. Align the desktop headline and illustration at their top edges. Preserve the main illustration image area and contain sizing; use its existing warm frame surface for the unchanged black wordmark in both themes. The footer is one plain link to Claude with visible focus inside the frame and a touch target of at least 44px. Use regular body typography, natural logo proportions and narrow-screen fit. Share the component with the playground; omit extra slogans, icons and decorative microcopy. Omit decorative section/page/card/project/recruitment/calendar eyebrow labels. Retain publication dates, substantive descriptions, headings, actions and calendar details. Community's primary heading reads `Good ideas need good community.` Keep the playground copy aligned with these production decisions.
- Calendar is an ongoing main page, never an archive-only destination. Its existing data, dates, times, venues and cancellation records remain intact unless the owner requests a schedule change.
- Do not add a summary row above the calendar grid: omit total/month session counts and the redundant `Club Calendar` badge. Retain month navigation, session names, details and the session list.
- Calendar opens on the current Cambridge date (Europe/London) at runtime, independently of the static build date or available event records. Previous/next controls move through consecutive months, including empty months and year boundaries; Current month returns to the live month. Keep the selected event within the visible month, with useful empty states. Default to the nearest event today or in the future; otherwise select the most recent past event. Prefer non-cancelled records for automatic selection, retaining explicit user selections and cancellation labels. Empty months have no selection. Omit the redundant Select an event for details sentence; retain only the functional mobile scrolling hint. Calendar weeks start on Monday, mark today separately from the selected event, and show session names with explicit cancelled labels. Each session is individually selectable, including multiple events on one date. Pair the grid with selected details first and a compact chronological event list beneath them in one coordinated layout. Long lists scroll in a keyboard-reachable region with a visible hint; show type and status separately. Multi-day events have a dated record for each day, retaining their daily time and venue.
- On narrow screens, the calendar dates region may scroll horizontally with a visible hint; the document itself must not overflow. Keep names readable instead of hiding them or replacing them with counts. The region must be keyboard reachable.
- Keep the Welcome section About link available at desktop, intermediate and mobile widths; place it below the copy when space is limited.
- Reading pages use one primary heading, a comfortable prose width and useful return links. Preserve existing routes, canonical metadata, sitemap/robots and legacy redirect stubs.

## Accessibility and responsive acceptance

- Use semantic landmarks, one `h1`, orderly headings, meaningful image alt text and empty alt text for decorative artwork.
- Keep visible keyboard focus, a working skip link and accessible names/states for all controls. Preserve text contrast of at least 4.5:1 for normal text and 3:1 for large text; distinguish state with more than color alone.
- Aim for at least 44x44px action targets. An inline icon may be smaller because the surrounding labeled action is the target.
- Check desktop at 1440px, mobile at 375px and intermediate widths affected by the change. Check both surfaces, long text, empty states and zoom where relevant. Do not assume screenshot-free parity from CSS alone.
- Icons must render as consistent SVGs, not platform emoji, and remain visible before hydration. Test hover, keyboard focus, touch-compatible state changes and reduced motion.
- Build the static export, run the affected interaction checks, inspect fresh screenshots and check for broken images, horizontal document overflow, console errors and hydration warnings. Use targeted accessibility scans with manual visual/focus review; a passing scan is not a full certification.

## Delivery and scope

Read `AGENTS.md` for branch, build, preview and publication requirements. For site changes, keep the local preview running on port 4102. Local design iterations remain unpublished until the owner requests publication; approval of an earlier PR does not automatically authorize merging subsequent design changes. Exclude `.zcode/` and build output from commits.

## Change record

See the [dated design decisions and verification](docs/design/change-record.md) and [release ledger](docs/README.md#release-ledger). This contract contains current rules; historical review states live in those records.

The [11 October documentation reconciliation](docs/design/change-record.md#11-october-2026--documentation-reconciliation) records the audit scope, actual checks and limitations.
