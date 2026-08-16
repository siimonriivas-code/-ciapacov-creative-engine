# CIAPACOV Creative Ecosystem v1.1 — Premium Visual & Generative Motion Layer

## Goal

Raise the Creative Ecosystem from correct, reusable production to genuinely differentiated motion design. The target is not "good for AI". The target is work that can stand beside strong motion-template libraries, editorial motion systems and modern generative-video tools without becoming visually generic.

The v1.1 layer does **not** replace the active Design System. Identity, official marks, typography, color tokens, safe areas and accessibility remain governed by the active Design System. v1.1 adds creative range, motion sophistication, generative-video orchestration and anti-generic QA.

## 1. Anti-generic creative direction

The v1.0 engine already selects domain, Operational Master, Production Master, storyboard, visual architecture and factual QA. v1.1 adds a second creative decision after architecture selection: a **style family**.

Twelve style families are defined in `src/registry/creative-style-families.json`:

- Editorial Contrast
- Liquid Luminous
- Documentary Collage
- Tactile Paper
- Kinetic Type
- Spatial Depth
- Technical Grid
- Data Theater
- Cinematic Masks
- Modular Mosaic
- Quiet Luxury
- Playful Geometry

These are not color palettes. They are composition/motion systems. Every family consumes color **roles** from the active Design System and explicitly blocks the common failure mode of flooding every scene with the primary brand color.

`src/lib/creative-style-director.ts` ranks compatible families and contains an anti-generic audit. The audit penalizes:

- primary-color domination across most scenes;
- no neutral or breathing surfaces;
- low composition variety;
- repeated card grammar;
- decorative elements that outnumber purposeful narrative elements.

A piece should normally expose three materially different style directions before production unless the brief already locks a style.

## 2. Premium Motion Module Library

`src/registry/premium-motion-modules.json` contains 39 first-party motion-design specifications across nine categories:

- water
- route
- typography
- data
- documentary
- transition
- spatial
- system
- utility / QA

The modules are deliberately semantic. Examples include Continuous Route Trace, Day-to-Day Handoff, Liquid Aperture, Refraction Window, Headline Mask Stack, Datum Stage, Contact Sheet Build, Traveling Matte, Three-Plane Parallax and Overflow Sentinel.

`src/motion/premiumPrimitives.tsx` begins the executable first-party implementation with reusable primitives for liquid aperture, path-linked movement, editorial wipes, depth planes, staged data, asymmetric mosaic reflow, accent strikes and development-only safe-area overlays.

The rule is simple: motion must explain hierarchy, continuity, evidence, location, time, data or transition. Decoration without a narrative function is a QA problem.

## 3. Lottie / external motion assets

The system may use Lottie JSON, dotLottie, SVG and rendered video assets, but a public gallery is a **discovery source**, not automatic permission to copy or redistribute an asset.

`src/registry/external-motion-assets.json` starts empty on purpose. Every retained third-party asset must have:

- a recorded source/provider;
- the specific source URL;
- a production-usable license;
- license proof for third-party resources;
- deterministic render review;
- brand-adaptation review;
- visual QA.

`scripts/ingest-motion-asset.mjs` copies a licensed local asset into the governed library, calculates SHA-256 integrity metadata and leaves it in review status until smoke rendering and brand review pass.

The Remotion runtime is being extended with `@remotion/lottie` and `lottie-web`. Remotion can play Lottie, change playback speed/direction, load remote files and determine metadata. Lottie expressions require case-by-case deterministic-render testing because seeking may produce flicker for some expression-based files.

For dotLottie, the ecosystem treats `.lottie` as a rich external container. The catalog should record themes/state-machine capabilities for discovery, while the production renderer may normalize an approved asset to the format required by the chosen runtime.

## 4. Generative video layer

`src/registry/generative-video-providers.json` currently registers MiniMax Hailuo 2.3 and Hailuo 2.3 Fast.

Hailuo 2.3 is configured for:

- text-to-video;
- image-to-video;
- 6 or 10 seconds at 768P;
- 6 seconds at 1080P;
- explicit camera-control commands;
- short conceptual/cinematic inserts and controlled image animation.

Hailuo 2.3 Fast is treated as an image-to-video iteration provider.

`src/lib/generative-video.ts` provides a provider-independent scene request model plus MiniMax payload generation. It rejects factual-evidence classes, validates I2V requirements and keeps factual overlays outside generated pixels.

API credentials are external. No provider key is stored in the repository.

## 5. Factual boundary for AI video

`src/registry/generative-scene-policies.json` separates five semantic classes:

1. Factual evidence — generation forbidden.
2. Factual overlay — generation forbidden; render deterministically.
3. Conceptual illustration — generation allowed with review.
4. Controlled image-to-video — preferred when an approved first frame exists.
5. Transition-only generative clip — allowed when semantically neutral.

Never generate something and present it as the actual CIAPACOV vehicle, actual beneficiary, actual official, actual work site, actual purifier, actual event or official map when it is not verified media.

Names, dates, prices, routes, phone numbers, metrics, legal/sanitary wording and official marks must remain deterministic layers over the generated visual material.

## 6. Hybrid premium production model

The intended production stack is:

**Brief → Routing → Operational Master → Production Master → Visual Architecture → Style Family → Storyboard → Motion Modules / Verified Media / Generative Scenes → Remotion assembly → Design System → Factual QA → Anti-generic QA → Export**

A high-end 45-second piece can therefore mix:

- first-party procedural motion;
- licensed Lottie components;
- approved real media;
- short conceptual Hailuo clips;
- deterministic typography and data;
- active Design System identity;
- factual locks.

The result should feel art-directed rather than assembled from one generic card system.

## 7. Claude Design low-context protocol

Claude Design must not scan these registries automatically on every request. The compact entrypoint is `claude/premium.compact.json` and is loaded only after the system has already selected the Operational Master and visual architecture.

Claude should first propose materially different style families. Only after a direction is selected should it open the small subset of motion-module records needed for the storyboard.

If an external motion asset is not in the governed registry with production-usable provenance, Claude may describe it as inspiration but must not claim it is available for production.

## 8. v1.1 quality bar

A v1.1 production is not considered premium merely because it contains more animation. It should demonstrate:

- materially different compositions across beats;
- purposeful use of neutral space and brand roles;
- large readable typography;
- motion tied to narrative logic;
- no floating or unanchored decorative objects;
- no invented factual media;
- a coherent transition language;
- explicit visual hierarchy;
- safe-area and overflow compliance;
- a reason for every visual element.

This layer is designed to keep growing. New providers and licensed motion libraries plug into the same governance model instead of changing the core Creative Ecosystem.
