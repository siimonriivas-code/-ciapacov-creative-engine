# CIAPACOV Creative Engine v0.2

Creative-direction, reusable-template and motion library for Claude Design / Claude Code workflows. It is intentionally **brand-agnostic**: the active brand Design System remains authoritative.

## v0.2 ships with
- 50 searchable template records
- 12 premium implementation blueprints
- 24 curated motion recipes (Motion + GSAP)
- context-efficient compact catalogs for AI routing
- a React/Vite gallery for Canva-like discovery
- natural-language template scoring
- external brand-token contract
- strict demo-data / production-data separation

## Quick start
```bash
npm install
npm run dev
```

## AI context rule
Claude should read `claude/catalog.compact.json` first, select candidates, and only then inspect a chosen blueprint/recipe. Do **not** load the whole library by default. See `CLAUDE.md`.

## Brand boundary
This repository does not replace CIAPACOV or Agua Bienestar brand rules. Layout and motion come from this engine; identity, official assets, typography, logos, approved color tokens and governance come from the active Design System.
