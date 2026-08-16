import fs from 'node:fs'
const read=p=>JSON.parse(fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8'))
const text=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8')
const styles=read('src/registry/creative-style-families.json')
const modules=read('src/registry/premium-motion-modules.json')
const providers=read('src/registry/generative-video-providers.json')
const policies=read('src/registry/generative-scene-policies.json')
const external=read('src/registry/external-motion-assets.json')
const fail=[]
const ids=a=>new Set(a.map(x=>x.id))

if(styles.length<12)fail.push(`expected >=12 creative style families, got ${styles.length}`)
if(modules.length<36)fail.push(`expected >=36 premium motion modules, got ${modules.length}`)
if(providers.length<2)fail.push(`expected >=2 generative provider profiles, got ${providers.length}`)
if(policies.classes?.length<5)fail.push('expected >=5 generative scene classes')
if(!Array.isArray(external.assets))fail.push('external motion registry assets must be an array')

const styleIds=ids(styles)
if(styleIds.size!==styles.length)fail.push('duplicate creative style family ID')
for(const s of styles){
  if(!s.colorBehavior?.avoidMonochromeFlood)fail.push(`${s.id}: anti-monochrome rule missing`)
  if(s.colorBehavior?.mode!=='design-system-roles')fail.push(`${s.id}: must use design-system role colors`)
  if(!s.motionSignature||!s.surfaceStrategy||!s.contrastStrategy)fail.push(`${s.id}: incomplete creative direction fields`)
  if(!Array.isArray(s.compatibleArchitectures)||!s.compatibleArchitectures.length)fail.push(`${s.id}: no architecture compatibility`)
}

const moduleIds=ids(modules)
if(moduleIds.size!==modules.length)fail.push('duplicate premium motion module ID')
const categories=new Set(modules.map(x=>x.category))
for(const needed of ['water','route','typography','data','documentary','transition','spatial','system','utility'])if(!categories.has(needed))fail.push(`missing motion category ${needed}`)
for(const m of modules){
  if(m.status!=='spec-ready')fail.push(`${m.id}: unexpected status ${m.status}`)
  if(!m.signature||!Array.isArray(m.bestFor)||!m.bestFor.length)fail.push(`${m.id}: incomplete module metadata`)
}

const main=providers.find(x=>x.id==='GEN-MINIMAX-HAILUO-23')
if(!main)fail.push('MiniMax Hailuo 2.3 provider missing')
else{
  if(!main.modes.includes('text-to-video')||!main.modes.includes('image-to-video'))fail.push('Hailuo 2.3 must support T2V and I2V')
  if(!main.durations?.['768P']?.includes(10)||!main.durations?.['1080P']?.includes(6))fail.push('Hailuo 2.3 duration/resolution matrix incomplete')
  if((main.cameraCommands??[]).length<15)fail.push('Hailuo 2.3 camera command set incomplete')
  if(!main.forbiddenUse?.includes('fabricated-documentary-evidence'))fail.push('Hailuo 2.3 factual-evidence prohibition missing')
}

const factual=policies.classes.find(x=>x.id==='SCENE-FACTUAL-EVIDENCE')
const conceptual=policies.classes.find(x=>x.id==='SCENE-CONCEPTUAL')
if(factual?.generativeAllowed!==false)fail.push('factual evidence must forbid generative video')
if(conceptual?.generativeAllowed!==true)fail.push('conceptual scenes should allow governed generation')
if(!policies.preflight?.some(x=>x.includes('logos')))fail.push('generative preflight must keep official identity/text outside generated pixels')

for(const file of ['src/lib/creative-style-director.ts','src/lib/generative-video.ts','src/motion/premiumPrimitives.tsx','scripts/ingest-motion-asset.mjs','claude/premium.compact.json','docs/PREMIUM_VISUAL_GENERATIVE_LAYER.md']){
  if(!fs.existsSync(new URL(`../${file}`,import.meta.url)))fail.push(`missing v1.1 file ${file}`)
}
if(fs.existsSync(new URL('../src/lib/creative-style-director.ts',import.meta.url))){
  const director=text('src/lib/creative-style-director.ts')
  for(const token of ['auditAntiGeneric','chooseDistinctStyleDirections','MONOCHROME_FLOOD','CARD_REPETITION'])if(!director.includes(token))fail.push(`style director missing ${token}`)
}
if(fs.existsSync(new URL('../src/lib/generative-video.ts',import.meta.url))){
  const adapter=text('src/lib/generative-video.ts')
  for(const token of ['preflightGenerativeScene','buildMiniMaxPayload','SCENE-FACTUAL-EVIDENCE','MiniMax-Hailuo-2.3'])if(!adapter.includes(token))fail.push(`generative adapter missing ${token}`)
}

if(fail.length){console.error(fail.join('\n'));process.exit(1)}
console.log(`OK v1.1 premium layer: ${styles.length} style families; ${modules.length} motion modules; ${providers.length} provider profiles; ${policies.classes.length} scene classes`)
