# CIAPACOV Creative Ecosystem — agent contract v1.0

## Prime directive
This repository is a **creative production ecosystem**, not a brand identity system. The active Claude Design system always wins on identity, official assets, typography, colors, safe areas, accessibility and governance.

A **Brand Bridge** is only an adapter between that external Design System and the Creative Ecosystem. It must never be treated as permission to replace, recreate or override the Design System.

## First read
Start with `claude/START_HERE.md`, then `claude/handoff.compact.json`.

## Context-budget protocol
Use the smallest route that solves the task.

1. `claude/handoff.compact.json`
2. `claude/ecosystem.compact.json` → choose one Operational Master
3. read only that Master's storyboard
4. read only that Master's three options from `claude/visual-directions.compact.json`
5. show three genuinely different visual directions before opening full implementations
6. for video/motion, read `claude/production.compact.json`
7. if a specialized Design System/domain bridge applies, read `claude/qa.compact.json`
8. resolve Brand Bridge + applicable QA/integration scenario
9. read only referenced template IDs from `claude/catalog.compact.json`
10. resolve Asset Vault and verified Media Library slots
11. add `claude/motions.compact.json` only if motion is needed
12. inspect full implementation only after direction/runtime selection

Never inspect all source files just to recommend a direction.

## Production Planner behavior
- Interpret the work problem first: Agua Bienestar, obra, brigada, cultura del agua, testimonios, ambiente, aviso, resultados or agenda institucional.
- Return the strongest Operational Master first plus up to 2 alternatives.
- Use its storyboard as narrative skeleton.
- Present three genuinely different visual architectures.
- Resolve the associated Production Master for reel/story/video.
- Resolve a Brand Bridge automatically from the brief, with manual override available.
- Surface Remotion composition ID and target duration before rendering.
- Compute Asset Vault and Media Intelligence readiness.
- Apply matching factual/routing/language QA gates.
- Never hide blockers.
- Do not ask the user to learn IDs.

## v1.0 integration acceptance
`src/registry/integration-scenarios.json` is the final cross-domain acceptance matrix. It must contain representative cases for Agua Bienestar routes, rehabilitation of a well, drainage/collectors, contingency/operational notice, results/data and authorized testimony.

Each integration scenario must resolve to an existing domain, Operational Master, Production Master, Remotion composition, primary visual architecture and supported duration.

## Brand Bridge rules
- Registry: `src/registry/brand-bridges.json`.
- `BRIDGE-GENERIC` is the fallback when no specialized adapter matches.
- Specialized bridges may map external CSS variables, declare demo-only fallbacks, safe areas, motion constraints and language gates.
- `governance.identityAuthority` must remain `active-design-system`.
- Never bundle official logo binaries or font files into the Creative Ecosystem.
- Demo fallback colors are not a substitute for the mounted Design System in final production.
- When a bridge and the active Design System disagree, the active Design System wins except for factual QA rules explicitly locked by the current approved scenario/source.

## Real-production QA rules
- Registry: `src/registry/qa-scenarios.json`.
- Compact index: `claude/qa.compact.json`.
- QA scenarios are reproducible fixtures, not generic truth stores.
- A scenario may lock routing, duration, composition, architecture, factual values, schedule and wording.
- `sourceStatus` must always be present so locked values have explicit provenance status.
- Required phrases must be preserved where the scenario says they are mandatory.
- Forbidden phrases are hard failures.
- Do not silently reconcile a scenario with outside knowledge; update the approved source/fixture first.
- A passing routing QA does not imply missing official media is available.

## Agua Bienestar v1 bridge
For `BRIDGE-AGUA-BIENESTAR-V1`:
- Brand identity authority remains Agua Bienestar Design System v1.0.
- Prefer `rutas programadas`; never upgrade wording to `rutas oficiales`.
- Exact sanitary wording when applicable: `Acompañamiento de COESPRIS`.
- Do not claim COESPRIS certification, endorsement or guarantee.
- Respect `Buenavista` spelling when a locked scenario includes that place.
- Official vehicle, marks, cartography, photographs and fonts stay external/verified slots.
- Motion is fluid and controlled; no bounce/spring/elastic; logos move only as complete assets; waves do not deform.

## Production Master rules
- `src/registry/production-masters.json` maps all 20 Operational Masters to exactly one executable Production Master.
- Production Masters control runtime architecture, not brand identity.
- `compositionId` must exist in `src/remotion/Root.tsx`.
- Duration-aware compositions must render correctly for the selected supported duration.
- Factual media requirements are strict. Never synthesize missing evidence merely to satisfy a Production Master.

## Media Intelligence rules
- `src/registry/media-library.json` is the production media index inside this repo and may be empty.
- `approved` media can satisfy production roles; `review` cannot be silently promoted; `blocked` and `demo` cannot satisfy real-only roles.
- Human media approved for production must have explicit consent state appropriate to its use.
- Missing factual photographs, testimony, maps, vehicles, infrastructure, people or official marks must remain missing.

## Visual, storyboard, asset and motion rules
- Every Operational Master has exactly three visual directions and one storyboard.
- Visual architecture controls composition, density and motion character, not brand identity.
- Storyboard fields are required/verified inputs, not permission to invent values.
- `demoData: forbidden-in-production` is absolute.
- `availability: bundled` = reusable original/approved primitive.
- `availability: external-required` = semantic slot supplied by active Design System or verified Media Library.
- Reference providers are inspiration/provenance sources, not redistribution permission.
- Overflow must split/paginate/change composition; never shrink text into illegibility.
- Default motion character: controlled, continuous, editorial and readable. Motion must explain hierarchy, continuity, route, process or emphasis.
