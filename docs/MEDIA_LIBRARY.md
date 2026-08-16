# Media Library contract

Real photos and video should usually live outside the code repository because they grow quickly and may contain privacy/rights constraints.

The Creative Engine only needs an index with:
- stable media ID
- external/local storage reference
- type and dimensions/duration
- verification status
- rights/consent status
- tags and domain
- production eligibility

See `media/index.example.json`.

The engine must never convert an unverified media item into production content simply because it matches a tag.
