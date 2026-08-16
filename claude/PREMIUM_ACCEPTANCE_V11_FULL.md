# Claude Design — Full Premium v1.1 acceptance

Run after base routing has already identified `AB-MASTER-02 → PM-ROUTE → CE-RouteJourney → VIS-ROUTE-JOURNEY`, 45 s, vertical 9:16.

This acceptance has two stages. Stage A proves that Claude Design understands the updated premium layer. Stage B proves that it can actually use the selected executable kit without falling back to generic composition.

---

## Stage A — premium routing / readiness

Paste this in the **same Claude Design project** where the Agua Bienestar Design System and Creative Ecosystem codebase are mounted.

```text
PRUEBA PREMIUM v1.1 — STAGE A · NO PRODUZCAS TODAVÍA

Mantén Agua Bienestar Design System v1.0 como única autoridad de identidad, logos, tipografía, colores, safe areas y accesibilidad.

Mantén QA-AB-ROUTE-45S-V1 como autoridad factual y de lenguaje.

El routing base ya está resuelto:
AB-MASTER-02 → PM-ROUTE → CE-RouteJourney → VIS-ROUTE-JOURNEY → 45 segundos → 9:16.

Entra ahora a la capa Premium Visual & Generative Motion v1.1.

Empieza únicamente por:
1. claude/PREMIUM_START_HERE.md
2. claude/premium.compact.json

Aplica después el protocolo de carga mínima.

Respóndeme únicamente con:

1. Las tres direcciones premium curadas para VIS-ROUTE-JOURNEY, con ID, enfoque compositivo, materialidad y motion signature.
2. Los tres Premium Template Kits ejecutables de PM-ROUTE y el Remotion ID CE-KIT-* correspondiente a cada uno.
3. Explica en una frase por kit por qué son composiciones materialmente distintas y no tres recoloreos.
4. Tu kit principal recomendado para esta pieza.
5. Para ese kit principal, máximo tres sistemas de materiales.
6. Los módulos motion first-party que usarías por cada uno de los seis beats: hook, territory, journey, nodes, value, close.
7. Los Lotties first-party que aportarían una función real y cuáles descartarías por redundantes/decorativos.
8. Si una escena generativa aporta valor, selecciona un único GENSHOT-* y clasifícalo; si no aporta, responde NO NECESARIO.
9. Qué debe permanecer obligatoriamente en capas deterministas y nunca dentro de pixels generativos.
10. Qué Visual DNA aplicarías para evitar el patrón genérico observado previamente: composición repetitiva, exceso de azul, tarjetas idénticas y elementos flotantes.
11. Cómo construirías un plan de seis escenas que pueda superar el benchmark creativo >=82: indica layoutFamily, surfaceRole, depth, typographyRole, transition y hero para cada beat.
12. Bloqueos reales.

No inventes media factual.
No conviertas media recomendada en requisito obligatorio.
No uses vehículo genérico como si fuera oficial.
No inventes cartografía.
No diseñes todavía.
No renderices todavía.
```

### Stage A expected routing

The three premium directions must be exactly:

1. `STYLE-LIQUID-LUMINOUS`
2. `STYLE-SPATIAL-DEPTH`
3. `STYLE-TECHNICAL-GRID`

The three executable route kits must be exactly:

- `PTK-ROUTE-LIQUID` → `CE-KIT-ROUTE-LIQUID`
- `PTK-ROUTE-SPATIAL` → `CE-KIT-ROUTE-SPATIAL`
- `PTK-ROUTE-TECH` → `CE-KIT-ROUTE-TECH`

For Liquid Journey, compatible materials include:

- `MAT-LIQUID-GLASS`
- `MAT-REFRACTION-POOL`
- `MAT-CONTOUR-FIELD`

It should understand that the three route kits are already materially different directed compositions:

- Liquid = organic/path-led/refraction/anchored droplet
- Spatial = perspective/depth/node-travel/active destination stage
- Technical = calendar/grid/progress rail/active-day structure

It should not invent a fourth route kit.

### Stage A pass criteria

PASS only if Claude:

