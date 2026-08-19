# Motion Intelligence Research — 2026-08-18

## Goal
Raise CIAPACOV Creative Ecosystem output from technically-correct motion to consistently directed, premium motion without creating a dependency pile or weakening brand/factual governance.

## Decision criteria
1. Official/primary source and active maintenance.
2. Clear license/provenance.
3. Material improvement to motion craft, editability, reuse, production speed or visual quality.
4. Compatibility with the existing deterministic stack (Remotion + GSAP + Motion + first-party Lottie).
5. No conflict with active Design System / Brand Bridge / factual QA.
6. No redundant renderer unless it solves a use case Remotion cannot solve efficiently.
7. External/paid authoring tools stay bridges or labs until a reproducible governed adapter exists.

## Adopt now

### LottieFiles Motion Design Skill
Official repository: `LottieFiles/motion-design-skill`.
Status: **ADOPTED_KNOWLEDGE**.
Why: philosophy-first motion direction, emotional intent, timing, easing, choreography, multi-element sequencing, motion personality, quality smells, Disney principles adapted to UI.
How we use it: its principles are translated into `claude/motion-direction.compact.json`, then constrained by CIAPACOV/Agua Bienestar rules. We do not blindly execute remote `npx` installers in CI.

### Remotion Agent Skills
Official source: Remotion maintained Agent Skills (`remotion-dev/skills` and the Remotion monorepo skill package).
Status: **ADOPTED_EXECUTION_KNOWLEDGE**.
Why: it is the official best-practice layer for the renderer we already use, covering markup, timing, typography, media, captions, maps, rendering, studio, multimedia and more.
How we use it: Remotion remains the frame-accurate source of truth for exported video.

### GSAP AI Skills
Official repository: `greensock/gsap-skills`.
Status: **ADOPTED_EXECUTION_KNOWLEDGE**.
Why: detailed official guidance for timelines, MotionPath, SVG choreography, CustomEase, performance and framework integration. GSAP is already installed in this repo.
How we use it: complex deterministic timelines/paths/easing inside a Remotion-governed export; not a second video renderer.

### Motion
Official project: `motiondivision/motion`.
Status: **ADOPTED_RUNTIME**.
Why: useful for small reusable React motion primitives and layout-style transitions. Already installed.
How we use it: simple motion only; active Brand Bridge overrides spring-style defaults when forbidden.

## Recommended external bridge

### Lottie Creator MCP
Official LottieFiles Creator MCP.
Status: **RECOMMENDED_EXTERNAL_BRIDGE_NOT_REPO_EXECUTOR**.
Why: can create/edit Lottie scenes, work with keyframes/easing, masks/mattes, vectors and SVG imports, and supports AI-assisted Lottie authoring. Particularly useful for taking approved first-party SVGs and turning them into reusable motion assets.
Constraint: requires an actual MCP-compatible client/session and LottieFiles Creator setup. Documentation in this repo does not mean Claude Design automatically has MCP execution access.

## Lab candidates

### Rive
Status: **LAB_CANDIDATE**.
Strength: state machines + modern Data Binding / View Models provide a strong designer/developer contract for reactive vector components.
Potential CIAPACOV use: reusable interactive/parameterized brand components, route indicators, counters, responsive animated modules, future editor UI.
Why not production dependency yet: exported social video is already well served by Remotion/Lottie; Rive should prove a unique reusable/stateful use case first.

### Theatre.js
Status: **LAB_CANDIDATE**.
Strength: high-fidelity visual timeline/keyframe editing for HTML/SVG/Three.js and music-synced choreography.
Caveat: project README says 1.0 development is temporarily in a private repo. Core is Apache-2.0; Studio editor is AGPL-3.0.
Why not production dependency yet: wait for public 1.0 status and re-evaluate licensing/maintenance fit.

### Spline
Status: **EXTERNAL_3D_CANDIDATE**.
Strength: collaborative 3D authoring, keyframe timeline/video export and AI-assisted 3D generation.
Potential CIAPACOV use: conceptual 3D objects/environments or approved reference frames for infrastructure explainers.
Constraint: AI 3D generation is paid and external. Treat exported assets as external authored media; verify rights and never use generated 3D as documentary truth.

## Watchlist, not install

### Motion Canvas
Status: **WATCHLIST_REDUNDANT_WITH_REMOTION**.
Strength: excellent TypeScript/generator system for informative vector animations and voice-over synchronization; MIT.
Reason not to install: substantial overlap with Remotion. A second primary renderer increases maintenance and agent ambiguity without a proven quality advantage for our current output.

### Motion Primitives / similar animated UI kits
Status: **REFERENCE_EDITOR_UI_ONLY**.
Use: inspiration/components for the future Creative Engine editor UI, not as the exported-video production engine.

## Architecture after research

- Motion direction / taste: CIAPACOV Motion Director + curated upstream principles.
- Frame-accurate video: Remotion.
- Complex deterministic paths/timelines: GSAP.
- Small React motion: Motion.
- Reusable vector motion: first-party Lottie.
- Optional Lottie authoring: Lottie Creator MCP externally.
- Interactive vector lab: Rive.
- Manual 3D/keyframe lab: Theatre.js (defer pending 1.0 status).
- External 3D authoring: Spline.
- Generative video remains governed separately by provider capabilities and factual-pixel restrictions.

## Non-negotiable rule
Popularity is discovery evidence, not architecture authority. A tool enters production only if it materially improves quality, editability, reuse or speed and passes license/provenance + deterministic QA. The active Design System and factual QA always outrank upstream motion guidance.
