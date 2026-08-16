# Claude Design first run — v1.0

Use this after attaching the repository as codebase/context and keeping the active brand Design System enabled separately.

## First instruction

Paste this before the first production request:

> Usa el Design System activo como única autoridad de identidad. Usa CIAPACOV Creative Ecosystem v1.0 únicamente para composición, motion, routing, storyboards, templates, Production Masters y Media Intelligence. Empieza leyendo `claude/START_HERE.md` y después `claude/handoff.compact.json`. No escanees el repositorio completo. No inventes datos, media factual ni assets oficiales. Antes de abrir implementaciones completas, selecciona un Operational Master y muéstrame tres direcciones visuales genuinamente distintas.

## Acceptance prompt — Agua Bienestar routes

> Necesito un Reel vertical de 45 segundos sobre las rutas semanales de Agua Bienestar. Usa el Design System Agua Bienestar v1.0 como autoridad de identidad. Usa el Brand Bridge de Agua Bienestar y el escenario QA correspondiente. Antes de producir, responde únicamente con: Operational Master recomendado, Production Master, Remotion composition, duración, tres direcciones visuales, asset readiness, media readiness y cualquier bloqueo. No abras todos los templates.

Expected route:

`AB-MASTER-02 → PM-ROUTE → CE-RouteJourney → 45 s`

Expected primary visual architecture:

`VIS-ROUTE-JOURNEY`

The response must preserve the applicable factual/language gates from `QA-AB-ROUTE-45S-V1` and must not claim that missing official vehicle, photography, cartography or brand assets are available.

## Pass criteria
The integration passes when Claude follows the low-context loading order, keeps the active Design System authoritative, returns the expected routing, offers three distinct visual directions, exposes factual-media blockers and does not fabricate missing evidence.
