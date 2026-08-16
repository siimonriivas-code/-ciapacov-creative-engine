# CIAPACOV Creative Engine v0.4

Private creative-direction, reusable-template, campaign-kit and motion library for Claude Design / Claude Code workflows. It is intentionally **brand-agnostic**: the active brand Design System remains authoritative.

## What ships now
- **80** searchable template records across carousels, Reels, Stories, data, routes and presentations
- **48** curated motion recipes
- **8 multi-format Campaign Kits** for launches, infrastructure, routes, reports, explainers, testimony, data and operational notices
- art-directed premium runtime families with materially different compositions, not one generic preview repeated
- favorites and 3-up comparison in the gallery
- Motion + GSAP primitives for editorial, data, routes, continuity and photo treatments
- optional **Remotion** vertical video pack with 3 renderable masters
- compact AI catalogs to reduce context/credit usage
- registry validation + compact-catalog generation
- copy/paste Claude Design usage prompts
- strict demo-data firewall and third-party resource policy

## Quick start
```bash
npm install
npm run validate
npm run dev
```

Optional video studio:
```bash
npm run remotion:studio
```

## Low-context AI routing
1. Single piece → read `claude/catalog.compact.json`.
2. Motion/video → add `claude/motions.compact.json`.
3. Multi-format campaign → read `claude/campaigns.compact.json` first.
4. Only after selection, inspect the chosen full record and implementation.

**Never load the whole repo just to propose directions.**

## Brand boundary
Layout, composition and motion come from this engine. Identity, official logos/assets, typography, approved colors, safe areas, accessibility and governance come from the active Design System.
