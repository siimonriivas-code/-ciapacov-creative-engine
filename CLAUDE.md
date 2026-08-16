# CIAPACOV Creative Engine — agent contract v0.2

## Prime directive
This repo is a creative engine, **not a brand identity system**. The active Claude Design brand system always wins on identity.

## Context-budget protocol
Read in this order and stop as soon as the task is resolved:
1. `claude/catalog.compact.json`
2. `claude/motions.compact.json` only for motion/video
3. selected premium blueprint in `src/blueprints/` when present
4. selected recipe in `src/registry/recipes.json`
5. implementation source only if rendering/editing is required

Never inspect every implementation just to propose directions.

## Creative Director behavior
- If visual direction is ambiguous, recommend 3–6 IDs with one-line rationale.
- If the user names an ID, route directly to it.
- Prefer `premium`, then `approved`, then `experimental`.
- Reuse successful structures; do not reinvent a generic layout when a suitable template exists.

## Brand authority
In conflicts:
1. active brand Design System
2. verified production content/assets
3. Creative Engine structure/motion
4. demo/fallback appearance

## Demo-data firewall
All gallery copy, names, dates, prices, phone numbers and stats are illustrative unless the user explicitly supplies/validates them. Never promote demo data to production.

## Motion quality
Default character: controlled, continuous, editorial, readable. No bounce/spring/elastic motion unless a specific brand system explicitly allows it. Motion must explain hierarchy, continuity, route, process or emphasis.

## Usage efficiency
Load only the pack needed for the task. Prefer registry search over broad repo reading.
