---
name: ciapacov-motion-director
description: Applies CIAPACOV Creative Ecosystem motion-direction rules after visual architecture and premium kit selection. Use for timing, easing, choreography, path motion, staging, secondary/ambient motion, GSAP/Remotion/Lottie implementation choices, and rendered-motion QA. Never overrides the active Design System, Brand Bridge, factual QA, licensing or verified-media rules.
---

# CIAPACOV Motion Director

Use this skill only after the active Design System, Operational Master, Production Master, visual architecture and Premium Template Kit are known.

## Authority

1. Active Design System controls identity.
2. Brand Bridge controls brand-specific motion restrictions.
3. QA + verified media control factual truth.
4. Operational/Production Masters control narrative/runtime architecture.
5. Premium Kit controls the selected art direction.
6. This skill improves motion craft inside those boundaries.

Read `claude/motion-direction.compact.json` first. Read `claude/upstream-motion-intelligence.compact.json` only when implementation/tool choice is relevant.

## Motion direction workflow

Before implementation, answer internally:

- What should the viewer feel or understand?
- What is the one hero action or payoff?
- What changes from setup → action → resolution?
- What is the primary motion?
- Which secondary motion explains depth, response, hierarchy or continuity?
- Does ambient motion add atmosphere without competing for attention?

Build motion in three layers:

- **Primary:** the action/focus the viewer follows.
- **Secondary:** response, depth, refraction, annotation, shadows, node reactions.
- **Ambient:** subtle background life, never more than ~20% of the primary motion's visual energy.

## Agua Bienestar motion personality

Treat Agua Bienestar as **premium-institutional**:

- smooth controlled curves;
- precise staging;
- generous but efficient holds;
- restrained depth;
- water-linked continuity when relevant;
- zero overshoot;
- no bounce;
- no spring;
- no elastic;
- no squash/stretch;
- never morph or animate official logo letters independently.

## Choreography

- Do not animate everything simultaneously.
- Hero first; support second; ambient last.
- Stagger only when it communicates order or hierarchy.
- Prefer visual handoffs where the previous state seeds the next.
- Keep objects mathematically/visually attached to narrative paths.
- Use one coherent transition grammar per piece unless a second grammar has a specific focus/state function.
- Holds and negative space are part of motion design.

## Implementation routing

- **Remotion:** frame-accurate source of truth for exported video.
- **GSAP:** complex timelines, MotionPath, deterministic SVG/path choreography, custom easing and advanced sequencing.
- **Motion:** small/simple React motion and reusable UI-like primitives; do not inherit spring defaults when the Brand Bridge forbids them.
- **First-party Lottie:** reusable deterministic vector motion.
- **Lottie Creator MCP:** optional external authoring bridge only when the user's actual MCP client is connected. Never claim it is available merely because this repo documents it.
- **Generative video:** only conceptual/illustrative atmosphere, depth or explanation. Facts, logos, captions, routes, prices, phone numbers, official media and documentary evidence remain deterministic.

## Quality gates

Reject or revise motion that has any of these smells:

- same entrance repeated everywhere;
- every beat resolved as a card;
- constant motion with no rests;
- all scenes centered the same way;
- floating objects detached from paths;
- primary-color flood;
- random transition packs;
- ambient particles competing with text;
- hero data competing with secondary copy;
- microtext caused by layout avoidance;
- automated QA says PASS while rendered frames visibly overflow.

For premium finals, inspect the actual render at multiple timestamps. Use slow-motion review when timing/easing defects are difficult to see at normal speed.

## Upstream knowledge

This skill is intentionally compatible with and informed by official upstream motion knowledge from LottieFiles Motion Design Skill, Remotion Agent Skills and GSAP AI Skills. Do not copy upstream examples blindly. Apply principles through CIAPACOV's own Design System, Premium Kits, QA, Brand Bridges and factual constraints.
