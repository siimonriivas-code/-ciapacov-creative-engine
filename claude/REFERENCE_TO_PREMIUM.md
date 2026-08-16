# Reference → Premium original production

Use this only when the user supplies a design, screenshot, Reel, animation, marketplace preview or other visual reference and asks for a comparable level of craft.

## Authority

The active Design System remains the only authority for identity: logos, typography, approved colors, safe areas, accessibility and brand governance. The reference never overrides it.

## Do not copy the reference

Do not recreate proprietary artwork, characters, exact layouts, exact timing, pixel coordinates, illustrations, source templates or marketplace assets unless the user has supplied a production-authorized/licensed source file and the license permits that use.

A public preview is evidence of a creative technique, not evidence of a reusable license.

## Minimal reference analysis

Read `src/registry/reference-analysis-dimensions.json` and describe only the dimensions needed for this reference:

- composition grammar
- hierarchy behavior
- color distribution
- materiality
- motion grammar
- transition grammar
- typography behavior
- spatial depth
- camera behavior
- information density
- editorial rhythm
- evidence relationship

Convert that analysis into a short **Visual DNA** statement. Example:

> asymmetrical editorial stage + neutral-led surfaces + one saturated accent + multi-plane depth + mask/object continuity + oversized type + pulse-and-hold rhythm

Do not say “copy this template”. Say what principles make it effective.

## Map the DNA to the ecosystem

1. Keep the already selected Operational Master and Production Master.
2. Keep the selected visual architecture unless the reference proves another architecture solves the brief better.
3. Read only the matching record from `src/registry/premium-style-presets.json`.
4. Select the closest one of its three curated style directions.
5. Read the Premium Template Kits for the selected Production Master in `src/registry/premium-template-kits.json` and prefer the closest executable kit.
6. Use only that kit's material IDs and motion IDs first.
7. Add first-party Lottie from `claude/lottie-pack.compact.json` only when a storyboard beat benefits from it.
8. If atmosphere, depth or explanatory cinematic motion still needs a generative clip, read `src/registry/generative-shot-archetypes.json` and select one governed archetype.

## Generative rule

Prefer an approved first frame + image-to-video when composition matters. Generated pixels may provide conceptual water, abstract territory, atmosphere, geometry, depth, explanatory systems or transitions.

Generated pixels must never fabricate documentary evidence, an official vehicle, beneficiary, actual location, official map, testimony, logo, price, route, phone number or metric. Put those in deterministic Remotion/Design System layers.

## Quality gate

Before calling a premium result final, create a scene-level plan and run both:

- `scripts/audit-premium-production.mjs`
- `scripts/audit-creative-benchmark.mjs`

The creative benchmark must score **82 or higher** and have zero factual/readability blockers. A score is a floor, not proof of beauty; inspect the actual rendered piece visually as well.

## Expected output before production

When the user asks to analyze a reference before producing, report only:

1. Visual DNA.
2. What should be borrowed as a principle.
3. What must not be copied.
4. Selected style direction.
5. Selected executable Premium Template Kit.
6. Materials.
7. Motion modules / Lottie choices.
8. Optional generative shot archetype, if it adds value.
9. What remains deterministic/factual.
10. Expected benchmark risks.

Then produce only after the user has asked to proceed or production is already explicitly authorized.
