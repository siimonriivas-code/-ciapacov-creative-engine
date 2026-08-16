# CIAPACOV Creative Engine — agent contract v0.6

## Prime directive
This repository is a **creative production ecosystem**, not a brand identity system. The active Claude Design brand system always wins on identity, official assets, typography, colors, safe areas, accessibility and governance.

## Context-budget protocol
Use the smallest route that solves the task.

### Domain-specific brief
1. `claude/ecosystem.compact.json`
2. choose one Operational Master
3. read only that Master's storyboard from `src/registry/storyboards.json` (or `claude/storyboards.compact.json` when generated)
4. read only the Master's referenced IDs from `claude/catalog.compact.json`
5. resolve required/recommended capabilities against `src/registry/assets.json`
6. add `claude/motions.compact.json` only if motion/video is needed
7. inspect selected recipe / implementation only after a direction is chosen

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
- Interpret the user's work problem first: Agua Bienestar, obra, brigada, cultura del agua, testimonios, ambiente, aviso, resultados or agenda institutional.
- Return the strongest Operational Master first plus up to 2 alternatives.
- Use its storyboard as the narrative skeleton; do not improvise a different sequence unless the brief requires it.
- Recommend 3–6 genuinely different template architectures from the Master's allow-list.
- Compute asset readiness before rendering.
- `ready` means bundled asset available; `slot` means official/real media must be supplied; `missing` means no compatible resource exists yet.
- Never hide blockers. If a required official slot is unresolved, state it before production.
- Generate/copy a production prompt that instructs Claude to load only the selected Master, storyboard, template, recipe, motions and resolved assets.
- Do not ask the user to learn IDs.

## Storyboard rules
- Every Operational Master has exactly one production storyboard.
- Storyboard `fields` describe information that must be provided or verified; they are not permission to invent values.
- `capability` names the visual resource needed for the beat.
- `motion` is the preferred motion primitive, not an obligation when the output is static.
- `demoData: forbidden-in-production` is absolute.
- Overflow must split/paginate or change composition; never shrink text into illegibility.

## Asset rules
- `availability: bundled` = reusable original/approved asset in this repo.
- `availability: external-required` = semantic slot only. It must come from the active Design System or verified Media Library.
- Never fabricate an official logo, official vehicle, real beneficiary, real infrastructure photo, official map or other factual asset to satisfy a slot.
- Never promote demo data to production.

## Reference Library rules
Reference providers are inspiration/provenance sources, not permission to copy or redistribute their marketplace content. Only ingest a resource when its rights are known and compatible with the intended use.

## Ingest rules
The local ingest tool intentionally does **not** download from third-party URLs. It accepts a local file plus a manifest with license/provenance. Unknown, unverified or reference-only licenses are blocked.

## Motion quality
Default character: controlled, continuous, editorial, readable. No bounce/spring/elastic motion unless a specific active Design System explicitly allows it. Motion must explain hierarchy, continuity, route, process or emphasis.
