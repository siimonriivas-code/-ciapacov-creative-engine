# Claude Design integration — CIAPACOV Creative Ecosystem v1.0

This document defines the production handoff between an active brand Design System and the CIAPACOV Creative Ecosystem.

## Recommended attachment strategy
Attach the repository as codebase/context while keeping the active brand Design System enabled independently. Do not merge the Creative Ecosystem into the brand Design System.

The first file Claude should read is `claude/START_HERE.md`. The low-context index is `claude/handoff.compact.json`.

## Responsibility split
- **Active Design System**: official identity, logos, fonts, colors, safe areas, accessibility, brand-specific governance.
- **Creative Ecosystem**: domains, Operational Masters, storyboards, visual architectures, templates, motion, Production Masters and Media Intelligence.
- **Brand Bridge**: compatibility rules between an active Design System and the generic Creative Ecosystem; it does not contain or replace official assets.
- **Media Library**: metadata index for verified factual media. Missing media remains a blocker.

## Standard production flow
A normal-language brief is routed to one Operational Master. Claude then presents three genuinely distinct visual directions. After selection, Claude resolves the Production Master for video, target duration, candidate templates, Asset Vault requirements and factual-media roles. Only then should it inspect the selected recipe or implementation.

The recommended loading order is:

`START_HERE → handoff.compact → ecosystem.compact → selected storyboard → visual-directions.compact → production.compact → qa.compact when applicable → selected template/recipe → motions.compact when needed`

## Low-context rule
Never scan the whole repository to make a recommendation. Full source is an implementation detail loaded after a direction is selected. This rule is both a usage-efficiency measure and a quality-control measure: recommendations should come from curated registries rather than accidental code proximity.

## Factual production rule
Do not generate synthetic media when the visual would imply a real event, person, location, vehicle, infrastructure state, official map or documentary evidence. Use approved Media Library records or surface a blocker.

## Agua Bienestar bridge
For Agua Bienestar, select `BRIDGE-AGUA-BIENESTAR-V1`. It provides compatibility tokens and content/motion gates while the active Agua Bienestar Design System remains authoritative for identity. Reproducible factual locks live in the QA registry, not in generic templates.

## Acceptance test for v1.0
The final integration matrix must cover at least these production families: Agua Bienestar routes, rehabilitation of a well, drainage/collector work, operational contingency, results/data and authorized testimony. Each scenario must resolve to an existing Operational Master, Production Master, Remotion composition, primary visual architecture and supported duration.

A release is not production-ready if registry validation, TypeScript/Vite build, integration QA or Remotion runtime checks fail.
