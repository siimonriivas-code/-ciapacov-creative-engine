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
8. When the user wants premium art direction, richer composition, advanced motion, Lottie or generative video, read `claude/premium.compact.json` **after** architecture selection.
9. From the premium compact index, choose up to three materially different style families compatible with the selected architecture. Do not default to a full-frame primary brand color merely because it exists in the Design System.
10. Read only the premium motion modules needed by the selected style + storyboard beats. Add `claude/motions.compact.json` only when legacy/core motion recipes are also useful.
11. Classify every proposed generative-video scene before generation. Factual evidence and factual overlays are never generated pixels.
12. Load full recipes/source or a licensed external motion file only after direction/runtime selection.
13. Surface missing factual media or official assets accurately; do not turn recommended media into mandatory blockers and never fabricate missing evidence.
14. Before export run factual QA + safe-area/readability QA + anti-generic QA.

## User-facing behavior
The user should not need to know IDs. Translate a normal brief into: domain → Operational Master → three visual architectures → Production Master when applicable → premium style directions when requested → asset/media readiness → production prompt.

For a first recommendation, do **not** scan the repository and do **not** open every template. Return a compact shortlist and wait for the visual/style direction selection unless the user explicitly asks for automatic execution.

## Premium visual behavior
A premium result is not defined by "more animation". It requires deliberate composition variety, visual hierarchy, useful negative space, a coherent transition language and motion tied to narrative meaning.

Hard anti-generic rules:
- do not flood most scenes with the primary brand color;
- do not repeat one card layout across an entire reel;
- do not add generic icons merely to fill empty space;
- do not shrink dense text into microtext;
- use contrast in scale, crop, surface, density, media and motion before adding more color;
- every decorative element must support hierarchy, continuity, evidence, location, time, data or transition.

## Agua Bienestar
When the brief is clearly about Agua Bienestar, use `BRIDGE-AGUA-BIENESTAR-V1` from the QA compact catalog. The Design System remains authoritative for its actual identity. The bridge only adds compatibility rules, approved wording gates and motion behavior.

For Agua Bienestar specifically, premium styling must **not** become "everything blue". Use the Design System's color roles with neutral surfaces, white space, vino/deep roles and selective cyan/blue emphasis as the mounted Design System permits.

## Lottie / external motion
Public motion galleries are discovery/reference sources, not automatic redistribution permission. A specific external motion asset is production-usable only when `src/registry/external-motion-assets.json` records its license, provenance and review state. Otherwise use the idea as inspiration or build a first-party equivalent.

## Generative video
Use `claude/premium.compact.json` and `src/registry/generative-scene-policies.json`. Prefer controlled image-to-video when an approved first frame can constrain composition. Keep logos, names, figures, prices, routes, phone numbers, legal/sanitary wording and other factual overlays in deterministic Remotion/HTML/SVG layers.

Never generate and present as real: an official vehicle, beneficiary, testimony, work site, purifier, event, official map or other documentary evidence.

## Production gate
Production-ready means all of the following are true: the chosen Master exists, the visual architecture exists, the Production Master/composition exists for video, requested duration is supported, required factual media is approved, official brand assets come from the active Design System, and any factual locks attached to a reproducible QA scenario are respected.

Recommended media that is absent should produce a warning or alternate composition path, not an automatic block. Only explicit `requiredMediaRoles`, required capabilities or factual/brand requirements create hard blockers.

For premium productions, also require the anti-generic audit to pass before final export.
