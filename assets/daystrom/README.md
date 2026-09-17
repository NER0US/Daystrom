# Daystrom asset inventory

This folder is the working index for the Daystrom bridge design. Runtime files
remain in their canonical locations so the application keeps a single source of
truth. `reference/daystrom-reference.png` is the checked-in design reference.

The intended external mirror is `/Users/BJE_1/HarnessAgents/Daystrom/assets/`.
This repository copy is complete and can be copied there as one directory. The
asset-organizer sandbox could not create that sibling path, so the external
mirror must be completed by the orchestrator or another process with parent
directory write access.

## Current design assets

| Group | Canonical repository path | Purpose | License / origin |
| --- | --- | --- | --- |
| Design reference | `assets/daystrom/reference/daystrom-reference.png` | 1586 × 992 target composition | Project-provided reference; provenance recorded in `LICENSES.md` |
| Procedural crew sprites and portraits | `src/renderer/src/scene/office/portraitArt.ts`, `cast.ts` | Jean Luc and bridge crew portrait/walk frames | Project MIT license; original procedural art |
| Sprite rendering | `src/renderer/src/scene/office/CharacterSprite.ts`, `SpriteAdapter.ts`; `src/renderer/src/components/SpritePortrait.tsx` | Runtime animation and portrait canvases | Project MIT license |
| Bridge map data | `src/renderer/src/assets/maps/office.tmj` | Active Daystrom layout and collision/spawn data | Map assembly covered by project license; tiles referenced below have separate terms |
| Alternate map data | `src/renderer/src/assets/maps/brooklyn99.tmj` | Reusable alternate layout | Same licensing split as bridge map |
| Pixel tilesets | `src/renderer/src/assets/tilesets/*.png` | Floors, walls, furniture, consoles | LimeZu Complete Version license; attribution required |
| Interface icons | `src/renderer/src/components/Icon.tsx` | Inline, code-rendered interface icon set | Project MIT license |
| Application icons | `build/icon.svg`, `icon.png`, `icon.ico`, `icon.icns` | Packaging icons for Linux, Windows, and macOS | Project MIT license |
| Interface fonts | `src/renderer/src/assets/fonts/*.woff2` | Inter, JetBrains Mono, Press Start 2P | SIL Open Font License 1.1; details in the bundled font license |

## Broader visual inventory

- The tracked repository contains 1,098 files with visual, font, icon, or map
  extensions: 8 runtime asset files, 4 packaging icons, 558 documentation
  visuals, 513 blog visuals, and 15 other publishing/support assets.
- Product and documentation visuals are under `docs/`, especially
  `docs/media/`, `docs/screenshots/`, and `docs/pr-evidence/`.
- Blog article artwork is under `blog/src/assets/media/`.
- Landing animation visuals are code-rendered under `landing-remotion/src/`.
- Those publishing assets are not runtime dependencies of the Daystrom bridge
  and are intentionally not duplicated in this working collection.

## Asset decisions

- No new sprite sheet is needed. `portraitArt.ts` already produces the current
  crew artwork and all animation frames at runtime.
- No new interface icon pack is needed. `Icon.tsx` supplies the current set.
- No references were changed. The canonical paths above remain active.
- Do not redistribute or relicense the LimeZu tilesets separately. Preserve the
  bundled attribution and license whenever copying the working collection.

## Mirror layout

The working collection, and the intended external mirror, contains:

- `reference/` — the original Daystrom design reference;
- `maps/` and `tilesets/` — reusable scene inputs and their attribution files;
- `procedural/` — source files that generate crew sprites and portraits;
- `icons/` — packaging icons and the source-rendered interface icon component;
- `fonts/` — bundled interface fonts and their license;
- `licenses/` — project and asset licensing metadata.

Run `shasum -a 256 -c SHA256SUMS` from either copy to verify every file.
