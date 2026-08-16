# Architecture

The engine is split into five layers:

1. **Catalog** — compact metadata for low-cost discovery.
2. **Router** — scores user intent and recommends IDs.
3. **Blueprints** — premium composition constraints and scene/zoning logic.
4. **Recipes / primitives** — reusable implementation patterns.
5. **Brand bridge** — receives brand tokens from the active Design System.

## Why this controls usage
An agent can answer “which template?” from a compact file rather than loading all code. Heavy implementation is opened only after an ID has been selected.

## Pack boundaries
`social`, `video`, `motion`, `data`, `route`, `presentation`. Future packs may be versioned independently.

## Template maturity
- `premium`: deliberately authored and preferred.
- `approved`: stable recipe-driven architecture.
- `experimental`: useful but requires extra review.

## Production rule
No demo copy or fallback brand values are production truth. Production identity/data must come from active brand systems and verified content.
