# Daystrom Command — Visual and Product Design Contract

Daystrom Command is a Star Trek: The Next Generation-inspired multi-agent command environment built as a fork of **Munder Difflin by Chaitanya Giri**.

This document is the design contract for the Daystrom fork. It intentionally separates the visual/product identity from the underlying orchestration engine so upstream Munder Difflin improvements can continue to be incorporated without repeatedly rebuilding the agent runtime.

## Attribution and project boundary

- Preserve the upstream MIT license and original copyright notices.
- Credit Munder Difflin and Chaitanya Giri prominently in the README, About surface, and release notes.
- Daystrom is an independent fan-made derivative project and must not imply endorsement by, affiliation with, or official status from Paramount, CBS, Star Trek, or the Munder Difflin author.
- Public builds should use original artwork and original interface assets inspired by late-1980s/early-1990s optimistic starship-computer design rather than copied production assets, logos, screenshots, fonts, or character likenesses.
- The orchestration identity `god` is an internal compatibility identifier. User-facing language may call that role Command, Captain, Command Computer, or another Daystrom label without changing the runtime contract unless a later migration explicitly does so.

## Product identity

**Product name:** Daystrom Command

**Short name:** Daystrom

**Tagline:** Multi-agent command, from one bridge.

**Upstream credit:** Forked from Munder Difflin by Chaitanya Giri.

The product should feel like operating a starship rather than managing an office. The user is the commanding human. The orchestrator runs the bridge. Permanent agents occupy specialist stations. Temporary agents are short-lived crew assignments created for specific missions and dismissed when their work is complete.

## Core metaphor

| Runtime concept | Daystrom presentation |
| --- | --- |
| Human user | Commanding officer |
| Orchestrator / `god` | Command / captain's chair |
| Permanent agent | Senior bridge officer / specialist station |
| Temporary agent | Relief officer / mission specialist |
| Task | Mission / assignment |
| Task board | Mission board |
| Inbox | Subspace traffic / incoming reports |
| Outbox | Dispatch / outgoing orders |
| Ask Me | Command decisions |
| Memory | Ship's memory / mission archive |
| Skills | Systems / capabilities |
| Monitor | Ship status |
| Activity | Ship's log |
| Trigger | Alert / automated order |
| Webhook | External communications channel |
| Budget | Resource allocation |
| Circuit breaker | Safety interlock |

The metaphor must never obscure what the software is actually doing. Descriptive tooltips and settings should continue to use plain technical language where clarity matters.

## Visual direction

The starting point is the existing Munder Difflin layout and information architecture. Daystrom changes the visual language and scene, not the user's ability to understand or operate the application.

### Overall composition

Preserve the familiar desktop layout:

1. **Top application bar** — app identity, mode, global controls.
2. **Large left scene** — becomes a pixel-art starship command bridge.
3. **Right command panel** — current agent/session controls rendered with segmented, rounded starship-computer geometry.
4. **Bottom crew strip** — permanent and temporary agents represented as crew cards/stations.

### Bridge scene

Replace the office-floor metaphor with an original pixel-art command bridge:

- central command chair for the orchestrator;
- forward viewscreen;
- curved forward consoles;
- specialist stations around the perimeter;
- warm neutral architectural surfaces rather than a dark industrial spaceship;
- visible but restrained animated status displays;
- stations light up or animate when their assigned agent is active;
- temporary workers may appear at auxiliary stations rather than permanently occupying the bridge;
- idle state should feel calm, not dead;
- error or breaker state should be visually obvious without turning the screen into an alarm panel.

The bridge must remain legible at the application's normal zoom level. Decorative detail cannot interfere with agent-status recognition.

## Daystrom palette

The palette is inspired by warm, optimistic starship interfaces while remaining original.

### Structural colors

- **Space Black:** `#0B0A0D` — deepest background and terminal surfaces.
- **Charcoal Console:** `#17151C` — panels and secondary dark surfaces.
- **Bridge Sand:** `#C9B99A` — warm architectural surfaces.
- **Hull Stone:** `#928B83` — neutral structure and inactive boundaries.
- **Console Cream:** `#E8DDC8` — high-light neutral and selected surface.

### Interface accents

- **Command Coral:** `#D96B5F` — command emphasis, critical but non-destructive action.
- **Operations Amber:** `#E5A64A` — active work, dispatch, progress.
- **Systems Gold:** `#D6C06F` — resources, budgets, system state.
- **Science Lavender:** `#9C8BC4` — analysis, memory, graph, research.
- **Comms Rose:** `#C77B9B` — inbox, webhook, messages, external communications.
- **Medical Blue:** `#6E9EAE` — diagnostics, health, monitoring.
- **Ready Green:** `#79A77A` — healthy/ready/complete.
- **Interlock Red:** `#B54E52` — blocked, breaker, destructive warning only.

### Status rules

- Ready/healthy: green accent, never neon.
- Working: amber/gold pulse or moving segment.
- Waiting/needs human: rose/lavender emphasis.
- Blocked: red accent plus text/icon; never communicate state using color alone.
- Paused/budget-limited: gold with explicit resource label.
- Archived/offline: stone/gray and reduced contrast.

## Interface geometry

Daystrom chrome should be recognizable without reproducing proprietary LCARS artwork exactly.

Use:

- large rounded ends;
- asymmetric segmented rails;
- thick horizontal and vertical bands used sparingly;
- pill controls with clear text labels;
- black negative space between colored modules;
- colored modules grouped by function rather than decoration;
- squared terminal/data areas framed by rounded outer shells;
- strong alignment and generous spacing.

Avoid:

- copying canonical LCARS screen layouts;
- copying official Starfleet insignia or logos;
- unreadable decorative microtext;
- filling every available space with colored bars;
- changing control location merely for visual novelty.

