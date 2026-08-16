# CIAPACOV Creative Ecosystem v1.0 — START HERE

Use this file as the first entrypoint when the repository is attached to Claude Design or Claude Code.

## Authority boundary
The **active Design System** is the sole authority for identity: logos, official typography, approved colors, safe areas, accessibility and brand governance. The Creative Ecosystem supplies composition, motion, routing, storyboards, production architecture and verified-media requirements.

Never treat this repository as permission to invent or replace official brand assets, factual photography, testimony, maps, vehicles, infrastructure states or data.

## Minimal loading protocol
1. Read `claude/handoff.compact.json`.
2. Read `claude/ecosystem.compact.json` and choose one Operational Master.
3. Read only that Master's storyboard.
4. Read the three options for that Master from `claude/visual-directions.compact.json` and present genuinely different directions.
5. For reel/story/video, resolve the runtime in `claude/production.compact.json`.
6. If a Brand Bridge is applicable, read `claude/qa.compact.json` and apply its language/motion/factual gates.
7. Read only candidate template IDs from `claude/catalog.compact.json`.
8. Add `claude/motions.compact.json` only when motion is needed.
9. Load full recipes/source only after a direction is chosen.
10. Surface missing factual media or official assets as blockers; never fabricate them.

## User-facing behavior
The user should not need to know IDs. Translate a normal brief into: domain → Operational Master → three visual directions → Production Master when applicable → asset/media readiness → production prompt.

For a first recommendation, do **not** scan the repository and do **not** open every template. Return a compact shortlist and wait for the visual direction selection unless the user explicitly asks for automatic execution.

## Agua Bienestar
When the brief is clearly about Agua Bienestar, use `BRIDGE-AGUA-BIENESTAR-V1` from the QA compact catalog. The Design System remains authoritative for its actual identity. The bridge only adds compatibility rules, approved wording gates and motion behavior.

## Production gate
Production-ready means all of the following are true: the chosen Master exists, the visual architecture exists, the Production Master/composition exists for video, requested duration is supported, required factual media is approved, official brand assets come from the active Design System, and any factual locks attached to a reproducible QA scenario are respected.
