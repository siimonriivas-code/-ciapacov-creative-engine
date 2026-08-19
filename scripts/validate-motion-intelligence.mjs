import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));
const exists = (p) => fs.existsSync(path.join(root, p));

const requiredFiles = [
  'claude/motion-direction.compact.json',
  'claude/upstream-motion-intelligence.compact.json',
  'claude/lottie-motion-tokens.compact.json',
  'src/registry/motion-token-contracts.json',
  '.agents/skills/ciapacov-motion-director/SKILL.md',
  'claude/premium.compact.json',
  'claude/handoff.compact.json',
];

for (const p of requiredFiles) {
  if (!exists(p)) throw new Error(`Missing required motion-intelligence file: ${p}`);
}

const motion = json('claude/motion-direction.compact.json');
const upstream = json('claude/upstream-motion-intelligence.compact.json');
const motionTokens = json('claude/lottie-motion-tokens.compact.json');
const tokenContracts = json('src/registry/motion-token-contracts.json');
const handoff = json('claude/handoff.compact.json');
const premium = json('claude/premium.compact.json');
const pkg = json('package.json');

if (motion.version !== '1.2') throw new Error(`motion-direction version must be 1.2, got ${motion.version}`);
if (upstream.version !== '1.2') throw new Error(`upstream-motion-intelligence version must be 1.2, got ${upstream.version}`);
if (handoff.version !== '1.2') throw new Error(`handoff version must be 1.2, got ${handoff.version}`);
if (premium.version !== '1.2') throw new Error(`premium version must be 1.2, got ${premium.version}`);

const authority = motion.authorityOrder || [];
const requiredAuthority = ['active-design-system', 'brand-bridge', 'factual-qa'];
for (const item of requiredAuthority) {
  if (!authority.includes(item)) throw new Error(`Motion direction authority is missing ${item}`);
}

const agua = motion.brandMotionPersonality?.AguaBienestar;
if (!agua) throw new Error('Missing AguaBienestar motion personality');
for (const flag of ['bounce', 'spring', 'elastic', 'squashStretch']) {
  if (agua[flag] !== false) throw new Error(`Agua Bienestar ${flag} must be false`);
}
if (Number(agua.overshoot) !== 0) throw new Error('Agua Bienestar overshoot must be 0');

if ((motion.layering?.ambientEnergyMaxRatio ?? 1) > 0.2) {
  throw new Error('Ambient motion energy must not exceed 20% of primary motion');
}

const adopted = upstream.adoptedKnowledge || [];
const adoptedIds = new Set(adopted.map((x) => x.id));
for (const id of ['UP-MOTION-LOTTIEFILES-DIRECTOR', 'UP-REMOTION-AGENT-SKILLS', 'UP-GSAP-OFFICIAL-SKILLS', 'UP-MOTION-RUNTIME']) {
  if (!adoptedIds.has(id)) throw new Error(`Missing adopted upstream knowledge: ${id}`);
}

const allowedStatuses = new Set([
  'ADOPTED_KNOWLEDGE',
  'ADOPTED_EXECUTION_KNOWLEDGE',
  'ADOPTED_RUNTIME',
  'RECOMMENDED_EXTERNAL_BRIDGE_NOT_REPO_EXECUTOR',
  'LAB_CANDIDATE',
  'EXTERNAL_3D_CANDIDATE',
  'WATCHLIST_REDUNDANT_WITH_REMOTION',
  'REFERENCE_EDITOR_UI_ONLY',
]);

for (const group of ['adoptedKnowledge', 'externalBridges', 'labCandidates', 'watchlist']) {
  for (const item of upstream[group] || []) {
    if (!allowedStatuses.has(item.status)) throw new Error(`Unsupported upstream status ${item.status} on ${item.id}`);
  }
}

if (upstream.policy?.noBlindNpxExecution !== true) throw new Error('noBlindNpxExecution must remain true');
if (upstream.policy?.activeDesignSystemStillWins !== true) throw new Error('activeDesignSystemStillWins must remain true');
if (upstream.policy?.factualTruthStillComesFromQaAndVerifiedMedia !== true) throw new Error('factual truth authority must remain QA + verified media');

if (motionTokens.status !== 'PREPARED_NOT_RUNTIME_ENABLED') {
  throw new Error(`Motion Tokens must remain explicitly non-runtime until adapter QA passes; got ${motionTokens.status}`);
}
if (motionTokens.currentRuntime?.motionTokensNative !== false) {
  throw new Error('Current Remotion/Lottie runtime must not claim native Motion Token support');
}
if (tokenContracts.status !== 'PREPARED_FOR_DOTLOTTIE_ADAPTER') {
  throw new Error(`Unexpected Motion Token contract status: ${tokenContracts.status}`);
}
if (!Array.isArray(tokenContracts.contracts) || tokenContracts.contracts.length < 4) {
  throw new Error('Expected at least four governed Motion Token contracts');
}
for (const c of tokenContracts.contracts) {
  if (!c.id || !Array.isArray(c.required)) throw new Error(`Invalid Motion Token contract: ${JSON.stringify(c)}`);
}

if (handoff.rules?.motionUpstreamNeverOverridesBrandOrFacts !== true) {
  throw new Error('handoff must preserve motion upstream authority boundary');
}
if (handoff.rules?.blindNpxInstallForbidden !== true) {
  throw new Error('handoff must forbid blind remote npx installation');
}
if (premium.motionDirection?.compact !== 'claude/motion-direction.compact.json') {
  throw new Error('premium routing must point to the governed motion-direction compact');
}

for (const dep of ['remotion', 'gsap', 'motion', '@remotion/lottie', 'lottie-web']) {
  if (!pkg.dependencies?.[dep]) throw new Error(`Expected existing runtime dependency is missing: ${dep}`);
}

const skill = read('.agents/skills/ciapacov-motion-director/SKILL.md');
if (!skill.includes('name: ciapacov-motion-director')) throw new Error('Motion Director skill frontmatter is invalid');
if (!skill.includes('Never overrides') && !skill.includes('never overrides')) {
  throw new Error('Motion Director skill must explicitly preserve upstream authority boundaries');
}

console.log('Motion Intelligence v1.2 validation PASS');
console.log(`Adopted knowledge: ${adopted.length}`);
console.log(`External bridges: ${(upstream.externalBridges || []).length}`);
console.log(`Lab candidates: ${(upstream.labCandidates || []).length}`);
console.log(`Watchlist: ${(upstream.watchlist || []).length}`);
console.log(`Motion Token contracts: ${tokenContracts.contracts.length} (adapter prepared, runtime disabled)`);
