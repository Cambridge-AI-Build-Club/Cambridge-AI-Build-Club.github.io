# Activity illustration redesign

> Asset provenance recorded for the 6 October redesign, published in PR #15. Authorship and source files are historical evidence; current asset policy is in DESIGN.md. See the [release ledger](../README.md#release-ledger) and [current design contract](../../DESIGN.md). Checks and screenshots below apply to their recorded version; this cleanup did not repeat browser QA.

Owner requested redesign of the Demo, Workshop and Hackathon artwork on 6 October 2026.

The new files are original repo-native SVGs, authored as vector code rather than generated raster images:

- `images/features/demo.svg`: presentation window, play control and output notes.
- `images/features/workshop.svg`: code workspace and adjustable tool controls.
- `images/features/hackathon.svg`: connected task, code and result modules.

All use the same 240 x 160 viewbox, dark strokes, warm-white surfaces and official orange offset accents. They are decorative activity illustrations and are not Claude logos. No fonts, embedded raster assets, scripts or external image references are included. `_data/features.json` supplies their shared mapping to activity cards and details; the earlier icons remain in the source archive.

Club logos, the existing AI builder illustration, real portraits and the official-source Claude wordmark are reused. No new GPT Image generation was needed for this migration.
