# CIAPACOV Creative Engine v0.5 · Creative Ecosystem

Private creative-direction, reusable-template, domain-master, asset-vault, reference-library and motion system for Claude Design / Claude Code workflows.

The repository remains **brand-agnostic**. The active Design System is always the authority for identity, official logos, typography, approved colors, safe areas, accessibility and governance.

## What ships in v0.5
- **80** searchable template records
- **48** curated motion recipes
- **8** multi-format Campaign Kits
- **9** Domain Libraries mapped to real communication work
- **20** Operational Master Templates above the generic template layer
- **34** Asset Vault records, including **25 bundled original SVG primitives** and controlled semantic slots for official/real assets
- **7** Reference Library source profiles with usage boundaries
- Structured Brief Router: topic → domain → master → templates → asset readiness
- Asset Resolver with explicit `ready / slot / missing` states
- License-aware local ingest pipeline; no automated marketplace scraping
- Offline Contact Sheets generator
- Separate Media Library contract for large photo/video archives
- Motion + GSAP primitives and optional Remotion video pack retained from v0.4
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

## AI routing rule
For normal work, Claude should not scan the repo.

1. Read `claude/ecosystem.compact.json` when the request maps to a real work domain.
2. Read `claude/catalog.compact.json` for template candidates.
3. Add `claude/motions.compact.json` only for motion/video.
4. Add `claude/campaigns.compact.json` only for multi-format campaigns.
5. After selection, inspect only the chosen Master, template recipe, asset records and implementation.

## Architecture boundary
**Design System** = identity and governance.  
**Creative Engine** = composition and motion.  
**Domain Library** = work-specific logic.  
**Asset Vault** = reusable approved primitives + semantic slots.  
**Media Library** = real photo/video stored outside the code repo when appropriate.  
**Reference Library** = inspiration and provenance, not a redistribution mirror.  
**Creative Director** = brief router and selector.
