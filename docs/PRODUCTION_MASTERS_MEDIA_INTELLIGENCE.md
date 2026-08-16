# Production Masters & Media Intelligence — v0.8

## Why this layer exists
v0.7 could recommend a strong Operational Master, storyboard, visual architecture and template. v0.8 adds the missing runtime layer: **how the chosen communication strategy becomes an executable video architecture and which factual media is required before production can be considered ready**.

## Production Master
A Production Master is not another brand system and not a duplicate template. It is a reusable runtime contract that maps one or more Operational Masters to:

- a Remotion composition ID;
- allowed output formats;
- recommended duration options;
- compatible visual architectures;
- required factual-media roles;
- recommended factual-media roles.

`src/registry/production-masters.json` contains 9 Production Masters and covers all 20 Operational Masters exactly once.

## Registered runtime compositions
The Remotion root exposes these production compositions:

- `CE-RouteJourney`
- `CE-DataCascade`
- `CE-ProcessConnected`
- `CE-LaunchEditorial`
- `CE-DocumentaryEvidence`
- `CE-BeforeAfter`
- `CE-TimelineTerritory`
- `CE-TestimonialQuote`
- `CE-NoticeAlert`

The first three are the earlier specialized masters. The six new compositions use the shared `ProductionMasterVertical` runtime and remain brand-agnostic through injected brand props.

## Media Intelligence
Media Intelligence does not store or invent evidence. It decides whether the media already available can satisfy a production role.

Each role defines:

- compatible media kinds;
- desired orientation;
- mandatory tags;
- preferred tags;
- whether real media is compulsory;
- whether demo media is ever permitted.

The matcher in `src/lib/mediaIntelligence.ts` rejects incompatible or demo resources for real-only roles and scores viable candidates using type compatibility, required/preferred tags, orientation, domain and approval state.

## Media Library
`src/registry/media-library.json` is intentionally empty in the base repository. This is a safety feature, not missing content.

A verified record should contain at least:

- stable ID;
- title;
- kind;
- controlled URI/reference;
- approval status;
- orientation;
- tags;
- domains and locations;
- source;
- license/usage rights;
- consent status where relevant.

`src/registry/media.example.json` documents the schema but is marked `demo` and is never loaded into production.

Large files should normally remain outside the code repository. Only metadata/reference information belongs in this registry unless there is a clear reason to version the binary itself.

## Production readiness
The Production Planner now evaluates two independent layers:

1. **Asset readiness** — reusable Creative Engine primitives and official semantic slots.
2. **Media readiness** — factual photos/video/audio/maps/official resources required by the selected Production Master.

A production can have excellent template/asset readiness while still being blocked because a required real photograph or testimonial has not been supplied. The UI must show that blocker rather than hiding it.

## Safety boundary
Never generate or substitute synthetic media when doing so would imply that a real event, beneficiary, worker, official vehicle, infrastructure condition, location, quote or map actually existed in that form. Conceptual illustrations remain allowed only when they are clearly illustrative and the active Design System permits them.

## Low-context Claude workflow
For a normal video brief:

1. `claude/ecosystem.compact.json`
2. selected Operational Master + storyboard
3. `claude/visual-directions.compact.json`
4. `claude/production.compact.json`
5. selected template/recipe
6. `claude/motions.compact.json` when needed
7. only resolved Asset Vault and Media Library records

This order keeps the creative shortlist fast while preventing Claude from scanning the entire repository.
