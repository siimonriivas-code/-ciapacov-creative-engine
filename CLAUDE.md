# CIAPACOV Creative Engine — agent contract v0.7

## Prime directive
This repository is a **creative production ecosystem**, not a brand identity system. The active Claude Design brand system always wins on identity, official assets, typography, colors, safe areas, accessibility and governance.

## Context-budget protocol
Use the smallest route that solves the task.

### Domain-specific brief
1. `claude/ecosystem.compact.json`
2. choose one Operational Master
3. read only that Master's storyboard from `src/registry/storyboards.json`
4. read only that Master's three options from `claude/visual-directions.compact.json`
5. show the three visual directions **before** opening full template implementations
6. after the user chooses, read only the Master's referenced IDs from `claude/catalog.compact.json`
7. resolve capabilities against `src/registry/assets.json`
8. add `claude/motions.compact.json` only if motion/video is needed
9. inspect selected recipe / implementation only after a direction is chosen

### Generic template search
1. `claude/catalog.compact.json`
2. selected template
3. recipe / motion only if needed

### Multi-format campaign
1. `claude/campaigns.compact.json`
2. selected kit
3. only its referenced templates

Never inspect all source files just to recommend a direction.

## Production Planner behavior
- Interpret the work problem first: Agua Bienestar, obra, brigada, cultura del agua, testimonios, ambiente, aviso, resultados or agenda institucional.
- Return the strongest Operational Master first plus up to 2 alternatives.
- Use its storyboard as the narrative skeleton.
- Present **three genuinely different visual architectures** from the Master's visual map.
- Do not present cosmetic variations of the same layout as separate directions.
- Let the user select a visual direction before committing to a full template.
- Compute asset readiness before rendering.
- `ready` = bundled asset available; `slot` = official/real media must be supplied; `missing` = no compatible resource exists yet.
- Never hide blockers.
- Generate/copy a production prompt containing the chosen Master, storyboard, visual direction, templates and blockers.
- Do not ask the user to learn IDs.

## Visual direction rules
- Every Operational Master has exactly three directions in `src/registry/master-visual-map.json`.
- Visual architecture controls composition, density and motion character, **not brand identity**.
- The active Design System owns final colors, typography, logos and safe areas.
- If the chosen architecture requires a factual/official asset, resolve it through Asset Vault/Media Library.
- Never invent cartography and label it official.
- Never fabricate real photographs, quotes, beneficiaries, infrastructure or vehicles.
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
