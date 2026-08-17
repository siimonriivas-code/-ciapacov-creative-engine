# CIAPACOV Creative Ecosystem v1.1 — Premium entrypoint

Use this only after base routing has resolved an Operational Master, Production Master and visual architecture.

The active Design System remains the sole identity authority. This premium layer changes composition, materials, motion, transitions, captions, optional audio treatment and optional conceptual/generative treatment; it does **not** create a parallel brand palette.

## Minimal loading order

1. Read `claude/premium.compact.json`.
2. If the user supplied a visual/video reference, read `claude/REFERENCE_TO_PREMIUM.md` and extract only the needed Visual DNA dimensions. Never recreate a marketplace/source design one-to-one.
3. Read the single matching architecture record in `src/registry/premium-style-presets.json` and expose/use exactly its three curated premium style directions.
4. After a style is selected, read only that style record from `src/registry/creative-style-families.json`.
5. Read the matching Production Master recipe from `src/registry/production-style-recipes.json`.
6. Prefer the closest compatible executable Premium Template Kit in `src/registry/premium-template-kits.json`. Each Production Master has exactly three materially distinct directed kits. The registered runtime is `src/remotion/compositions/PremiumDirectedKitComposition.tsx`, the directed layout library is `src/remotion/compositions/PremiumDirectedContent.tsx`, and compositions use `CE-KIT-*` IDs.
7. Read only material systems needed by the selected kit/style from `claude/premium-materials.compact.json`.
8. Read only relevant first-party animated assets from `claude/lottie-pack.compact.json`.
9. Read only the motion module IDs required by the selected premium recipe/template kit.
10. Choose one coherent transition grammar from `src/registry/premium-transition-systems.json` when scene handoffs need continuity. Do not mix transition types merely for novelty.
11. If captions are required, choose one governed system from `src/registry/caption-systems.json`. Captions remain deterministic and inside the active Design System safe areas.
12. If music/sound design is relevant, read `claude/audio.compact.json`, then only the selected Production Master's sound preset. Build a BPM frame grid only when licensed/authorized music exists and sync helps the story.
13. If generative video adds real value, select one governed archetype from `src/registry/generative-shot-archetypes.json`. If provider choice matters, read `src/registry/generative-provider-catalog.json` and route by capabilities. A routing profile is not execution permission.
14. Prefer approved-first-frame image-to-video when composition must be constrained.
15. Keep names, routes, prices, phone numbers, metrics, captions, official marks, official vehicles, maps and documentary evidence in deterministic/verified layers.
16. Build a scene-level production plan and run factual QA, safe areas, caption readability, anti-generic QA and `scripts/audit-creative-benchmark.mjs` before final export.
17. For motion templates, verify visible temporal change and purposeful motion; a static premium video template is a QA failure even if it compiles.
18. Inspect the actual render and, when audio exists, the actual mix. Automated PASS is a floor, not proof of visual/audio quality.

## Premium quality rule

A piece is not premium because it uses more effects. It is premium when:

- composition changes meaningfully across beats without losing continuity;
- negative space and dense moments alternate intentionally;
- primary brand color does not flood most scenes by default;
- motion has narrative purpose;
- real evidence remains real;
- typography participates in the composition while remaining readable;
- materials support hierarchy, atmosphere or depth rather than fill empty space;
- transitions hand narrative focus from one beat to the next;
- captions support comprehension instead of becoming another decoration layer;
- sound design, when present, reinforces rhythm/state/continuity without covering voice or critical information;
- at least one deliberate hero/payoff beat exists in longer motion pieces when appropriate;
- the output remains recognizable as the active Design System, not as a marketplace template pasted on top of it.

The measurable creative benchmark is a **floor of 82/100 with zero factual/readability blockers**. A passing score is not proof of beauty: inspect the rendered output visually too.

## Current v1.1 inventories

- 12 premium style families
- 36 curated style directions
- 39 premium motion modules / 39 executable implementations
- 18 procedural material systems / 18 executable variants
- 12 first-party transition systems / 12 executable variants
- 6 premium caption systems / 6 executable variants
- 27 Premium Template Kits / **27 executable directed Remotion compositions**, exactly 3 per Production Master
- 18 first-party Lottie presets across 8 semantic categories
- 9 Production Master premium recipes / 54 beat-level plans
- 12 audio roles / 9 Production Master sound-design presets
- verified rights-cleared audio assets: 0 until specifically ingested and approved
- 18 governed cinematic/generative shot archetypes
- 10 generative provider capability profiles across 6 provider families
- 2 integrated MiniMax Hailuo profiles in the current governed executor registry; live paid execution remains unproven until credentials/authorization are supplied
- 5 generative scene classes
- 12 Visual DNA dimensions for reference analysis
- 39 total Remotion compositions: 9 base Production Masters + 3 QA compositions + 27 Premium Template Kits
- external licensed motion assets: 0 until specifically ingested with provenance/license
- verified factual media: 0 until specifically ingested and approved

Do not interpret any zero inventory as a request to invent substitutes.
