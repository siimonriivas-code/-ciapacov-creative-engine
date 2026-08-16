# Claude Design integration — v0.3

Attach/link this repository as a codebase/reference library in the Claude Design project. Keep the active brand Design System attached separately.

## Authority order
1. Active brand Design System
2. Verified production data/assets
3. CIAPACOV Creative Engine
4. Demo content

## Low-context workflow
Claude should first read `claude/catalog.compact.json`. If the request is motion/video, also read `claude/motions.compact.json`. Recommend 3–6 IDs. Only after selection should it inspect the matching full record, recipe and implementation.

## Do not
- ingest the whole repository for every prompt;
- treat demo copy/data as real;
- copy demo colors into Agua Bienestar or CIAPACOV production work;
- override logo, typography or co-branding rules from the active Design System.
