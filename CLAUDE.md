# CIAPACOV Creative Ecosystem — agent contract v1.1

## Prime directive
This repository is a **creative production ecosystem**, not a brand identity system. The active Claude Design system always wins on identity, official assets, typography, colors, safe areas, accessibility and governance.

A **Brand Bridge** is only an adapter between that external Design System and the Creative Ecosystem. It must never be treated as permission to replace, recreate or override the Design System.

v1.1 adds a Premium Visual & Generative Motion Layer. It expands creative range, motion sophistication, Lottie/external-motion governance and AI-video planning. It does not weaken factual or brand governance.

## First read
Start with `claude/START_HERE.md`, then `claude/handoff.compact.json`.

## Context-budget protocol
Use the smallest route that solves the task.

1. `claude/handoff.compact.json`
2. `claude/ecosystem.compact.json` → choose one Operational Master
3. read only that Master's storyboard
4. read only that Master's three options from `claude/visual-directions.compact.json`
5. show three genuinely different visual architectures before opening full implementations
6. for video/motion, read `claude/production.compact.json`
7. if a specialized Design System/domain bridge applies, read `claude/qa.compact.json`
8. resolve Brand Bridge + applicable QA/integration scenario
9. read only referenced template IDs from `claude/catalog.compact.json`
10. resolve Asset Vault and verified Media Library slots
11. when premium art direction, advanced motion, Lottie or generative video is relevant, read `claude/premium.compact.json`
12. choose materially different style families; do not default to a monochrome primary-color treatment
13. read only motion modules needed for the selected style/storyboard; add `claude/motions.compact.json` only if core recipes are also needed
14. inspect full implementation or licensed external motion only after direction/runtime selection

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
- Distinguish strictly between `requiredMediaRoles` and `recommendedMediaRoles`; never convert recommended media into a hard block.
- Never hide blockers.
- Do not ask the user to learn IDs.

## Premium visual direction rules
- Registry: `src/registry/creative-style-families.json`.
- Compact entry: `claude/premium.compact.json`.
- Style families are composition/motion systems, **not palettes**. They consume roles from the active Design System.
- A premium direction must differ materially in surface strategy, hierarchy, motion signature and spatial composition, not merely swap colors.
- Use `src/lib/creative-style-director.ts` to rank styles and `auditAntiGeneric()` to catch generic output.
- The active Design System remains the identity authority even when a style family proposes neutral surfaces, texture, depth or cinematic treatment.

### Anti-generic hard rules
- Do not flood most scenes with the primary brand color.
- Do not repeat one centered card grammar through an entire reel.
- Do not place generic icons or blobs merely to fill empty space.
- Use negative space deliberately.
- Use contrast in scale, crop, density, surface and motion before adding more color.
- Every decorative element must support hierarchy, continuity, evidence, location, time, data or transition.
- Multi-beat work should normally use at least three materially different scene compositions when duration permits.
- Overflow must split/paginate/change composition; never shrink text into illegibility.

## Premium Motion Module Library
- Registry: `src/registry/premium-motion-modules.json`.
- Executable first-party primitives begin in `src/motion/premiumPrimitives.tsx`.
- Categories: water, route, typography, data, documentary, transition, spatial, system and utility/QA.
- Motion must explain a narrative relationship. "More animation" is not the quality bar.
- Prefer path-linked movement, persistent anchors, match shapes and motivated transitions over floating decorative objects.

## Lottie / external motion rules
- Registry: `src/registry/external-motion-assets.json`.
- Ingestion: `scripts/ingest-motion-asset.mjs`.
- Supported governed formats include Lottie JSON, dotLottie, SVG and rendered video.
- Public galleries/marketplaces are discovery and reference sources until the **specific** asset's license/provenance is recorded.
- Never scrape, copy or redistribute a third-party motion asset merely because it is publicly visible.
- Third-party ingestion requires license proof, provenance and local source file.
- Newly ingested motion remains review-only until deterministic smoke render, brand-adaptation review and visual QA pass.
- Remotion Lottie playback uses `@remotion/lottie` + `lottie-web`; expression-heavy assets require case-by-case determinism testing.

## Generative video rules
- Providers: `src/registry/generative-video-providers.json`.
- Semantic policy: `src/registry/generative-scene-policies.json`.
- Planning adapter: `src/lib/generative-video.ts`.
- Current provider profiles include MiniMax Hailuo 2.3 and Hailuo 2.3 Fast.
- Prefer controlled image-to-video when an approved first frame can constrain composition.
- Keep logos, names, figures, prices, routes, phone numbers, legal/sanitary wording and all other factual overlays in deterministic layers.
- Never bake authoritative text into AI-generated pixels.
- Never generate and present as factual evidence: actual officials, beneficiaries, testimonies, official vehicles, actual work sites, actual purifiers, actual events, official maps or geographic evidence.
- Generative video may be used for clearly conceptual illustration, atmospheric b-roll, abstract transitions and controlled animation of an approved illustrative first frame.
- Every retained generated clip must record provider/model/mode/prompt/date/source frame/semantic class/review status/rights status.
- API credentials remain external and must never be committed.

## v1.0/v1.1 integration acceptance
`src/registry/integration-scenarios.json` remains the cross-domain routing/factual acceptance matrix. It must contain representative cases for Agua Bienestar routes, rehabilitation of a well, drainage/collectors, contingency/operational notice, results/data and authorized testimony.

Each integration scenario must resolve to an existing domain, Operational Master, Production Master, Remotion composition, primary visual architecture and supported duration.

v1.1 validation additionally checks premium style-family coverage, premium motion modules, generative-video policies/provider capabilities and anti-generic contracts.

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
- Premium styling must not collapse into "everything blue". Use neutral surfaces, negative space and the active Design System's permitted secondary/deep/accent roles with purpose.

## Production Master rules
- `src/registry/production-masters.json` maps all 20 Operational Masters to exactly one executable Production Master.
- Production Masters control runtime architecture, not brand identity.
- `compositionId` must exist in `src/remotion/Root.tsx`.
- Duration-aware compositions must render correctly for the selected supported duration.
- Factual media requirements are strict only where they are explicitly required. Recommended media should become a warning/alternate path when missing, not a false hard blocker.
- Never synthesize missing factual evidence merely to satisfy a Production Master.

## Media Intelligence rules
- `src/registry/media-library.json` is the production media index inside this repo and may be empty.
- `approved` media can satisfy production roles; `review` cannot be silently promoted; `blocked` and `demo` cannot satisfy real-only roles.
- Human media approved for production must have explicit consent state appropriate to its use.
- Missing factual photographs, testimony, maps, vehicles, infrastructure, people or official marks must remain missing.

## Visual, storyboard, asset and motion rules
- Every Operational Master has exactly three visual architectures and one storyboard.
- Visual architecture controls composition, density and motion character, not brand identity.
- Premium style family sits **under** the selected architecture and provides art-direction variation.
- Storyboard fields are required/verified inputs, not permission to invent values.
- `demoData: forbidden-in-production` is absolute.
- `availability: bundled` = reusable original/approved primitive.
- `availability: external-required` = semantic slot supplied by active Design System or verified Media Library.
- Reference providers are inspiration/provenance sources, not redistribution permission.
- Default motion character: controlled, continuous, editorial and readable. Motion must explain hierarchy, continuity, route, process or emphasis.
