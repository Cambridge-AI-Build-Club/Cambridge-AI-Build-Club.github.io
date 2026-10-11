# Design contract and Morphicons

> Archived task snapshot. Its local state and pending actions are historical. PR #17 is merged; see the [reconciled release ledger](../../../README.md#release-ledger) and [current contributor rules](../../../../AGENTS.md). Historical branch names predate the current Conventional Branch rule and must not be reused as examples.

## Goal
Write DESIGN.md before implementation, enforce its maintenance through AGENTS.md, and replace UI pictograms across production/playground with locally bundled animated Morphicons.

## Phases
- Verify current baseline and official library guidance: complete.
- Record approved UI/UX contract and icon change before implementation: complete.
- Add contributor entry point and official library integration: complete.
- Replace all action/navigation/state icons and configure animations: complete.
- Build, static/source audit, interaction/visual/accessibility review: complete.
- Update DESIGN.md verification and deliver local preview: complete.
- Publish the owner-approved PR, wait for checks, squash-merge and verify deployment: complete (reconciled on 11 October 2026).

## Next Step
No active next step. This task is complete and archived; publication is reconciled in the release ledger.

## Boundaries
- Branch: codex/design-rules-morphicons, based on merged main.
- Keep .zcode/ untouched. The owner explicitly authorized PR creation and merging after local review on 7 October 2026.
- Morphicons is the renderer; Lucide data provides its documented icon input.
- Existing approved logos, hero and decorative activity illustrations are preserved.

## Errors
- A redundant Get-Content positional argument failed; re-read the member page with -LiteralPath.
- Initial icon guard treated date.split('-') as a UI symbol; narrowed the ASCII rule to plus pictograms while preserving legitimate date separators.
