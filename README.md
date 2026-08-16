# CIAPACOV Creative Engine v0.6 · Production Planning

Private creative-direction, reusable-template, domain-master, asset-vault, reference-library, storyboard and motion system for Claude Design / Claude Code workflows.

The repository remains **brand-agnostic**. The active Design System is always the authority for identity, official logos, typography, approved colors, safe areas, accessibility and governance.

## What ships in v0.6
- **80** searchable template records
- **48** curated motion recipes
- **8** multi-format Campaign Kits
- **9** Domain Libraries mapped to real communication work
- **20** Operational Master Templates
- **20 production storyboards**, one for every Operational Master
- Production Planner: brief → domain → Master → storyboard → templates → asset readiness → blockers
- Copy-ready production prompt that tells Claude to load only the selected Master, storyboard, template, recipe, motions and resolved assets
- **34** Asset Vault records, including **25 bundled original SVG primitives** and controlled semantic slots for official/real assets
- **7** Reference Library source profiles with usage boundaries
- Asset Resolver with explicit `ready / slot / missing` states
- License-aware local ingest pipeline; no automated marketplace scraping
- Offline Contact Sheets generator
- Separate Media Library contract for large photo/video archives
- Motion + GSAP primitives and optional Remotion video pack
- Compact catalogs so Claude can load only what it needs

## Quick start
```bash
npm install
npm run validate:all
npm run catalog:all
npm run dev
```

Generate visual contact sheets without Claude:
```bash
npm run contact-sheets
```

Ingest a user-owned/licensed local asset:
```bash
npm run ingest:asset -- ingest/examples/asset-manifest.example.json /absolute/path/to/file.svg
```

## Production routing rule
For normal work, Claude should not scan the repo.

1. Read `claude/ecosystem.compact.json` when the request maps to a real work domain.
2. Select an Operational Master.
3. Read only its storyboard from `src/registry/storyboards.json`.
4. Read `claude/catalog.compact.json` for its template candidates.
5. Add `claude/motions.compact.json` only for motion/video.
6. Resolve required and recommended capabilities against the Asset Vault.
7. If an official/real slot is unresolved, report it; never fabricate it.
8. After selection, inspect only the chosen template recipe, motion primitives and assets.

## Architecture boundary
**Design System** = identity and governance.  
**Creative Engine** = composition and motion.  
**Domain Library** = work-specific logic.  
**Operational Master** = reusable production strategy.  
**Storyboard Library** = narrative beats and required fields.  
**Asset Vault** = reusable approved primitives + semantic slots.  
**Media Library** = real photo/video stored outside the code repo when appropriate.  
**Reference Library** = inspiration and provenance, not a redistribution mirror.  
**Production Planner** = brief router, readiness checker and production-prompt generator.
