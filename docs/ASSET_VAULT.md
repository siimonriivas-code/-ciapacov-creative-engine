# Asset Vault

The Asset Vault stores reusable visual primitives and metadata.

## Bundled originals
`public/assets/original/` contains brand-neutral SVG primitives authored for this repository. They inherit color from the active composition instead of hard-coding a brand identity.

## Semantic slots
Some assets should never be fabricated or generically substituted in production. They are represented as slots, for example:
- official brand logo
- real/verified photo or video
- official Agua Bienestar vehicle
- official product/purifier image
- official territorial map

A slot is a dependency marker, not an asset file.

## Asset readiness
The resolver returns:
- `ready` — bundled approved asset exists
- `slot` — external verified asset must be supplied
- `missing` — no registered capability exists yet
