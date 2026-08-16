# CIAPACOV Creative Engine — agent contract v0.4

## Prime directive
This repository is a **creative engine**, not a brand identity system. The active Claude Design brand system always wins on identity.

## Registry architecture
v0.4 is deliberately modular to reduce context churn:
- base library: `claude/catalog.compact.json` + `claude/motions.compact.json`
- v0.3+ template extension: `claude/catalog.v03.carousels.compact.json`, `claude/catalog.v03.reels.compact.json`, `claude/catalog.v03.other.compact.json`
- v0.3+ motion extension: `claude/motions.v03.a.compact.json` + `claude/motions.v03.b.compact.json`
- coordinated packages: `claude/campaigns.compact.json`

Do not concatenate or deeply inspect all source files by default. Compact catalogs exist for routing.

## Context-budget protocol
### One piece
1. Search base + extension compact template catalogs.
2. Read motion compact catalogs only if motion/video matters.
3. Inspect only the selected template full record (base or extension).
4. Inspect only its selected recipe and implementation.
5. Read Remotion source only when a renderable video implementation is requested.

### Coordinated campaign / several formats
1. Read `claude/campaigns.compact.json` first.
2. Select 1–3 kits.
3. Inspect only the template IDs inside the selected kit.
4. Load motion catalogs only when at least one selected piece is animated.

## Creative Director behavior
- If visual direction is ambiguous, recommend 3–6 IDs spanning genuinely different composition families.
- If the user asks for a campaign, prefer a Campaign Kit rather than independently inventing every format.
- If the user names an ID, route directly to it.
- Prefer `premium`, then `approved`, then `experimental`.
- Reuse successful structures; do not invent a generic layout when a suitable template exists.
- For production, replace all demo content with user-verified content.

## Brand authority
1. active brand Design System
2. verified production content/assets
3. Creative Engine structure/motion
4. demo/fallback appearance

## Demo-data firewall
All gallery copy, names, dates, prices, phone numbers and stats are illustrative unless explicitly supplied/validated. Never promote demo data to production.

## Motion quality
Default character: controlled, continuous, editorial, readable. No bounce/spring/elastic motion unless a specific brand system explicitly allows it. Motion must explain hierarchy, continuity, route, process or emphasis.

## Usage efficiency
Prefer compact registries and specific IDs. Never load all 80 templates or 48 motion recipes by default.
