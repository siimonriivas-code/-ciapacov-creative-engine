# Visual Production Library v0.7

The Visual Production Library sits between the Operational Master and the implementation template.

## Why it exists
A Master defines **what story to tell**. A template defines **one implementation**. The visual-direction layer defines **how the story should feel and be composed** before committing to implementation.

Each of the 20 Operational Masters has exactly three visual directions. They are deliberately different architectural families, not cosmetic variations.

## Routing
`brief → domain → master → storyboard → 3 visual directions → template → assets → motion`

## Visual architecture contract
Every architecture defines:
- family
- density
- motion character
- compatible formats
- compositional signature
- required capabilities
- avoid-list
- brand-neutral description

## Brand boundary
Visual directions never own official color, typography, logo, safe area or factual imagery. The active Design System remains authoritative.

## Production behavior
1. Show three directions before loading a full template.
2. Let the user choose one.
3. Add the chosen direction to the production prompt.
4. Load only the selected Master, storyboard, visual direction, template recipe, compatible motions and resolved assets.
5. If a direction requires real/official media and the slot is unresolved, report the blocker rather than fabricating it.

## Offline catalog
Run:
```bash
npm run visuals:build
```
This regenerates:
- `claude/visual-directions.compact.json`
- `catalog/visual-production-library.html`

The HTML catalog works without Claude or any LLM.
