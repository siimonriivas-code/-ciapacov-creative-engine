# NEXT TEST — Claude Design · Creative Ecosystem v1.1

Run this in the existing Claude Design project where the Agua Bienestar Design System and `siimonriivas-code/-ciapacov-creative-engine` codebase are already mounted.

## Stage A — intelligence / routing acceptance

```text
PRUEBA FINAL PREMIUM v1.1 — STAGE A · NO DISEÑES TODAVÍA

Mantén Agua Bienestar Design System v1.0 como única autoridad de identidad, logos, tipografía, colores, safe areas y accesibilidad.
Mantén QA-AB-ROUTE-45S-V1 como autoridad factual y de lenguaje.

El routing base ya está resuelto:
AB-MASTER-02 → PM-ROUTE → VIS-ROUTE-JOURNEY → 45 s → 9:16.

Lee únicamente el protocolo mínimo de v1.1 y respóndeme con:

1. Las tres direcciones premium disponibles para VIS-ROUTE-JOURNEY.
2. Los tres Premium Template Kits ejecutables de PM-ROUTE y sus IDs CE-KIT-*.
3. En una frase por kit, por qué son composiciones materialmente distintas.
4. El kit principal recomendado.
5. Máximo tres materiales first-party para ese kit.
6. Los módulos motion/Lottie necesarios por beat: hook, territory, journey, nodes, value, close.
7. Una gramática de transición first-party coherente para la pieza. No mezcles transiciones sólo por variedad.
8. El sistema de captions que usarías si la pieza llevara voz/subtítulos y por qué.
9. Audio readiness: qué roles de sound design corresponderían a PM-ROUTE y qué harías si no existe audio con licencia/verificado.
10. Si una toma generativa aporta valor, un único GENSHOT-* y el provider recomendado según capacidades. Distingue claramente entre provider integrado y adapter-candidate. Si no aporta, responde NO NECESARIO.
11. Todo lo que debe permanecer en capas deterministas y nunca dentro de pixels generativos.
12. Un plan de seis escenas capaz de superar el creative benchmark >=82: layoutFamily, surfaceRole, depth, typographyRole, transition y hero por beat.
13. Bloqueos reales.

No inventes media factual.
No conviertas media recomendada en requisito obligatorio.
No uses vehículo genérico como si fuera oficial.
No inventes cartografía.
No uses audio de procedencia/licencia desconocida.
No diseñes todavía.
No renderices todavía.
```

### Exact routing expected

Premium directions:
- `STYLE-LIQUID-LUMINOUS`
- `STYLE-SPATIAL-DEPTH`
- `STYLE-TECHNICAL-GRID`

Executable Route kits:
- `PTK-ROUTE-LIQUID` → `CE-KIT-ROUTE-LIQUID`
- `PTK-ROUTE-SPATIAL` → `CE-KIT-ROUTE-SPATIAL`
- `PTK-ROUTE-TECH` → `CE-KIT-ROUTE-TECH`

Stage A fails if Claude returns generic blue-card composition, invents a fourth kit, treats adapter-candidate providers as already executable, fabricates media, forces audio without rights, or ignores the creative benchmark.

## Stage B — real visual acceptance

Only after Stage A passes:

```text
PRUEBA FINAL PREMIUM v1.1 — STAGE B · PRODUCCIÓN REAL

Stage A aprobado.

Produce ahora un borrador completo de 45 segundos, 9:16, usando:
AB-MASTER-02
PM-ROUTE
VIS-ROUTE-JOURNEY
PTK-ROUTE-LIQUID → CE-KIT-ROUTE-LIQUID

Agua Bienestar Design System v1.0 sigue siendo la única autoridad de identidad.
QA-AB-ROUTE-45S-V1 sigue siendo la única autoridad factual y de lenguaje.

La producción debe evolucionar en seis beats:
HOOK → TERRITORY → JOURNEY → NODES → VALUE → CLOSE.

Exijo:
- seis beats con evolución compositiva real;
- continuidad física entre territory/journey/nodes;
- gota/objeto anclado al path, nunca floating-object;
- superficies neutras/blancas + acentos selectivos; no flood azul/cian;
- jerarquía grande y legible en 9:16;
- materiales con función, no decoración;
- una gramática de transición coherente;
- captions deterministas dentro de safe area si son necesarios;
- sound design sólo si existe audio autorizado/licenciado; de lo contrario continúa sin audio y repórtalo como readiness, no como bloqueo;
- Lottie sólo con función narrativa;
- generativo sólo si aporta atmósfera/profundidad/explicación y siempre debajo de overlays deterministas;
- ningún mapa, vehículo, beneficiario, evento o evidencia oficial inventados;
- nombres, rutas, $10, 20 L, 25 purificadoras, teléfono y COESPRIS siempre deterministas;
- creative benchmark >=82 y cero factual/readability blockers;
- factual QA, safe areas, overflow y legibilidad PASS;
- inspección visual del render, no sólo validación automática.

Si el resultado sigue pareciendo plantilla genérica, considéralo FAIL aunque los validadores pasen.

No me vuelvas a pedir elegir arquitectura o kit. Ya están aprobados.
Diseña y renderiza.
```
