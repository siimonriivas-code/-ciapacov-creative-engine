# CIAPACOV Creative Engine — agent contract v0.8

## Prime directive
This repository is a **creative production ecosystem**, not a brand identity system. The active Claude Design brand system always wins on identity, official assets, typography, colors, safe areas, accessibility and governance.

## Context-budget protocol
Use the smallest route that solves the task.

### Domain-specific brief
1. `claude/ecosystem.compact.json`
2. choose one Operational Master
3. read only that Master's storyboard from `src/registry/storyboards.json`
4. read only that Master's three options from `claude/visual-directions.compact.json`
5. show the three visual directions before opening full template implementations
6. if video/motion is requested, read `claude/production.compact.json` and resolve the Production Master + required media roles
7. after the user chooses, read only the Master's referenced IDs from `claude/catalog.compact.json`
8. resolve capabilities against `src/registry/assets.json` and factual media against `src/registry/media-library.json`
9. add `claude/motions.compact.json` only if motion/video is needed
10. inspect selected recipe / implementation only after a direction is chosen

Never inspect all source files just to recommend a direction.

## Production Planner behavior
- Interpret the work problem first: Agua Bienestar, obra, brigada, cultura del agua, testimonios, ambiente, aviso, resultados or agenda institucional.
- Return the strongest Operational Master first plus up to 2 alternatives.
- Use its storyboard as the narrative skeleton.
- Present three genuinely different visual architectures from the Master's visual map.
- Resolve the associated **Production Master** when the format is reel/story/video.
- Surface the Remotion composition ID and target duration before rendering.
- Compute both Asset Vault readiness and Media Intelligence readiness.
- Never hide blockers.
- Generate/copy a production prompt containing Operational Master, storyboard, chosen visual direction, Production Master, template candidates, composition ID, assets, media and blockers.
- Do not ask the user to learn IDs.

## Production Master rules
- `src/registry/production-masters.json` maps every one of the 20 Operational Masters to exactly one executable Production Master.
- Production Masters control runtime architecture, not brand identity.
- They may reuse generic Remotion compositions when that composition represents the same production logic.
- `compositionId` must exist in `src/remotion/Root.tsx`.
- Allowed durations are guidance; if the brief requests another duration, adapt only when narrative readability is preserved.
- Factual media requirements are strict. Never synthesize missing evidence merely to satisfy a Production Master.

## Media Intelligence rules
- `src/registry/media-library.json` is the only production media index inside this repo. It may be empty.
- `src/registry/media.example.json` is schema documentation only and is never production evidence.
- `approved` media can satisfy production roles; `review` must not be silently promoted; `blocked` and `demo` cannot satisfy real-only roles.
- Score media by compatible kind, mandatory tags, preferred tags, orientation, domain and approval state.
- Real-only roles include factual photographs, testimony, maps, vehicles, infrastructure, people and official marks.
- Missing media must be reported as missing. Do not substitute generated imagery when it would imply a real event, person, location, vehicle, infrastructure state or official cartography.
- Rights, consent and provenance metadata are part of production readiness.

## Visual direction rules
- Every Operational Master has exactly three directions in `src/registry/master-visual-map.json`.
- Visual architecture controls composition, density and motion character, not brand identity.
- The active Design System owns final colors, typography, logos and safe areas.
- Respect each architecture's `avoid` list.

## Storyboard rules
- Every Operational Master has exactly one production storyboard.
- Storyboard `fields` are information that must be provided or verified; they are not permission to invent values.
- `capability` names the visual resource needed for the beat.
- `motion` is preferred motion, not mandatory for static output.
- `demoData: forbidden-in-production` is absolute.
- Overflow must split/paginate or change composition; never shrink text into illegibility.

## Asset and reference rules
- `availability: bundled` = reusable original/approved asset.
- `availability: external-required` = semantic slot supplied by active Design System or verified Media Library.
- Reference providers are inspiration/provenance sources, not permission to copy or redistribute marketplace content.
- The ingest tool accepts local files plus known license/provenance and blocks unsafe license states.

## Motion quality
Default character: controlled, continuous, editorial, readable. No bounce/spring/elastic motion unless the active Design System explicitly allows it. Motion must explain hierarchy, continuity, route, process or emphasis.
