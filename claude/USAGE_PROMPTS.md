# Ready-to-use prompts

## Explore like Canva
I do not have a visual direction yet. Search `claude/catalog.compact.json` and show me 6 options spanning genuinely different composition families, not six near-duplicates. For each option give ID, name, why it fits, density and motion level. Do not inspect full implementations yet. Wait for my selection before generating.

## Creative direction first
Use CIAPACOV Creative Engine as a reference library. Read only `claude/catalog.compact.json` first. Based on my brief, recommend 4 visually distinct template IDs and explain each in one sentence. Do not design yet. The active Design System remains authoritative for identity.

## Direct template
Use template `{{TEMPLATE_ID}}` from CIAPACOV Creative Engine. Load only that template's full record, its recipe and implementation. Apply the active Design System and my verified content. Do not use demo content.

## Video / Reel
Read `claude/catalog.compact.json` and `claude/motions.compact.json`. Recommend 3 Reel IDs and a maximum of 5 compatible motion recipe IDs. Prefer continuous editorial motion, route/path continuity where relevant, readable typography and no bounce/spring unless the active Design System explicitly permits it.

## Multi-format campaign
I need a coordinated campaign, not isolated pieces. Read `claude/campaigns.compact.json` first. Recommend the 3 best Campaign Kit IDs for my brief. Do not load the whole template catalog yet. After I choose a kit, inspect only the template IDs linked by that kit and apply the active Design System to all formats.

## Fast mode
Choose the single best template or Campaign Kit for my brief using compact catalogs only, then proceed directly with that architecture. Do not propose alternatives unless there is a material ambiguity or missing production fact.

## v0.5 · Domain-first brief

> Usa el Active Design System como autoridad de identidad y CIAPACOV Creative Engine como biblioteca creativa. Interpreta primero el problema de trabajo, no los IDs. Consulta `claude/ecosystem.compact.json`, identifica el Domain y el Operational Master más adecuado, y después ofrece 3–6 arquitecturas distintas de `claude/catalog.compact.json`. Antes de diseñar, reporta si hay assets `ready`, `slot` o `missing`. No fabriques assets oficiales ni conviertas demo data en información real.

## v0.5 · Asset-aware routing

> Necesito resolver este brief: [PEGAR BRIEF]. No abras todo el repositorio. Devuélveme: Domain detectado, Master recomendado, 4 templates distintos, assets requeridos disponibles, slots externos pendientes y una recomendación de producción. Espera mi elección antes de cargar implementaciones.