## Typography

Use redistributable, readable fonts already available to the project or permissively licensed replacements.

- UI headings: geometric sans-serif, medium/bold, slightly expanded tracking.
- Body/UI labels: clean sans-serif.
- Terminal: existing monospace stack unless testing proves a replacement improves legibility.
- Uppercase is appropriate for section headers and system labels, but normal sentence case should remain for instructions and user-generated content.

Typography must remain functional at the current Munder Difflin UI scale.

## Right-side Command Center

The right panel is the first implementation target because it can establish Daystrom's identity before the full bridge scene is finished.

### Required behavior

Do not remove or hide existing capabilities. Preserve terminal, monitor, tasks, Ask Me, memory, graph, activity, skills, temps, queue, files, voice, and send controls where present upstream.

### Visual treatment

- Header becomes **COMMAND CENTER** or **BRIDGE COMMAND**.
- Current orchestrator remains immediately identifiable.
- Main mode tabs become segmented rounded modules.
- Terminal itself stays dark and high-contrast.
- Usage bars use Daystrom status colors but retain numeric values.
- Command input remains visually dominant and easy to locate.
- Controls that can cause destructive or expensive behavior must not become visually ambiguous.

## Crew cards

Agent cards should communicate role before personality.

Each card should show:

- display name;
- role/station;
- runtime status;
- model/provider where useful;
- context/budget health where useful;
- talk/info controls;
- whether the agent is permanent or temporary.

Role-color mapping can evoke command/operations/science divisions, but it must be configurable and should not depend on copyrighted uniform artwork.

## Agent archetypes

Daystrom should support TNG-like functional archetypes without hard-coding copyrighted characters into the engine.

Suggested defaults:

- **Command** — orchestration, delegation, final QA.
- **Operations** — task coordination, filesystem/workspace operations.
- **Engineering** — coding, infrastructure, deployment, troubleshooting.
- **Science** — research, analysis, data work.
- **Security** — validation, safety checks, permission review.
- **Communications** — webhook, inbox, external-service and message handling.
- **Medical/Diagnostics** — system health and diagnostic investigations.

Users may independently choose personal display names for their own private agents.

## Sound and motion

Sound is optional and **off by default**.

If implemented:

- short original UI tones only;
- no copied television sound effects;
- separate master toggle and volume;
- no sound for ordinary token streaming;
- alarms reserved for genuine blocked/error/approval states.

Motion should be subtle:

- active station glow/pulse;
- viewscreen starfield or slow ambient movement;
- status segments animating during work;
- no constant high-frequency animation that makes monitoring tiring.

Respect reduced-motion system preferences.

## Theme architecture

The existing application already separates light/dark theme state through `data-cth-theme` on `<html>` and design tokens. Daystrom should preserve that mechanism and introduce a separate product skin layer rather than overloading light/dark mode.

Target DOM state:

```text
data-cth-skin="daystrom"
data-cth-theme="dark"
```

The initial Daystrom skin may support dark mode only if necessary, but it must not break the upstream theme API. A future light variant can represent a brighter bridge environment while keeping terminal/data surfaces dark.

### Implementation rule

Prefer semantic token overrides and skin-scoped styles over rewriting components. Example pattern:

```css
:root[data-cth-skin='daystrom'] {
  --daystrom-space: #0B0A0D;
  --daystrom-bridge-sand: #C9B99A;
  --daystrom-ops-amber: #E5A64A;
  --daystrom-science-lavender: #9C8BC4;
}
```

Where existing `--cth-*` tokens are sufficient, map them to Daystrom values within the skin scope rather than creating parallel styling logic.

## Upstream compatibility

Daystrom should remain easy to rebase/sync with Munder Difflin.

Rules:

1. Avoid invasive changes to orchestration/runtime code for visual work.
2. Keep skin-specific assets under clearly named Daystrom directories.
3. Keep skin-specific CSS scoped to the Daystrom skin selector.
4. Preserve upstream defaults until the Daystrom skin is verified.
5. Isolate branding changes from runtime changes when practical.
6. Record upstream deviations in `docs/DAYSTROM_UPSTREAM_NOTES.md` as they become necessary.
7. Prefer small commits grouped by visual subsystem.

## Implementation phases

### Phase 1 — Foundation

- establish Daystrom design contract;
- add Daystrom skin state without changing runtime behavior;
- add semantic color tokens;
- apply Daystrom treatment to application chrome/right command panel;
- preserve existing office scene as fallback;
- add visible upstream attribution.

### Phase 2 — Bridge scene

- build original pixel-art bridge environment;
- map orchestrator to command chair;
- map permanent agents to stations;
- map temp agents to auxiliary stations;
- connect scene status to existing runtime state;
- preserve all click/selection interactions.

### Phase 3 — Crew system

- introduce configurable station/role presentation;
- create original crew sprite system;
- add role-color mapping;
- support user-selected display names and appearances without changing stable agent IDs.

### Phase 4 — Command polish

- mission terminology where it improves the product;
- optional original UI sounds;
- animation and reduced-motion support;
- Daystrom onboarding/about screens;
- packaging/branding assets;
- accessibility pass.

## Definition of done for the first prototype

The first working Daystrom prototype is successful when:

- the app still launches and runs the upstream agent workflow;
- a `daystrom` skin can be selected or forced without altering orchestration logic;
- the right-side command panel visibly matches this design contract;
- the existing office scene still works as a fallback;
- light/dark theme state remains functional;
- no official Star Trek production assets are bundled;
- Munder Difflin / Chaitanya Giri attribution is visible;
- tests/build checks used by upstream still pass.
