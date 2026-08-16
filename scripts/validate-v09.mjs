import fs from 'node:fs'
const read=p=>JSON.parse(fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8'))
const bridges=read('src/registry/brand-bridges.json')
const scenarios=read('src/registry/qa-scenarios.json')
const masters=read('src/registry/masters.json')
const pms=read('src/registry/production-masters.json')
const visuals=read('src/registry/visual-architectures.json')
const ids=a=>new Set(a.map(x=>x.id))
const bridgeIds=ids(bridges),masterIds=ids(masters),pmIds=ids(pms),visualIds=ids(visuals)
const fail=[]
if(bridges.length<2)fail.push('expected at least generic + one specialized Brand Bridge')
if(!bridgeIds.has('BRIDGE-GENERIC'))fail.push('missing BRIDGE-GENERIC')
for(const b of bridges){
  if(b.governance?.identityAuthority!=='active-design-system')fail.push(`${b.id}: active Design System must own identity`)
  if(b.governance?.bundleOfficialAssets)fail.push(`${b.id}: official assets must not be bundled`)
  if(b.governance?.bundleFonts)fail.push(`${b.id}: fonts must not be bundled`)
  for(const k of ['primary','secondary','accent','surface','surfaceAlt','ink','muted','line','fontFamily'])if(!b.tokens?.[k]?.cssVar||!b.tokens?.[k]?.fallback)fail.push(`${b.id}: incomplete token ${k}`)
}
for(const s of scenarios){
  if(!bridgeIds.has(s.brandBridgeId))fail.push(`${s.id}: unknown bridge ${s.brandBridgeId}`)
  if(!masterIds.has(s.expected?.operationalMasterId))fail.push(`${s.id}: unknown master`)
  if(!pmIds.has(s.expected?.productionMasterId))fail.push(`${s.id}: unknown production master`)
  if(!visualIds.has(s.expected?.primaryArchitectureId))fail.push(`${s.id}: unknown primary architecture`)
  const pm=pms.find(x=>x.id===s.expected.productionMasterId)
  if(pm&&!pm.masterIds.includes(s.expected.operationalMasterId))fail.push(`${s.id}: production master does not cover expected operational master`)
  if(pm&&pm.compositionId!==s.expected.compositionId)fail.push(`${s.id}: composition mismatch`)
  if(!s.sourceStatus)fail.push(`${s.id}: sourceStatus required`)
}
const ab=bridges.find(x=>x.id==='BRIDGE-AGUA-BIENESTAR-V1')
const qa=scenarios.find(x=>x.id==='QA-AB-ROUTE-45S-V1')
if(!ab||!qa)fail.push('missing Agua Bienestar v0.9 QA pair')
if(ab){
  if(ab.tokens.primary.fallback!=='#2DBFF9'||ab.tokens.accent.fallback!=='#89033A')fail.push('Agua Bienestar bridge palette fallback mismatch')
  const safe=ab.safeAreas?.['9:16'];if(!safe||safe.side!==96||safe.top!==180||safe.bottom!==320)fail.push('Agua Bienestar 9:16 safe area mismatch')
  if(!ab.contentRules.preferredTerms.includes('rutas programadas'))fail.push('Agua Bienestar bridge must prefer rutas programadas')
  if(!ab.contentRules.forbiddenTerms.includes('rutas oficiales'))fail.push('Agua Bienestar bridge must forbid rutas oficiales')
}
if(qa){
  const f=qa.facts||{}
  if(f.garrafonLiters!==20||f.deliveryPriceMxn!==10||f.infoLine!=='312 311 9041'||f.purifiersOperating!==25||f.sanitaryWording!=='Acompañamiento de COESPRIS')fail.push('Agua Bienestar factual lock mismatch')
  const expected={
    'LUNES':['Benito Juárez','Palo Alto','Buenavista','Villa Flores'],
    'MARTES Y VIERNES':['Mirador de la Cumbre I y II','Moctezuma','Paraíso','Jardines del Sol'],
    'MIÉRCOLES':['Del Valle','San Isidro','Lo de Villa'],
    'JUEVES':['Tierra y Libertad','Palo Alto','Buenavista','Villa Flores'],
    'SÁBADO':['Tierra y Libertad','El Moralete','De los Trabajadores','Patios del Ferrocarril','La Albarrada']
  }
  if(qa.schedule?.length!==5)fail.push('Agua Bienestar schedule must contain 5 day groups')
  for(const [day,dests] of Object.entries(expected)){
    const row=qa.schedule?.find(x=>x.day===day)
    if(!row||JSON.stringify(row.destinations)!==JSON.stringify(dests))fail.push(`Agua Bienestar schedule mismatch: ${day}`)
  }
  if(JSON.stringify(qa).includes('Buena Vista'))fail.push('Buenavista must be written together')
  if(!qa.rules.some(x=>x.includes('no para solicitar garrafones')))fail.push('info line usage rule missing')
}
if(fail.length){console.error(fail.join('\n'));process.exit(1)}
console.log(`OK v0.9: ${bridges.length} brand bridges, ${scenarios.length} reproducible QA scenario(s); Agua Bienestar route factual lock valid`)
