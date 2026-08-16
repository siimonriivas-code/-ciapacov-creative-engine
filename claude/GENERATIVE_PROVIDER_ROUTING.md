# Generative video provider routing — v1.1

Use generative video only after the deterministic premium plan is already understood. A provider is not a substitute for art direction.

## First question: is generation needed?

Prefer Remotion + first-party materials + motion modules + Lottie when the scene is primarily:

- typography
- routes, calendars or maps with factual labels
- metrics / data
- official identity
- exact process diagrams
- alerts / notices
- documentary evidence
- any scene whose truth depends on exact names, places, vehicles, infrastructure or numbers

Consider generative video only when it adds a meaningful layer of:

- atmosphere
- spatial depth
- conceptual water/material motion
- abstract territory
- explanatory non-factual infrastructure
- cinematic transition
- visual metaphor
- controlled transformation between approved compositions

## Provider catalog

Read `src/registry/generative-provider-catalog.json` only when provider choice matters.

The catalog is capability knowledge, not universal execution permission.

Execution states:

- `integrated-live`: repository has a governed adapter and live execution has been proven; credentials are still required.
- `integrated-dry-run`: repository has a governed adapter and request validation but live paid execution has not been proven in the current environment.
- `adapter-candidate`: profile is available for routing/comparison only. Never call it as though it were integrated.

The current executable code path remains the governed MiniMax executor. Other current provider profiles may be recommended when their capabilities fit better, but require an adapter + current documentation revalidation + explicit credentials before execution.

## Capability router

For a provider comparison create a small requirements JSON and run:

`node scripts/select-generative-provider.mjs <requirements.json>`

Supported routing signals include:

- mode: text-to-video / image-to-video / video-to-video
- duration
- portrait requirement
- approved first frame
- desired last-frame control
- reference images
- generated audio
- minimum resolution
- explicit camera-control preference
- preference for already integrated providers

A high routing score is a recommendation, not permission to make a paid API call.

## Selection logic

1. Prefer an approved first-frame image-to-video workflow when composition continuity matters.
2. Prefer first+last frame control when a generative transition must land on a deterministic frame.
3. Prefer video-to-video only for owned/licensed source footage and never to fabricate a real event.
4. Prefer explicit camera controls when the shot depends on a specific pan/tracking/push behavior.
5. Do not choose 4K or long-duration generation by default merely because a provider supports it.
6. Do not hard-code prices or quotas into creative decisions unless they have been refreshed for the current production.
7. Revalidate current official provider documentation before implementing or enabling a new adapter.

## Factual boundary

The following always stay outside generated pixels:

- logos and official marks
- names
- prices
- phone numbers
- routes and schedules
- metrics
- legal/sanitary wording
- official map geometry
- official vehicle identity
- beneficiary identity/testimony
- documentary work-site evidence

Put them into deterministic Remotion / HTML / SVG / Design System layers after generation.

## Human review

Every generated shot must be reviewed for:

- unintended text or pseudo-logos
- false geographic cues
- fake infrastructure specificity
- accidental human/documentary implication
- continuity against the approved first/last deterministic frames
- style fit with the active Design System
- whether the generated shot actually improves the piece

If it merely adds spectacle without narrative value, remove it.
