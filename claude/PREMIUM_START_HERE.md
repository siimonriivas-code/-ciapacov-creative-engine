# CIAPACOV Creative Ecosystem v1.1 — Premium entrypoint

Use this only after base routing has resolved an Operational Master, Production Master and visual architecture.

The active Design System remains the sole identity authority. This premium layer changes composition, materials, motion and optional conceptual/generative treatment; it does **not** create a parallel brand palette.

## Minimal loading order

1. Read `claude/premium-v11.manifest.json`.
2. Read the single matching architecture record in `src/registry/premium-style-presets.json` and expose exactly its three curated premium style directions.
3. After a style is selected, read only that style record from `src/registry/creative-style-families.json`.
4. Read the matching Production Master recipe from `src/registry/production-style-recipes.json`.
5. Prefer a matching preset from `src/registry/premium-template-kits.json` when it solves the brief; do not force one if the storyboard requires a bespoke composition.
6. Read only material systems needed by the selected style from `claude/premium-materials.compact.json`.
7. Read only relevant first-party animated assets from `claude/lottie-pack.compact.json`.
8. Read only the motion module IDs required by the selected premium recipe/template kit.
9. If generative video is useful, classify the scene before reading provider details. Never generate factual/documentary evidence, official marks, official vehicles, official maps, beneficiaries or authoritative text/data inside generated pixels.
10. Build a scene-level production plan and apply factual QA + safe areas + readability + anti-generic QA before export.

## Premium quality rule

A piece is not premium because it uses more effects. It is premium when:

- composition changes meaningfully across beats without losing continuity;
- negative space and dense moments alternate intentionally;
- primary brand color does not flood most scenes by default;
- motion has narrative purpose;
- real evidence remains real;
- typography remains readable;
- materials support hierarchy rather than fill empty space;
- transitions hand narrative focus from one beat to the next;
- the output remains recognizable as the active Design System, not as a marketplace template pasted on top of it.

## Current v1.1 inventories

- 12 premium style families
- 36 curated style directions
- 39 premium motion modules / 39 executable implementations
- 18 procedural material systems / 18 executable variants
- 27 premium template kits / 3 per Production Master
- 18 first-party Lottie presets across 8 semantic categories
- 9 Production Master premium recipes / 54 beat-level plans
- 2 MiniMax Hailuo provider profiles
- 5 generative scene classes
- external licensed motion assets: 0 until specifically ingested with provenance/license
- verified factual media: 0 until specifically ingested and approved

Do not interpret the two zero inventories as a request to invent substitutes.