- preserves active Design System identity authority;
- returns the exact three premium directions;
- returns the exact three executable Route kit IDs and corresponding `CE-KIT-*` compositions;
- describes them as materially different compositions, not style swaps;
- recognizes first-party motion/Lottie as reusable composition tools, not official identity;
- keeps factual text/routes/price/phone/sanitary wording deterministic;
- keeps official vehicle/map/documentary evidence out of generative pixels;
- treats external third-party motion library as empty until a licensed asset is explicitly ingested;
- does not default the whole piece to primary blue/cyan;
- produces a six-beat scene plan with multiple layout families and at least one deliberate hero/payoff beat;
- understands creative benchmark >=82 and zero factual/readability blockers;
- reports only real blockers.

---

## Stage B — controlled real production

Run only after Stage A passes. Use the same project/chat and do not remount a different codebase.

```text
PRUEBA PREMIUM v1.1 — STAGE B · PRODUCCIÓN REAL CONTROLADA

Stage A quedó aprobado.

Produce ahora el primer borrador completo del Reel vertical de 45 segundos de rutas semanales de Agua Bienestar.

Mantén:
- Agua Bienestar Design System v1.0 como única autoridad de identidad.
- QA-AB-ROUTE-45S-V1 como autoridad factual y de lenguaje.
- AB-MASTER-02.
- PM-ROUTE.
- VIS-ROUTE-JOURNEY.

Selecciona como base ejecutable:
PTK-ROUTE-LIQUID → CE-KIT-ROUTE-LIQUID.

No conviertas el kit en una plantilla rígida: úsalo como sistema de composición dirigido y adapta sus beats al storyboard real.

Quiero seis beats con evolución visual:
1. hook
2. territory
3. journey
4. nodes
5. value
6. close

Requisitos creativos obligatorios:
- no usar el mismo layout/card grammar en todos los beats;
- no usar fondo azul/cian dominante por defecto;
- alternar superficies neutras/blancas con acentos selectivos permitidos por el Design System;
- usar vino/accent cuando ayude a jerarquía, no como decoración aleatoria;
- mantener una continuidad física de recorrido entre territory → journey → nodes;
- cualquier gota/objeto de recorrido debe estar anclado al path; prohibido floating-object;
- incluir al menos un hero/payoff beat claro;
- usar materialidad con propósito: profundidad, continuidad, foco o transición;
- distribuir la densidad del calendario en el tiempo; prohibido microtexto;
- no inventar un mapa oficial ni un vehículo oficial;
- si no existe media factual necesaria para una decisión visual, usa abstracción declaradamente no factual o reporta el faltante.

Lottie:
Usa sólo first-party Lotties que ayuden a un beat. No agregues animaciones sólo para llenar espacio.

Generative video:
No es obligatorio. Úsalo únicamente si un GENSHOT-* aprobado añade atmósfera, profundidad, explicación o continuidad que no se resuelva mejor de forma determinista.
Si lo usas, preferentemente trabaja desde un primer frame aprobado. Nunca generes datos, logos, rutas, nombres, precio, teléfono, cartografía oficial, vehículo oficial ni evidencia documental dentro de los pixels generativos.

Antes de cerrar:
1. ejecuta factual QA;
2. verifica safe areas, legibilidad y overflow;
3. ejecuta anti-generic QA;
4. construye el scene-level plan para scripts/audit-creative-benchmark.mjs;
5. exige creative benchmark >=82 con cero factual/readability blockers;
6. inspecciona visualmente el render; un PASS automático no basta.

Si el único warning de identidad es la ausencia del binario Abacaxi para validación pixel-perfect, continúa con preview y repórtalo como warning, no como bloqueo.

Esta vez sí diseña/renderiza el borrador completo dentro de Claude Design.
No vuelvas a pedirme elegir arquitectura o kit: ya están aprobados.
```

## Stage B visual acceptance

Do not declare the ecosystem goal finished merely because Claude renders something. Inspect the actual piece.

The draft should demonstrate:

- a composition that no longer reads as generic AI cards;
- visual evolution across six beats;
- controlled use of Agua Bienestar color roles rather than blue flooding;
- a clear continuous Route Journey;
- hierarchy large enough to read comfortably in 9:16;
- purposeful Lottie/motion rather than ornament;
- no invented factual/official media;
- benchmark >=82;
- factual QA pass;
- safe-area/readability pass.

If the visual result still feels generic, treat that as a real failure even if all automated QA passes. Feed the specific visual diagnosis back into the premium runtime rather than compensating with more decoration.
