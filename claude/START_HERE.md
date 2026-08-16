# CIAPACOV Creative Ecosystem v1.1 — START HERE

Use this file as the first entrypoint when the repository is attached to Claude Design or Claude Code.

## Authority boundary
The **active Design System** is the sole authority for identity: logos, official typography, approved colors, safe areas, accessibility and brand governance. The Creative Ecosystem supplies composition, motion, routing, storyboards, premium style direction, production architecture, verified-media requirements and governed generative-video planning.

Never treat this repository as permission to invent or replace official brand assets, factual photography, testimony, maps, vehicles, infrastructure states or data.

## Minimal loading protocol
1. Read `claude/handoff.compact.json`.
2. Read `claude/ecosystem.compact.json` and choose one Operational Master.
3. Read only that Master's storyboard.
4. Read the three options for that Master from `claude/visual-directions.compact.json` and present genuinely different visual architectures.
5. For reel/story/video, resolve the runtime in `claude/production.compact.json`.
6. If a Brand Bridge is applicable, read `claude/qa.compact.json` and apply its language/motion/factual gates.
7. Read only candidate template IDs from `claude/catalog.compact.json`.
8. When the user wants premium art direction, richer composition, advanced motion, Lottie, a reference-quality treatment or generative video, read `claude/premium.compact.json` **after** architecture selection.
9. If the user supplied a visual/video reference, use `claude/REFERENCE_TO_PREMIUM.md` to extract its Visual DNA as principles. Never interpret a public reference as permission to copy its protected artwork/template.
10. From the premium compact index, use the three materially different style directions compatible with the selected architecture. Do not default to a full-frame primary brand color merely because it exists in the Design System.
11. Prefer a compatible **executable Premium Template Kit** from `src/registry/premium-template-kits.json` when it solves the brief. There are exactly three per Production Master and 27/27 are executable as `CE-KIT-*` Remotion compositions.
12. Read only the selected kit's material and motion IDs. Add first-party Lottie only when a beat benefits from it.
13. If generative video materially improves atmosphere, depth, explanation or continuity, select a governed archetype from `src/registry/generative-shot-archetypes.json`. Prefer approved-first-frame image-to-video when composition matters.
14. Factual evidence and factual/official overlays are never generated pixels. Keep logos, names, figures, prices, routes, phone numbers, metrics and documentary truth deterministic and verified.
15. Surface missing factual media or official assets accurately; do not turn recommended media into mandatory blockers and never fabricate missing evidence.
16. Before premium final export run factual QA + safe-area/readability QA + anti-generic QA + `scripts/audit-creative-benchmark.mjs`. Premium creative benchmark must score **82 or higher with zero factual/readability blockers**.
17. A passing validator is not proof of beauty: inspect representative rendered frames or the actual animation visually before declaring the result final.

## User-facing behavior
The user should not need to know IDs. Translate a normal brief into: domain → Operational Master → three visual architectures → Production Master when applicable → premium style directions when relevant → executable kit → asset/media readiness → production.

For a first recommendation, do **not** scan the repository and do **not** open every template. Return a compact shortlist and wait for the visual/style direction selection unless the user explicitly asks for automatic execution.

If the user has already authorized production, do not repeatedly ask them to choose architecture or IDs. Resolve the best compatible path automatically and explain only meaningful tradeoffs or blockers.

## Premium visual behavior
A premium result is not defined by "more animation". It requires deliberate composition variety, visual hierarchy, useful negative space, a coherent transition language and motion tied to narrative meaning.

Hard anti-generic rules:
- do not flood most scenes with the primary brand color;
- do not repeat one rounded-card layout across an entire reel;
- do not add generic icons merely to fill empty space;
- do not shrink dense text into microtext;
- do not make every element enter with the same animation;
- do not keep every second at the same intensity; use holds, contrast and hero/payoff beats;
- use contrast in scale, crop, surface, density, media, depth and motion before adding more color;
- every decorative element must support hierarchy, continuity, evidence, location, time, data, atmosphere or transition.

## Agua Bienestar
When the brief is clearly about Agua Bienestar, use `BRIDGE-AGUA-BIENESTAR-V1` from the QA compact catalog. The Design System remains authoritative for its actual identity. The bridge only adds compatibility rules, approved wording gates and motion behavior.

For Agua Bienestar specifically, premium styling must **not** become "everything blue". Use the Design System's color roles with neutral surfaces, white space, vino/deep roles and selective cyan/blue emphasis as the mounted Design System permits.

For the validated weekly route use case, the premium route family currently offers three executable treatments: Liquid Journey, Spatial Territory and Technical Schedule. Missing official vehicle/map media is a warning when recommended, not a hard blocker unless the selected concept explicitly requires factual media.

## Lottie / external motion
The first-party library has 18 reusable Lottie presets governed by Design System color roles. Public motion galleries are discovery/reference sources, not automatic redistribution permission. A specific external motion asset is production-usable only when `src/registry/external-motion-assets.json` records its license, provenance and review state. Otherwise use the idea as inspiration or build a first-party equivalent.

## Generative video
Use `claude/premium.compact.json`, `src/registry/generative-scene-policies.json` and the 18 archetypes in `src/registry/generative-shot-archetypes.json`. Prefer controlled image-to-video when an approved first frame can constrain composition. Keep logos, names, figures, prices, routes, phone numbers, legal/sanitary wording and other factual overlays in deterministic Remotion/HTML/SVG layers.

Never generate and present as real: an official vehicle, beneficiary, testimony, work site, purifier, event, official map or other documentary evidence.

## Production gate
Production-ready means all of the following are true: the chosen Master exists, the visual architecture exists, the Production Master/composition exists for video, requested duration is supported, required factual media is approved, official brand assets come from the active Design System, and any factual locks attached to a reproducible QA scenario are respected.

Recommended media that is absent should produce a warning or alternate composition path, not an automatic block. Only explicit `requiredMediaRoles`, required capabilities or factual/brand requirements create hard blockers.

For premium productions also require: anti-generic QA pass, creative benchmark >=82, zero factual/readability blockers and visual inspection of the actual render.
