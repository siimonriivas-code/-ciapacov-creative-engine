# CIAPACOV Creative Engine v0.9 · Real Production QA & Brand Bridge

Private creative-production ecosystem for Claude Design / Claude Code workflows.

The repository remains **brand-agnostic at its core**. Brand Bridges adapt an external Design System without bundling official logos, font binaries or factual media. The active Design System is always the authority for identity, approved colors, typography, safe areas, accessibility and governance.

## What ships in v0.9
- **80** searchable template records
- **48** curated motion recipes
- **8** Campaign Kits
- **9** Domain Libraries
- **20** Operational Masters + **20** storyboards
- **12** reusable visual architectures + **60** Master-specific directions
- **9 executable Production Masters** covering all 20 Operational Masters exactly once
- **9 Remotion compositions**, now duration-aware through input props
- **12 Media Intelligence roles** and a verified Media Library contract
- **2 Brand Bridges**: generic external Design System + Agua Bienestar v1 adapter
- **1 reproducible real-production QA scenario** for Agua Bienestar weekly routes
- Language/fact locks that can reject prohibited terminology before production
- Production Planner v0.9: brief → Operational Master → storyboard → visual direction → Production Master → Brand Bridge → asset/media readiness → QA → production prompt
- Compact low-context indexes including `claude/qa.compact.json`
- React/Vite gallery with a dedicated Brand + QA view

## Quick start
```bash
npm install
npm run validate:all
npm run catalog:all
npm run qa:real
npm run build
npm run dev
```

Open the executable video pack:
```bash
npm run remotion:studio
```

## Production routing rule
Claude should not scan the repository.

1. Read `claude/ecosystem.compact.json` and select one Operational Master.
2. Read only that Master's storyboard.
3. Read `claude/visual-directions.compact.json` and offer genuinely different visual directions.
4. Read `claude/production.compact.json` for the Production Master and media roles.
5. When a specialized Design System is active, read `claude/qa.compact.json` and resolve the matching Brand Bridge / QA scenario.
6. Read only candidate IDs from `claude/catalog.compact.json`.
7. Resolve Asset Vault and verified Media Library slots.
8. Add motion recipes only when required.
9. Run applicable QA gates before rendering or export.
10. Never manufacture factual media, official assets, quotations, maps or data to make a production appear complete.

## Brand Bridge boundary
A Brand Bridge is an **adapter, not a second Design System**. It may define CSS-variable mappings, demo fallbacks, safe-area metadata, wording gates and motion constraints. It must not embed official logo binaries or font files. Fallback colors exist only so code previews remain usable when the external Design System is not mounted.

Current specialized bridge: `BRIDGE-AGUA-BIENESTAR-V1`.

## Real-production QA
`QA-AB-ROUTE-45S-V1` is the first reproducible QA fixture. It locks the expected Operational Master, Production Master, Remotion composition, preferred visual architecture, duration, route schedule, factual values and wording boundaries for the weekly Agua Bienestar route use case.

Run it with:
```bash
npm run qa:real
```

The QA runner also writes `/tmp/ab-route-qa-props.json`, which can be passed to Remotion for a duration-aware production smoke test.

## Architecture boundary
**Design System** = identity and governance.  
**Brand Bridge** = external-DS adapter + language/safe-area policy.  
**Creative Engine** = composition and motion.  
**Domain Library** = work-specific logic.  
**Operational Master** = communication strategy.  
**Storyboard Library** = narrative beats.  
**Visual Production Library** = visual direction before template selection.  
**Production Master** = executable video/runtime architecture.  
**Asset Vault** = reusable primitives and semantic slots.  
**Media Intelligence** = factual-media matching and readiness.  
**Media Library** = verified real media metadata.  
**QA Scenarios** = reproducible factual/routing/language gates.  
**Reference Library** = inspiration/provenance, not a redistribution mirror.

## Media Library policy
`src/registry/media-library.json` contains only metadata for verified resources and may be empty. `src/registry/media.example.json` is schema documentation only. Real photographs, videos and audio can remain in external storage; the registry stores controlled references, rights metadata, tags and approval state.
