# Claude Design — Premium v1.1 acceptance protocol

Use this only after the base routing/Brand Bridge/factual-QA acceptance has passed.

## Acceptance A — premium direction resolution

Prompt intent: Agua Bienestar weekly routes, vertical 45 s, already routed to `AB-MASTER-02 → PM-ROUTE → CE-RouteJourney → VIS-ROUTE-JOURNEY`.

Claude Design should:

1. read `claude/premium.compact.json`;
2. read only the `VIS-ROUTE-JOURNEY` record in `src/registry/premium-style-presets.json`;
3. return exactly these three curated style directions:
   - `STYLE-LIQUID-LUMINOUS` · primary;
   - `STYLE-SPATIAL-DEPTH` · cinematic;
   - `STYLE-TECHNICAL-GRID` · precise;
4. explain composition/motion differences rather than describing three color swaps;
5. state that all 39 premium motion modules have executable first-party implementations;
6. state that external motion library remains empty until specific licensed assets are ingested;
7. preserve the active Agua Bienestar Design System as sole identity authority.

Fail if Claude invents a fourth style, uses a non-curated style without an explicit override, claims external Lottie assets are already available, or treats a style family as a replacement color palette.

## Acceptance B — anti-generic production plan

After `STYLE-LIQUID-LUMINOUS` is selected, Claude should use the `PM-ROUTE` record in `src/registry/production-style-recipes.json` and build six beats:

- hook;
- territory;
- journey;
- nodes;
- value;
- close.

It should select motion by narrative fit from the recipe, including the continuous route/path-linked-water logic. It must not insert a generic vehicle that appears official.

Before rendering, Claude should create a scene-level production plan compatible with `validation/agua-route-premium-v11.json` and run or conceptually reproduce the `scripts/audit-premium-production.mjs` gates.

Expected anti-generic behavior:

- no primary-color flood across most scenes;
- at least three materially distinct layout families;
- deliberate neutral/breathing surfaces;
- no repeated card grammar;
- purposeful elements outnumber decorative elements;
- no microtext workaround for the weekly route density.

## Acceptance C — factual/generative boundary

Continue applying `QA-AB-ROUTE-45S-V1` for facts and language.

Generative video may only be used for clearly conceptual/transition material. A generated clip must never contain authoritative routes, prices, phone numbers, sanitary wording, logos, an official vehicle, official map or documentary evidence. Those stay deterministic or verified.

If MiniMax Hailuo is proposed, Claude must classify the scene under `src/registry/generative-scene-policies.json`. Controlled image-to-video is preferred when an approved first frame exists.

## Passing state

Premium acceptance passes when routing, style resolution, motion planning, anti-generic QA and factual/generative boundaries all agree without hidden blockers. Visual quality still requires human review of the actual preview; passing the protocol does not claim that every generated frame is artistically final.
