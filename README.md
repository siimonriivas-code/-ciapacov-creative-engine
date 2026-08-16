# CIAPACOV Creative Ecosystem v1.0 · Production Handoff

Private creative-production ecosystem for Claude Design / Claude Code workflows.

The repository is **brand-agnostic at its core**. The active Design System remains the authority for identity, official logos, fonts, approved colors, safe areas, accessibility and governance. Brand Bridges adapt external Design Systems without bundling their protected assets.

## v1.0 inventory
- **80** searchable templates
- **48** curated motion recipes
- **8** Campaign Kits
- **9** Domain Libraries
- **20** Operational Masters + **20** storyboards
- **12** reusable visual architectures + **60** Master-specific directions
- **9 executable Production Masters** covering all 20 Operational Masters exactly once
- **9 Remotion compositions**, duration-aware through props
- **12 Media Intelligence roles** and a verified Media Library contract
- **2 Brand Bridges**: generic external Design System + Agua Bienestar v1 adapter
- **6 final integration scenarios** covering routes, obra, drenaje, contingencia, resultados and authorized testimony
- **1 factual-lock QA scenario** for Agua Bienestar weekly routes
- Low-context Claude handoff entrypoint: `claude/START_HERE.md`
- Compact integration index: `claude/handoff.compact.json`

## Quick start
```bash
npm install
npm run validate:all
npm run catalog:all
npm run qa:real
npm run build
npm run dev
```

Open the video runtime:
```bash
npm run remotion:studio
```

## Claude Design handoff
When this repo is attached as a codebase/context source, start at:

`claude/START_HERE.md`

Recommended loading order:

`START_HERE → handoff.compact → ecosystem.compact → selected storyboard → visual-directions.compact → production.compact → qa.compact when applicable → selected template/recipe → motions.compact when needed`

Claude should never scan the whole repository just to recommend a visual direction.

## Production routing rule
1. Interpret the normal-language brief.
2. Select one Operational Master and up to two alternatives.
3. Present three genuinely different visual architectures.
4. For video, resolve Production Master, Remotion composition and supported duration.
5. Resolve Asset Vault and factual Media Intelligence requirements.
6. Apply a Brand Bridge when the active Design System has one.
7. Apply reproducible QA/factual gates when the brief matches a locked scenario.
8. Load only the selected template, recipe, motion and resolved media/assets.
9. Never fabricate factual media, official assets, quotes, maps, vehicles, infrastructure states or data.

## Brand Bridge boundary
A Brand Bridge is an **adapter, not a second Design System**. It can map CSS variables, define demo fallbacks, safe-area metadata, language gates and motion constraints. It does not embed official logo binaries or font files.

Current specialized bridge: `BRIDGE-AGUA-BIENESTAR-V1`.

## Final integration matrix
`src/registry/integration-scenarios.json` is the v1.0 acceptance matrix. It locks representative production routes for:

- Agua Bienestar weekly routes → `AB-MASTER-02` → `PM-ROUTE` → `CE-RouteJourney`
- rehabilitation of a well → `OBRA-MASTER-01` → `PM-DOCUMENTARY` → `CE-DocumentaryEvidence`
- drainage / collectors → `BRIG-MASTER-02` → `PM-PROCESS` → `CE-ProcessConnected`
- contingency / operational notice → `AVIS-MASTER-02` → `PM-ALERT` → `CE-NoticeAlert`
- results / metrics → `RES-MASTER-01` → `PM-DATA` → `CE-DataCascade`
- authorized testimony → `TEST-MASTER-01` → `PM-TESTIMONIAL` → `CE-TestimonialQuote`

## Architecture boundary
**Design System** = identity and governance.  
**Brand Bridge** = compatibility adapter.  
**Creative Engine** = composition and motion.  
**Domain Library** = work-specific logic.  
**Operational Master** = communication strategy.  
**Storyboard Library** = narrative beats.  
**Visual Production Library** = visual direction before template selection.  
**Production Master** = executable runtime architecture.  
**Asset Vault** = reusable primitives and semantic slots.  
**Media Intelligence** = factual-media matching and readiness.  
**QA Scenarios** = factual/routing/language locks.  
**Integration Scenarios** = v1.0 cross-domain acceptance matrix.  
**Reference Library** = inspiration/provenance, not a redistribution mirror.

## Media policy
`src/registry/media-library.json` contains metadata only for verified production resources and may be empty. Real photographs, videos and audio can remain in external storage. Missing factual media is reported as a blocker rather than replaced with synthetic evidence.
