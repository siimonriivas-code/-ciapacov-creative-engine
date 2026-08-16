# CIAPACOV Creative Engine v0.7 · Visual Production Library

Private creative-direction, reusable-template, domain-master, asset-vault, reference-library, storyboard, visual-direction and motion system for Claude Design / Claude Code workflows.

The repository remains **brand-agnostic**. The active Design System is always the authority for identity, official logos, typography, approved colors, safe areas, accessibility and governance.

## What ships in v0.7
- **80** searchable template records
- **48** curated motion recipes
- **8** multi-format Campaign Kits
- **9** Domain Libraries
- **20** Operational Master Templates
- **20** production storyboards, one per Master
- **12 reusable visual architectures**
- **60 visual directions**: exactly three distinct visual directions per Operational Master
- Visual Production Library inside the React gallery
- Production Planner v0.7: brief → Master → storyboard → three visual directions → templates → asset readiness
- Copy-ready production prompt that includes the selected visual direction
- Offline visual catalog: `catalog/visual-production-library.html`
- Compact visual index: `claude/visual-directions.compact.json`
- **34** Asset Vault records, including **25 bundled original SVG primitives**
- **7** Reference Library source profiles with usage boundaries
- License-aware local ingest pipeline
- Separate Media Library contract for large photo/video archives
- Motion + GSAP primitives and optional Remotion video pack
- CI validation for registries, ecosystem, visual directions, TypeScript/Vite and Remotion

## Quick start
```bash
npm install
npm run validate:all
npm run catalog:all
npm run dev
```

Generate the visual production library without Claude:
```bash
npm run visuals:build
```

Ingest a user-owned/licensed local asset:
```bash
npm run ingest:asset -- ingest/examples/asset-manifest.example.json /absolute/path/to/file.svg
```

## Production routing rule
For normal work, Claude should not scan the repo.

1. Read `claude/ecosystem.compact.json`.
2. Select one Operational Master.
3. Read only its storyboard.
4. Read `claude/visual-directions.compact.json` and show the Master's three visual directions.
5. After the user chooses a direction, read only the Master's referenced template IDs from `claude/catalog.compact.json`.
6. Add `claude/motions.compact.json` only for motion/video.
7. Resolve required/recommended capabilities against the Asset Vault.
8. Never fabricate unresolved official/real slots.
9. Inspect only the selected template recipe, motion primitives and assets.

## Architecture boundary
**Design System** = identity and governance.  
**Creative Engine** = composition and motion.  
**Domain Library** = work-specific logic.  
**Operational Master** = reusable production strategy.  
**Storyboard Library** = narrative beats and required fields.  
**Visual Production Library** = three compositional directions per Master.  
**Asset Vault** = reusable approved primitives + semantic slots.  
**Media Library** = real photo/video stored outside the code repo when appropriate.  
**Reference Library** = inspiration and provenance, not a redistribution mirror.  
**Production Planner** = brief router, visual selector, readiness checker and production-prompt generator.
