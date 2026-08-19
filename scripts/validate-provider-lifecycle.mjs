import fs from 'node:fs';

const catalog = JSON.parse(fs.readFileSync('src/registry/generative-provider-catalog.json', 'utf8'));
const lifecycle = JSON.parse(fs.readFileSync('src/registry/generative-provider-lifecycle-overrides.json', 'utf8'));

const byId = new Map(catalog.providers.map((p) => [p.id, p]));
const overrides = lifecycle.overrides || [];

const sora = overrides.find((x) => (x.catalogIds || []).includes('GENCAT-OPENAI-SORA-2'));
if (!sora || sora.status !== 'SUNSET_SCHEDULED_DO_NOT_BUILD_NEW_ADAPTER' || sora.effective !== '2026-09-24') {
  throw new Error('Sora lifecycle override is missing or stale');
}
for (const id of ['GENCAT-OPENAI-SORA-2', 'GENCAT-OPENAI-SORA-2-PRO']) {
  if (!byId.has(id)) throw new Error(`Lifecycle override refers to missing catalog profile ${id}`);
}

const h3 = overrides.find((x) => x.model === 'MiniMax H3');
if (!h3 || h3.status !== 'OFFICIAL_MODEL_WATCHLIST_API_PROFILE_NOT_VALIDATED') {
  throw new Error('MiniMax H3 must remain watchlist-only until API profile is validated');
}
if (byId.has('GENCAT-MINIMAX-H3')) {
  throw new Error('MiniMax H3 must not be added to executable/capability provider catalog until official API model/endpoint validation');
}

const executable = catalog.providers.filter((p) => ['integrated-live', 'integrated-dry-run'].includes(p.executionStatus));
if (executable.some((p) => p.provider === 'OpenAI')) {
  throw new Error('OpenAI Sora must not be enabled as a new executable adapter during scheduled API sunset');
}

console.log('Generative provider lifecycle validation PASS');
console.log(`Base capability profiles: ${catalog.providers.length}`);
console.log(`Lifecycle overrides: ${overrides.length}`);
console.log(`Executable profiles remain: ${executable.map((x) => `${x.provider}:${x.model}`).join(', ')}`);
