# Documentation index

Reconciled on 11 October 2026 against checkout `1b322d8`, Git history, owner conversations and GitHub PR/Pages metadata. This index separates current operating rules from dated evidence. It does not replace source inspection or claim a fresh visual audit.

## Current guidance

| Document | Purpose |
| --- | --- |
| [Repository README](../README.md) | Club links and development entry point |
| [AGENTS.md](../AGENTS.md) | Contributor workflow, branching, review, content rules and validation |
| [DESIGN.md](../DESIGN.md) | Current approved UI/UX, assets, icons and interaction contract |
| [web/README.md](../web/README.md) | Current architecture, build commands, calendar and static hosting |
| [web/CUTOVER.md](../web/CUTOVER.md) | Release, rollback and emergency publication runbook |

Explicit current owner instructions override older decisions. Source files establish implementation; CI establishes the checked build; deployment metadata and live checks establish publication. A prepared plan, local screenshot or old green run cannot establish a current release.

## Design evidence

The reports below retain their original QA results, screenshots and limitations. Their opening notes state the date and release. Historical counts describe the tested version. Screenshot links use paths beside the report; local preview URLs are contextual and are not guaranteed to still be running.

| Record | Purpose and later changes |
| --- | --- |
| [Change record](design/change-record.md) | Dated requests, intended behavior and verification extracted from DESIGN.md; current rules remain in the contract |
| [Design proposal](design/builder-lab-proposal.md), [playground QA](design/playground-qa.md) | Original review checkpoints; early navigation and calendar/label proposals are superseded |
| [Migration plan](design/migration-plan.md), [migration QA](design/migration-qa.md) | Approved all-route redesign and initial publication scope |
| [Morphicons QA](design/morphicons-qa.md) | Icon integration, source policy, motion and accessibility limitations |
| [Copy/UI QA](design/copy-ui-qa.md) | Concise source copy and small-screen usability |
| [About/Projects QA](design/about-projects-qa.md) | Shared project data, official campus context, screenshot provenance and URL comparison |
| [Label/hero QA](design/remove-labels-qa.md) | Final coordinated hero and earlier superseded collaboration revisions |
| [Calendar QA](design/calendar-qa.md) | Runtime London date, consecutive navigation, fair records, default selection and manual contrast review |
| [Page-title QA](design/page-titles-qa.md) | Shared plain h1 typography, natural wrapping and route coverage |

Asset provenance: [official Claude sources](design/claude-brand-sources.md), [authored activity illustrations](design/activity-artwork.md), [unused generated concept](design/generated-artwork.md). Programme/asset-source checks retain their original dates; reverify factual claims before changing or republishing them. Team portrait framing, optimization and publication are recorded in the [design change record](design/change-record.md#9-october-2026--publication-receipt-for-the-team-portrait-change) with evidence in [the portrait folder](design/team-portraits-2026-10-09/). The inactive compact-card portrait variant still needs a design decision before use.

## Release ledger

All PRs below are squash-merged. Their matching Next.js Pages runs were rechecked as completed/success on 11 October 2026. Dates use **Europe/London**, so PRs #24–#26 merged on 11 October locally although GitHub's UTC timestamp is 10 October. Later releases include earlier changes.

| PR | Scope | Merged (London) | Merge SHA | Pages run |
| --- | --- | --- | --- | --- |
| [#15](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/15) | Approved design migration | 07 Oct 2026 | `ac271f9` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/37595603899) |
| [#17](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/17) | Design contract and Morphicons | 07 Oct 2026 | `096d21d` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/37603758812) |
| [#18](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/18) | Copy and small-screen usability | 09 Oct 2026 | `6112b85` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/37929778193) |
| [#19](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/19) | Conventional Branch naming | 09 Oct 2026 | `4b58bbb` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/37931023803) |
| [#20](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/20) | Ban all AI-name branch prefixes | 09 Oct 2026 | `b4a1b81` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/37936444279) |
| [#21](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/21) | Square portrait delivery and owner-directed crop | 09 Oct 2026 | `c937e45` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/37941188238) |
| [#22](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/22) | Portrait publication receipt | 09 Oct 2026 | `12ec7f3` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/37943091479) |
| [#23](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/23) | About navigation and CBC World showcase | 10 Oct 2026 | `e6371f1` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/38085489996) |
| [#24](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/24) | Label removal and coordinated hero | 11 Oct 2026 | `d716bb9` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/38094436830) |
| [#25](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/25) | Current calendar and fair records | 11 Oct 2026 | `9c4d43a` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/38094542027) |
| [#26](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/pull/26) | Shared plain page-title typography | 11 Oct 2026 | `1b322d8` | [Passed](https://github.com/Cambridge-AI-Build-Club/Cambridge-AI-Build-Club.github.io/actions/runs/38095565070) |

Owner approval and live verification for #15/#17 are recorded in the original redesign conversation; #18 and #23 in their respective copy and About/Projects chats; #24–#26 in the label/calendar/title chat. Those historical checks were reviewed during reconciliation, not repeated. The final #26 chat records cache-busted title checks on all production pages and desktop/mobile Home/Calendar review in both themes; its local receipt remains in ignored `tmp/`. The portrait live-check receipt is retained in the dated design record. No merge remains pending for these releases.

## Archived task plans

Completed plans formerly tracked under `.planning/` now live under `docs/archive/planning/` so a new task cannot mistake them for active work. The snapshot bodies preserve earlier findings, errors and provisional status; the release ledger reconciles publication. Historical assistant-name or `ui/` branches are provenance only and are forbidden for new branches by the current rules.

- 6 October design playground/migration: [plan](archive/planning/2026-10-06-design-playground/task_plan.md), [findings](archive/planning/2026-10-06-design-playground/findings.md), [progress](archive/planning/2026-10-06-design-playground/progress.md).
- 7 October design contract/Morphicons: [plan](archive/planning/2026-10-07-design-rules-morphicons/task_plan.md), [findings](archive/planning/2026-10-07-design-rules-morphicons/findings.md), [progress](archive/planning/2026-10-07-design-rules-morphicons/progress.md).
- 9 October copy/UI: [plan](archive/planning/2026-10-09-copy-and-small-ui/task_plan.md), [findings](archive/planning/2026-10-09-copy-and-small-ui/findings.md), [progress](archive/planning/2026-10-09-copy-and-small-ui/progress.md).

New temporary plans stay in ignored `.planning/`; logs, temporary scripts and intermediate exports stay in ignored `tmp/`. Promote useful approved decisions or QA receipts into the appropriate maintained document, rather than committing another active task journal. Unrelated owner-owned `.zcode/` and local plans are preserved.

## Maintenance

Keep a fact in its owning document and link to it elsewhere. Update architecture and operational docs when behavior changes; update DESIGN.md and its dated record before design implementation. Reconcile publication after release rather than leaving a current status as awaiting review. Label superseded proposals instead of treating them as requirements or deleting their provenance. Retain the original accessibility limitations and never relabel historical QA as a new pass.

The 11 October cleanup changed documentation organization and the local planning ignore rule only. No site content, source implementation, images, dependencies or deployment configuration changed. Validation results are recorded in the documentation-reconciliation entry of [the change record](design/change-record.md#11-october-2026--documentation-reconciliation).
