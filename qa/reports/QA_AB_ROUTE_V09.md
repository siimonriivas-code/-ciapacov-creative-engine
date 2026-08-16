# QA-AB-ROUTE-45S-V1 — Agua Bienestar weekly routes

Status: **PASS · 100/100**  
Validated source commit: `b70f89ef42c4722a7240c87ceb1a3b9954361861`

## Routing lock
- Brand Bridge: `BRIDGE-AGUA-BIENESTAR-V1`
- Operational Master: `AB-MASTER-02`
- Production Master: `PM-ROUTE`
- Remotion composition: `CE-RouteJourney`
- Preferred visual architecture: `VIS-ROUTE-JOURNEY`
- Duration: **45 s**

## Fact lock
- Garrafón: **20 litros**
- Precio social a domicilio: **$10 MXN**
- Línea de información: **312 311 9041**
- Purificadoras en funcionamiento: **25**
- Redacción sanitaria exacta: **Acompañamiento de COESPRIS**

## Schedule lock
- LUNES — Benito Juárez · Palo Alto · Buenavista · Villa Flores
- MARTES Y VIERNES — Mirador de la Cumbre I y II · Moctezuma · Paraíso · Jardines del Sol
- MIÉRCOLES — Del Valle · San Isidro · Lo de Villa
- JUEVES — Tierra y Libertad · Palo Alto · Buenavista · Villa Flores
- SÁBADO — Tierra y Libertad · El Moralete · De los Trabajadores · Patios del Ferrocarril · La Albarrada

## Language gate
Required when applicable:
- `rutas programadas`
- `Acompañamiento de COESPRIS`

Rejected:
- `rutas oficiales`
- claims that COESPRIS certifies, endorses or guarantees the program

Additional lock: `Buenavista` is written as one word. The calendar does not add municipalities. The information line is not presented as an ordering line.

## Runtime proof
GitHub Actions rendered `CE-RouteJourney` at frame **1200** using the QA props file for a 45-second composition. This verifies that the v0.9 duration-aware Remotion metadata is active beyond the former 30-second base runtime.
