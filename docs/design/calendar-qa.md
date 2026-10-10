# Calendar design and date logic verification

Local preview: http://localhost:4102/calendar/. Publication requires the owner's local review under AGENTS.md.

## Changes

- Open on the current Europe/London month after hydration, independent of the static build and event data. Refresh today's date every minute and on visibility changes. An explicitly browsed month stays selected until navigation or Current month is used.
- Navigate every consecutive month, including empty months and year transitions. Use Monday-first weeks, a separate today marker and individually selectable event buttons.
- Coordinate the grid with selected details first and the chronological event list beneath them. Long lists are capped at 310px with keyboard scrolling and a visible hint. Mobile keeps readable names in a horizontally scrollable grid and stacks the side panel beneath it.
- Add two root data records for Freshers' Fair: 6 and 7 October 2026, 10 am–4 pm each day, Parker’s Piece, Publicity, Completed. All fourteen original records match their prior values exactly, including the cancelled session.

## Checks

- `npm run build`: design policy, eight date/data tests, TypeScript validation and static export passed. Output: 25 routes and 21 legacy redirect stubs. Local runtime is Node 24; implementation commit `5a19bea` also passed the [Node 20 Linux PR build](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/38093470755) in 48 seconds, including the eight calendar tests.
- `npm run test:calendar` tests London midnight/summer time, consecutive month/year navigation, Monday alignment, leap years, ordered/non-mutating filtering, individual selection on one date, stale-selection removal, empty schedules and both complete fair records. It runs before every production build, including CI.
- Eight layout checks at 1440px, 903px, 375px and 320px, in paper and charcoal: current-month entry, Monday-first headings, both fair records, correct time/venue/status, one selected event, loaded images, 44px actions, visible keyboard focus and no document overflow passed.
- Browser interactions: grid and list selection, keyboard activation, empty November, December/January in both directions, consecutive navigation back to February and December 2025, retained cancellation, Current month reset and keyboard scrolling of dates passed. Busy February retains selected details at the top, supports keyboard list scrolling and can select its last event.
- Mobile navigation from Home to Calendar, current-page indication, menu dismissal, theme switching and reload persistence passed. Browser errors, hydration errors and console messages were absent.
- A separate browser booted the same export with a simulated January 2027 date, showing that the build month is not frozen. London midnight at 23:30 UTC on 30 September opens October; an explicitly chosen November remains selected after a date change. February 2028 displays all 29 days, with a correct today marker and empty state.
- Eight targeted axe WCAG A/AA scans found zero violations. Desktop/intermediate scans had no incomplete findings. Mobile scans reported one incomplete colour-contrast rule for dates/weekdays clipped by the scrolling region; manual checks of the actual inherited theme colours passed at 5.20:1 or higher for the affected text. Selected orange buttons measure 5.90:1 and the today marker 17.50:1. This is an automated-audit limitation, not a claimed zero-incomplete result.

## Evidence

[Layout and interaction results](calendar-2026-10-10/results.json), [mobile navigation](calendar-2026-10-10/navigation.json), [runtime date simulation](calendar-2026-10-10/runtime-clock.json) and [manual contrast values](calendar-2026-10-10/manual-contrast.json). The same directory contains the eight audit reports.

| View | Paper | Charcoal |
| --- | --- | --- |
| Desktop calendar | [1440px](calendar-2026-10-10/calendar-1440-paper.png) | [1440px](calendar-2026-10-10/calendar-1440-charcoal.png) |
| Mobile calendar | [375px](calendar-2026-10-10/calendar-375-paper.png) | [375px](calendar-2026-10-10/calendar-375-charcoal.png) |
| Mobile details/list | [375px](calendar-2026-10-10/calendar-details-375-paper.png) | [375px](calendar-2026-10-10/calendar-details-375-charcoal.png) |

[Busy February and retained cancellation](calendar-2026-10-10/calendar-february-charcoal.png).

Calendar logic and same-day selection are covered by focused tests. No real event fixture currently has multiple separate sessions on the same date; the component renders one selectable button per record. Browser clock simulation is scoped to the disposable QA browser and does not change the machine clock.

The calendar implementation commit and its verification receipt are separate from the prior homepage/caption work, but its branch starts at PR #24 so the local preview retains those pending changes. Its PR targets main; merge #24 first so the calendar diff stands alone. Neither PR is published until owner approval.

## 11 October default selection and hint revision

The owner requested deletion of Select an event for details and a date-based default in the displayed month: the nearest upcoming event, otherwise the closest past event. Explicit user selection takes priority. Non-cancelled records are preferred automatically, with a dated fallback if every record is cancelled; empty months have no detail or selection. The mobile horizontal scrolling hint remains functional.

Design policy, eleven focused tests, TypeScript and the static export passed (25 routes, 21 redirects). Six browser checks at 1440px, 903px and 375px in both themes verified default 7 October, explicit 6 October, Current month/navigation reset, unselected November with all 30 dates intact, removal of the redundant sentence, narrow-screen hint visibility, loaded images and no overflow. Runtime simulations verified 6 October is selected on 5 October and 7 October on 8 October. Browser errors and console logs are empty. All six fresh screenshots were visually inspected. No new accessibility audit was necessary for the removed prose or unchanged controls; earlier audit limitations remain documented above.

[Revision results](calendar-2026-10-11/results.json).

| Width | Paper | Charcoal |
| --- | --- | --- |
| 1440px | [Desktop](calendar-2026-10-11/calendar-1440-paper.png) | [Desktop](calendar-2026-10-11/calendar-1440-charcoal.png) |
| 903px | [Reported viewport](calendar-2026-10-11/calendar-903-paper.png) | [Reported viewport](calendar-2026-10-11/calendar-903-charcoal.png) |
| 375px | [Mobile](calendar-2026-10-11/calendar-375-paper.png) | [Mobile](calendar-2026-10-11/calendar-375-charcoal.png) |
