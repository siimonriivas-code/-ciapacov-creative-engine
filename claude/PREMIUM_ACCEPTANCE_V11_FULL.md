# Claude Design — Full Premium v1.1 acceptance

Run after base routing has already identified `AB-MASTER-02 → PM-ROUTE → CE-RouteJourney → VIS-ROUTE-JOURNEY`, 45 s, vertical 9:16.

## Prompt

```text
PRUEBA PREMIUM v1.1 — NO PRODUZCAS TODAVÍA

Mantén Agua Bienestar Design System v1.0 como única autoridad de identidad, logos, tipografía, colores, safe areas y accesibilidad.

Mantén QA-AB-ROUTE-45S-V1 como autoridad factual y de lenguaje.

El routing base ya está resuelto:
AB-MASTER-02 → PM-ROUTE → CE-RouteJourney → VIS-ROUTE-JOURNEY → 45 segundos → 9:16.

Ahora entra a la capa Premium Visual & Generative Motion v1.1.

Empieza únicamente por:
1. claude/PREMIUM_START_HERE.md
2. claude/premium-v11.manifest.json

Después aplica el protocolo de carga mínima de esos archivos.

Respóndeme únicamente con:

1. Las tres direcciones premium curadas disponibles para VIS-ROUTE-JOURNEY, con ID, enfoque compositivo, materialidad y motion signature.
2. Tu dirección principal recomendada y por qué NO se sentiría como una simple variación de color.
3. Los premium template kits compatibles con PM-ROUTE que correspondan a esas tres direcciones.
4. Para la dirección principal, los sistemas de materiales que usarías; máximo tres.
5. Para la dirección principal, los módulos motion first-party que usarías por cada uno de los seis beats: hook, territory, journey, nodes, value, close.
6. Qué Lotties first-party son útiles y cuáles descartarías por ser decorativos o redundantes.
7. Qué escena, si alguna, justificaría una generación conceptual con MiniMax Hailuo 2.3; clasifícala antes de proponerla.
8. Qué información debe permanecer obligatoriamente en capas deterministas y nunca dentro de video generativo.
9. Resultado del preflight anti-generic esperado: monocromía, variedad de layouts, breathing surfaces, repetición de cards, decoración vs función.
10. Bloqueos reales para esta pieza.

No inventes media factual.
No conviertas media recomendada en requisito obligatorio.
No uses un vehículo genérico como si fuera oficial.
No inventes cartografía.
No diseñes todavía.
No renderices todavía.
```

## Expected premium routing

For `VIS-ROUTE-JOURNEY` the three curated premium directions must be exactly:

1. `STYLE-LIQUID-LUMINOUS` — primary
2. `STYLE-SPATIAL-DEPTH` — cinematic
3. `STYLE-TECHNICAL-GRID` — precise

Compatible premium kits should resolve to:

- `PTK-ROUTE-LIQUID`
- `PTK-ROUTE-SPATIAL`
- `PTK-ROUTE-TECH`

For the primary Liquid Luminous direction, appropriate materials include:

- `MAT-LIQUID-GLASS`
- `MAT-REFRACTION-POOL`
- `MAT-CONTOUR-FIELD`

The route recipe should preserve continuous path-linked motion and should not restart the visual grammar on every day.

## Pass criteria

PASS only if Claude:

- returns the three curated styles rather than inventing arbitrary options;
- recognizes all premium motion specs as executable first-party modules;
- recognizes first-party Lottie as reusable motion, not official identity;
- uses materials as hierarchy/surface systems, not decoration;
- keeps factual text/routes/price/phone/sanitary wording deterministic;
- keeps official vehicle/map/documentary evidence out of generative pixels;
- treats external third-party motion library as empty until licensed assets are explicitly ingested;
- does not default the whole piece to primary blue/cyan;
- proposes at least three materially different layout families across the six beats;
- preserves active Design System authority.
