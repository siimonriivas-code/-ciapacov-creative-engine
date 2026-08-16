# Asset ingest pipeline

The repository intentionally does not scrape or auto-download marketplace resources.

## Flow
1. User obtains/creates an asset with known rights.
2. Create a manifest using `ingest/examples/asset-manifest.example.json`.
3. Run `npm run ingest:asset -- <manifest> <local-file>`.
4. The script blocks unknown/reference-only/unverified licenses.
5. It copies the asset to `public/assets/ingested/<category>/`.
6. It calculates SHA-256 provenance.
7. It appends the registered asset to `src/registry/assets.json`.
8. Run `npm run validate:all` and `npm run catalog:all`.

This gives us a controlled internal library without pretending a marketplace subscription grants redistribution rights.
