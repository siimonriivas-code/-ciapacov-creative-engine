# Domain Library

The Domain Library is the translation layer between how a communications team thinks and how the engine stores templates.

People ask for "rehabilitación de pozo", "rutas semanales", "trabajos de brigada" or "informe de resultados". They should not need to know `REEL-014` or `CAR-018`.

Each Operational Master defines:
- one real-work domain
- objective and materials
- compatible formats
- a curated set of existing template IDs
- required asset capabilities
- recommended asset capabilities

Masters do not duplicate template code. They coordinate existing pieces.
