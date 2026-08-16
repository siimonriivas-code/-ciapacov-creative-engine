# Structured Brief Router

Use this shape when the user gives enough information:

```json
{
  "topic": "rehabilitación de pozo",
  "format": "carousel",
  "objective": "explicar beneficio",
  "tone": "institucional",
  "materials": ["6 fotos", "inversión", "beneficiarios"],
  "constraints": ["no inventar datos"]
}
```

Resolution sequence:
1. infer Domain
2. choose one Operational Master
3. shortlist 3–6 distinct templates
4. resolve required/recommended asset capabilities
5. flag semantic slots before design
6. load only the selected implementation after user choice
