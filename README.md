# CIAPACOV Creative Engine v0.8 · Production Masters & Media Intelligence

Private creative-production ecosystem for Claude Design / Claude Code workflows.

The repository remains **brand-agnostic**. The active Design System is always the authority for identity, official logos, typography, approved colors, safe areas, accessibility and governance.

## What ships in v0.8
- **80** searchable template records
- **48** curated motion recipes
- **8** Campaign Kits
- **9** Domain Libraries
- **20** Operational Master Templates
- **20** production storyboards
- **12** visual architectures and **60** Master-specific visual directions
- **9 executable Production Masters** covering all 20 Operational Masters exactly once
- **9 Remotion compositions** available to the runtime: Route Journey, Data Cascade, Process Connected, Launch Editorial, Documentary Evidence, Before/After, Timeline Territory, Testimonial Quote and Notice/Alert
- **12 Media Intelligence roles** for factual photos, video, maps, official vehicles, brands, testimony, B-roll and evidence
- Verified Media Library registry starts intentionally empty; production media is never fabricated to satisfy a factual slot
- Media matching scores kind, mandatory tags, preferred tags, orientation, domain and approval status
- Production Planner: brief → Operational Master → storyboard → 3 visual directions → Production Master → asset/media readiness → prompt
- Compact catalogs for low-context Claude loading
- React/Vite gallery, Motion, GSAP and Remotion

## Quick start
```bash
npm install
npm run validate:all
npm run catalog:all
npm run build
npm run dev
```

Open the executable video pack:
```bash
npm run remotion:studio
```

Example renders:
```bash
npm run remotion:render:route
npm run remotion:render:documentary
npm run remotion:render:before-after
```

## Production routing rule
Claude should not scan the repository.

1. Read `claude/ecosystem.compact.json` to identify the work domain and Operational Master.
2. Read only that Master storyboard.
3. Read `claude/visual-directions.compact.json` and offer genuinely different visual directions.
4. Read `claude/production.compact.json` to resolve the executable Production Master and media roles.
5. Read only candidate template IDs from `claude/catalog.compact.json`.
6. Add `claude/motions.compact.json` only when motion is required.
7. Resolve Asset Vault and verified Media Library slots.
8. Never manufacture factual media, official assets or data to make a production appear complete.

## Architecture boundary
**Design System** = identity and governance.  
**Creative Engine** = composition and motion.  
**Domain Library** = work-specific logic.  
**Operational Master** = communication strategy.  
**Storyboard Library** = narrative beats.  
**Visual Production Library** = visual direction before template selection.  
**Production Master** = executable video/runtime architecture.  
**Asset Vault** = reusable approved primitives and semantic slots.  
**Media Intelligence** = factual-media matching and readiness.  
**Media Library** = verified real media, usually stored outside the code repo and indexed here.  
**Reference Library** = inspiration/provenance, not a redistribution mirror.

## Media Library policy
`src/registry/media-library.json` contains only metadata for verified resources. It is empty by default. `src/registry/media.example.json` documents the schema but is explicitly non-production. Real photographs, videos and audio may live in a separate storage system; the registry stores controlled references, rights metadata, tags and approval state.
